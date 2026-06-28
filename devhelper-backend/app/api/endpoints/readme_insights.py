import os
import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import Optional
from app.services.readme_insights_service import generate_readme_insights

router = APIRouter()
TEMP_DIR = "temp_uploads"
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("")
async def readme_insights_endpoint(
    readme_file: Optional[UploadFile] = File(None),
    extra_file: Optional[UploadFile] = File(None)
):
    session_id = str(uuid.uuid4())
    readme_path = None
    extra_path = None

    try:
        if readme_file:
            readme_path = os.path.join(TEMP_DIR, f"readme_{session_id}_{readme_file.filename}")
            with open(readme_path, "wb") as f:
                content = await readme_file.read()
                f.write(content)
                
        if extra_file:
            extra_path = os.path.join(TEMP_DIR, f"extra_{session_id}_{extra_file.filename}")
            with open(extra_path, "wb") as f:
                content = await extra_file.read()
                f.write(content)

        result = generate_readme_insights(readme_path, extra_path)

        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])

        return result

    finally:
        # Cleanup temp files
        if readme_path and os.path.exists(readme_path):
            os.remove(readme_path)
        if extra_path and os.path.exists(extra_path):
            os.remove(extra_path)