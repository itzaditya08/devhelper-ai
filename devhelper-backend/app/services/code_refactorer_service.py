from langchain_core.prompts import ChatPromptTemplate
from app.llm.gemini_llm import get_gemini_chat_model
from app.schemas.code_responses import RefactorResponseSchema

prompt_template = ChatPromptTemplate.from_template(
    """You are a senior software engineer.
Refactor the following code to improve readability, maintainability, structure, and performance.
Ensure variable names are meaningful and logic is clean. Do NOT change the core logic.

Code to refactor:
{code}
"""
)

def refactor_code(raw_code: str) -> dict:
    try:
        llm = get_gemini_chat_model()
        structured_llm = llm.with_structured_output(RefactorResponseSchema)
        
        chain = prompt_template | structured_llm
        response: RefactorResponseSchema = chain.invoke({"code": raw_code})

        return response.model_dump()
    except Exception as e:
        return {"error": f"Error while refactoring code: {str(e)}"}