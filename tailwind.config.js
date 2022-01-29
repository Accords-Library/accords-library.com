const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      light: "#ffedd8",
      mid: "#f0d1b3",
      dark: "#9c6644",
      black: "#1B1811",
    },
    fontFamily: {
      body: ["Zen Maru Gothic"],
      headers: ["Vollkorn"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),

    plugin(function ({ addVariant, e }) {
      addVariant("webkit-scrollbar", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `webkit-scrollbar${separator}${className}`
          )}::-webkit-scrollbar`;
        });
      });
    }),

    // Colorization thanks to https://codepen.io/sosuke/pen/Pjoqqp
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".colorize-light": {
          filter:
            "brightness(0) saturate(100%) invert(98%) sepia(3%) saturate(5426%) hue-rotate(303deg) brightness(108%) contrast(100%)",
        },
        ".colorize-mid": {
          filter:
            "brightness(0) saturate(100%) invert(89%) sepia(16%) saturate(829%) hue-rotate(322deg) brightness(103%) contrast(88%)",
        },
        ".colorize-dark": {
          filter:
            "brightness(0) saturate(100%) invert(43%) sepia(5%) saturate(4120%) hue-rotate(339deg) brightness(98%) contrast(90%)",
        },
        ".colorize-black": {
          filter:
            "brightness(0) saturate(100%) invert(7%) sepia(13%) saturate(1156%) hue-rotate(4deg) brightness(103%) contrast(95%)",
        },
      });
    }),

    plugin(function ({ addUtilities }) {
      addUtilities({
        ".linearbg-1": {
          background:
            "linear-gradient(to right, theme('colors.mid'), theme('colors.light') 3%, theme('colors.light') 97%, theme('colors.mid'))",
        },
      });
    }),
  ],
};
