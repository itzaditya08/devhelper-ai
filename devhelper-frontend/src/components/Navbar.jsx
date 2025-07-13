// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png";

const features = [
  { path: "/code-explainer", label: "Code Explainer" },
  { path: "/readme-insights", label: "Readme Insights" },
  { path: "/code-refactorer", label: "Code Refactorer" },
  { path: "/boilerplate-generator", label: "Boilerplate Generator" },
  { path: "/directory-analyser", label: "Directory Analyser" },
  { path: "/code-canvas", label: "Code Canvas" },
];

const Navbar = () => {
  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 shadow-md">
      {/* Left - Logo and Site Name */}
      <NavLink to="/" className="flex items-center gap-3">
        <img src={logo} alt="DevHelperAI Logo" className="h-10 w-10" />
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            DevHelperAI
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your AI-powered Dev Companion
          </p>
        </div>
      </NavLink>

      {/* Center - Navigation Buttons */}
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 mt-4 md:mt-0 md:gap-4 justify-center">
        {features.map((feature) => (
          <NavLink
            key={feature.path}
            to={feature.path}
            className={({ isActive }) =>
              `text-sm px-3 py-2 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700"
              }`
            }
          >
            {feature.label}
          </NavLink>
        ))}
      </div>

      {/* Right - Theme Toggle */}
      <div className="mt-4 md:mt-0">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
