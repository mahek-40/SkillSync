from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from datetime import datetime
from typing import List
from app.db.database import db
from app.schemas.swap_schema import SwapCreate, SwapUpdate

router = APIRouter(prefix="/api/swaps", tags=["Swaps"])

def serialize_swap(swap):
    """Convert MongoDB swap document to API response format"""
    return {
        "id": str(swap["_id"]),
        "requesterId": swap["requester_id"],
        "receiverId": swap["receiver_id"],
        "requesterSkills": swap.get("requester_skills", []),
        "receiverSkills": swap.get("receiver_skills", []),
        "status": swap["status"],
        "createdAt": swap["created_at"].isoformat(),
        "updatedAt": swap.get("updated_at", swap["created_at"]).isoformat()
    }

@router.post("")
async def create_swap(swap_data: SwapCreate):
    """Create a new skill swap request"""
    swap_dict = {
        "requester_id": swap_data.requesterId,
        "receiver_id": swap_data.receiverId,
        "requester_skills": swap_data.requesterSkills,
        "receiver_skills": swap_data.receiverSkills,
        "status": "pending",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.swaps.insert_one(swap_dict)
    swap_dict["_id"] = result.inserted_id
    
    # Create notification for receiver
    notification = {
        "user_id": swap_data.receiverId,
        "type": "swap_request",
        "message": "You have a new swap request!",
        "swap_id": str(result.inserted_id),
        "read": False,
        "created_at": datetime.utcnow()
    }
    await db.notifications.insert_one(notification)
    
    return serialize_swap(swap_dict)

@router.get("/user/{user_id}")
async def get_swaps_by_user(user_id: str):
    """Get all swaps for a specific user"""
    swaps = await db.swaps.find({
        "$or": [
            {"requester_id": user_id},
            {"receiver_id": user_id}
        ]
    }).to_list(length=None)
    
    return [serialize_swap(swap) for swap in swaps]

@router.put("/{swap_id}/status")
async def update_swap_status(swap_id: str, status_update: SwapUpdate):
    """Update swap status (accept/reject/complete)"""
    try:
        result = await db.swaps.find_one_and_update(
            {"_id": ObjectId(swap_id)},
            {
                "$set": {
                    "status": status_update.status,
                    "updated_at": datetime.utcnow()
                }
            },
            return_document=True
        )
        
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Swap not found"
            )
        
        return serialize_swap(result)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
