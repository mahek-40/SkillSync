"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime


# ============================================================================
# AUTHENTICATION SCHEMAS
# ============================================================================

class UserRegister(BaseModel):
    """User registration request"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    location: Optional[str] = None


class UserLogin(BaseModel):
    """User login request"""
    email: EmailStr
    password: str


class Token(BaseModel):
    """JWT token response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    """Refresh token request"""
    refresh_token: str


# ============================================================================
# USER SCHEMAS
# ============================================================================

class UserUpdate(BaseModel):
    """User profile update"""
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    location: Optional[str] = None
    bio: Optional[str] = Field(None, max_length=500)
    availability: Optional[str] = None
    is_public: Optional[bool] = None
    skills_offered: Optional[List[str]] = None
    skills_wanted: Optional[List[str] = None


class UserResponse(BaseModel):
    """User response (public info)"""
    id: str
    name: str
    email: Optional[str] = None
    location: Optional[str] = None
    avatar: Optional[str] = None
    bio: Optional[str] = None
    availability: Optional[str] = None
    role: str
    is_public: bool
    skills_offered: List[str] = []
    skills_wanted: List[str] = []
    rating: Optional[float] = None
    review_count: int = 0
    created_at: str


# ============================================================================
# SKILL SCHEMAS
# ============================================================================

class SkillAdd(BaseModel):
    """Add skill request"""
    skill_type: str = Field(..., pattern="^(offered|wanted)$")
    skill_name: str = Field(..., min_length=2, max_length=50)


class SkillRemove(BaseModel):
    """Remove skill request"""
    skill_type: str = Field(..., pattern="^(offered|wanted)$")
    skill_name: str


# ============================================================================
# SWAP REQUEST SCHEMAS
# ============================================================================

class SwapRequestCreate(BaseModel):
    """Create swap request"""
    receiver_id: str
    skill_offered: str
    skill_wanted: str
    message: Optional[str] = Field(None, max_length=500)


class SwapRequestResponse(BaseModel):
    """Swap request response"""
    id: str
    requester_id: str
    receiver_id: str
    requester_name: str
    receiver_name: str
    skill_offered: str
    skill_wanted: str
    message: Optional[str] = None
    status: str
    created_at: str
    updated_at: str


# ============================================================================
# RATING SCHEMAS
# ============================================================================

class RatingCreate(BaseModel):
    """Create rating"""
    swap_id: str
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = Field(None, max_length=500)


class RatingResponse(BaseModel):
    """Rating response"""
    id: str
    reviewer_id: str
    reviewer_name: str
    reviewee_id: str
    swap_id: str
    rating: int
    comment: Optional[str] = None
    created_at: str


# ============================================================================
# NOTIFICATION SCHEMAS
# ============================================================================

class NotificationResponse(BaseModel):
    """Notification response"""
    id: str
    user_id: str
    type: str
    title: str
    message: str
    is_read: bool
    created_at: str


# ============================================================================
# ADMIN SCHEMAS
# ============================================================================

class UserBanUpdate(BaseModel):
    """Ban/unban user"""
    is_banned: bool
    reason: Optional[str] = None


class AnnouncementCreate(BaseModel):
    """Create announcement"""
    title: str = Field(..., min_length=5, max_length=100)
    message: str = Field(..., min_length=10, max_length=500)


# ============================================================================
# API RESPONSE WRAPPER
# ============================================================================

class APIResponse(BaseModel):
    """Standard API response format for frontend integration"""
    success: bool
    message: str
    data: Optional[dict] = None
  
