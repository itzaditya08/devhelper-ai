import { mockData } from "./mockData";

// TOGGLE THIS TRUE TO RUN THE SYSTEM WITHOUT THE BACKEND RUNNING
const USE_MOCK = false; 

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async explainCodebase(zipFile, query) {
    if (USE_MOCK) {
      await delay(1200);
      return { session_id: "mock-session-123", structured_explanation: mockData.codeExplainer };
    }
    const formData = new FormData();
    formData.append("zip_file", zipFile);
    formData.append("query", query);

    const response = await fetch(`${BASE_URL}/api/endpoints/code-explainer`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Backend response error");
    return response.json();
  },

  async generateBoilerplate(algorithm, language) {
    if (USE_MOCK) {
      await delay(800);
      return mockData.boilerplateGenerator;
    }
    const response = await fetch(`${BASE_URL}/boilerplate-generator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ algorithm, language }),
    });
    if (!response.ok) throw new Error("Backend response error");
    return response.json();
  },

  async explainCodeCanvas(imageFile) {
    if (USE_MOCK) {
      await delay(1500);
      return mockData.codeCanvas;
    }
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${BASE_URL}/code-canvas`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Backend response error");
    return response.json();
  },

  async refactorCode(code) {
    if (USE_MOCK) {
      await delay(900);
      return mockData.codeRefactorer;
    }
    const response = await fetch(`${BASE_URL}/code-refactorer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) throw new Error("Backend response error");
    return response.json();
  },

  async analyseDirectory(structure) {
    if (USE_MOCK) {
      await delay(1000);
      return mockData.directoryAnalyser;
    }
    const response = await fetch(`${BASE_URL}/directory-analyser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structure }),
    });
    if (!response.ok) throw new Error("Backend response error");
    return response.json();
  },

  async getReadmeInsights(readmeFile, extraFile) {
    if (USE_MOCK) {
      await delay(1400);
      return mockData.readmeInsights;
    }
    const formData = new FormData();
    if (readmeFile) formData.append("readme_file", readmeFile);
    if (extraFile) formData.append("extra_file", extraFile);

    const response = await fetch(`${BASE_URL}/readme-insights`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Backend response error");
    return response.json();
  }
};