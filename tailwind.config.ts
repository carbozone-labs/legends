import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { xs: "390px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        obsidian: "rgb(var(--c-obsidian) / <alpha-value>)",
        charcoal: "rgb(var(--c-charcoal) / <alpha-value>)",
        slate: "rgb(var(--c-slate) / <alpha-value>)",
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        saffron: "rgb(var(--c-saffron) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        sky: "rgb(var(--c-sky) / <alpha-value>)",
        error: "rgb(var(--c-error) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        deva: ["var(--font-deva)", "'Noto Serif Devanagari'", "'Nirmala UI'", "serif"],
      },
      maxWidth: { content: "var(--w-content)", prose: "38rem" },
      transitionTimingFunction: { cinematic: "cubic-bezier(0.22, 1, 0.36, 1)" },
      transitionDuration: { fast: "var(--d-fast)", base: "var(--d-base)", slow: "var(--d-slow)" },
      boxShadow: { lift: "0 24px 60px -24px rgb(0 0 0 / 0.7)", glow: "0 0 0 1px rgb(var(--c-gold) / 0.5), 0 18px 50px -20px rgb(var(--c-saffron) / 0.45)" },
    },
  },
  plugins: [],
};
export default config;
