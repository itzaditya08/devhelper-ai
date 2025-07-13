# app/services/code_canvas_service.py

import os
from PIL import Image
from typing import Dict, Union

from langchain_core.messages import HumanMessage, SystemMessage

from app.llm.gemini_llm import get_gemini_vision_model


def generate_code_from_image(image_path: str) -> Union[Dict[str, str], str]:
    """
    Accepts the path to a UI image and returns:
    {
        "backend": "<API structure>",
        "frontend": "<HTML/CSS/JS or React boilerplate>"
    }
    """
    try:
        # ✅ Step 1: Load Image from disk
        image = Image.open(image_path)

        # ✅ Step 2: Load Gemini 1.5 Flash (Vision Model)
        model = get_gemini_vision_model()

        # ✅ Step 3: Prepare prompt (system + human)
        system_prompt = SystemMessage(
            content=(
                "You are a full-stack developer assistant. A user has uploaded a UI image "
                "of a website or app. Analyze the UI structure and generate structured output."
            )
        )

        human_prompt = HumanMessage(
            content=[
                {
                    "type": "text",
                    "text": (
                        "Given this UI image, do the following:\n"
                        "1. Generate a REST-style API structure for the backend (Flask/FastAPI style pseudocode).\n"
                        "2. Generate frontend boilerplate code (HTML/CSS/JS or React preferred).\n"
                        "3. Output must be a JSON with two keys: 'backend' and 'frontend'.\n"
                        "4. Be clean, concise, and only return valid JSON.\n"
                        "5. Avoid explanations—output only the result."
                    )
                },
                {
                    "type": "image_url",
                    "image_url": image
                }
            ]
        )

        # ✅ Step 4: Invoke model with prompt
        response = model.invoke([system_prompt, human_prompt])

        return response.content  # Should be a well-structured JSON string (or dict)
    
    except Exception as e:
        return {"error": f"❌ Failed to generate code: {str(e)}"}
