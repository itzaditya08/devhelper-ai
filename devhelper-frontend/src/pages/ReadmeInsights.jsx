import React, { useState } from "react";
import { apiService } from "../utils/api";
import { ResponseBox } from "../components/ResponseBox";
import { FileText, ShieldCheck, BarChart3 } from "lucide-react";

export default function ReadmeInsights() {
  const [readmeFile, setReadmeFile] = useState(null);
  const [extraFile, setExtraFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!readmeFile) return;
    setLoading(true);
    setResponse(null); // Clear previous runs
    try {
      const data = await apiService.getReadmeInsights(readmeFile, extraFile);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Normalized Layout Workspace Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 border border-violet-500/20">
            <FileText size={24} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Documentation <span className="text-violet-400">Audit</span>
          </h1>
        </div>
        <p className="text-slate-500 ml-16">
          Professional-grade analysis for your project's technical clarity.
        </p>
      </div>

      {/* Structured Input Workspace Container */}
      <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl mb-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* README Upload Box */}
            <label className="flex items-center gap-4 p-6 rounded-xl bg-[#161b22] border border-[#30363d] cursor-pointer hover:border-violet-500/50 transition-all group">
              <div className="p-3 bg-violet-500/10 rounded-xl text-violet-400 border border-violet-500/10 group-hover:border-violet-500/30 transition-colors">
                <FileText size={20} />
              </div>
              <span className="font-medium text-sm text-slate-300 truncate">
                {readmeFile ? readmeFile.name : "Primary README.md"}
              </span>
              <input type="file" accept=".md" className="hidden" onChange={(e) => setReadmeFile(e.target.files[0])} />
            </label>

            {/* Optional Context Upload Box */}
            <label className="flex items-center gap-4 p-6 rounded-xl bg-[#161b22] border border-[#30363d] cursor-pointer hover:border-rose-500/50 transition-all group">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400 border border-rose-500/10 group-hover:border-rose-500/30 transition-colors">
                <ShieldCheck size={20} />
              </div>
              <span className="font-medium text-sm text-slate-400 truncate">
                {extraFile ? extraFile.name : "Config File (Optional)"}
              </span>
              <input type="file" className="hidden" onChange={(e) => setExtraFile(e.target.files[0])} />
            </label>
          </div>

          {/* Core Action Handle Trigger */}
          <button 
            disabled={loading || !readmeFile}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all"
          >
            {loading ? "Auditing Documentation Stack..." : "Run Audit Insights"}
          </button>
        </form>
      </div>

      {/* Processing Animation / Results Render Interface Block */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500 space-y-4">
          <BarChart3 className="animate-pulse text-violet-400" size={40} />
          <p className="font-mono text-xs uppercase tracking-widest text-slate-600 animate-pulse">
            Generating Insight Vectors...
          </p>
        </div>
      ) : (
        response && (
          <div className="animate-fadeIn">
            <ResponseBox data={response} type="readme" />
          </div>
        )
      )}

      
    </div>
  );
}

