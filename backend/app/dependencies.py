"""
FastAPI dependencies for authentication and authorization
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from app.core.security import decode_token
from app.database import get_database
from typing import Dict


# HTTP Bearer token scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict:
    """
    Get current authenticated user from JWT token
    
    Args:
        credentials: HTTP Authorization header with Bearer token
        
    Returns:
        User dictionary from database
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    token = credentials.credentials
    
    # Decode JWT token
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    # Verify token type
    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
        )
    
    # Extract user ID from token
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    # Get database
    db = get_database()
    
    # Find user in database
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID"
        )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if user is banned
    if user.get("is_banned", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is banned"
        )
    
    # Convert ObjectId to string for JSON serialization
    user["_id"] = str(user["_id"])
    
    return user


async def get_current_active_user(
    current_user: Dict = Depends(get_current_user)
) -> Dict:
    """
    Get current active (non-banned) user
    
    Args:
        current_user: Current user from get_current_user dependency
        
    Returns:
        Active user dictionary
        
    Raises:
        HTTPException: If user is banned
    """
    if current_user.get("is_banned", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is banned"
        )
    
    return current_user


async def get_current_admin(
    current_user: Dict = Depends(get_current_user)
) -> Dict:
    """
    Get current admin user (role check)
    
    Args:
        current_user: Current user from get_current_user dependency
        
    Returns:
        Admin user dictionary
        
    Raises:
        HTTPException: If user is not an admin
    """
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    return current_user
