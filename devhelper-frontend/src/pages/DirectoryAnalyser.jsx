import React, { useState } from "react";
import { apiService } from "../utils/api";
import { ResponseBox } from "../components/ResponseBox";
import { FolderTree, ExternalLink } from "lucide-react";

export default function DirectoryAnalyser() {
  const [structure, setStructure] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!structure.trim()) return;
    setLoading(true);
    try {
      const data = await apiService.analyseDirectory(structure);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header Container with Left Title and Right Action Button */}
      <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/20">
              <FolderTree size={24} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Topography <span className="text-teal-400">Analyser</span>
            </h1>
          </div>
          <p className="text-slate-500 ml-16">
            Break down complex project folder structures.
          </p>
        </div>

        {/* Right-aligned Generation Link */}
        <a 
          href="https://gitingest.com/itzaditya08/KeyForge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#161b22] hover:bg-[#1f2937] text-teal-400 border border-[#30363d] hover:border-teal-500/30 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-md flex items-center gap-2 self-start md:mt-2 group"
        >
          Generate Structure
          <ExternalLink size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* Input Form Area */}
      <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl mb-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea 
            value={structure} 
            onChange={(e) => setStructure(e.target.value)} 
            placeholder="Paste your folder tree diagram context here..." 
            rows={8}
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-white outline-none focus:border-teal-500 font-mono text-sm resize-none" 
          />
          <button 
            disabled={loading || !structure.trim()}
            className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
          >
            {loading ? "Parsing Directory Map..." : "Analyse Layout"}
          </button>
        </form>
      </div>

      {/* Structured Result Display */}
      {response && (
        <div className="animate-fadeIn">
          <ResponseBox data={response} type="directory" />
        </div>
      )}
    </div>
  );
}