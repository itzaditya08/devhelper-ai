import os
from typing import List, Dict

from langchain_community.vectorstores import Chroma
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_core.messages import SystemMessage, HumanMessage

from app.llm.gemini_llm import get_gemini_chat_model, get_gemini_embedding_model
from app.core.utils import get_all_code_files
from app.schemas.code_responses import CodeExplanationResponse

embedding_model = get_gemini_embedding_model()
session_chat_histories: Dict[str, List] = {}

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", " ", ""]
)

def explain_codebase(folder_path: str, user_query: str, session_id: str) -> dict:
    """
    Loads codebase, indexes with ChromaDB, and answers using Gemini.
    Returns a strict dictionary matching CodeExplanationResponse.
    """
    try:
        # 1. Safely load files
        code_file_paths = get_all_code_files(folder_path)
        if not code_file_paths:
            return {"error": "No supported code files found in the zip archive."}

        documents: List[Document] = []
        for file_path in code_file_paths:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    if content.strip():  # Skip completely empty files
                        doc = Document(page_content=content, metadata={"source": file_path})
                        documents.append(doc)
            except Exception as e:
                print(f"❌ Error reading {file_path}: {e}")

        if not documents:
            return {"error": "Unable to extract readable text from the uploaded code files."}

        # 2. Safely Split Text
        split_docs = text_splitter.split_documents(documents)
        if not split_docs:
            return {"error": "Files were found, but no parseable text could be split."}
        
        # 3. Create Ephemeral Vectorstore
        vectorstore = Chroma.from_documents(
            documents=split_docs,
            embedding=embedding_model,
            persist_directory=None 
        )

        # Safely set k to prevent Chroma warnings on very small projects
        k_val = min(5, len(split_docs))
        retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": k_val})
        relevant_docs = retriever.invoke(user_query)
        context = "\n\n".join([doc.page_content for doc in relevant_docs])

        # 4. Invoke LLM with Pydantic Schema
        llm = get_gemini_chat_model()
        structured_llm = llm.with_structured_output(CodeExplanationResponse)

        if session_id not in session_chat_histories:
            session_chat_histories[session_id] = [
                SystemMessage(content="You are an expert software engineer. Analyze the code context and answer the user's query structurally.")
            ]

        chat_history = session_chat_histories[session_id]
        user_prompt = f"User Query: {user_query}\n\nRelevant Code Context:\n{context}"
        chat_history.append(HumanMessage(content=user_prompt))

        response: CodeExplanationResponse = structured_llm.invoke(chat_history)
        
        # Append response summary to memory
        chat_history.append(SystemMessage(content=f"AI responded with summary: {response.summary}"))
        session_chat_histories[session_id] = chat_history
        
        return response.model_dump()
        
    except Exception as e:
        print(f"❌ Backend Exception in explain_codebase: {e}")
        return {"error": f"Failed to analyze codebase: {str(e)}"}
    
    