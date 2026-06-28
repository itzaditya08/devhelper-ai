from pydantic import BaseModel, Field
from typing import List, Optional

# 1. Code Explainer Schema
class CodeExplanationResponse(BaseModel):
    summary: str = Field(description="A high-level, 2-3 sentence summary of what the provided code does.")
    key_components: List[str] = Field(description="A list of the core functions, classes, or patterns found in the code.")
    detailed_explanation: str = Field(description="A thorough explanation of the logic, flow, and purpose of the code context.")

# 2. Boilerplate Generator Schema
class BoilerplateResponseSchema(BaseModel):
    code: str = Field(description="The complete, idiomatic code implementation without markdown formatting.")
    language: str = Field(description="The programming language of the generated code.")

# 3. Code Canvas Schema
class CodeCanvasResponseSchema(BaseModel):
    backend: str = Field(description="REST-style API structure or backend pseudocode.")
    frontend: str = Field(description="Frontend HTML/CSS/JS or React boilerplate code.")

# 4. Code Refactorer Schema
class RefactorResponseSchema(BaseModel):
    refactored_code: str = Field(description="The cleanly refactored code without markdown formatting.")
    detected_language: str = Field(description="The programming language of the provided code.")
    changes_made: List[str] = Field(description="A list of 3-5 specific improvements made to the code.")

# 5. Directory Analyser Schema
class FileExplanation(BaseModel):
    file_path: str = Field(description="The path or name of the file or folder.")
    explanation: str = Field(description="A 1-2 line explanation of its role.")

class DirectoryAnalysisResponseSchema(BaseModel):
    project_summary: str = Field(description="A concise summary of the project structure.")
    use_case: str = Field(description="The likely primary use case of the software.")
    file_explanations: List[FileExplanation] = Field(description="Explanations for key files and folders.")
    architecture_notes: str = Field(description="A short explanation of how the files work together.")

# 6. Readme Insights Schema
class ReadmeInsightsResponseSchema(BaseModel):
    project_summary: str = Field(description="Brief summary of the project's purpose and functionality.")
    key_features: List[str] = Field(description="List of core features described in the documentation.")
    tech_stack: List[str] = Field(description="List of technologies, frameworks, and languages used.")
    missing_info: List[str] = Field(description="List of suggestions for improving the documentation.")
    readability_score: int = Field(description="A score from 1 to 10 based on clarity, completeness, and formatting.")
    additional_notes: str = Field(description="Any other useful insights found, or an empty string if none.")