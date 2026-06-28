from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.boilerplate_generator_service import generate_boilerplate_code

router = APIRouter()

class BoilerplateRequest(BaseModel):
    algorithm: str
    language: str

@router.post("")
def generate_boilerplate(payload: BoilerplateRequest):
    result = generate_boilerplate_code(
        algorithm=payload.algorithm,
        language=payload.language
    )
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result