"""
User management API routes
"""
from fastapi import APIRouter, HTTPException, status, Depends, Query
from bson import ObjectId
from datetime import datetime
from app.schemas import APIResponse, UserUpdate
from app.database import get_database
from app.dependencies import get_current_user
from typing import Dict, Optional


router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=APIResponse)
async def get_my_profile(current_user: Dict = Depends(get_current_user)):
    """Get current user's complete profile"""
    user_response = {k: v for k, v in current_user.items() if k != "password"}
    
    return {
        "success": True,
        "message": "Profile retrieved",
        "data": {"user": user_response}
    }


@router.put("/me", response_model=APIResponse)
async def update_my_profile(
    updates: UserUpdate,
    current_user: Dict = Depends(get_current_user)
):
    """
    Update current user's profile
    
    Can update: name, location, bio, availability, is_public, skills_offered, skills_wanted
    """
    db = get_database()
    user_id = ObjectId(current_user["_id"])
    
    # Prepare update data (only include provided fields)
    update_data = updates.dict(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No update data provided"
        )
    
    # Add updated timestamp
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    # Update in database
    await db.users.update_one(
        {"_id": user_id},
        {"$set": update_data}
    )
    
    # Fetch updated user
    updated_user = await db.users.find_one({"_id": user_id})
    updated_user["_id"] = str(updated_user["_id"])
    updated_user.pop("password", None)
    
    return {
        "success": True,
        "message": "Profile updated successfully",
        "data": {"user": updated_user}
    }


@router.get("/{user_id}", response_model=APIResponse)
async def get_user_profile(
    user_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """
    Get another user's public profile
    
    Returns full profile if user is viewing their own or if profile is public
    """
    db = get_database()
    
    # Validate ObjectId
    try:
        target_user_id = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    # Find user
    user = await db.users.find_one({"_id": target_user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if profile is public (unless viewing own profile)
    if user_id != current_user["_id"] and not user.get("is_public", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This profile is private"
        )
    
    # Calculate user rating
    user_ratings = await db.ratings.find({"reviewee_id": user_id}).to_list(None)
    
    avg_rating = None
    if user_ratings:
        avg_rating = round(sum(r["rating"] for r in user_ratings) / len(user_ratings), 1)
    
    # Prepare response
    user_response = {
        "_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"] if user_id == current_user["_id"] else None,
        "location": user.get("location"),
        "avatar": user.get("avatar"),
        "bio": user.get("bio"),
        "availability": user.get("availability"),
        "skills_offered": user.get("skills_offered", []),
        "skills_wanted": user.get("skills_wanted", []),
        "rating": avg_rating,
        "review_count": len(user_ratings),
        "created_at": user["created_at"]
    }
    
    return {
        "success": True,
        "message": "User profile retrieved",
        "data": {"user": user_response}
    }


@router.get("/{user_id}/ratings", response_model=APIResponse)
async def get_user_ratings(
    user_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """Get all ratings for a specific user"""
    db = get_database()
    
    # Validate user exists
    try:
        target_user_id = ObjectId(user_id)
        user = await db.users.find_one({"_id": target_user_id})
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
    
    # Get ratings
    ratings = await db.ratings.find({"reviewee_id": user_id}).to_list(None)
    
    # Convert ObjectIds to strings
    for rating in ratings:
        rating["_id"] = str(rating["_id"])
    
    return {
        "success": True,
        "message": f"Found {len(ratings)} ratings",
        "data": {"ratings": ratings}
    }


@router.get("", response_model=APIResponse)
async def search_users(
    skill: Optional[str] = Query(None, description="Search by skill name"),
    location: Optional[str] = Query(None, description="Filter by location"),
    availability: Optional[str] = Query(None, description="Filter by availability"),
    current_user: Dict = Depends(get_current_user)
):
    """
    Search and browse users for skill exchange
    
    Used by Exchange page to find potential swap partners
    Filters: skill name, location, availability
    """
    db = get_database()
    
    # Build query
    query = {
        "is_public": True,
        "is_banned": False,
        "_id": {"$ne": ObjectId(current_user["_id"])}  # Exclude current user
    }
    
    # Filter by skill (offered or wanted)
    if skill:
        query["$or"] = [
            {"skills_offered": {"$regex": skill, "$options": "i"}},
            {"skills_wanted": {"$regex": skill, "$options": "i"}}
        ]
    
    # Filter by location
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    
    # Filter by availability
    if availability:
        query["availability"] = {"$regex": availability, "$options": "i"}
    
    # Execute query
    users_cursor = db.users.find(query)
    users = await users_cursor.to_list(None)
    
    # Prepare results with ratings
    results = []
    for user in users:
        user_id = str(user["_id"])
        
        # Get user ratings
        user_ratings = await db.ratings.find({"reviewee_id": user_id}).to_list(None)
        avg_rating = None
        if user_ratings:
            avg_rating = round(sum(r["rating"] for r in user_ratings) / len(user_ratings), 1)
        
        # Prepare user data
        user_data = {
            "id": user_id,
            "name": user["name"],
            "location": user.get("location"),
            "avatar": user.get("avatar"),
            "bio": user.get("bio"),
            "availability": user.get("availability"),
            "skills_offered": user.get("skills_offered", []),
            "skills_wanted": user.get("skills_wanted", []),
            "rating": avg_rating,
            "review_count": len(user_ratings),
        }
        
        results.append(user_data)
    
    return {
        "success": True,
        "message": f"Found {len(results)} users",
        "data": {"users": results}
    }
