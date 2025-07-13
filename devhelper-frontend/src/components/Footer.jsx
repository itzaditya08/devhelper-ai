// src/components/Footer.jsx
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center bg-gray-100 dark:bg-gray-900 p-4 mt-8">
      {/* Left - Logo and Tagline */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="DevHelperAI Logo" className="h-8 w-8" />
        <div>
          <h1 className="text-md font-semibold text-gray-800 dark:text-white">
            DevHelperAI
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your AI-powered Dev Companion
          </p>
        </div>
      </div>

      {/* Right - Credit */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 md:mt-0">
        Made with ❤️ by Aditya Maurya
      </p>
    </footer>
  );
};

export default Footer;
