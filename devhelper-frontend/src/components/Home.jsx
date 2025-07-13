import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaFileAlt,
  FaMagic,
  FaRocket,
  FaFolderOpen,
  FaImage,
  FaTools,
  FaBrain,
  FaCheckCircle,
  FaCogs,
} from "react-icons/fa";
import {
  DiReact,
  DiNodejsSmall,
  DiPython,
  DiHtml5,
  DiCss3,
  DiGit,
} from "react-icons/di";
import {
  SiTailwindcss,
  SiFastapi,
  SiLangchain,
  SiOpenai,
} from "react-icons/si";

const features = [
  {
    title: "Code Explainer",
    description: "Understand complex codebases effortlessly by chatting with your zipped project files.",
    icon: <FaCode size={24} />,
    path: "/code-explainer",
    color: "bg-blue-600",
  },
  {
    title: "Readme Insights",
    description: "Generate powerful summaries, suggestions, and readability scores from your README.md files.",
    icon: <FaFileAlt size={24} />,
    path: "/readme-insights",
    color: "bg-green-600",
  },
  {
    title: "Code Refactorer",
    description: "Paste messy code and get a clean, optimized, and more readable version instantly.",
    icon: <FaMagic size={24} />,
    path: "/code-refactorer",
    color: "bg-purple-600",
  },
  {
    title: "Boilerplate Generator",
    description: "Pick any algorithm + language and get a ready-to-go boilerplate with structured code.",
    icon: <FaRocket size={24} />,
    path: "/boilerplate-generator",
    color: "bg-orange-500",
  },
  {
    title: "Directory Analyser",
    description: "Understand a project directory structure with per-file purpose and overall summary.",
    icon: <FaFolderOpen size={24} />,
    path: "/directory-analyser",
    color: "bg-yellow-500",
  },
  {
    title: "Code Canvas",
    description: "Upload UI screenshots and get both backend and frontend boilerplate generated automatically.",
    icon: <FaImage size={24} />,
    path: "/code-canvas",
    color: "bg-pink-500",
  },
];

// Adaptive card with soft glassmorphism
const glassCard = `backdrop-blur-md bg-white/60 dark:bg-white/5 border border-border rounded-2xl p-6 shadow-md hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-12 md:py-16 bg-background min-h-[calc(100vh-100px)] text-foreground">
      {/* Hero */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Welcome to DevHelperAI
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg">
          A developer copilot packed with 6 GenAI-powered tools to supercharge your development workflow.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className={glassCard}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`rounded-full p-3 ${feature.color} text-white shadow`}>
                {feature.icon}
              </div>
              <h2 className="text-xl font-semibold">{feature.title}</h2>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              {feature.description}
            </p>
            <button
              onClick={() => navigate(feature.path)}
              className="w-full py-2 px-4 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 font-medium"
            >
              Explore →
            </button>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <div className="text-center mb-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaTools size={30} className="text-blue-400" />,
              title: "Upload",
              desc: "Upload your codebase, README or folder structure.",
            },
            {
              icon: <FaBrain size={30} className="text-purple-400" />,
              title: "Let AI Analyze",
              desc: "DevHelperAI uses LangChain + Gemini to understand your input.",
            },
            {
              icon: <FaMagic size={30} className="text-green-400" />,
              title: "Get Output",
              desc: "Receive refactored code, summaries, boilerplates, and more.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              className={`${glassCard} flex flex-col items-center text-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why DevHelperAI */}
      <div className="text-center mb-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-500 mb-10">Why DevHelperAI?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCogs size={30} className="text-yellow-400" />,
              title: "All-in-One Toolkit",
              desc: "A unified platform for explaining, generating, and analyzing code.",
            },
            {
              icon: <FaCheckCircle size={30} className="text-green-400" />,
              title: "Built for Developers",
              desc: "Minimal UI, fast responses, copy buttons — built with devs in mind.",
            },
            {
              icon: <FaMagic size={30} className="text-pink-400" />,
              title: "Powered by AI",
              desc: "Uses LangChain + Gemini to generate accurate, contextual results.",
            },
          ].map((point, i) => (
            <motion.div
              key={i}
              className={`${glassCard} flex flex-col items-center text-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="text-center max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-cyan-500 mb-10">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
          {[
            { icon: DiReact, name: "React.js" },
            { icon: DiNodejsSmall, name: "Node.js" },
            { icon: DiPython, name: "Python" },
            { icon: SiFastapi, name: "FastAPI" },
            { icon: SiLangchain, name: "LangChain" },
            { icon: SiOpenai, name: "OpenAI" },
            { icon: DiHtml5, name: "HTML5" },
            { icon: DiCss3, name: "CSS3" },
            { icon: SiTailwindcss, name: "Tailwind CSS" },
            { icon: DiGit, name: "Git" },
          ].map(({ icon: Icon, name }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white/60 dark:bg-white/10 transition-all"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="text-3xl" />
              <span className="text-xs text-foreground">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
