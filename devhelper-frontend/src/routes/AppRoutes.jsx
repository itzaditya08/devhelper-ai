// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CodeExplainer from "../pages/CodeExplainer";
import ReadmeInsights from "../pages/ReadmeInsights";
import CodeRefactorer from "../pages/CodeRefactorer";
import BoilerplateGenerator from "../pages/BoilerplateGenerator";
import DirectoryAnalyser from "../pages/DirectoryAnalyser";
import CodeCanvas from "../pages/CodeCanvas";
import Home from "../components/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/code-explainer" element={<CodeExplainer />} />
      <Route path="/readme-insights" element={<ReadmeInsights />} />
      <Route path="/code-refactorer" element={<CodeRefactorer />} />
      <Route path="/boilerplate-generator" element={<BoilerplateGenerator />} />
      <Route path="/directory-analyser" element={<DirectoryAnalyser />} />
      <Route path="/code-canvas" element={<CodeCanvas />} />
    </Routes>
  );
}
