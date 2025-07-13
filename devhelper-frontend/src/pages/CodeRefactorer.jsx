import React, { useState } from "react";
import ResponseBox from "../components/ResponseBox";
import Sliders from "../components/Sliders";
import { refactorCode } from "../utils/api";
import { motion } from "framer-motion";

const CodeRefactorer = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefactor = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setShowOutput(false);
    const result = await refactorCode(code);
    setOutput(result);
    setLoading(false);
    setShowOutput(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Code Refactorer</h1>

      <textarea
        rows={10}
        placeholder="Paste your messy code here..."
        className="w-full p-4 border rounded-lg resize-y mb-4
                   bg-white text-black 
                   dark:bg-zinc-800 dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   border-gray-300 dark:border-gray-700"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="w-full mt-2 py-3 rounded-md shadow-md 
             bg-blue-600 text-white 
             dark:bg-blue-500 dark:text-white 
             hover:bg-blue-700 dark:hover:bg-blue-600 
             disabled:opacity-60 text-center font-medium"
        onClick={handleRefactor}
        disabled={loading}
      >
        {loading ? "Refactoring..." : "Refactor Code"}
      </motion.button>

      {showOutput && <ResponseBox response={output} />}

      <Sliders
  title="How Code Refactorer Works"
  sections={[
    {
      title: "Steps",
      cards: [
        {
          title: "Paste Code",
          description: "Paste your unoptimized code in the textbox.",
          color: "#2563EB",
        },
        {
          title: "Click Refactor",
          description: "Click the button to send code to the AI backend.",
          color: "#7C3AED",
        },
        {
          title: "Wait for Response",
          description: "Let the system process and refactor your code.",
          color: "#1D4ED8",
        },
        {
          title: "Copy Output",
          description: "Use the copy button to copy refactored output.",
          color: "#059669",
        },
      ],
    },
    {
      title: "Implementation",
      cards: [
        {
          title: "LangChain + Gemini",
          description: "Backend powered by Gemini via LangChain.",
          color: "#F59E0B",
        },
        {
          title: "JSON POST Request",
          description: "Frontend sends code via structured API call.",
          color: "#8B5CF6",
        },
        {
          title: "Framer Motion",
          description: "Smooth animations for response appearance.",
          color: "#10B981",
        },
        {
          title: "Modern Stack",
          description: "React + Tailwind CSS + FastAPI = ❤️",
          color: "#6366F1",
        },
      ],
    },
  ]}
/>
    </div>
  );
};

export default CodeRefactorer;
