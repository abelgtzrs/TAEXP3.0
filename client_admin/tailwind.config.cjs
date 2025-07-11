// This file should use module.exports because of the .cjs extension
module.exports = {
  // This 'content' array is crucial. It tells Tailwind to look for class names
  // in all of your .html and .jsx files inside the src directory.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0D1117",
        surface: "#161B22",
        primary: "#1374cf",
        secondary: "#1374cf",
        "text-main": "#ffffff",
        "text-secondary": "#9CA3AF",
        "text-tertiary": "#fff",
        "status-success": "#22c55e",
        "status-warning": "#facc15",
        "status-danger": "#ef4444",
        "status-info": "#38bdf8",
      },
      boxShadow: {
        "glow-primary": "0 0 12px 0 rgba(45, 212, 191, 0.5)",
      },
    },
  },
  plugins: [],
};
