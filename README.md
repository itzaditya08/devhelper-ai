# 🚀 DevHelperAI – Your AI-Powered Developer Companion

DevHelperAI is a unified GenAI-based platform built to **supercharge your software development workflow**. From refactoring messy code to generating full-stack boilerplates and understanding complex project directories — DevHelperAI acts as your coding copilot.

This is a **monorepo** containing both the `frontend` (React + TailwindCSS) and the `backend` (FastAPI + LangChain + Gemini) implementations.

---

## 📁 Project Structure
devhelper-ai/
├── devhelper-frontend/ # React + TailwindCSS Web UI
├── devhelper-backend/ # FastAPI + LangChain + Gemini APIs
├── README.md # You're here!
├── .gitignore # Shared Git ignore rules
└── .env.example # Sample env variables


---

## 🧠 Features

Each feature is powered by LangChain + Gemini under the hood.

| Feature | Description |
|--------|-------------|
| 💬 **Code Explainer** | Upload zipped codebases and get contextual explanations via chat-like flow. |
| 📄 **Readme Insights** | Analyze README.md files for key features, improvement suggestions, and readability score. |
| ✨ **Code Refactorer** | Paste messy code and receive a clean, optimized version. |
| ⚡ **Boilerplate Generator** | Select a famous algorithm + language → get a structured code template. |
| 📂 **Directory Analyser** | Paste folder structure to understand file purposes and interconnections. |
| 🖼️ **Code Canvas** | Upload UI screenshots → generate backend and frontend boilerplates. |

---

## ⚙️ Tech Stack

### 🧩 Frontend (`devhelper-frontend`)
- [React.js](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Clerk (for Auth)](https://clerk.dev) *(Optional)*

### 🔧 Backend (`devhelper-backend`)
- [FastAPI](https://fastapi.tiangolo.com/)
- [LangChain](https://www.langchain.com/)
- [Gemini API (via LangChain)](https://ai.google.dev/)
- [Python 3.10+](https://www.python.org/)