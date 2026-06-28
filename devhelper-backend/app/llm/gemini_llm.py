

import os
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.language_models.chat_models import BaseChatModel

def get_gemini_chat_model(model_name: str = "models/gemini-2.5-flash") -> BaseChatModel:
    """Returns a LangChain-compatible Gemini chat model."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("❌ GEMINI_API_KEY not found in environment variables.")

    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        max_output_tokens=2048,
        temperature=0.2 
    )

def get_gemini_embedding_model():
    """Returns the updated Gemini embedding model, bypassing the deprecated 004 model."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("❌ GEMINI_API_KEY not found in environment variables.")

    # Use the active, supported embedding model
    return GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-001",
        google_api_key=api_key
    )

def get_gemini_vision_model(model_name: str = "models/gemini-2.5-flash") -> BaseChatModel:
    """Returns a Gemini model that can accept multimodal input."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("❌ GEMINI_API_KEY not found in environment variables.")

    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        max_output_tokens=2048, 
        convert_system_message_to_human=True
    )