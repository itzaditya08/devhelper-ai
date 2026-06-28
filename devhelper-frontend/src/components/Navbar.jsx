import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo"; // Import the new component
import { Bot, Code2, FileText, Image, Search, LayoutGrid } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: "Explainer", path: "/explainer", icon: <Bot size={16} /> },
    { name: "Boilerplate", path: "/boilerplate", icon: <Code2 size={16} /> },
    { name: "Canvas", path: "/canvas", icon: <Image size={16} /> },
    { name: "Refactor", path: "/refactor", icon: <LayoutGrid size={16} /> },
    { name: "Analysis", path: "/directory", icon: <Search size={16} /> },
    { name: "Docs", path: "/readme", icon: <FileText size={16} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <Logo size={36} />
        <span className="font-black text-xl tracking-tight text-white">DevHelper<span className="text-indigo-400"> AI</span></span>
      </Link>
      
      <div className="flex items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-white/5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              location.pathname === item.path ? "bg-white/10 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}