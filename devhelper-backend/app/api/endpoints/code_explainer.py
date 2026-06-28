from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import shutil
import os
import uuid
import zipfile
import tempfile
from app.services.code_explainer_service import explain_codebase

router = APIRouter()

# 🔥 THE FIX: Route the uploads to the OS-level temp folder, completely invisible to Uvicorn
TEMP_DIR = os.path.join(tempfile.gettempdir(), "devhelper_uploads")
os.makedirs(TEMP_DIR, exist_ok=True)

@router.post("/code-explainer")
async def code_explainer(
    zip_file: UploadFile = File(...),
    query: str = Form(...)
):
    session_id = str(uuid.uuid4())
    temp_zip_path = os.path.join(TEMP_DIR, f"{session_id}.zip")
    extract_path = os.path.join(TEMP_DIR, session_id)

    try:
        with open(temp_zip_path, "wb") as buffer:
            shutil.copyfileobj(zip_file.file, buffer)

        with zipfile.ZipFile(temp_zip_path, "r") as zip_ref:
            zip_ref.extractall(extract_path)

        explanation_data = explain_codebase(extract_path, query, session_id)

        if "error" in explanation_data:
             raise HTTPException(status_code=400, detail=explanation_data["error"])

        return {
            "session_id": session_id,
            "structured_explanation": explanation_data 
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_zip_path):
            os.remove(temp_zip_path)
        if os.path.exists(extract_path):
            shutil.rmtree(extract_path)