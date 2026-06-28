import React from "react";

export const ResponseBox = ({ data, type }) => {
  if (!data) return null;

  const cardStyle = "backdrop-blur-xl bg-slate-900/40 border border-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-indigo-500/30";

  if (type === "explainer") {
    const info = data.structured_explanation || data;
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-2">Abstract Summary</h3>
          <p className="text-slate-300 leading-relaxed text-base">{info.summary}</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">Key Core Elements</h3>
          <div className="flex flex-wrap gap-2">
            {info.key_components?.map((comp, idx) => (
              <span key={idx} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-3 py-1 rounded-xl text-xs font-mono">
                {comp}
              </span>
            ))}
          </div>
        </div>

        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-2">Detailed Structural Flow</h3>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-sm font-mono bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
            {info.detailed_explanation}
          </p>
        </div>
      </div>
    );
  }

  if (type === "boilerplate") {
    return (
      <div className={`${cardStyle} space-y-4 animate-fadeIn`}>
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded-md text-slate-300 tracking-wide uppercase">{data.language}</span>
        </div>
        <pre className="overflow-x-auto text-sm bg-slate-950/60 p-5 rounded-xl text-emerald-400 font-mono shadow-inner border border-slate-900/80">
          <code>{data.code}</code>
        </pre>
      </div>
    );
  }

  if (type === "canvas") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-pink-400 mb-3">Backend Endpoint Map</h3>
          <pre className="text-xs bg-slate-950/40 p-4 rounded-xl text-slate-300 font-mono overflow-x-auto border border-slate-800/50 leading-loose">
            {data.backend}
          </pre>
        </div>
        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-400 mb-3">Frontend Architecture</h3>
          <pre className="text-xs bg-slate-950/40 p-4 rounded-xl text-slate-300 font-mono overflow-x-auto border border-slate-800/50 leading-loose">
            {data.frontend}
          </pre>
        </div>
      </div>
    );
  }

  if (type === "refactorer") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-3">System Refactor Enhancements</h3>
          <ul className="space-y-2">
            {data.changes_made?.map((change, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-300">
                <span className="text-amber-400 mr-2 font-bold">✓</span>
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">Refactored Clean Code</h3>
          <pre className="overflow-x-auto text-xs bg-slate-950/60 p-5 rounded-xl text-indigo-300 font-mono border border-slate-900">
            <code>{data.refactored_code}</code>
          </pre>
        </div>
      </div>
    );
  }

  if (type === "directory") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardStyle}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-400 mb-2">Project Vision</h3>
            <p className="text-slate-300 text-sm">{data.project_summary}</p>
          </div>
          <div className={cardStyle}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400 mb-2">Core Core Use-Case</h3>
            <p className="text-slate-300 text-sm">{data.use_case}</p>
          </div>
        </div>

        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3">Component Map Definitions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Route / File Node</th>
                  <th className="pb-3 font-semibold">Functional Architecture Responsibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {data.file_explanations?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/10 transition-colors">
                    <td className="py-3 font-mono text-xs text-indigo-300 font-semibold">{item.file_path}</td>
                    <td className="py-3 text-slate-400 text-xs">{item.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-2">Architectural Blueprint Notes</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{data.architecture_notes}</p>
        </div>
      </div>
    );
  }

  if (type === "readme") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${cardStyle} md:col-span-2`}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">System Blueprint Abstract</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{data.project_summary}</p>
          </div>
          <div className={`${cardStyle} flex flex-col justify-center items-center text-center`}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-1">Documentation Clarity</h3>
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 my-2">
              {data.readability_score}<span className="text-sm text-slate-500 font-normal">/10</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardStyle}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-3">Active Operational Features</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {data.key_features?.map((feat, idx) => (
                <li key={idx} className="flex items-center"><span className="text-cyan-400 mr-2">•</span>{feat}</li>
              ))}
            </ul>
          </div>
          <div className={cardStyle}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-400 mb-3">Identified Coverage Gaps</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {data.missing_info?.map((gap, idx) => (
                <li key={idx} className="flex items-center"><span className="text-rose-400 mr-2">!</span>{gap}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cardStyle}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-400 mb-3">Detected Application Stack</h3>
          <div className="flex flex-wrap gap-2">
            {data.tech_stack?.map((tech, idx) => (
              <span key={idx} className="bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1 rounded-xl text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};