import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0e11",
        panel: "#15171c",
        line: "#262a33",
        accent: "#ccff00",
        muted: "#8b909c",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        toastIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { toastIn: "toastIn .25s ease-out" },
    },
  },
  plugins: [],
};
export default config;
