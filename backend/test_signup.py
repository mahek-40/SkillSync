import asyncio
import sys
from pathlib import Path

# Add the backend directory to the path
backend_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(backend_dir))

from app.db.database import db
from app.core.security import get_password_hash

async def test_connection():
    """Test MongoDB connection"""
    try:
        # Test connection
        await db.command('ping')
        print("✓ MongoDB connection successful")
        
        # Test user creation
        test_user = {
            "name": "Test User",
            "email": "test@example.com",
            "password": get_password_hash("password123"),
            "avatar": None,
            "location": "Test City",
            "bio": "Test bio",
            "availability": ["Weekdays"],
            "skills_offered": ["Python"],
            "skills_wanted": ["JavaScript"],
            "experience_level": "intermediate",
            "role": "user"
        }
        
        # Delete test user if exists
        await db.users.delete_one({"email": "test@example.com"})
        
        # Insert test user
        result = await db.users.insert_one(test_user)
        print(f"✓ Test user created with ID: {result.inserted_id}")
        
        # Retrieve test user
        user = await db.users.find_one({"email": "test@example.com"})
        if user:
            print(f"✓ Test user retrieved: {user['name']}")
        
        # Clean up
        await db.users.delete_one({"email": "test@example.com"})
        print("✓ Test user deleted")
        
        print("\n✅ All tests passed! Backend is ready.")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_connection())
