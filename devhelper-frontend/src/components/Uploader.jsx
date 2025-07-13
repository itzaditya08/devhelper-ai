import React, { useState } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * Uploader Component
 *
 * Props:
 * - title (string): Label shown above the input box
 * - onFileSelect (function): Callback to send selected file to parent
 * - accept (string): File types accepted (defaults to generalized list)
 */
const Uploader = ({
  title = "Upload a file",
  onFileSelect,
  accept = `
    .md,.json,.txt,.js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cs,.rb,.go,
    .html,.css,.scss,.zip,.png,.jpg,.jpeg,.svg
  `
}) => {
  const [fileName, setFileName] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploaded(true);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Title/label */}
      <label className="font-semibold text-foreground">{title}</label>

      {/* Hidden input */}
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        id={`file-input-${title}`}
      />

      {/* Custom UI for file upload */}
      <label
        htmlFor={`file-input-${title}`}
        className="flex items-center justify-between gap-4 px-5 py-4 border border-gray-300 dark:border-zinc-700
                   rounded-2xl bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
                   shadow-sm cursor-pointer transition-all duration-200 min-h-[72px]"
      >
        {/* Left: File name or placeholder */}
        <span className="truncate text-sm text-gray-700 dark:text-gray-100 font-medium">
          {fileName || "Choose a file to upload..."}
        </span>

        {/* Right: Animated icon */}
        <motion.div
          key={uploaded ? "uploaded" : "uploading"}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {uploaded ? (
            <FaCheckCircle className="text-green-500 text-xl" />
          ) : (
            <FaUpload className="text-blue-600 text-xl dark:text-white" />
          )}
        </motion.div>
      </label>
    </div>
  );
};

export default Uploader;
