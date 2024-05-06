import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        revealed: {
          "0%": { opacity: "1" },
          "60%": { opacity: "0.3" },
          "80%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
        error: {
          "0%": { opacity: "1", backgroundColor: "#f87171" },
          "60%": { opacity: "0.3" },
          "80%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        revealed: "revealed 1.5s cubic-bezier(0.4, 0, 0.6, 1)",
        error: "error 0.5s cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
