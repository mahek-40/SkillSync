from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from typing import List
from app.db.database import db
from app.schemas.user_schema import UserUpdate
from app.services.auth_service import serialize_user, update_user_profile

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.get("")
async def get_all_users(exclude_id: str = None):
    """Get all users except the current user and admins"""
    query = {"role": {"$ne": "admin"}}
    if exclude_id:
        query["_id"] = {"$ne": ObjectId(exclude_id)}
    
    users = await db.users.find(query).to_list(length=None)
    return [serialize_user(user) for user in users]

@router.get("/{user_id}")
async def get_user_by_id(user_id: str):
    """Get user by ID with completed swaps count"""
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Count completed swaps
        completed_swaps = await db.swaps.count_documents({
            "$or": [
                {"requester_id": user_id},
                {"receiver_id": user_id}
            ],
            "status": "completed"
        })
        
        user_data = serialize_user(user)
        user_data["completedSwaps"] = completed_swaps
        
        return user_data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/{user_id}")
async def update_user(user_id: str, updates: UserUpdate):
    """Update user profile"""
    return await update_user_profile(user_id, updates.dict(exclude_unset=True))
