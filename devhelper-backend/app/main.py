# app/main.py
import os
from dotenv import load_dotenv

# Load environment variables immediately before any other local imports
load_dotenv() 

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints.all_routes import router as all_routes


app = FastAPI(
    title="🧠 DevHelperAI API",
    description="An API to power GenAI features like code explanation, refactoring, and more.",
    version="1.0.0"
)

# ✅ CORS Configuration (required for frontend-backend communication)
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://devhelper-ai.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Health Check Route
@app.get("/")
def root():
    return {"message": "✅ Hello from DevHelperAI"}

# ✅ Mount all feature routes
app.include_router(all_routes)
