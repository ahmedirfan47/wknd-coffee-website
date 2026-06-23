import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50:  "#FDF5F0",
          100: "#FAE6D6",
          200: "#F5CCAD",
          300: "#EFAF84",
          400: "#E8915A",
          500: "#D97035",
          600: "#C05A28",
          700: "#9A451E",
          800: "#743215",
          900: "#4E200D",
        },
        pistachio: {
          50:  "#FDF8EC",
          100: "#FAEECC",
          200: "#F5DD99",
          300: "#EFCC66",
          400: "#E9BB33",
          500: "#C89B18",
          600: "#A67D13",
          700: "#80600E",
          800: "#5A4308",
          900: "#3A2B04",
        },
        cream:      "#FBF5EE",
        "cream-200":"#F2E8D8",
        charcoal: {
          DEFAULT: "#2A1A0E",
          600:     "#5C3D22",
          400:     "#8C6645",
          200:     "#BCA080",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft:  "0 2px 20px rgba(42,26,14,0.08)",
        hover: "0 8px 40px rgba(42,26,14,0.14)",
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
