import React, { useState } from "react";
import { apiService } from "../utils/api";
import { ResponseBox } from "../components/ResponseBox";
import { Bot, FileUp } from "lucide-react";

export default function CodeExplainer() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !query.trim()) return;
    setLoading(true);
    setResponse(null); // Clear previous response
    try {
      const data = await apiService.explainCodebase(file, query);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Bot size={24} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Code <span className="text-indigo-400">Explainer</span></h1>
        </div>
        <p className="text-slate-500 ml-16">Deep architectural audits powered by Gemini.</p>
      </div>

      <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl mb-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block p-8 border-2 border-dashed border-[#1f2937] rounded-xl text-center cursor-pointer hover:border-indigo-500 transition-all group">
            <FileUp className="mx-auto mb-4 text-slate-500 group-hover:text-indigo-400 transition-colors" size={32} />
            <span className="text-slate-400 font-medium">{file ? file.name : "Upload Project Repository (.zip)"}</span>
            <input type="file" accept=".zip" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
          <input 
            value={query} onChange={(e) => setQuery(e.target.value)} 
            placeholder="What part of the architecture should I explain?" 
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-white outline-none focus:border-indigo-500 transition-colors" 
          />
          <button 
            disabled={!file || !query.trim() || loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
          >
            {loading ? "Analyzing Ecosystem..." : "Execute Structural Analysis"}
          </button>
        </form>
      </div>

      {response && (
        <div className="animate-fadeIn">
          <ResponseBox data={response} type="explainer" />
        </div>
      )}
    </div>
  );
}