# app/api/endpoints/code_explainer.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.code_explainer_service import explain_codebase

router = APIRouter()

# ✅ Request Body Schema
class ExplainCodeRequest(BaseModel):
    folder_path: str  # Path to extracted codebase folder
    query: str        # User's natural language query
    session_id: str   # Unique session ID for tracking chat history

# ✅ Response Schema
class ExplainCodeResponse(BaseModel):
    response: str

# ✅ Route: POST /code-explainer
@router.post("", response_model=ExplainCodeResponse)  # ✅ No extra path
def explain_code_endpoint(payload: ExplainCodeRequest):
    try:
        response = explain_codebase(
            folder_path=payload.folder_path,
            user_query=payload.query,
            session_id=payload.session_id
        )
        return ExplainCodeResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Failed to explain codebase: {e}")