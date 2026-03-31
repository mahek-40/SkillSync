from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from app.core.config import settings
from app.core.security import get_password_hash

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client.skillsync_db

async def get_database():
    return db

async def create_indexes():
    await db.users.create_index("email", unique=True)
    await db.swaps.create_index([("requester_id", 1), ("receiver_id", 1)])
    await db.notifications.create_index("user_id")

async def seed_initial_data():
    """Seed admin user if none exists"""
    admin = await db.users.find_one({"role": "admin"})
    if not admin:
        await db.users.insert_one({
            "name": "Admin User",
            "email": "admin@skillsync.com",
            "password": get_password_hash("admin123"),
            "avatar": None,
            "location": "Remote",
            "bio": "Platform administrator",
            "availability": [],
            "skills_offered": [],
            "skills_wanted": [],
            "experience_level": "intermediate",
            "role": "admin",
            "created_at": datetime.utcnow()
        })
        print("✓ Admin user seeded")
