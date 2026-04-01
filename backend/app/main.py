from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth_routes, user_routes, swap_routes, notification_routes
from app.db.database import create_indexes, seed_initial_data

app = FastAPI(title="SkillSync API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await create_indexes()
    await seed_initial_data()

app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(swap_routes.router)
app.include_router(notification_routes.router)

@app.get("/")
async def root():
    return {"message": "SkillSync API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
    from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
