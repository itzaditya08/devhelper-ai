# app/api/endpoints/boilerplate_generator.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.boilerplate_generator_service import generate_boilerplate_code

router = APIRouter()

# ✅ Request body schema
class BoilerplateRequest(BaseModel):
    algorithm: str
    language: str


# ✅ Response schema (Optional but best practice)
class BoilerplateResponse(BaseModel):
    code: str


# ✅ POST route for generating boilerplate
@router.post("", response_model=BoilerplateResponse)
def generate_boilerplate(payload: BoilerplateRequest):
    try:
        result = generate_boilerplate_code(
            algorithm=payload.algorithm,
            language=payload.language
        )
        return BoilerplateResponse(code=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Failed to generate boilerplate: {e}")
