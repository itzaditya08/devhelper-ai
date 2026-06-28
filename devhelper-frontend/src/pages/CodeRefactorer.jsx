import React, { useState } from "react";
import { apiService } from "../utils/api";
import { ResponseBox } from "../components/ResponseBox";
import { LayoutGrid } from "lucide-react";

export default function CodeRefactorer() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiService.refactorCode(code);
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
            <LayoutGrid size={24} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Refactoring <span className="text-amber-400">Engine</span></h1>
        </div>
        <p className="text-slate-500 ml-16">Optimize legacy logic with production-grade standards.</p>
      </div>

      <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl mb-8">
        <textarea 
          value={code} onChange={(e) => setCode(e.target.value)} 
          className="w-full h-64 bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-white font-mono text-sm outline-none focus:border-amber-500" 
          placeholder="// Paste legacy code here..." 
        />
        <button onClick={handleSubmit} className="w-full mt-6 bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-lg transition-all">
          {loading ? "Refactoring..." : "Optimize Code"}
        </button>
      </div>

      {response && (
        <div className="animate-fadeIn">
          <ResponseBox data={response} type="refactorer" />
        </div>
      )}
    </div>
  );
}