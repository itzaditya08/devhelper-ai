// src/components/Logo.jsx
import React from "react";

export default function Logo({ size = 32 }) {
  return (
    <div 
      className="relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
      style={{ width: size, height: size }}
    >
      <svg 
        width={size * 0.6} 
        height={size * 0.6} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-xl bg-white/20 opacity-30"></div>
    </div>
  );
}