// src/pages/CodeCanvas.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { getCodeCanvas } from "../utils/api";
import Uploader from "../components/Uploader";
import ResponseBox from "../components/ResponseBox";
import Sliders from "../components/Sliders";

const CodeCanvas = () => {
  const [imageFile, setImageFile] = useState(null);
  const [frontendCode, setFrontendCode] = useState("");
  const [backendCode, setBackendCode] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!imageFile) return;
    setLoading(true);
    setShowOutput(false);

    const response = await getCodeCanvas(imageFile);

    if (response) {
      setFrontendCode(response.frontend || "");
      setBackendCode(response.backend || "");
      setShowOutput(true);
    } else {
      setFrontendCode("No frontend output");
      setBackendCode("No backend output");
      setShowOutput(true);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-foreground mb-6">Code Canvas</h1>

      <Uploader
        title="Upload Frontend UI Image"
        onFileSelect={setImageFile}
        accept=".png,.jpg,.jpeg,.svg"
      />

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={loading || !imageFile}
        onClick={handleSubmit}
        className="mt-4 w-full sm:w-[100%] px-6 py-2 bg-primary text-white rounded-xl shadow disabled:opacity-50 bg-blue-600"
      >
        {loading ? "Analyzing..." : "Generate Code from UI Image"}
      </motion.button>

      {showOutput && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 space-y-6"
        >
          <ResponseBox title="Frontend Code" value={frontendCode} />
          <ResponseBox title="Backend Code" value={backendCode} />
        </motion.div>
      )}

      <Sliders
        title="How Code Canvas Works"
        sections={[
          {
            title: "Usage Guide",
            cards: [
              {
                title: "Step 1",
                description:
                  "Upload a clear screenshot of your frontend UI layout.",
                color: "#4F46E5",
              },
              {
                title: "Step 2",
                description:
                  "Click on 'Generate Code' to analyze the image.",
                color: "#059669",
              },
              {
                title: "Step 3",
                description:
                  "View generated frontend and backend code side by side.",
                color: "#D97706",
              },
            ],
          },
          {
            title: "Implementation Info",
            cards: [
              {
                title: "Model Used",
                description:
                  "Gemini Vision (e.g., gemini-1.5-flash) is used to analyze UI screenshots.",
                color: "#6366F1",
              },
              {
                title: "Output Format",
                description:
                  "Returns JSON with 'frontend' and 'backend' keys as code blocks.",
                color: "#10B981",
              },
              {
                title: "Tech Stack",
                description:
                  "LangChain + Gemini + FastAPI + React + Framer Motion.",
                color: "#F59E0B",
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CodeCanvas;
