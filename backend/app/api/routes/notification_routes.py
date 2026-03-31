from fastapi import APIRouter, HTTPException, status
from bson import ObjectId
from datetime import datetime
from app.db.database import db

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

def serialize_notification(notification):
    """Convert MongoDB notification document to API response format"""
    return {
        "id": str(notification["_id"]),
        "userId": notification["user_id"],
        "type": notification["type"],
        "message": notification["message"],
        "swapId": notification.get("swap_id"),
        "read": notification["read"],
        "createdAt": notification["created_at"].isoformat()
    }

@router.get("/user/{user_id}")
async def get_notifications_by_user(user_id: str):
    """Get all notifications for a specific user"""
    notifications = await db.notifications.find(
        {"user_id": user_id}
    ).sort("created_at", -1).to_list(length=None)
    
    return [serialize_notification(notif) for notif in notifications]

@router.put("/{notification_id}/read")
async def mark_notification_as_read(notification_id: str):
    """Mark a notification as read"""
    try:
        result = await db.notifications.find_one_and_update(
            {"_id": ObjectId(notification_id)},
            {"$set": {"read": True}},
            return_document=True
        )
        
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found"
            )
        
        return serialize_notification(result)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
