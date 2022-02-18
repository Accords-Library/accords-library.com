const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      light: "rgb(255, 237, 216)",
      mid: "rgb(240, 209, 179)",
      dark: "rgb(156, 102, 68)",
      black: "rgb(27, 24, 17)",
    },
    fontFamily: {
      body: ["Zen Maru Gothic"],
      headers: ["Vollkorn"],
      monospace: ["monospace"],
    },
    screens: {
      desktop: { min: "150ch" },
      mobile: { max: "150ch" },
      thin: { max: "50ch" },
      coarse: { raw: "(pointer: coarse)" },
      fine: { raw: "(pointer: fine)" },
    },
    backgroundImage: {
      paper: "url('/paper_white.webp')",
    }
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

    // Colored Dropshadow
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drop-shadow-dark-lg": {
          filter:
            "drop-shadow(0 10px 8px rgb(156 102 68 / 0.2)) drop-shadow(0 4px 3px rgb(156 102 68 / 0.8))",
        },
        ".drop-shadow-dark-xl": {
          filter:
            "drop-shadow(0 20px 13px rgb(156 102 68 / 0.25)) drop-shadow(0 8px 5px rgb(156 102 68 / 0.7))",
        },
        ".drop-shadow-dark-2xl": {
          filter: "drop-shadow(0 25px 25px rgb(156 102 68 / 0.8))",
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
