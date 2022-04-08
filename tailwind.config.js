module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "offwhite": {
          50: "#e4e6eb",
          100: "#b0b3b8"
        },
        "primary-dark": "#18191a",
        "secondary-dark": "#242526",
        "tertiary-dark": "#3a3b3c",
      }
    },
  },
  plugins: [],
}
