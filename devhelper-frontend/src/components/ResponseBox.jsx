import React from "react";
import { motion } from "framer-motion";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ResponseBox = ({ response }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    toast.success("Copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-muted p-4 mt-6 rounded-xl border text-sm text-foreground"
    >
      <button
        className="absolute top-2 right-2 p-1 bg-background rounded-md hover:bg-accent"
        onClick={handleCopy}
        aria-label="Copy"
      >
        <FaCopy />
      </button>
      <pre className="whitespace-pre-wrap">{response}</pre>
    </motion.div>
  );
};

export default ResponseBox;
