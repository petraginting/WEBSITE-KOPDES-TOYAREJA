/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e3f7a",
          900: "#1e3a8a",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#f0c84a",
        },
        cream: "#fdfaf4",
        dark: "#0f172a",
        mid: "#334155",
        light: "#64748b",
        border: "#e2e8f0",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Lato", "serif"],
      },
      animation: {
        fadeInUp: "fadeInUp 0.35s ease forwards",
        scaleIn: "scaleIn 0.25s ease",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.93)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
