"""
Notifications API routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from app.schemas import APIResponse
from app.database import get_database
from app.dependencies import get_current_user
from typing import Dict


router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("", response_model=APIResponse)
async def get_notifications(current_user: Dict = Depends(get_current_user)):
    """Get all notifications for current user"""
    db = get_database()
    
    notifications = await db.notifications.find({
        "user_id": current_user["_id"]
    }).sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds to strings
    for notif in notifications:
        notif["_id"] = str(notif["_id"])
    
    # Count unread
    unread_count = sum(1 for n in notifications if not n["is_read"])
    
    return {
        "success": True,
        "message": f"{len(notifications)} notifications ({unread_count} unread)",
        "data": {
            "notifications": notifications,
            "unread_count": unread_count
        }
    }


@router.put("/{notification_id}/read", response_model=APIResponse)
async def mark_notification_read(
    notification_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """Mark a notification as read"""
    db = get_database()
    
    try:
        notif_object_id = ObjectId(notification_id)
        notification = await db.notifications.find_one({"_id": notif_object_id})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid notification ID format"
        )
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    # Verify ownership
    if notification["user_id"] != current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to modify this notification"
        )
    
    # Mark as read
    await db.notifications.update_one(
        {"_id": notif_object_id},
        {"$set": {"is_read": True}}
    )
    
    # Get updated notification
    updated_notif = await db.notifications.find_one({"_id": notif_object_id})
    updated_notif["_id"] = str(updated_notif["_id"])
    
    return {
        "success": True,
        "message": "Notification marked as read",
        "data": {"notification": updated_notif}
    }


@router.put("/read-all", response_model=APIResponse)
async def mark_all_read(current_user: Dict = Depends(get_current_user)):
    """Mark all notifications as read for current user"""
    db = get_database()
    
    result = await db.notifications.update_many(
        {
            "user_id": current_user["_id"],
            "is_read": False
        },
        {"$set": {"is_read": True}}
    )
    
    return {
        "success": True,
        "message": f"Marked {result.modified_count} notifications as read",
        "data": {"count": result.modified_count}
    }


@router.delete("/{notification_id}", response_model=APIResponse)
async def delete_notification(
    notification_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """Delete a notification"""
    db = get_database()
    
    try:
        notif_object_id = ObjectId(notification_id)
        notification = await db.notifications.find_one({"_id": notif_object_id})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid notification ID format"
        )
    
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    # Verify ownership
    if notification["user_id"] != current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this notification"
        )
    
    # Delete notification
    await db.notifications.delete_one({"_id": notif_object_id})
    
    return {
        "success": True,
        "message": "Notification deleted",
        "data": None
    }
