import React, { useState } from "react";
import ResponseBox from "../components/ResponseBox";
import Sliders from "../components/Sliders";
import { generateBoilerplate } from "../utils/api";
import { motion } from "framer-motion";

const BoilerplateGenerator = () => {
  const [algorithm, setAlgorithm] = useState("Binary Search");
  const [language, setLanguage] = useState("C++");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const algorithms = [
    "Binary Search", "Merge Sort", "Dijkstra's Algorithm", 
    "Kruskal's Algorithm", "Floyd Warshall", "Topological Sort", "sum of two number"
  ];

  const languages = ["C++", "Python", "Java", "JavaScript", "Go", "Rust"];

  const handleGenerate = async () => {
    setLoading(true);
    setShowOutput(false);
    const result = await generateBoilerplate(algorithm, language);
    setOutput(result);
    setLoading(false);
    setShowOutput(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Boilerplate Generator</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <select
          className="w-full p-3 rounded-lg border bg-white text-black 
                     dark:bg-zinc-800 dark:text-white dark:border-gray-700"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          {algorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>

        <select
          className="w-full p-3 rounded-lg border bg-white text-black 
                     dark:bg-zinc-800 dark:text-white dark:border-gray-700"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="w-full mt-2 py-3 rounded-md shadow-md 
             bg-blue-600 text-white 
             dark:bg-blue-500 dark:text-white 
             hover:bg-blue-700 dark:hover:bg-blue-600 
             disabled:opacity-60 text-center font-medium"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Boilerplate"}
      </motion.button>

      {showOutput && <ResponseBox response={output} />}

      <Sliders
        title="How Boilerplate Generator Works"
        sections={[
          {
            title: "Usage Steps",
            cards: [
              {
                title: "Select Algorithm",
                description: "Choose a famous algorithm from the list.",
                color: "#3B82F6", // Blue
              },
              {
                title: "Select Language",
                description: "Pick the target language for the boilerplate.",
                color: "#8B5CF6", // Purple
              },
              {
                title: "Click Generate",
                description: "Hit the generate button to call the AI.",
                color: "#10B981", // Green
              },
              {
                title: "Copy Result",
                description: "Get the generated code and copy it easily.",
                color: "#EC4899", // Pink
              },
            ],
          },
          {
            title: "Implementation Details",
            cards: [
              {
                title: "LangChain + Gemini",
                description: "The backend uses LangChain with Gemini Pro.",
                color: "#F59E0B", // Amber
              },
              {
                title: "Dropdown Inputs",
                description: "User input collected from dropdown selectors.",
                color: "#6366F1", // Indigo
              },
              {
                title: "Structured Prompting",
                description: "Backend prompt is built with selected inputs.",
                color: "#D97706", // Yellowish
              },
              {
                title: "Copy + Animation",
                description: "Response is animated with a copy button.",
                color: "#0EA5E9", // Sky Blue
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BoilerplateGenerator;
