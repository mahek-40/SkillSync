from pydantic_settings import BaseSettings
import os
from pathlib import Path

# Get the backend directory path
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = BACKEND_DIR / ".env"

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    SECRET_KEY: str = "your_super_secret_key_change_this_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    class Config:
        env_file = str(ENV_FILE)
        env_file_encoding = 'utf-8'

settings = Settings()
