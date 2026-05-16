/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(99,102,241,0.45)",
        "glow-pink": "0 10px 30px -10px rgba(217,70,239,0.45)",
        soft: "0 4px 20px -4px rgba(15,23,42,0.08)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#d946ef 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg,#eef2ff 0%,#f5f3ff 50%,#fdf4ff 100%)",
        "gradient-success": "linear-gradient(135deg,#10b981 0%,#34d399 100%)",
        "gradient-warn": "linear-gradient(135deg,#f59e0b 0%,#fbbf24 100%)",
        "gradient-danger": "linear-gradient(135deg,#ef4444 0%,#f97316 100%)",
        "gradient-blue": "linear-gradient(135deg,#3b82f6 0%,#06b6d4 100%)",
        "gradient-mesh":
          "radial-gradient(at 20% 20%,#c7d2fe 0%,transparent 50%),radial-gradient(at 80% 0%,#fae8ff 0%,transparent 50%),radial-gradient(at 0% 100%,#cffafe 0%,transparent 50%),radial-gradient(at 100% 100%,#fce7f3 0%,transparent 50%)",
        "gradient-mesh-dark":
          "radial-gradient(at 20% 20%,#312e81 0%,transparent 50%),radial-gradient(at 80% 0%,#581c87 0%,transparent 50%),radial-gradient(at 0% 100%,#164e63 0%,transparent 50%),radial-gradient(at 100% 100%,#831843 0%,transparent 50%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "pop-in": "pop-in 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
