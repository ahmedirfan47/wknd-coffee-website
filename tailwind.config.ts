import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // PRIMARY — WKND Sage Green (from logo)
        pink: {
          50:  "#F1F5EE",
          100: "#DFE9D9",
          200: "#BDD3B3",
          300: "#9ABD8D",
          400: "#7AA76A",
          500: "#7D9D6A",  // exact WKND logo sage
          600: "#6B8F5A",  // CTA buttons
          700: "#567347",
          800: "#415935",
          900: "#2C3D23",
        },
        // SECONDARY — Warm caramel
        pistachio: {
          50:  "#FDF8F0",
          100: "#FAF0DA",
          200: "#F4DCB0",
          300: "#ECC680",
          400: "#E2B050",
          500: "#C89530",
          600: "#A67A28",
          700: "#7E5C20",
          800: "#564018",
          900: "#3A2A10",
        },
        // BACKGROUND — WKND warm parchment
        cream:       "#F0E8D5",
        "cream-200": "#E5D5BE",
        // TEXT — espresso brown
        charcoal: {
          DEFAULT: "#2C1A0E",
          600:     "#4A3728",
          400:     "#7A6558",
          200:     "#BCA898",
        },
        // WKND named palette
        sage:  "#7D9D6A",
        "sage-dark": "#4A6040",
        "wknd-cream": "#F0E8D5",
        "wknd-brown": "#4A3728",
        "wknd-pink":  "#F0C5C5",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
        mono:    ["Space Grotesk", "monospace"],
      },
      boxShadow: {
        soft:  "0 2px 20px rgba(44, 26, 14, 0.08)",
        hover: "0 8px 40px rgba(44, 26, 14, 0.16)",
        sage:  "0 4px 24px rgba(107, 143, 90, 0.30)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;