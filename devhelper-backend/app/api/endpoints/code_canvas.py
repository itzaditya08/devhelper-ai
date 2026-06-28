# app/api/endpoints/code_canvas.py
import os
import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException
from app.services.code_canvas_service import generate_code_from_image

router = APIRouter()
TEMP_DIR = "temp_uploads"
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("")
async def code_canvas_endpoint(image: UploadFile = File(...)):
    if image.content_type not in ["image/jpeg", "image/png", "image/jpg", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only standard images allowed.")

    file_extension = image.filename.split(".")[-1] if "." in image.filename else "jpg"
    temp_filename = f"canvas_{uuid.uuid4()}.{file_extension}"
    temp_path = os.path.join(TEMP_DIR, temp_filename)

    try:
        # Write bytes payload safely to disk
        content = await image.read()
        with open(temp_path, "wb") as f:
            f.write(content)

        # Call the synchronous file-processing service execution block
        result = generate_code_from_image(temp_path)

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        # Guarantee removal of localized file buffers to avoid server leaks
        if os.path.exists(temp_path):
            os.remove(temp_path)