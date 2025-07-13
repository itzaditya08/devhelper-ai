# app/api/endpoints/code_canvas.py

import os
import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.services.code_canvas_service import generate_code_from_image

router = APIRouter()

# ✅ Define the Response Schema
class CodeCanvasResponse(BaseModel):
    backend: str
    frontend: str


# ✅ Route: POST /code-canvas
@router.post("", response_model=CodeCanvasResponse)
async def code_canvas_endpoint(image: UploadFile = File(...)):
    """
    Accepts a frontend UI image and returns backend API structure + frontend boilerplate.
    """

    # Step 1: Validate image type
    if image.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="❌ Invalid file type. Only .jpg, .jpeg, and .png allowed.")

    # Step 2: Save uploaded file temporarily
    file_extension = image.filename.split(".")[-1]
    temp_filename = f"temp_{uuid.uuid4()}.{file_extension}"
    temp_path = os.path.join("temp", temp_filename)
    os.makedirs("temp", exist_ok=True)

    try:
        with open(temp_path, "wb") as f:
            content = await image.read()
            f.write(content)

        # Step 3: Call service to generate code
        result = generate_code_from_image(temp_path)

        # Step 4: Handle error in result
        if isinstance(result, dict) and "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        # Step 5: Return the result (parsed JSON if needed)
        return JSONResponse(content=result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Internal Server Error: {str(e)}")
    
    finally:
        # Step 6: Clean up temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)
