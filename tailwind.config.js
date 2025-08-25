/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      prussianBlue: "#0B3954",
      teal: "#087E8B",
      columbiaBlue: "#BFD7EA",
      citron: "#1376f4",
      bittersweet: "#E3655B",
      asparagus: "#6DA34D",
    },
    extend: {},
  },
  plugins: [],
};
