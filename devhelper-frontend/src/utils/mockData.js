export const mockData = {
  codeExplainer: {
    summary: "This is an asynchronous Express.js middleware sequence designed to secure routes by validating JSON Web Tokens (JWT). It decodes client request headers and attaches validated user sessions to the active request context.",
    key_components: [
      "jsonwebtoken (jwt.verify)",
      "Authorization Header Parsing",
      "Asynchronous Error Catch Blocks",
      "Express Request Context Lifecycle Expansion"
    ],
    detailed_explanation: "The module extracts the token string using a split operation on the 'Bearer ' schema string. If present, it computes the cryptographic verification against the process environment secret string. If signature matching fails or expiration criteria match, it throws a 401 unauthorized code block stopping downstream middleware chain progression."
  },

  boilerplateGenerator: {
    code: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
    language: "python"
  },

  codeCanvas: {
    backend: "POST /api/v1/auth/login - payload: {email, password} -> returns JWT\nGET /api/v1/dashboard - authenticates headers -> returns system metrics array",
    frontend: "import React from 'react';\nexport const LoginCard = () => {\n  return (\n    <div className='backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl'>\n      <input type='email' className='w-full bg-transparent border border-white/10 p-3 rounded-xl' />\n    </div>\n  );\n};"
  },

  codeRefactorer: {
    refactored_code: "const calculateTotal = (items) => {\n  return items\n    .filter(item => item.isActive)\n    .reduce((sum, item) => sum + (item.price * item.quantity), 0);\n};",
    detected_language: "javascript",
    changes_made: [
      "Converted imperative iterative loop logic into declarative functional method chain pipeline",
      "Eliminated redundant intermediate variable allocations lowering memory mutations",
      "Added strict inline parameter type assumptions and active validation boundaries"
    ]
  },

  directoryAnalyser: {
    project_summary: "A production-ready decoupled full-stack asynchronous web portal application.",
    use_case: "Automated developer tooling, workspace productivity maximization, and codebase auditing workflows.",
    file_explanations: [
      { file_path: "src/components/", explanation: "Shared atomic presentational interface layouts and design assets." },
      { file_path: "src/utils/api.js", explanation: "Centralized client communication wrapper containing network interrupters and mock fallbacks." },
      { file_path: "src/pages/", explanation: "High level routing destinations coordinating visual feature bundles." }
    ],
    architecture_notes: "The architecture adheres to explicit decoupling boundaries. Presentation layers consume structural objects from functional data utilities without local business logic state pollution."
  },

  readmeInsights: {
    project_summary: "An optimized automated documentation system engineered using Python and asynchronous FastAPI servers.",
    key_features: [
      "Automated markdown abstract layout generation",
      "Contextual keyword evaluation scoring vectors",
      "Interactive structural component outline building"
    ],
    tech_stack: ["FastAPI", "Pydantic v2", "LangChain Core", "TailwindCSS v3"],
    missing_info: [
      "Missing automated multi-environment configuration instructions (.env layout examples)",
      "Incomplete test coverage execution workflow descriptions"
    ],
    readability_score: 8,
    additional_notes: "The overall documentation clarity matches corporate standards but would benefit from integrated automated visual flow diagrams."
  }
};