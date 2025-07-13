# app/core/config.py

import os
from dotenv import load_dotenv

def load_environment_variables(env_path: str = ".env") -> None:
    """
    Loads environment variables from .env file and validates required keys.
    """
    loaded = load_dotenv(dotenv_path=env_path)

    if loaded:
        print("✅ Environment variables loaded from .env file.")
    else:
        print("⚠️  .env file not found or failed to load. Proceeding with system environment variables.")

    # Validate required env vars
    required_vars = ["GEMINI_API_KEY"]
    missing = [key for key in required_vars if not os.getenv(key)]

    if missing:
        raise EnvironmentError(f"❌ Missing required environment variables: {missing}")
    else:
        print("✅ All required environment variables are present.")
