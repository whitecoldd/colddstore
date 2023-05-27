/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        burtons: "burtons",
        ananda: "ananda",
        roboto: "Roboto Condensed",
      },
      flex: { 2: "2 2 0%", 3: "3 3 0%" },
    },
  },
  plugins: [],
};
