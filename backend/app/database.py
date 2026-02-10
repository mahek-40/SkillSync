"""
MongoDB Database Connection and Configuration
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING, DESCENDING
from app.core.config import settings
from typing import Optional
import logging

logger = logging.getLogger(__name__)

# MongoDB client instance
mongodb_client: Optional[AsyncIOMotorClient] = None
database: Optional[AsyncIOMotorDatabase] = None


async def connect_to_mongo():
    """
    Connect to MongoDB database
    Creates indexes for optimized queries
    """
    global mongodb_client, database
    
    try:
        # Create MongoDB client
        mongodb_client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=5000
        )
        
        # Get database
        database = mongodb_client[settings.DATABASE_NAME]
        
        # Test connection
        await mongodb_client.admin.command('ping')
        
        logger.info(f"✅ Connected to MongoDB: {settings.DATABASE_NAME}")
        
        # Create indexes for better performance
        await create_indexes()
        
    except Exception as e:
        logger.error(f"❌ Could not connect to MongoDB: {e}")
        raise


async def close_mongo_connection():
    """Close MongoDB connection"""
    global mongodb_client
    
    if mongodb_client:
        mongodb_client.close()
        logger.info("❌ Closed MongoDB connection")


async def create_indexes():
    """Create database indexes for optimized queries"""
    
    try:
        # Users collection indexes
        await database.users.create_index("email", unique=True)
        await database.users.create_index("role")
        await database.users.create_index([("is_banned", ASCENDING)])
        await database.users.create_index([("created_at", DESCENDING)])
        
        # Skills indexes (for search)
        await database.users.create_index([("skills_offered", ASCENDING)])
        await database.users.create_index([("skills_wanted", ASCENDING)])
        
        # Swap requests indexes
        await database.swap_requests.create_index([("requester_id", ASCENDING)])
        await database.swap_requests.create_index([("receiver_id", ASCENDING)])
        await database.swap_requests.create_index([("status", ASCENDING)])
        await database.swap_requests.create_index([("created_at", DESCENDING)])
        
        # Ratings indexes
        await database.ratings.create_index([("reviewee_id", ASCENDING)])
        await database.ratings.create_index([("swap_id", ASCENDING)], unique=True)
        
        # Notifications indexes
        await database.notifications.create_index([("user_id", ASCENDING)])
        await database.notifications.create_index([("is_read", ASCENDING)])
        await database.notifications.create_index([("created_at", DESCENDING)])
        
        logger.info("✅ Database indexes created")
        
    except Exception as e:
        logger.warning(f"⚠️  Index creation warning: {e}")


def get_database() -> AsyncIOMotorDatabase:
    """
    Get database instance
    
    Returns:
        MongoDB database instance
    """
    return database
