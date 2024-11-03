/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        purple: "#9C7EE6",
        blue: "#2F4FCD",
      },
    },
  },
  plugins: [],
};
