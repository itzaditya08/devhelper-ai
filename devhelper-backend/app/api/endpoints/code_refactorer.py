# app/api/endpoints/code_refactorer.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.code_refactorer_service import refactor_code

router = APIRouter()


# ✅ Request schema
class RefactorCodeRequest(BaseModel):
    code: str


# ✅ Response schema
class RefactorCodeResponse(BaseModel):
    refactored_code: str


# ✅ POST endpoint: /refactor
@router.post("", response_model=RefactorCodeResponse)
def refactor_code_endpoint(payload: RefactorCodeRequest):
    try:
        refactored_code = refactor_code(payload.code)
        return RefactorCodeResponse(refactored_code=refactored_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Error during refactoring: {e}")
