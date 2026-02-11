"""
Ratings and reviews API routes
"""
from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime
from app.schemas import APIResponse, RatingCreate
from app.database import get_database
from app.dependencies import get_current_user
from typing import Dict


router = APIRouter(prefix="/ratings", tags=["Ratings"])


@router.post("", response_model=APIResponse, status_code=status.HTTP_201_CREATED)
async def create_rating(
    rating_data: RatingCreate,
    current_user: Dict = Depends(get_current_user)
):
    """
    Create a rating for a completed swap
    
    - **swap_id**: ID of the swap to rate
    - **rating**: Rating value (1-5)
    - **comment**: Optional review comment
    
    Requirements:
    - Swap must be accepted or completed
    - User must be part of the swap
    - Can only rate once per swap
    """
    db = get_database()
    
    # Validate swap exists
    try:
        swap_object_id = ObjectId(rating_data.swap_id)
        swap = await db.swap_requests.find_one({"_id": swap_object_id})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid swap ID format"
        )
    
    if not swap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Swap request not found"
        )
    
    # Verify user is part of the swap
    if current_user["_id"] not in [swap["requester_id"], swap["receiver_id"]]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not part of this swap"
        )
    
    # Swap must be accepted or completed
    if swap["status"] not in ["accepted", "completed"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only rate accepted or completed swaps"
        )
    
    # Check if already rated
    existing_rating = await db.ratings.find_one({
        "swap_id": rating_data.swap_id,
        "reviewer_id": current_user["_id"]
    })
    
    if existing_rating:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already rated this swap"
        )
    
    # Determine who is being rated
    is_requester = current_user["_id"] == swap["requester_id"]
    reviewee_id = swap["receiver_id"] if is_requester else swap["requester_id"]
    reviewee_name = swap["receiver_name"] if is_requester else swap["requester_name"]
    
    # Create rating document
    new_rating = {
        "swap_id": rating_data.swap_id,
        "reviewer_id": current_user["_id"],
        "reviewer_name": current_user["name"],
        "reviewee_id": reviewee_id,
        "reviewee_name": reviewee_name,
        "rating": rating_data.rating,
        "comment": rating_data.comment,
        "created_at": datetime.utcnow().isoformat()
    }
    
    result = await db.ratings.insert_one(new_rating)
    rating_id = str(result.inserted_id)
    
    # Update swap status to completed if not already
    if swap["status"] != "completed":
        await db.swap_requests.update_one(
            {"_id": swap_object_id},
            {
                "$set": {
                    "status": "completed",
                    "updated_at": datetime.utcnow().isoformat()
                }
            }
        )
    
    new_rating["_id"] = rating_id
    
    return {
        "success": True,
        "message": "Rating submitted successfully!",
        "data": {"rating": new_rating}
    }


@router.get("", response_model=APIResponse)
async def get_my_ratings(current_user: Dict = Depends(get_current_user)):
    """Get all ratings received by current user"""
    db = get_database()
    
    ratings = await db.ratings.find({
        "reviewee_id": current_user["_id"]
    }).sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds
    for rating in ratings:
        rating["_id"] = str(rating["_id"])
    
    # Calculate average
    avg_rating = None
    if ratings:
        avg_rating = round(sum(r["rating"] for r in ratings) / len(ratings), 1)
    
    return {
        "success": True,
        "message": f"Found {len(ratings)} ratings",
        "data": {
            "ratings": ratings,
            "average_rating": avg_rating,
            "total_count": len(ratings)
        }
    }
