# app/api/endpoints/directory_analyser.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.directory_analyser_service import analyse_directory

router = APIRouter()

# ✅ Request schema
class DirectoryAnalyserRequest(BaseModel):
    structure: str  # User-pasted folder structure

# ✅ Response schema
class DirectoryAnalyserResponse(BaseModel):
    explanation: str  # Summary + use case + file roles + interconnectedness

# ✅ Route: POST /directory-analyser
@router.post("", response_model=DirectoryAnalyserResponse)
def directory_analyser_endpoint(payload: DirectoryAnalyserRequest):
    try:
        # Call the service function to process directory structure
        result = analyse_directory(payload.structure)
        return DirectoryAnalyserResponse(explanation=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Failed to analyze directory: {e}")
