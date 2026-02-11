"""
Admin panel API routes - User management, moderation, reports
"""
from fastapi import APIRouter, HTTPException, status, Depends, Response
from bson import ObjectId
from datetime import datetime
from app.schemas import APIResponse, UserBanUpdate, AnnouncementCreate
from app.database import get_database
from app.dependencies import get_current_admin
from typing import Dict
import csv
from io import StringIO


router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/users", response_model=APIResponse)
async def get_all_users(current_admin: Dict = Depends(get_current_admin)):
    """Get all users (admin only)"""
    db = get_database()
    
    users = await db.users.find().sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds and exclude passwords
    users_list = []
    for user in users:
        user["_id"] = str(user["_id"])
        user.pop("password", None)
        users_list.append(user)
    
    return {
        "success": True,
        "message": f"Found {len(users_list)} users",
        "data": {"users": users_list}
    }


@router.put("/users/{user_id}/ban", response_model=APIResponse)
async def ban_user(
    user_id: str,
    ban_data: UserBanUpdate,
    current_admin: Dict = Depends(get_current_admin)
):
    """Ban or unban a user (admin only)"""
    db = get_database()
    
    try:
        user_object_id = ObjectId(user_id)
        user = await db.users.find_one({"_id": user_object_id})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Cannot ban another admin
    if user["role"] == "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot ban admin users"
        )
    
    # Update ban status
    update_data = {
        "is_banned": ban_data.is_banned,
        "ban_reason": ban_data.reason if ban_data.is_banned else None,
        "updated_at": datetime.utcnow().isoformat()
    }
    
    await db.users.update_one(
        {"_id": user_object_id},
        {"$set": update_data}
    )
    
    # Get updated user
    updated_user = await db.users.find_one({"_id": user_object_id})
    updated_user["_id"] = str(updated_user["_id"])
    updated_user.pop("password", None)
    
    action = "banned" if ban_data.is_banned else "unbanned"
    
    return {
        "success": True,
        "message": f"User {action} successfully",
        "data": {"user": updated_user}
    }


@router.get("/swaps", response_model=APIResponse)
async def get_all_swaps(current_admin: Dict = Depends(get_current_admin)):
    """Get all swap requests with statistics (admin only)"""
    db = get_database()
    
    swaps = await db.swap_requests.find().sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds
    for swap in swaps:
        swap["_id"] = str(swap["_id"])
    
    # Calculate statistics
    stats = {
        "total": len(swaps),
        "pending": sum(1 for s in swaps if s["status"] == "pending"),
        "accepted": sum(1 for s in swaps if s["status"] == "accepted"),
        "rejected": sum(1 for s in swaps if s["status"] == "rejected"),
        "completed": sum(1 for s in swaps if s["status"] == "completed"),
    }
    
    return {
        "success": True,
        "message": f"Found {len(swaps)} swap requests",
        "data": {
            "swaps": swaps,
            "stats": stats
        }
    }


@router.post("/announcements", response_model=APIResponse, status_code=status.HTTP_201_CREATED)
async def create_announcement(
    announcement_data: AnnouncementCreate,
    current_admin: Dict = Depends(get_current_admin)
):
    """Create platform-wide announcement (admin only)"""
    db = get_database()
    
    # Create announcement
    new_announcement = {
        "title": announcement_data.title,
        "message": announcement_data.message,
        "created_by": current_admin["_id"],
        "created_by_name": current_admin["name"],
        "created_at": datetime.utcnow().isoformat()
    }
    
    result = await db.announcements.insert_one(new_announcement)
    announcement_id = str(result.inserted_id)
    
    # Get all users (except admin)
    users = await db.users.find({
        "_id": {"$ne": ObjectId(current_admin["_id"])}
    }).to_list(None)
    
    # Create notification for each user
    notifications = []
    for user in users:
        notification = {
            "user_id": str(user["_id"]),
            "type": "announcement",
            "title": announcement_data.title,
            "message": announcement_data.message,
            "is_read": False,
            "created_at": datetime.utcnow().isoformat()
        }
        notifications.append(notification)
    
    if notifications:
        await db.notifications.insert_many(notifications)
    
    new_announcement["_id"] = announcement_id
    
    return {
        "success": True,
        "message": f"Announcement sent to {len(users)} users",
        "data": {"announcement": new_announcement}
    }


@router.get("/stats", response_model=APIResponse)
async def get_platform_stats(current_admin: Dict = Depends(get_current_admin)):
    """Get platform statistics (admin only)"""
    db = get_database()
    
    # Count documents
    total_users = await db.users.count_documents({})
    banned_users = await db.users.count_documents({"is_banned": True})
    
    total_swaps = await db.swap_requests.count_documents({})
    pending_swaps = await db.swap_requests.count_documents({"status": "pending"})
    active_swaps = await db.swap_requests.count_documents({"status": "accepted"})
    completed_swaps = await db.swap_requests.count_documents({"status": "completed"})
    
    total_ratings = await db.ratings.count_documents({})
    
    # Calculate completion rate
    completion_rate = 0
    if total_swaps > 0:
        completion_rate = round((completed_swaps / total_swaps) * 100, 1)
    
    # Calculate average platform rating
    avg_platform_rating = 0
    if total_ratings > 0:
        pipeline = [
            {"$group": {"_id": None, "avg_rating": {"$avg": "$rating"}}}
        ]
        result = await db.ratings.aggregate(pipeline).to_list(1)
        if result:
            avg_platform_rating = round(result[0]["avg_rating"], 1)
    
    stats = {
        "users": {
            "total": total_users,
            "active": total_users - banned_users,
            "banned": banned_users
        },
        "swaps": {
            "total": total_swaps,
            "pending": pending_swaps,
            "active": active_swaps,
            "completed": completed_swaps,
            "completion_rate": completion_rate
        },
        "ratings": {
            "total": total_ratings,
            "average": avg_platform_rating
        }
    }
    
    return {
        "success": True,
        "message": "Platform statistics",
        "data": {"stats": stats}
    }


@router.get("/reports/users")
async def export_users_report(current_admin: Dict = Depends(get_current_admin)):
    """Export users report as CSV (admin only)"""
    db = get_database()
    
    users = await db.users.find().to_list(None)
    
    # Create CSV
    output = StringIO()
    writer = csv.writer(output)
    
    # Header
    writer.writerow([
        "ID", "Name", "Email", "Role", "Location", "Banned",
        "Skills Offered", "Skills Wanted", "Created At"
    ])
    
    # Data
    for user in users:
        writer.writerow([
            str(user["_id"]),
            user["name"],
            user["email"],
            user["role"],
            user.get("location", ""),
            user.get("is_banned", False),
            ", ".join(user.get("skills_offered", [])),
            ", ".join(user.get("skills_wanted", [])),
            user["created_at"]
        ])
    
    csv_content = output.getvalue()
    output.close()
    
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=users_report.csv"}
    )


@router.get("/reports/swaps")
async def export_swaps_report(current_admin: Dict = Depends(get_current_admin)):
    """Export swaps report as CSV (admin only)"""
    db = get_database()
    
    swaps = await db.swap_requests.find().to_list(None)
    
    # Create CSV
    output = StringIO()
    writer = csv.writer(output)
    
    # Header
    writer.writerow([
        "ID", "Requester", "Receiver", "Skill Offered", "Skill Wanted",
        "Status", "Created At", "Updated At"
    ])
    
    # Data
    for swap in swaps:
        writer.writerow([
            str(swap["_id"]),
            swap["requester_name"],
            swap["receiver_name"],
            swap["skill_offered"],
            swap["skill_wanted"],
            swap["status"],
            swap["created_at"],
            swap["updated_at"]
        ])
    
    csv_content = output.getvalue()
    output.close()
    
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=swaps_report.csv"}
    )
  
