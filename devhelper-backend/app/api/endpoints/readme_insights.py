# app/api/endpoints/readme_insights.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.readme_insights_service import generate_readme_insights

router = APIRouter()

class ReadmeInsightsRequest(BaseModel):
    readme_path: Optional[str]
    extra_file_path: Optional[str]

class ReadmeInsightsResponse(BaseModel):
    explanation: str

@router.post("", response_model=ReadmeInsightsResponse)
def readme_insights_endpoint(payload: ReadmeInsightsRequest):
    try:
        response = generate_readme_insights(
            readme_path=payload.readme_path,
            extra_file_path=payload.extra_file_path
        )
        return ReadmeInsightsResponse(explanation=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Failed to analyze README: {e}")
