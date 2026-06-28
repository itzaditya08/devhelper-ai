import os
from typing import Optional
from app.llm.gemini_llm import get_gemini_chat_model
from app.schemas.code_responses import ReadmeInsightsResponseSchema

def read_file_content(file_path: Optional[str]) -> Optional[str]:
    if file_path and os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return None
    return None

def generate_readme_insights(readme_path: Optional[str], extra_file_path: Optional[str]) -> dict:
    try:
        readme_content = read_file_content(readme_path)
        extra_content = read_file_content(extra_file_path)

        if not readme_content and not extra_content:
            return {"error": "No valid input files provided."}

        llm = get_gemini_chat_model()
        structured_llm = llm.with_structured_output(ReadmeInsightsResponseSchema)

        user_input = f"""
Analyze the following project documentation files and provide structured insights.

--- README Content ---
{readme_content if readme_content else "None provided."}

--- Additional File Content ---
{extra_content if extra_content else "None provided."}
"""
        response: ReadmeInsightsResponseSchema = structured_llm.invoke(user_input)
        return response.model_dump()

    except Exception as e:
        return {"error": f"Error while generating ReadMe Insights: {str(e)}"}
        