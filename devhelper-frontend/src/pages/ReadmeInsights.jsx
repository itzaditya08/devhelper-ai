import React, { useState } from "react";
import { motion } from "framer-motion";
import ResponseBox from "../components/ResponseBox";
import Sliders from "../components/Sliders";
import { getReadmeInsights } from "../utils/api";
import Uploader from "../components/Uploader";

const ReadmeInsights = () => {
  const [readmeFile, setReadmeFile] = useState(null);
  const [metaFile, setMetaFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const handleSubmit = async () => {
    if (!readmeFile && !metaFile) return;

    setLoading(true);
    setShowOutput(false);
    const formData = new FormData();
    if (readmeFile) formData.append("readme", readmeFile);
    if (metaFile) formData.append("meta", metaFile);

    try {
      const response = await getReadmeInsights(formData);
      setOutput(response);
      setShowOutput(true);
    } catch (err) {
      setOutput("❌ Failed to fetch insights.");
      setShowOutput(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Readme Insights</h1>

      {/* File upload inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Uploader
          title="Upload README.md"
          accept=".md"
          onFileSelect={setReadmeFile}
        />
        <Uploader
          title="Upload meta file (.json / .txt)"
          accept=".json,.txt"
          onFileSelect={setMetaFile}
        />
      </div>

      {/* Submit button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleSubmit}
        disabled={loading || (!readmeFile && !metaFile)}
        className="w-full py-3 rounded-md shadow-md 
                   bg-green-600 text-white 
                   dark:bg-green-500 dark:text-white 
                   hover:bg-green-700 dark:hover:bg-green-600 
                   disabled:opacity-60 font-medium"
      >
        {loading ? "Generating Insights..." : "Generate Insights"}
      </motion.button>

      {/* Output */}
      {showOutput && <ResponseBox response={output} />}

      {/* Sliders Info */}
      <Sliders
        title="How This Feature Works"
        sections={[
          {
            title: "Steps",
            cards: [
              {
                title: "Upload README",
                description: "Start by uploading a valid README.md file.",
                color: "#34D399",
              },
              {
                title: "Upload Optional Meta File",
                description:
                  "Add an optional .json or .txt config file to enrich analysis.",
                color: "#FBBF24",
              },
              {
                title: "Click Generate",
                description: "Click the button to analyze with GenAI backend.",
                color: "#60A5FA",
              },
              {
                title: "Review Insights",
                description: "Understand tech stack, features, gaps & score.",
                color: "#A78BFA",
              },
            ],
          },
          {
            title: "Implementation",
            cards: [
              {
                title: "Frontend",
                description:
                  "React + Tailwind + Framer Motion. File input managed via custom Uploader component.",
                color: "#E879F9",
              },
              {
                title: "Backend",
                description:
                  "LangChain + Gemini model processes uploaded files and extracts insights.",
                color: "#F472B6",
              },
              {
                title: "API Format",
                description:
                  "POST /readme-insights with multipart/form-data (readme, meta).",
                color: "#F87171",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ReadmeInsights;
