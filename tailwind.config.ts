import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0b1220",
        panel: "#111a2b",
        line: "#22304a",
        accent: "#5eead4",
        accentSoft: "#99f6e4",
        text: "#e5eefb",
        muted: "#9fb0c7"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(94, 234, 212, 0.12)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(159, 176, 199, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(159, 176, 199, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
