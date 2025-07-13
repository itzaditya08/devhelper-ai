import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Update this to your backend URL
});

export default api;

export const refactorCode = async (code) => {
  try {
    const res = await fetch("http://localhost:8000/code-refactorer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    return data.refactored_code || "No response.";
  } catch (error) {
    console.error("Refactor API Error:", error);
    return "Error: Unable to get refactored code.";
  }
};


export const generateBoilerplate = async (algorithm, language) => {
  try {
    const response = await api.post("/boilerplate-generator", {
      algorithm,
      language,
    });
    return response.data.code || "No result received from the server.";
  } catch (err) {
    console.error("Boilerplate API Error:", err);
    return "Something went wrong. Please try again.";
  }
};

export const analyzeDirectory = async (structure) => {
  try {
    const response = await api.post("/directory-analyser", { structure });
    return response.data?.summary || "No result received from the server.";
  } catch (error) {
    console.error("Directory Analyser Error:", error);
    return "Error analyzing the directory.";
  }
};


export const getReadmeInsights = async (formData) => {
  try {
    const res = await api.post("/readme-insights", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.result || "No result received from server.";
  } catch (err) {
    console.error("Readme Insights Error:", err);
    throw err;
  }
};


export const getCodeCanvas = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await axios.post(`http://127.0.0.1:8000/code-canvas`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Code Canvas Error:", error);
    return null;
  }
};



export const sendCodeExplanation = async (zipFile, query) => {
  const formData = new FormData();
  formData.append("zip_file", zipFile);
  formData.append("query", query);

  try {
    const response = await axios.post("http://127.0.0.1:8000/code-explainer", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.explanation || "No explanation received.";
  } catch (error) {
    console.error("Code Explainer Error:", error);
    throw error;
  }
};
