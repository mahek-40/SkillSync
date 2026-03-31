from fastapi import APIRouter, HTTPException, status
from app.schemas.user_schema import UserCreate
from app.schemas.auth_schema import LoginRequest
from app.services.auth_service import register_user, login_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    return await register_user(user)

@router.post("/login")
async def login(login_data: LoginRequest):
    return await login_user(login_data.email, login_data.password)
