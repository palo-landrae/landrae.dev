module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mplusrounded: ["'M Plus Rounded 1c'"],
        kodchasan: ["'Kodchasan'"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
