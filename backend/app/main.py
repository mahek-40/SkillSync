"""
SkillSync Backend - FastAPI Main Application with MongoDB
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.database import connect_to_mongo, close_mongo_connection
from app.api import auth, users, swaps, notifications, ratings, admin
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    description="Production-ready backend API for SkillSync - A skill exchange platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)


# ============================================================================
# CORS Middleware Configuration
# ============================================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # React frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers including Authorization
)


# ============================================================================
# Global Exception Handler
# ============================================================================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions globally"""
    logger.error(f"Unhandled exception: {exc}")
    
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
            "detail": str(exc) if settings.DEBUG else "An unexpected error occurred"
        }
    )


# ============================================================================
# Root and Health Check Endpoints
# ============================================================================

@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "success": True,
        "message": "Welcome to SkillSync API!",
        "data": {
            "name": "SkillSync Backend",
            "version": "1.0.0",
            "docs": "/docs",
            "status": "running",
            "database": "MongoDB"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "success": True,
        "message": "Server is healthy",
        "data": {
            "status": "ok",
            "environment": settings.ENVIRONMENT,
            "database": "connected"
        }
    }


# ============================================================================
# Include API Routers
# ============================================================================

# Mount all API routes with /api prefix
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(swaps.router, prefix="/api")
app.include_router(notifications.router, prefix="/api")
app.include_router(ratings.router, prefix="/api")
app.include_router(admin.router, prefix="/api")


# ============================================================================
# Startup and Shutdown Events
# ============================================================================

@app.on_event("startup")
async def startup_event():
    """
    Run on application startup
    - Connect to MongoDB
    - Create database indexes
    - Initialize admin user
    """
    logger.info("=" * 70)
    logger.info(f"🚀 {settings.APP_NAME} Starting...")
    logger.info(f"📍 Environment: {settings.ENVIRONMENT}")
    logger.info(f"🌐 CORS Origins: {settings.ALLOWED_ORIGINS}")
    logger.info(f"📝 API Docs: http://{settings.HOST}:{settings.PORT}/docs")
    logger.info(f"💾 Database: MongoDB ({settings.DATABASE_NAME})")
    logger.info("=" * 70)
    
    # Connect to MongoDB
    await connect_to_mongo()
    
    # Create default admin user if doesn't exist
    from app.database import get_database
    from app.core.security import get_password_hash
    from datetime import datetime
    
    db = get_database()
    admin_exists = await db.users.find_one({"email": "admin@skillsync.com"})
    
    if not admin_exists:
        admin_user = {
            "name": "Admin User",
            "email": "admin@skillsync.com",
            "password": get_password_hash("admin123"),  # Change in production!
            "role": "admin",
            "location": None,
            "avatar": None,
            "bio": "Platform Administrator",
            "availability": "Flexible",
            "is_public": True,
            "is_banned": False,
            "skills_offered": [],
            "skills_wanted": [],
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
        }
        await db.users.insert_one(admin_user)
        logger.info("✅ Default admin user created")
        logger.info("   Email: admin@skillsync.com")
        logger.info("   Password: admin123")
    
    logger.info("🎉 SkillSync Backend Ready!")
    logger.info("=" * 70)


@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown"""
    logger.info("=" * 70)
    logger.info("🛑 Shutting down SkillSync Backend...")
    logger.info("=" * 70)
    
    # Close MongoDB connection
    await close_mongo_connection()
