# app/services/code_explainer_service.py

import os
from typing import List, Dict

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

from app.llm.gemini_llm import get_gemini_chat_model
from app.core.utils import get_all_code_files

# ✅ Load the local sentence-transformer model
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# ✅ In-memory chat history store
session_chat_histories: Dict[str, List] = {}

# ✅ Text Splitter for large files
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", " ", ""]
)

# ✅ Main function to generate explanation with chat memory
def explain_codebase(folder_path: str, user_query: str, session_id: str) -> str:
    """
    Loads the codebase, indexes using ChromaDB, and answers user query using Gemini.
    Maintains session-specific chat history for contextual conversation.
    """

    # Step 1: Collect all relevant code files
    code_file_paths = get_all_code_files(folder_path)
    if not code_file_paths:
        return "No supported code files found in the uploaded project."

    documents: List[Document] = []

    # Step 2: Read and create Document objects
    for file_path in code_file_paths:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
                doc = Document(page_content=content, metadata={"source": file_path})
                documents.append(doc)
        except Exception as e:
            print(f"❌ Error reading {file_path}: {e}")

    if not documents:
        return "Unable to load code files. Please check file formats or encodings."

    # Step 3: Split large documents into smaller chunks
    split_docs = text_splitter.split_documents(documents)

    # Step 4: Embed documents into Chroma vector store
    vectorstore = Chroma.from_documents(
        documents=split_docs,
        embedding=embedding_model,
        persist_directory=None  # Optionally persist
    )

    # Step 5: Create retriever from vectorstore
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 5})

    # Step 6: Search relevant chunks from vectorstore
    relevant_docs = retriever.get_relevant_documents(user_query)
    context = "\n\n".join([doc.page_content for doc in relevant_docs])

    # Step 7: Load Gemini model
    llm = get_gemini_chat_model()

    # Step 8: Setup session-based chat history
    if session_id not in session_chat_histories:
        session_chat_histories[session_id] = [
            SystemMessage(content="You are a helpful AI assistant. Use the provided context to answer the user's queries about the codebase.")
        ]

    chat_history = session_chat_histories[session_id]

    # Step 9: Create user prompt including context
    user_prompt = f"""User Query:
{user_query}

Relevant Code Context:
{context}
"""
    chat_history.append(HumanMessage(content=user_prompt))

    # Step 10: Generate response using Gemini
    try:
        response = llm.invoke(chat_history)
    except Exception as e:
        return f"❌ Error while processing your request: {e}"

    # Step 11: Append AI response to chat history
    chat_history.append(AIMessage(content=response.content))
    session_chat_histories[session_id] = chat_history

    return response.content
