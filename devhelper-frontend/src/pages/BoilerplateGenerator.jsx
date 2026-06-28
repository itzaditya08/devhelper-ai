import React, { useState } from "react";
import { apiService } from "../utils/api";
import { ResponseBox } from "../components/ResponseBox";
import { Code2 } from "lucide-react";

export default function BoilerplateGenerator() {
  const [algorithm, setAlgorithm] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiService.generateBoilerplate(algorithm, language);
    setResponse(data);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Code2 size={24} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Algorithmic <span className="text-emerald-400">Synthesis</span></h1>
        </div>
        <p className="text-slate-500 ml-16">Instantly generate clean, idiomatic code snippets.</p>
      </div>

      <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} 
            placeholder="e.g. Dijkstra's Shortest Path..." 
            className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-white outline-none focus:border-emerald-500" 
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-slate-400 outline-none focus:border-emerald-500">
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg transition-all">
            {loading ? "Generating..." : "Generate Boilerplate"}
          </button>
        </form>
      </div>

      {response && (
        <div className="animate-fadeIn">
          <ResponseBox data={response} type="boilerplate" />
        </div>
      )}
    </div>
  );
}