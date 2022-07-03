const plugin = require("tailwindcss/plugin");
const { breaks, colors, fonts, fontFamilies } = require("./design.config.js");

const rgb = (color) => [color.r, color.g, color.b].join(" ");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      highlight: "rgb(var(--theme-color-highlight) / <alpha-value>)",
      light: "rgb(var(--theme-color-light) / <alpha-value>)",
      mid: "rgb(var(--theme-color-mid) / <alpha-value>)",
      dark: "rgb(var(--theme-color-dark) / <alpha-value>)",
      shade: "rgb(var(--theme-color-shade) / <alpha-value>)",
      black: "rgb(var(--theme-color-black) / <alpha-value>)",
    },
    fontFamily: {
      body: "var(--theme-font-body)",
      headers: "var(--theme-font-headers)",
      mono: "var(--theme-font-mono)",
      ...fonts,
    },
    screens: {
      desktop: breaks.desktop,
      mobile: breaks.mobile,
      thin: breaks.thin,
      hoverable: { raw: "(hover: hover)" },
      notHoverable: { raw: "(hover: none)" },
    },
    extend: {
      boxShadow: {
        "inner-sm": "inset 0 1px 4px -2px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".set-theme-light": {
          "--theme-color-highlight": rgb(colors.light.hightlight),
          "--theme-color-light": rgb(colors.light.light),
          "--theme-color-mid": rgb(colors.light.mid),
          "--theme-color-dark": rgb(colors.light.dark),
          "--theme-color-shade": rgb(colors.light.shade),
          "--theme-color-black": rgb(colors.light.black),
          "--theme-texture-dots": `url("/paper-dots.webp")`,
          "--theme-texture-dots-blend": `multiply`,
        },
        ".set-theme-dark": {
          "--theme-color-highlight": rgb(colors.dark.highlight),
          "--theme-color-light": rgb(colors.dark.light),
          "--theme-color-mid": rgb(colors.dark.mid),
          "--theme-color-dark": rgb(colors.dark.dark),
          "--theme-color-shade": rgb(colors.dark.shade),
          "--theme-color-black": rgb(colors.dark.black),
          "--theme-texture-dots": `url("/paper-dots-dark.webp")`,
          "--theme-texture-dots-blend": `overlay`,
        },
      });
    }),

    plugin(({ addUtilities }) => {
      addUtilities({
        ".set-theme-font-standard": {
          "--theme-font-body": fontFamilies.standard.body,
          "--theme-font-headers": fontFamilies.standard.headers,
          "--theme-font-mono": fontFamilies.standard.mono,
        },
        ".set-theme-font-dyslexic": {
          "--theme-font-body": fontFamilies.dyslexic.body,
          "--theme-font-headers": fontFamilies.dyslexic.headers,
          "--theme-font-mono": fontFamilies.dyslexic.mono,
        },
      });
    }),

    plugin(({ addVariant, e }) => {
      addVariant("webkit-scrollbar", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `webkit-scrollbar${separator}${className}`
          )}::-webkit-scrollbar`;
        });
      });
    }),

    // Colored Dropshadow
    plugin(({ addUtilities }) => {
      addUtilities({
        ".drop-shadow-shade-md": {
          filter: `
          drop-shadow(0 4px 3px rgb(var(--theme-color-shade) / 0.15))
          drop-shadow(0 2px 2px rgb(var(--theme-color-shade) / 0.2))`,
        },
        ".drop-shadow-shade-lg": {
          filter: `
          drop-shadow(0 10px 8px rgb(var(--theme-color-shade) / 0.2))
          drop-shadow(0 4px 3px rgb(var(--theme-color-shade) / 0.4))`,
        },
        ".drop-shadow-shade-xl": {
          filter: `
          drop-shadow(0 20px 13px rgb(var(--theme-color-shade) / 0.25))
          drop-shadow(0 8px 5px rgb(var(--theme-color-shade) / 0.7))`,
        },
        ".drop-shadow-shade-2xl": {
          filter: `drop-shadow(0 25px 25px rgb(var(--theme-color-shade) / 0.8))`,
        },

        ".drop-shadow-black-md": {
          filter: `
          drop-shadow(0 4px 3px rgb(var(--theme-color-black) / 0.15))
          drop-shadow(0 2px 2px rgb(var(--theme-color-black) / 0.2))`,
        },
        ".drop-shadow-black-lg": {
          filter: `
          drop-shadow(0 10px 8px rgb(var(--theme-color-black) / 0.2))
          drop-shadow(0 4px 3px rgb(var(--theme-color-black) / 0.4))`,
        },
        ".drop-shadow-black-xl": {
          filter: `
          drop-shadow(0 20px 13px rgb(var(--theme-color-black) / 0.25))
          drop-shadow(0 8px 5px rgb(var(--theme-color-black) / 0.7))`,
        },
        ".drop-shadow-black-2xl": {
          filter: `drop-shadow(0 25px 25px rgb(var(--theme-color-black) / 0.8))`,
        },
      });
    }),

    plugin(({ addUtilities }) => {
      addUtilities({
        ".linearbg-obi": {
          background: `linear-gradient(
              to right,
              rgb(var(--theme-color-mid)),
              rgb(var(--theme-color-light)) 3%,
              rgb(var(--theme-color-light)) 97%,
              rgb(var(--theme-color-mid))
            )`,
        },
      });
    }),

    plugin(({ addUtilities }) => {
      addUtilities({
        ".break-words": {
          "word-break": "break-word",
        },
      });
    }),
  ],
};
