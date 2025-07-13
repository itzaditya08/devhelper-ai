# app/llm/gemini_llm.py

import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.language_models.chat_models import BaseChatModel

def get_gemini_chat_model(model_name: str = "models/gemini-1.5-flash") -> BaseChatModel:
    """
    Returns a LangChain-compatible Gemini chat model.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("❌ GEMINI_API_KEY not found in environment variables.")

    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        # convert_system_message_to_human=True,
        max_output_tokens=50
    )



## Newly Added for only the last feature
# ✅ Image-supported Gemini Vision Model (also uses flash)
def get_gemini_vision_model(model_name: str = "models/gemini-1.5-flash") -> BaseChatModel:
    """
    Returns a Gemini model that can accept multimodal (image + text) input.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("❌ GEMINI_API_KEY not found in environment variables.")

    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        max_output_tokens=2048,  # Increased for longer answers
        convert_system_message_to_human=True
    )