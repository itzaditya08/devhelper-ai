from langchain_core.prompts import ChatPromptTemplate
from app.llm.gemini_llm import get_gemini_chat_model
from app.schemas.code_responses import BoilerplateResponseSchema

prompt_template = ChatPromptTemplate.from_template(
    """
You are a senior software engineer.
Generate a clean, idiomatic, and highly efficient implementation of the following algorithm:
- Algorithm: {algorithm}
- Language: {language}

Ensure clean structure, meaningful variable names, and include concise comments.
"""
)

def generate_boilerplate_code(algorithm: str, language: str) -> dict:
    try:
        llm = get_gemini_chat_model()
        structured_llm = llm.with_structured_output(BoilerplateResponseSchema)
        
        chain = prompt_template | structured_llm
        
        response: BoilerplateResponseSchema = chain.invoke({
            "algorithm": algorithm,
            "language": language
        })
        
        return response.model_dump()
    except Exception as e:
        return {"error": f"Error while generating boilerplate code: {str(e)}"}