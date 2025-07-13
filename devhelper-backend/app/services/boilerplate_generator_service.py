# app/services/boilerplate_generator_service.py

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.llm.gemini_llm import get_gemini_chat_model


# ✅ Dynamic prompt with placeholders for algorithm and language
prompt_template = ChatPromptTemplate.from_template(
    """
You are a senior software engineer.

Your task is to generate a clean, idiomatic, and highly efficient implementation of the following algorithm:
- Algorithm: {algorithm}
- Language: {language}

✅ Guidelines:
- Write complete code with a main function if applicable.
- Follow best practices and idioms for the selected programming language.
- Ensure clean structure, meaningful variable names, and performance considerations.
- Include concise comments for important logic.
- Do NOT add explanations or text outside the code block.

🎯 Output:
Wrap the entire output in a proper code block using triple backticks, and use the correct language tag.

Example:
```{language}
# your code here
"""
)

def generate_boilerplate_code(algorithm: str, language: str) -> str:
    try:
        # Step 1: Load Gemini Chat Model
        llm = get_gemini_chat_model()

        # Step 2: Create the chain
        chain = prompt_template | llm | StrOutputParser()

        # Step 3: Run chain with structured input
        result = chain.invoke({
            "algorithm": algorithm,
            "language": language
        })
        
        return result.strip()
    except Exception as e:
        return f"❌ Error while generating boilerplate code: {str(e)}"
