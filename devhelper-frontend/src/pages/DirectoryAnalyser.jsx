import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
import { analyzeDirectory } from "../utils/api";
import ResponseBox from "../components/ResponseBox";
import Sliders from "../components/Sliders";

const DirectoryAnalyser = () => {
  const [structure, setStructure] = useState("");
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!structure.trim()) return;
    setLoading(true);
    setShowOutput(false);
    const result = await analyzeDirectory(structure);
    setOutput(result);
    setLoading(false);
    setShowOutput(true);
  };

  const handleExternalLink = () => {
    // window.open("https://tree.nathanfriend.io/", "_blank");
    window.open("https://gitingest.com/", "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Directory Analyser</h1>

      <textarea
        rows={10}
        placeholder="Paste your project directory structure here..."
        className="w-full p-4 border rounded-lg resize-y mb-4
                   bg-white text-black 
                   dark:bg-zinc-800 dark:text-white 
                   placeholder-gray-400 dark:placeholder-gray-500 
                   border-gray-300 dark:border-gray-700"
        value={structure}
        onChange={(e) => setStructure(e.target.value)}
      />

      <div className="flex gap-2 items-center w-full">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="flex-1 py-3 rounded-md shadow-md 
                     bg-blue-600 text-white 
                     dark:bg-blue-500 dark:text-white 
                     hover:bg-blue-700 dark:hover:bg-blue-600 
                     disabled:opacity-60 text-center font-medium"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analysing..." : "Analyse Directory"}
        </motion.button>

        <button
          onClick={handleExternalLink}
          className="p-3 rounded-md bg-muted hover:bg-accent text-primary border"
          aria-label="Open Directory Generator"
        >
          <FaLink />
        </button>
      </div>

      {showOutput && <ResponseBox response={output} />}

      <Sliders
        title="How Directory Analysis Works"
        sections={[
          {
            title: "Steps to Use",
            cards: [
                {
                title: "Use Gitingest",
                description: "Use an online tool, called GitIngest to generate project’s directory structure, using Github Link.",
                color: "#6C634F",
              },
                {
                title: "Paste Structure",
                description: "Use an online tool or manually paste your project’s directory structure.",
                color: "#6C63FF",
              },
              {
                title: "Hit Analyse",
                description: "Click the button to send the structure to the GenAI API.",
                color: "#F50057",
              },
              {
                title: "View Response",
                description: "Receive a concise explanation with structure, file purposes, and summary.",
                color: "#009688",
              },
            ],
          },
          {
            title: "Implementation Info",
            cards: [
              {
                title: "Model + LangChain",
                description: "Uses Gemini model via LangChain to analyse directory patterns.",
                color: "#3F51B5",
              },
              {
                title: "Frontend",
                description: "Built with React, TailwindCSS, and Framer Motion for animation.",
                color: "#00BCD4",
              },
              {
                title: "Output Format",
                description: "Explained output includes summary, usage, and file relationships.",
                color: "#FFC107",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default DirectoryAnalyser;
