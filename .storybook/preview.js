import { themes } from "@storybook/theming";
import "tailwindcss/tailwind.css";
import "../src/tailwind.css";

const light = { r: 255, g: 237, b: 216 };
const dark_light = { r: 38, g: 34, b: 30 };

function color(color) {
  return `rgb(${color.r},${color.g},${color.b})`;
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: null,
    values: [
      {
        name: "Light",
        value: color(light),
      },
      {
        name: "Dark",
        value: color(dark_light),
      },
    ],
  },
  layout: "centered",
  darkMode: {
    dark: {
      ...themes.dark,
    },
    light: {
      ...themes.normal,
    },
    stylePreview: true,
    darkClass: "set-theme-dark",
    lightClass: "set-theme-light",
  },
};

document.body.onload = function () {
  document.body.classList.add("bg-light");
};
