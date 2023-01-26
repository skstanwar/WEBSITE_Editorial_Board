module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#164E63",
        secondary: "#F26C6C",
      },
    },
    fontFamily: {
      sans: ["Poppins", "ui-sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
