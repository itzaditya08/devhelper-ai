import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import CodeExplainer from "../pages/CodeExplainer";
import BoilerplateGenerator from "../pages/BoilerplateGenerator";
import CodeCanvas from "../pages/CodeCanvas";
import CodeRefactorer from "../pages/CodeRefactorer";
import DirectoryAnalyser from "../pages/DirectoryAnalyser";
import ReadmeInsights from "../pages/ReadmeInsights";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explainer" element={<CodeExplainer />} />
      <Route path="/boilerplate" element={<BoilerplateGenerator />} />
      <Route path="/canvas" element={<CodeCanvas />} />
      <Route path="/refactor" element={<CodeRefactorer />} />
      <Route path="/directory" element={<DirectoryAnalyser />} />
      <Route path="/readme" element={<ReadmeInsights />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}