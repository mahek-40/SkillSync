"""
Authentication API routes - Login, Register, Token Refresh
"""
from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
from bson import ObjectId
from app.schemas import UserRegister, UserLogin, TokenRefresh, APIResponse
from app.core.security import (
    verify_password, get_password_hash,
    create_access_token, create_refresh_token, decode_token
)
from app.database import get_database
from app.dependencies import get_current_user
from typing import Dict


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=APIResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    """
    Register a new user
    
    - **name**: Full name (2-100 characters)
    - **email**: Valid email address (must be unique)
    - **password**: Password (minimum 6 characters)
    - **location**: Optional location
    
    Returns access token and refresh token
    """
    db = get_database()
    
    # Check if email already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create new user document
    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "password": hashed_password,
        "role": "user",
        "location": user_data.location,
        "avatar": None,
        "bio": None,
        "availability": "Flexible",
        "is_public": True,
        "is_banned": False,
        "skills_offered": [],
        "skills_wanted": [],
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }
    
    # Insert into database
    result = await db.users.insert_one(new_user)
    user_id = str(result.inserted_id)
    
    # Generate tokens
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})
    
    # Prepare user response (exclude password)
    new_user["_id"] = user_id
    new_user.pop("password")
    
    return {
        "success": True,
        "message": "Account created successfully!",
        "data": {
            "user": new_user,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    }


@router.post("/login", response_model=APIResponse)
async def login(credentials: UserLogin):
    """
    Login with email and password
    
    - **email**: User email
    - **password**: User password
    
    Returns access token and refresh token
    """
    db = get_database()
    
    # Find user by email
    user = await db.users.find_one({"email": credentials.email})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if user is banned
    if user.get("is_banned", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been banned"
        )
    
    # Generate tokens
    user_id = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})
    
    # Prepare user response (exclude password)
    user["_id"] = user_id
    user.pop("password")
    
    return {
        "success": True,
        "message": "Login successful!",
        "data": {
            "user": user,
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    }


@router.post("/refresh", response_model=APIResponse)
async def refresh_token(token_data: TokenRefresh):
    """
    Refresh access token using refresh token
    
    - **refresh_token**: Valid refresh token
    
    Returns new access token
    """
    # Decode refresh token
    payload = decode_token(token_data.refresh_token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    # Verify token type
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
        )
    
    # Get user ID
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    # Verify user exists
    db = get_database()
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
    
    # Generate new access token
    new_access_token = create_access_token(data={"sub": user_id})
    
    return {
        "success": True,
        "message": "Token refreshed successfully",
        "data": {
            "access_token": new_access_token,
            "token_type": "bearer"
        }
    }


@router.get("/me", response_model=APIResponse)
async def get_current_user_info(current_user: Dict = Depends(get_current_user)):
    """
    Get current authenticated user information
    
    Requires: Valid access token in Authorization header
    """
    # Remove password from response
    user_response = {k: v for k, v in current_user.items() if k != "password"}
    
    return {
        "success": True,
        "message": "User info retrieved",
        "data": {"user": user_response}
    }


@router.post("/logout", response_model=APIResponse)
async def logout(current_user: Dict = Depends(get_current_user)):
    """
    Logout current user
    
    Note: With JWT, logout is handled client-side by removing tokens.
    This endpoint is provided for consistency with frontend expectations.
    """
    return {
        "success": True,
        "message": "Logged out successfully",
        "data": None
    }
