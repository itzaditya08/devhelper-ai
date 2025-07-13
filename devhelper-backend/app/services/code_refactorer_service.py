# app/services/code_refactorer_service.py

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.llm.gemini_llm import get_gemini_chat_model


# ✅ Prompt Template with Language Auto-Detection
prompt_template = ChatPromptTemplate.from_template(
    """You are a senior software engineer.
Refactor the following code to improve readability, maintainability, structure, and performance.
Ensure variable names are meaningful, logic is clean, and formatting is proper.
If something is unnecessary, you may remove it.
Do NOT change the core logic of the code.

👉 Detect the language of the input code.
👉 Wrap your output in a Markdown code block with the correct language identifier.
Example:
```python
# your refactored code here
Here is the code to refactor:
{code}
```"""
)


# ✅ Main refactor function
def refactor_code(raw_code: str) -> str:
    try:
        # Step 1: Load model
        llm = get_gemini_chat_model()

        # Step 2: Create pipeline (Runnable chain)
        chain = prompt_template | llm | StrOutputParser()

        # Step 3: Pass variables at runtime
        result = chain.invoke({"code": raw_code})

        return result.strip()

    except Exception as e:
        return f"❌ Error while refactoring code: {str(e)}"
