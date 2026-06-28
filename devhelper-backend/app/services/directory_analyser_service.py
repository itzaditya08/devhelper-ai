from langchain_core.prompts import ChatPromptTemplate
from app.llm.gemini_llm import get_gemini_chat_model
from app.schemas.code_responses import DirectoryAnalysisResponseSchema

prompt_template = ChatPromptTemplate.from_template(
    """
You are a helpful AI assistant that analyzes software project structures.
Analyze the following directory structure and provide a comprehensive architectural breakdown.

Directory Structure:
{directory}
"""
)

def analyse_directory(directory_structure_text: str) -> dict:
    try:
        prompt = prompt_template
        llm = get_gemini_chat_model()
        structured_llm = llm.with_structured_output(DirectoryAnalysisResponseSchema)

        chain = prompt | structured_llm
        response: DirectoryAnalysisResponseSchema = chain.invoke({"directory": directory_structure_text})

        return response.model_dump()
    except Exception as e:
        return {"error": f"Error while analyzing directory structure: {str(e)}"}