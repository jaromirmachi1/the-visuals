import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#ff6a00",
          600: "#e55a00",
          400: "#ff8a33",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 5px #ff6a00, 0 0 10px #ff6a00, 0 0 15px #ff6a00",
          },
          "100%": {
            boxShadow: "0 0 10px #ff6a00, 0 0 20px #ff6a00, 0 0 30px #ff6a00",
          },
        },
      },
    },
  },
});
