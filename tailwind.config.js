const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      light: "#ffedd8",
      mid: "#e6ccb2",
      dark: "#9c6644",
      black: "#1B1811",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function({ addVariant, e }) {
      addVariant('webkit-scrollbar', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`webkit-scrollbar${separator}${className}`)}::-webkit-scrollbar`
        })
      })
    })
  ],
};
