# app/services/directory_analyser_service.py

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from app.llm.gemini_llm import get_gemini_chat_model

# ✅ Prompt Template
prompt_template = ChatPromptTemplate.from_template(
    """
You are a helpful AI assistant that analyzes software project structures.

Given a directory structure in text format, provide the following in a clean, structured response:

1. ✅ A concise **project summary**
2. ✅ Its **use case**
3. ✅ **Each file/folder explained** in 1-2 lines
4. ✅ A short section on **how the files work together**

Here is the directory structure:
{directory}
"""
)

# ✅ Main logic
def analyse_directory(directory_structure_text: str) -> str:
    try:
        # Step 1: Create the full prompt
        prompt = prompt_template

        # Step 2: Load Gemini
        llm = get_gemini_chat_model()

        # Step 3: Chain with output parser
        chain = prompt | llm | StrOutputParser()

        # ❗️ FIX: Wrap input as dictionary
        result = chain.invoke({"directory": directory_structure_text})

        return result.strip()
    except Exception as e:
        return f"❌ Error while analyzing directory structure: {str(e)}"
