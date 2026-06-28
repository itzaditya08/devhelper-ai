// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
        <Navbar />
        <main className="pt-20">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;