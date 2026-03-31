from pydantic import BaseModel, EmailStr
from typing import Optional, List

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    location: Optional[str] = ""
    bio: Optional[str] = ""
    availability: Optional[List[str]] = []
    skillsOffered: Optional[List[str]] = []
    skillsWanted: Optional[List[str]] = []

class UserUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    availability: Optional[List[str]] = None
    skillsOffered: Optional[List[str]] = None
    skillsWanted: Optional[List[str]] = None
