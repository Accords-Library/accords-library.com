const plugin = require("tailwindcss/plugin");

/* CONFIG */

const hightlight = { r: 255, g: 241, b: 224 };
const light = { r: 255, g: 237, b: 216 };
const mid = { r: 240, g: 209, b: 179 };
const dark = { r: 156, g: 102, b: 68 };
const shade = { r: 156, g: 102, b: 68 };
const black = { r: 27, g: 24, b: 17 };

const dark_highlight = { r: 44, g: 40, b: 37 };
const dark_light = { r: 38, g: 34, b: 30 };
const dark_mid = { r: 57, g: 45, b: 34 };
const dark_dark = { r: 192, g: 132, b: 94 };
const dark_shade = { r: 0, g: 0, b: 0 };
const dark_black = { r: 235, g: 234, b: 231 };

const breakDektop = { min: "60rem" };
const breakMobile = { max: "60rem" };
const breakThin = { max: "25rem" };

const fontStandard = {
  body: "Zen Maru Gothic",
  headers: "Vollkorn",
  monospace: "monospace",
};
const fontDyslexic = {
  body: "OpenDyslexic",
  headers: "OpenDyslexic",
  monospace: "monospace",
};

/* END CONFIG */

function rgb(color) {
  return [color.r, color.g, color.b].join(" ");
}

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
      body: ["var(--theme-font-body)"],
      headers: ["var(--theme-font-headers)"],
      monospace: ["var(--theme-font-monospace)"],
      openDyslexic: ["OpenDyslexic"],
      zenMaruGothic: ["Zen Maru Gothic"],
    },
    screens: {
      desktop: breakDektop,
      mobile: breakMobile,
      thin: breakThin,
      hoverable: { raw: "(hover: hover)" },
      notHoverable: { raw: "(hover: hover)" },
    },
    extend: {
      boxShadow: {
        "inner-sm": "inset 0 1px 4px -2px",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".set-theme-light": {
          "--theme-color-highlight": rgb(hightlight),
          "--theme-color-light": rgb(light),
          "--theme-color-mid": rgb(mid),
          "--theme-color-dark": rgb(dark),
          "--theme-color-shade": rgb(shade),
          "--theme-color-black": rgb(black),
          "--theme-texture-dots": `url("/paper-dots.webp")`,
          "--theme-texture-dots-blend": `multiply`,
        },
        ".set-theme-dark": {
          "--theme-color-highlight": rgb(dark_highlight),
          "--theme-color-light": rgb(dark_light),
          "--theme-color-mid": rgb(dark_mid),
          "--theme-color-dark": rgb(dark_dark),
          "--theme-color-shade": rgb(dark_shade),
          "--theme-color-black": rgb(dark_black),
          "--theme-texture-dots": `url("/paper-dots-dark.webp")`,
          "--theme-texture-dots-blend": `overlay`,
        },
      });
    }),

    plugin(function ({ addUtilities }) {
      addUtilities({
        ".set-theme-font-standard": {
          "--theme-font-body": fontStandard.body,
          "--theme-font-headers": fontStandard.headers,
          "--theme-font-monospace": fontStandard.monospace,
        },
        ".set-theme-font-dyslexic": {
          "--theme-font-body": fontDyslexic.body,
          "--theme-font-headers": fontDyslexic.headers,
          "--theme-font-monospace": fontStandard.monospace,
        },
      });
    }),

    plugin(function ({ addVariant, e }) {
      addVariant("webkit-scrollbar", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `webkit-scrollbar${separator}${className}`
          )}::-webkit-scrollbar`;
        });
      });
    }),

    // Colored Dropshadow
    plugin(function ({ addUtilities }) {
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

    plugin(function ({ addUtilities }) {
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

    plugin(function ({ addUtilities }) {
      addUtilities({
        ".break-words": {
          "word-break": "break-word",
        },
      });
    }),
  ],
};
