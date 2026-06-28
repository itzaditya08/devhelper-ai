from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.code_refactorer_service import refactor_code

router = APIRouter()

class RefactorCodeRequest(BaseModel):
    code: str

@router.post("")
def refactor_code_endpoint(payload: RefactorCodeRequest):
    result = refactor_code(payload.code)
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result