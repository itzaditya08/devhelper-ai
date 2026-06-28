
import os
import base64
from app.llm.gemini_llm import get_gemini_vision_model
from app.schemas.code_responses import CodeCanvasResponseSchema

def generate_code_from_image(image_path: str) -> dict:
    try:
        if not os.path.exists(image_path):
            return {"error": f"Image file not found at path: {image_path}"}

        with open(image_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode("utf-8")

        # Fetch your exact vision model instance
        raw_model = get_gemini_vision_model()
        
        # Structure the model definition with structured constraints binded safely
        structured_llm = raw_model.with_structured_output(CodeCanvasResponseSchema)

        # Base prompt structure explicitly formatted for Gemini 2.5 Multi-modal vision processing
        prompt = (
            "Analyze this user interface mockup snapshot. "
            "Extract and separate the UI design into structured frontend React canvas code structures "
            "and backend REST route definitions."
        )

        # Correct schema layout processing payload array
        response = structured_llm.invoke([
            prompt,
            {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{encoded_string}"}
            }
        ])
        
        return response.model_dump()

    except Exception as e:
        print(f"❌ Critical error in code_canvas_service: {str(e)}")
        return {"error": f"Failed to execute vision mapping analysis: {str(e)}"}
    