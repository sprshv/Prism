from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from database import connect_to_mongo, close_mongo_connection
from routes import router as auth_router, event_router, user_router, service_hours_router
from email_routes import email_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    connect_to_mongo()
    yield
    # Shutdown
    close_mongo_connection()

app = FastAPI(
    title="PRISM API",
    description="Backend API for PRISM - Promoting Research, Innovation, Science & Math",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
import os
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://prism-frontend-srf1.onrender.com",
    "https://prism.publicvm.com",
    "https://www.prism.publicvm.com",
]

# Add production frontend URL from environment variable
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url and frontend_url not in allowed_origins:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(event_router)
app.include_router(user_router)
app.include_router(service_hours_router)
app.include_router(email_router)

@app.get("/")
async def root():
    return {"message": "PRISM API is running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


