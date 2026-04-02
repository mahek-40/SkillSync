from datetime import datetime
from bson import ObjectId
from app.db.database import db
from app.core.security import get_password_hash, verify_password
from app.schemas.user_schema import UserCreate
from fastapi import HTTPException, status
import logging

logger = logging.getLogger(__name__)

def serialize_user(user):
    """Convert MongoDB user document to API response format"""
    return {
        "id": str(user["_id"]),
        "name": user.get("name", ""),
        "email": user["email"],
        "avatar": user.get("avatar"),
        "location": user.get("location", ""),
        "bio": user.get("bio", ""),
        "availability": user.get("availability", []),
        "skillsOffered": user.get("skills_offered", []),
        "skillsWanted": user.get("skills_wanted", []),
        "role": user.get("role", "user"),
        "experienceLevel": user.get("experience_level", "intermediate")
    }

async def register_user(user_data: UserCreate):
    try:
        # Check if email already exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )
        
        # Hash password
        hashed_password = get_password_hash(user_data.password)
        
        # Create user document
        user_dict = {
            "name": user_data.name,
            "email": user_data.email.lower(),  # Store email in lowercase
            "password": hashed_password,
            "avatar": None,
            "location": user_data.location or "",
            "bio": user_data.bio or "",
            "availability": user_data.availability or [],
            "skills_offered": user_data.skillsOffered or [],
            "skills_wanted": user_data.skillsWanted or [],
            "experience_level": "intermediate",
            "role": "user",
            "created_at": datetime.utcnow()
        }
        
        # Insert user
        result = await db.users.insert_one(user_dict)
        user_dict["_id"] = result.inserted_id
        
        logger.info(f"User registered successfully: {user_data.email}")
        return serialize_user(user_dict)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error registering user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register user: {str(e)}"
        )

async def authenticate_user(email: str, password: str):
    user = await db.users.find_one({"email": email})
    if not user:
        return None
    if not verify_password(password, user["password"]):
        return None
    return user

async def login_user(email: str, password: str):
    user = await authenticate_user(email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return serialize_user(user)

async def update_user_profile(user_id: str, updates: dict):
    update_dict = {}
    
    if "name" in updates:
        update_dict["name"] = updates["name"]
    if "location" in updates:
        update_dict["location"] = updates["location"]
    if "bio" in updates:
        update_dict["bio"] = updates["bio"]
    if "availability" in updates:
        update_dict["availability"] = updates["availability"]
    if "skillsOffered" in updates:
        update_dict["skills_offered"] = updates["skillsOffered"]
    if "skillsWanted" in updates:
        update_dict["skills_wanted"] = updates["skillsWanted"]
    
    result = await db.users.find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": update_dict},
        return_document=True
    )
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return serialize_user(result)
