import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1E00DC",
          yellow: "#FFE600",
        },
      },
      fontFamily: {
        sans: ["var(--font-zen-kaku)", "sans-serif"],
        heading: ["var(--font-chakra-petch)", "var(--font-zen-kaku)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 70s linear infinite",
        ripple: "ripple 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
