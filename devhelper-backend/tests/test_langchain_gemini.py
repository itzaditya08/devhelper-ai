# test_langchain_gemini.py

from app.llm.gemini_llm import get_gemini_chat_model
# from langchain_core.prompts import ChatPromptTemplate

# Load Gemini model through LangChain
llm = get_gemini_chat_model()

# # Define a LangChain Chat Prompt
# prompt = ChatPromptTemplate.from_messages([
#     ("system", "You are an expert code reviewer. Explain what the code does."),
#     ("human", "Here is the code:\n\n```python\ndef factorial(n):\n    return 1 if n == 0 else n * factorial(n - 1)\n```")
# ])

# # Format prompt into a LangChain-compatible input
# chain = prompt | llm

# # Run the chain (send the prompt to Gemini via LangChain)
# response = chain.invoke({})

# # Print the generated response
# print("🧠 Gemini Response:")
# print(response.content)


# Minimal prompt to save tokens
try:
    response = llm.invoke("Hi!")

    print("🧠 Gemini Response:")
    print(response.content)

except Exception as e:
    print("❌ Error while invoking Gemini model:")
    print(str(e))