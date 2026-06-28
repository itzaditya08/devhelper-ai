// import React from "react";
// import { Link } from "react-router-dom";
// import { Bot, Code2, Image, LayoutGrid, Search, FileText, ArrowRight } from "lucide-react";
// import Logo from "./Logo";

// export default function Home() {
//   const tools = [
//     { name: "Code Explainer", path: "/explainer", icon: <Bot className="text-indigo-400" />, desc: "Deep architectural audits." },
//     { name: "Boilerplate", path: "/boilerplate", icon: <Code2 className="text-emerald-400" />, desc: "Idiomatic logic synthesis." },
//     { name: "Vision Canvas", path: "/canvas", icon: <Image className="text-fuchsia-400" />, desc: "UI to code generation." },
//     { name: "Refactorer", path: "/refactor", icon: <LayoutGrid className="text-amber-400" />, desc: "Modernize legacy code." },
//     { name: "Directory", path: "/directory", icon: <Search className="text-teal-400" />, desc: "Structure topography." },
//     { name: "Docs Audit", path: "/readme", icon: <FileText className="text-violet-400" />, desc: "Readability grading." },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-6">
//       <div className="max-w-6xl mx-auto space-y-20">
        
//         {/* Hero Section */}
//         <section className="text-center space-y-6 pt-12">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
//             <span>Powered by Gemini 1.5 Flash</span>
//           </div>
//           <div className="flex justify-center mb-8">
//             <Logo size={64} />
//           </div>
//           <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
//             Build Faster, <br/>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Think Deeper.</span>
//           </h1>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             The professional-grade AI workspace designed for developers who value structural integrity and clean code architecture.
//           </p>
//         </section>

//         {/* Feature Grid */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {tools.map((tool, idx) => (
//             <Link 
//               key={idx} 
//               to={tool.path}
//               className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.3)] hover:-translate-y-2"
//             >
//               <div className="mb-6 bg-slate-950 w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-800">
//                 {tool.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
//               <p className="text-slate-500 text-sm mb-6">{tool.desc}</p>
//               <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider group-hover:gap-4 transition-all">
//                 Access Tool <ArrowRight size={14}/>
//               </div>
//             </Link>
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// }




// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Bot, Code2, Image, LayoutGrid, Search, FileText, ArrowRight, Github } from "lucide-react";
import Logo from "./Logo";

export default function Home() {
  const techStack = ["Python", "FastAPI", "Gemini API", "Pydantic", "Langchain", "TailwindCSS", "React/Vite"];
  
  const tools = [
    { name: "Code Explainer", path: "/explainer", icon: <Bot className="text-indigo-400" />, desc: "Deep architectural audits." },
    { name: "Boilerplate", path: "/boilerplate", icon: <Code2 className="text-emerald-400" />, desc: "Idiomatic logic synthesis." },
    { name: "Vision Canvas", path: "/canvas", icon: <Image className="text-fuchsia-400" />, desc: "UI to code generation." },
    { name: "Refactorer", path: "/refactor", icon: <LayoutGrid className="text-amber-400" />, desc: "Modernize legacy code." },
    { name: "Directory", path: "/directory", icon: <Search className="text-teal-400" />, desc: "Structure topography." },
    { name: "Docs Audit", path: "/readme", icon: <FileText className="text-violet-400" />, desc: "Readability grading." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-12">
          <div className="flex justify-center"><Logo size={64} /></div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">Build Faster, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Think Deeper.</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Professional AI workspace for modern developers.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {techStack.map(tech => <span key={tech} className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">{tech}</span>)}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <Link key={idx} to={tool.path} className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all hover:shadow-[0_0_30px_-10px_rgba(79,70,229,0.3)]">
              <div className="mb-6 bg-slate-950 w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-800">{tool.icon}</div>
              <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
              <p className="text-slate-500 text-sm mb-6">{tool.desc}</p>
            </Link>
          ))}
        </section>
      </div>

      <footer className="text-center pt-20 text-slate-600 text-sm">
        <p>Built with ❤️ by <span className="text-indigo-400 font-bold">Aditya Maurya</span></p>
      </footer>
    </div>
  );
}