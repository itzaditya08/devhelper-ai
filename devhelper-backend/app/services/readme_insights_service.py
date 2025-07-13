# app/services/readme_insights_service.py

import os
from typing import Optional

from app.llm.gemini_llm import get_gemini_chat_model

# ✅ Helper function to read file content safely
def read_file_content(file_path: Optional[str]) -> Optional[str]:
    if file_path and os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as e:
            print(f"❌ Error reading {file_path}: {e}")
            return None
    return None


# ✅ Main function for extracting insights
def generate_readme_insights(readme_path: Optional[str], extra_file_path: Optional[str]) -> str:
    try:
        # Step 1: Read file contents
        readme_content = read_file_content(readme_path)
        extra_content = read_file_content(extra_file_path)

        if not readme_content and not extra_content:
            return "❌ No valid input files provided."

        # Step 2: Load Gemini LLM
        llm = get_gemini_chat_model()

        # Step 3: Prepare the prompt
        user_input = f"""
You are a helpful AI assistant. The user has uploaded one or two files related to a project — a README.md and/or an optional metadata/config file (.json or .txt). Based on the files provided, generate a structured and concise analysis with the following fields:

1. ✅ Project Summary (brief summary of the purpose and functionality)
2. 🚀 Key Features (bullet list of core features described in the README)
3. 💻 Tech Stack (all technologies used, if mentioned)
4. 🧠 Missing Info / Suggestions (what should be added to improve documentation?)
5. 📊 Readability Score (give a score out of 10 based on clarity, completeness, and formatting)
6. 🧾 Additional Notes (anything useful found in the extra file)

--- README Content ---
{readme_content if readme_content else "No README file was provided."}

--- Additional File Content ---
{extra_content if extra_content else "No additional file was provided."}
"""

        # Step 4: Send to LLM and return result
        result = llm.invoke(user_input)
        return result.content.strip()

    except Exception as e:
        return f"❌ Error while generating ReadMe Insights: {str(e)}"
