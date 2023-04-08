import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors, fonts, fontFamilies } from "./design.config";

const rgb = (color: { r: number; g: number; b: number }) => [color.r, color.g, color.b].join(" ");

export default {
  darkMode: ["class", ".set-theme-dark"],
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      highlight: "rgb(var(--theme-color-highlight) / <alpha-value>)",
      light: "rgb(var(--theme-color-light) / <alpha-value>)",
      mid: "rgb(var(--theme-color-mid) / <alpha-value>)",
      dark: "rgb(var(--theme-color-dark) / <alpha-value>)",
      shade: "rgb(var(--theme-color-shade) / <alpha-value>)",
      black: "rgb(var(--theme-color-black) / <alpha-value>)",
      transparent: "transparent",
    },
    fontFamily: {
      body: "var(--theme-font-body)",
      headers: "var(--theme-font-headers)",
      mono: "var(--theme-font-mono)",
      realmono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace`,
      ...fonts,
    },
    screens: {
      hoverable: { raw: "(hover: hover)" },
      notHoverable: { raw: "(hover: none)" },
    },
    backdropBlur: {
      none: "0",
      sm: "0.1rem",
      DEFAULT: "0.2rem",
      md: "0.5rem",
      lg: "1rem",
    },
    borderWidth: {
      0: "0",
      2: "0.2rem",
      4: "0.4rem",
      8: "0.8rem",
      DEFAULT: "0.1rem",
    },
    outlineWidth: {
      0: "0",
      1: "0.15rem",
      2: "0.17rem",
    },
    outlineOffset: {
      0: "0",
      1: "0.15rem",
      2: "0.17rem",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.25rem",
      "4xl": "2rem",
      full: "9999rem",
    },
    boxShadow: {
      sm: "0 1px 2px 0",
      DEFAULT: ["0 1px 3px 0", "0 1px 2px -1px"].join(", "),
      md: ["0 4px 6px -1px", "0 1px 4px -2px"].join(", "),
      lg: ["0 10px 15px -3px", "0 0 6px -4px"].join(", "),
      xl: ["0 20px 25px -5px", "0 0 10px -6px"].join(", "),
      "2xl": ["0 25px 50px -5px", "0 15px 20px -5px"].join(", "),
      inner: "inset 0 2px 4px 0",
      "inner-sm": "inset 0 1px 4px -2px",
      none: "0 0 #0000",
    },
    dropShadow: {
      none: "0 0 var(--tw-raw-shadow-color)",
      sm: "0 2px 1px rgb(var(--tw-raw-shadow-color) / 0.5)",
      DEFAULT: [
        "0 1px 2px rgb(var(--tw-raw-shadow-color) / 0.1)",
        "0 1px 1px rgb(var(--tw-raw-shadow-color) / 0.6)",
      ],
      md: [
        "0 4px 3px rgb(var(--tw-raw-shadow-color) / 0.4)",
        "0 2px 2px rgb(var(--tw-raw-shadow-color) / 0.6)",
      ],
      lg: [
        "0 10px 8px rgb(var(--tw-raw-shadow-color) / 0.5)",
        "0 4px 4px rgb(var(--tw-raw-shadow-color) / 0.7)",
      ],
      xl: [
        "0 20px 13px rgb(var(--tw-raw-shadow-color) / 0.4)",
        "0 8px 8px rgb(var(--tw-raw-shadow-color) / 0.7)",
      ],
      "2xl": [
        "0 15px 16px rgb(var(--tw-raw-shadow-color) / 0.7)",
        "0 10px 8px rgb(var(--tw-raw-shadow-color) / 0.6)",
        "0 0px 2px rgb(var(--tw-raw-shadow-color) / 0.2)",
      ],
    },
    extend: {
      transitionProperty: {
        height: "height, max-height, min-height",
        filter: "filter, backdrop-filter",
        colors: `color, background-color, border-color,
          text-decoration-color, fill, stroke, outline-color`,
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [
    /* Add support for coloring drop shadows */
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          shadow: (value) => ({
            "--tw-raw-shadow-color": value.slice(4, value.length - 17),
          }),
        },
        { values: theme("boxShadowColor") }
      );
    }),

    /* Add support for scrollbar styling */
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: `rgb(var(--theme-color-dark)) transparent`,
          "&::-webkit-scrollbar": {
            width: theme("width.3"),
            height: theme("width.3"),
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(var(--theme-color-light))",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(var(--theme-color-dark))",
            borderRadius: theme("borderRadius.full"),
            borderWidth: theme("borderWidth.2"),
            borderColor: "rgb(var(--theme-color-light))",
            borderStyle: "solid",
          },
        },
      });
    }),

    /* Add custom animations */
    plugin(({ addComponents }) => {
      addComponents({
        ".animate-carret": {
          animationName: "blink",
          animationDuration: "1s",
          animationTimingFunction: "step-end",
          animationIterationCount: "infinite",
        },
        ".animate-zoom-in": {
          animationName: "zoom-in",
          animationDuration: "2s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "1",
        },
        "@keyframes blink": {
          from: {
            borderBottomStyle: "solid",
          },
          "50%": {
            borderBottomStyle: "none",
          },
          to: {
            borderBottomStyle: "solid",
          },
        },
        "@keyframes zoom-in": {
          from: {
            transform: "scale(0)",
          },
          to: {
            transform: "scale(1)",
          },
        },
      });
    }),

    /* CSS colors setters */
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

    /* CSS fonts setters */
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

    /* Linear background colors presets */
    plugin(({ addUtilities }) => {
      addUtilities({
        ".linearbg-obi": {
          background: `linear-gradient(
              to right,
              rgb(var(--theme-color-mid)),
              rgb(var(--theme-color-highlight)) 3%,
              rgb(var(--theme-color-highlight)) 97%,
              rgb(var(--theme-color-mid))
            )`,
        },
      });
    }),

    /* Webkit fixes */
    plugin(({ addUtilities }) => {
      addUtilities({
        ".webkit-fixes": {
          "*": {
            "--tw-drop-shadow": "unset !important",
            "--tw-shadow": "unset !important",
          },
          ".texture-paper-dots": {
            backgroundImage: "unset !important",
          },
        },
      });
    }),

    /* Add support for break-wrods CSS attribute */
    plugin(({ addUtilities }) => {
      addUtilities({
        ".break-words": {
          wordBreak: "break-word",
        },
      });
    }),

    /* Custom background texture */
    plugin(({ addUtilities }) => {
      addUtilities({
        ".texture-paper-dots": {
          backgroundSize: "10cm",
          backgroundAttachment: "local",
          backgroundImage: "var(--theme-texture-dots)",
          backgroundBlendMode: "var(--theme-texture-dots-blend)",
        },
      });
    }),
  ],
} satisfies Config;
