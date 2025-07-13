# app/api/endpoints/all_routes.py

from fastapi import APIRouter

# Import routers from each feature file
from app.api.endpoints.code_explainer import router as code_explainer_router
from app.api.endpoints.readme_insights import router as readme_insights_router
from app.api.endpoints.code_refactorer import router as code_refactorer_router
from app.api.endpoints.directory_analyser import router as directory_analyser_router
from app.api.endpoints.boilerplate_generator import router as boilerplate_generator_router
from app.api.endpoints.code_canvas import router as code_canvas_router


# Create the main router
router = APIRouter()

# Include each feature-specific router
router.include_router(code_explainer_router, prefix="/code-explainer", tags=["Code Explainer"])
router.include_router(readme_insights_router, prefix="/readme-insights", tags=["ReadMe Insights"])
router.include_router(code_refactorer_router, prefix="/code-refactorer", tags=["Code Refactorer"])
router.include_router(directory_analyser_router, prefix="/directory-analyser", tags=["Directory Analyser"])
router.include_router(boilerplate_generator_router, prefix="/boilerplate-generator", tags=["Boilerplate Generator"])
router.include_router(code_canvas_router, prefix="/code-canvas", tags=["Code Canvas"])
