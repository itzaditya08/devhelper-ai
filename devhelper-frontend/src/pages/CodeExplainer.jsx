import React, { useState } from "react";
import { motion } from "framer-motion";
import Uploader from "../components/Uploader";
import ChatBubble from "../components/ChatBubble";
import { sendCodeExplanation } from "../utils/api";
import { FaPaperPlane } from "react-icons/fa";

const CodeExplainer = () => {
  const [zipFile, setZipFile] = useState(null);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]); // { sender: "user" | "bot", text: "" }
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file) => {
    setZipFile(file);
  };

  const handleSend = async () => {
    if (!zipFile || !query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const botReply = await sendCodeExplanation(zipFile, query);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error while processing your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-2">Code Explainer</h1>

      <Uploader
        title="Upload your zipped codebase"
        onFileSelect={handleFileSelect}
        accept=".zip"
      />

      {/* Chat UI Input Area */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            zipFile ? "Ask something about the uploaded code..." : "Upload a zip file first..."
          }
          disabled={!zipFile}
          className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleSend}
          disabled={!zipFile || loading}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white disabled:opacity-50"
        >
          <FaPaperPlane />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="space-y-4 mt-6">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>
    </div>
  );
};

export default CodeExplainer;
