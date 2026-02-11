"""
SkillSync Backend - Server Entry Point
Run this file to start the backend server with MongoDB
"""
import uvicorn
from app.core.config import settings


if __name__ == "__main__":
    print("\n" + "=" * 70)
    print("🚀 Starting SkillSync Backend Server")
    print("=" * 70)
    print(f"📍 Environment: {settings.ENVIRONMENT}")
    print(f"🌐 Server: http://{settings.HOST}:{settings.PORT}")
    print(f"📝 API Docs: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"💾 Database: MongoDB")
    print("=" * 70)
    print("\n💡 Press CTRL+C to stop the server\n")
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,  # Auto-reload on code changes in development
        log_level="info"
    )
