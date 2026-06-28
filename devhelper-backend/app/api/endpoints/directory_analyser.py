from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.directory_analyser_service import analyse_directory

router = APIRouter()

class DirectoryAnalyserRequest(BaseModel):
    structure: str 

@router.post("")
def directory_analyser_endpoint(payload: DirectoryAnalyserRequest):
    result = analyse_directory(payload.structure)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result