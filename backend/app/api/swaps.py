"""
Swap request API routes - Core feature for skill exchange
"""
from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime
from app.schemas import APIResponse, SwapRequestCreate
from app.database import get_database
from app.dependencies import get_current_user
from typing import Dict


router = APIRouter(prefix="/swaps", tags=["Swap Requests"])


@router.post("/request", response_model=APIResponse, status_code=status.HTTP_201_CREATED)
async def create_swap_request(
    swap_data: SwapRequestCreate,
    current_user: Dict = Depends(get_current_user)
):
    """
    Create a new swap request
    
    - **receiver_id**: ID of user to swap with
    - **skill_offered**: Skill you're offering to teach
    - **skill_wanted**: Skill you want to learn
    - **message**: Optional message to receiver
    """
    db = get_database()
    
    # Validate receiver exists
    try:
        receiver_id = ObjectId(swap_data.receiver_id)
        receiver = await db.users.find_one({"_id": receiver_id})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid receiver ID format"
        )
    
    if not receiver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receiver user not found"
        )
    
    # Cannot swap with yourself
    if swap_data.receiver_id == current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create swap request with yourself"
        )
    
    # Check for existing pending request
    existing_swap = await db.swap_requests.find_one({
        "requester_id": current_user["_id"],
        "receiver_id": swap_data.receiver_id,
        "status": "pending"
    })
    
    if existing_swap:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have a pending request with this user"
        )
    
    # Create swap request document
    new_swap = {
        "requester_id": current_user["_id"],
        "receiver_id": swap_data.receiver_id,
        "requester_name": current_user["name"],
        "receiver_name": receiver["name"],
        "skill_offered": swap_data.skill_offered,
        "skill_wanted": swap_data.skill_wanted,
        "message": swap_data.message,
        "status": "pending",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }
    
    result = await db.swap_requests.insert_one(new_swap)
    swap_id = str(result.inserted_id)
    
    # Create notification for receiver
    notification = {
        "user_id": swap_data.receiver_id,
        "type": "swap_request",
        "title": "New Swap Request",
        "message": f"{current_user['name']} sent you a swap request",
        "is_read": False,
        "swap_id": swap_id,
        "created_at": datetime.utcnow().isoformat()
    }
    await db.notifications.insert_one(notification)
    
    # Prepare response
    new_swap["_id"] = swap_id
    
    return {
        "success": True,
        "message": "Swap request sent successfully!",
        "data": {"swap": new_swap}
    }


@router.get("/sent", response_model=APIResponse)
async def get_sent_requests(current_user: Dict = Depends(get_current_user)):
    """Get all swap requests sent by current user"""
    db = get_database()
    
    sent_swaps = await db.swap_requests.find({
        "requester_id": current_user["_id"]
    }).sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds to strings
    for swap in sent_swaps:
        swap["_id"] = str(swap["_id"])
    
    return {
        "success": True,
        "message": f"Found {len(sent_swaps)} sent requests",
        "data": {"swaps": sent_swaps}
    }


@router.get("/received", response_model=APIResponse)
async def get_received_requests(current_user: Dict = Depends(get_current_user)):
    """Get all swap requests received by current user"""
    db = get_database()
    
    received_swaps = await db.swap_requests.find({
        "receiver_id": current_user["_id"]
    }).sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds to strings
    for swap in received_swaps:
        swap["_id"] = str(swap["_id"])
    
    return {
        "success": True,
        "message": f"Found {len(received_swaps)} received requests",
        "data": {"swaps": received_swaps}
    }


@router.put("/{swap_id}/accept", response_model=APIResponse)
async def accept_swap_request(
    swap_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """Accept a swap request (receiver only)"""
    db = get_database()
    
    # Find swap request
    try:
        swap_object_id = ObjectId(swap_id)
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
    
    # Only receiver can accept
    if swap["receiver_id"] != current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the receiver can accept this request"
        )
    
    # Must be pending
    if swap["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot accept swap with status: {swap['status']}"
        )
    
    # Update status
    await db.swap_requests.update_one(
        {"_id": swap_object_id},
        {
            "$set": {
                "status": "accepted",
                "updated_at": datetime.utcnow().isoformat()
            }
        }
    )
    
    # Create notification for requester
    notification = {
        "user_id": swap["requester_id"],
        "type": "swap_accepted",
        "title": "Swap Request Accepted",
        "message": f"{current_user['name']} accepted your swap request",
        "is_read": False,
        "swap_id": swap_id,
        "created_at": datetime.utcnow().isoformat()
    }
    await db.notifications.insert_one(notification)
    
    # Get updated swap
    updated_swap = await db.swap_requests.find_one({"_id": swap_object_id})
    updated_swap["_id"] = str(updated_swap["_id"])
    
    return {
        "success": True,
        "message": "Swap request accepted!",
        "data": {"swap": updated_swap}
    }


@router.put("/{swap_id}/reject", response_model=APIResponse)
async def reject_swap_request(
    swap_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """Reject a swap request (receiver only)"""
    db = get_database()
    
    # Find swap request
    try:
        swap_object_id = ObjectId(swap_id)
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
    
    # Only receiver can reject
    if swap["receiver_id"] != current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the receiver can reject this request"
        )
    
    # Must be pending
    if swap["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Cannot reject swap with status: {swap['status']}"
        )
    
    # Update status
    await db.swap_requests.update_one(
        {"_id": swap_object_id},
        {
            "$set": {
                "status": "rejected",
                "updated_at": datetime.utcnow().isoformat()
            }
        }
    )
    
    # Get updated swap
    updated_swap = await db.swap_requests.find_one({"_id": swap_object_id})
    updated_swap["_id"] = str(updated_swap["_id"])
    
    return {
        "success": True,
        "message": "Swap request rejected",
        "data": {"swap": updated_swap}
    }


@router.delete("/{swap_id}", response_model=APIResponse)
async def cancel_swap_request(
    swap_id: str,
    current_user: Dict = Depends(get_current_user)
):
    """Cancel/delete a swap request (requester only, must be pending)"""
    db = get_database()
    
    # Find swap request
    try:
        swap_object_id = ObjectId(swap_id)
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
    
    # Only requester can cancel
    if swap["requester_id"] != current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the requester can cancel this request"
        )
    
    # Can only cancel if pending
    if swap["status"] != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can only cancel pending requests"
        )
    
    # Delete the swap request
    await db.swap_requests.delete_one({"_id": swap_object_id})
    
    return {
        "success": True,
        "message": "Swap request cancelled",
        "data": None
    }


@router.get("", response_model=APIResponse)
async def get_all_my_swaps(current_user: Dict = Depends(get_current_user)):
    """
    Get all swap requests categorized by type
    
    Returns: sent, received, active, completed swaps
    """
    db = get_database()
    
    # Get all swaps involving current user
    all_swaps = await db.swap_requests.find({
        "$or": [
            {"requester_id": current_user["_id"]},
            {"receiver_id": current_user["_id"]}
        ]
    }).sort("created_at", -1).to_list(None)
    
    # Convert ObjectIds
    for swap in all_swaps:
        swap["_id"] = str(swap["_id"])
    
    # Categorize swaps
    result = {
        "sent": [s for s in all_swaps if s["requester_id"] == current_user["_id"]],
        "received": [s for s in all_swaps if s["receiver_id"] == current_user["_id"]],
        "active": [s for s in all_swaps if s["status"] == "accepted"],
        "completed": [s for s in all_swaps if s["status"] == "completed"],
    }
    
    return {
        "success": True,
        "message": "Swaps retrieved",
        "data": result
    }
  
