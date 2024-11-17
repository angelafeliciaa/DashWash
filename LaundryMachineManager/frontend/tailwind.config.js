/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "h1-xl": "36px",
        "p-xl": "24px",
        "small-xl": "16px",
      },
      colors: {
        "p-gray": "#2E2E2E",
        widget: "#F3F3F3",
      },
    },
  },
  plugins: [],
};
