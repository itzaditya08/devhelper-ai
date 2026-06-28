import React, { useState } from "react";
import { ResponseBox } from "../components/ResponseBox";
import { Image as ImageIcon, Upload } from "lucide-react";

export default function CodeCanvas() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleMockSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    
    setLoading(true);
    
    // Simulate realistic AI generation latency
    setTimeout(() => {
      const mockData = {
        frontend: `// Simulated React Canvas Component Scaffolding
import React, { useState } from 'react';
import { LayoutGrid, Shield, User } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-[#07090e] p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold">D</div>
          <span className="font-bold text-lg tracking-tight">AdminPortal</span>
        </div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium">
            <LayoutGrid size={18} /> Overview
          </button>
        </nav>
      </aside>

      {/* Primary Workspace View */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-900">
          <h1 className="text-2xl font-bold tracking-tight">System Status</h1>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
            <User size={18} className="text-slate-400" />
          </div>
        </header>
        
        {/* Metric Data Visualizers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-2xl">
            <h3 className="text-sm text-slate-500 mb-2">Network Throughput</h3>
            <p className="text-3xl font-bold font-mono tracking-tight text-emerald-400">942.8 Mb/s</p>
          </div>
        </div>
      </main>
    </div>
  );
}`,
        backend: `PROPOSED SYSTEM ARCHITECTURE BLUEPRINT

1. Authorization Middleware Integration
• Path Enforcement: All routes under /api/v1/admin/* require valid authorization tokens.
• Token Verification Sequence:
  [Incoming Request] ──> [Bearer Token Validation] ──> [RBAC Verification] ──> [Target Controller]

2. Core Operational Endpoints Map
• GET /api/v1/metrics/system
  - Description: Retrieves real-time hardware, database socket pools, and active connection throughput arrays.
  - Success Payload Structure (200 OK):
{
  "status": "operational",
  "metrics": {
    "network_throughput_mbs": 942.8,
    "active_sockets": 1402,
    "cpu_utilization_pct": 24.5
  }
}

• POST /api/v1/admin/config
  - Description: Updates global system variables dynamically. Enforces Pydantic strict-type configurations.`
      };
      
      setResponse(mockData);
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400 border border-fuchsia-500/20">
            <ImageIcon size={24} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Vision <span className="text-fuchsia-400">Canvas</span></h1>
        </div>
        <p className="text-slate-500 ml-16">Reverse-engineer UI designs into code.</p>
      </div>

      <div className="bg-[#0b0e14] border border-[#1f2937] p-8 rounded-2xl mb-8">
        <label className="block p-12 border-2 border-dashed border-[#1f2937] rounded-xl text-center cursor-pointer hover:border-fuchsia-500 transition-all mb-6">
          <Upload className="mx-auto mb-4 text-fuchsia-400" />
          <span className="text-slate-400">{file ? file.name : "Select Design Mockup Image"}</span>
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <button 
          onClick={handleMockSubmit} 
          disabled={!file || loading}
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing UI Topography..." : "Generate Blueprint"}
        </button>
      </div>

      {response && (
        <div className="animate-fadeIn">
          <ResponseBox data={response} type="canvas" />
        </div>
      )}
    </div>
  );
}





// import React, { useState } from "react";
// import { apiService } from "../utils/api";
// import { ResponseBox } from "../components/ResponseBox";
// import { Image as ImageIcon, Sparkles, Upload } from "lucide-react";

// export default function CodeCanvas() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     setLoading(true);
//     const data = await apiService.explainCodeCanvas(file);
//     setResponse(data);
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 pt-28 pb-12 px-6">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <div className="text-center space-y-2">
//           <h1 className="text-5xl font-black tracking-tighter">Vision <span className="text-fuchsia-400">Canvas</span></h1>
//           <p className="text-slate-500">Reverse-engineer UI designs into structural code.</p>
//         </div>
//         <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-center">
//           <label className="block p-12 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer hover:border-fuchsia-500/50 bg-slate-950/50 transition-all mb-6">
//             <Upload className="mx-auto mb-4 text-fuchsia-400" size={40} />
//             <span className="font-bold block">{file ? file.name : "Select Design Mockup"}</span>
//             <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
//           </label>
//           <button onClick={handleSubmit} disabled={loading || !file} className="w-full py-4 bg-fuchsia-600 rounded-2xl font-bold hover:bg-fuchsia-500 transition-all">
//             {loading ? "Analyzing..." : "Generate Blueprint"}
//           </button>
//         </div>
//         <ResponseBox data={response} type="canvas" />
//       </div>
//     </div>
//   );
// }



