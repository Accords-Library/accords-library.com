const plugin = require("tailwindcss/plugin");

/* CONFIG */

const light = { r: 255, g: 237, b: 216 };
const mid = { r: 240, g: 209, b: 179 };
const dark = { r: 156, g: 102, b: 68 };
const shade = { r: 156, g: 102, b: 68 };
const black = { r: 27, g: 24, b: 17 };

const dark_light = { r: 38, g: 34, b: 30 };
const dark_mid = { r: 57, g: 45, b: 34 };
const dark_dark = { r: 192, g: 132, b: 94 };
const dark_shade = { r: 12, g: 6, b: 4 };
const dark_black = { r: 235, g: 234, b: 231 };

const breakDektop = { min: "60rem" };
const breakMobile = { max: "60rem" };
const breakThin = { max: "25rem" };

/* END CONFIG */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      light: `rgb(${light.r}, ${light.g}, ${light.b})`,
      mid: `rgb(${mid.r}, ${mid.g}, ${mid.b})`,
      dark: `rgb(${dark.r}, ${dark.g}, ${dark.b})`,
      shade: `rgb(${shade.r}, ${shade.g}, ${shade.b})`,
      black: `rgb(${black.r}, ${black.g}, ${black.b})`,

      // Dark mode

      "dark-light": `rgb(${dark_light.r}, ${dark_light.g}, ${dark_light.b})`,
      "dark-mid": `rgb(${dark_mid.r}, ${dark_mid.g}, ${dark_mid.b})`,
      "dark-dark": `rgb(${dark_dark.r}, ${dark_dark.g}, ${dark_dark.b})`,
      "dark-shade": `rgb(${dark_shade.r}, ${dark_shade.g}, ${dark_shade.b})`,
      "dark-black": `rgb(${dark_black.r}, ${dark_black.g}, ${dark_black.b})`,
    },
    fontFamily: {
      body: ["Zen Maru Gothic"],
      headers: ["Vollkorn"],
      monospace: ["monospace"],
    },
    screens: {
      desktop: breakDektop,
      mobile: breakMobile,
      thin: breakThin,
      coarse: { raw: "(pointer: coarse)" },
      fine: { raw: "(pointer: fine)" },
    },
    backgroundImage: {
      paper: "url('/paper.webp')",
      "dark-paper": "url('/paper.webp')",
    },
    extend: {
      boxShadow: {
        "inner-sm": "inset 0 1px 4px -2px",
      },
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
          filter: getFilterRecipe(light),
        },
        ".colorize-mid": {
          filter: getFilterRecipe(mid),
        },
        ".colorize-dark": {
          filter: getFilterRecipe(dark),
        },
        ".colorize-black": {
          filter: getFilterRecipe(black),
        },

        // Dark mode

        ".colorize-dark-light": {
          filter: getFilterRecipe(dark_light),
        },
        ".colorize-dark-mid": {
          filter: getFilterRecipe(dark_mid),
        },
        ".colorize-dark-dark": {
          filter: getFilterRecipe(dark_dark),
        },
        ".colorize-dark-black": {
          filter: getFilterRecipe(dark_black),
        },
      });
    }),

    // Colored Dropshadow
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".drop-shadow-shade-md": {
          filter: `drop-shadow(0 4px 3px rgb(${shade.r} ${shade.g} ${shade.b} / 0.15)) drop-shadow(0 2px 2px rgb(${shade.r} ${shade.g} ${shade.b} / 0.2))`,
        },
        ".drop-shadow-shade-lg": {
          filter: `drop-shadow(0 10px 8px rgb(${shade.r} ${shade.g} ${shade.b} / 0.2)) drop-shadow(0 4px 3px rgb(${shade.r} ${shade.g} ${shade.b} / 0.4))`,
        },
        ".drop-shadow-shade-xl": {
          filter: `drop-shadow(0 20px 13px rgb(${shade.r} ${shade.g} ${shade.b} / 0.25)) drop-shadow(0 8px 5px rgb(${shade.r} ${shade.g} ${shade.b} / 0.7))`,
        },
        ".drop-shadow-shade-2xl": {
          filter: `drop-shadow(0 25px 25px rgb(${shade.r} ${shade.g} ${shade.b} / 0.8))`,
        },

        ".drop-shadow-black-md": {
          filter: `drop-shadow(0 4px 3px rgb(${black.r} ${black.g} ${black.b} / 0.15)) drop-shadow(0 2px 2px rgb(${black.r} ${black.g} ${black.b} / 0.2))`,
        },
        ".drop-shadow-black-lg": {
          filter: `drop-shadow(0 10px 8px rgb(${black.r} ${black.g} ${black.b} / 0.2)) drop-shadow(0 4px 3px rgb(${black.r} ${black.g} ${black.b} / 0.4))`,
        },
        ".drop-shadow-black-xl": {
          filter: `drop-shadow(0 20px 13px rgb(${black.r} ${black.g} ${black.b} / 0.25)) drop-shadow(0 8px 5px rgb(${black.r} ${black.g} ${black.b} / 0.7))`,
        },
        ".drop-shadow-black-2xl": {
          filter: `drop-shadow(0 25px 25px rgb(${black.r} ${black.g} ${black.b} / 0.8))`,
        },

        // Dark mode

        ".drop-shadow-dark-shade-md": {
          filter: `drop-shadow(0 4px 3px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.15)) drop-shadow(0 2px 2px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.2))`,
        },
        ".drop-shadow-dark-shade-lg": {
          filter: `drop-shadow(0 10px 8px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.2)) drop-shadow(0 4px 3px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.4))`,
        },
        ".drop-shadow-dark-shade-xl": {
          filter: `drop-shadow(0 20px 13px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.25)) drop-shadow(0 8px 5px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.7))`,
        },
        ".drop-shadow-dark-shade-2xl": {
          filter: `drop-shadow(0 25px 25px rgb(${dark_shade.r} ${dark_shade.g} ${dark_shade.b} / 0.8))`,
        },

        ".drop-shadow-dark-black-md": {
          filter: `drop-shadow(0 4px 3px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.15)) drop-shadow(0 2px 2px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.2))`,
        },
        ".drop-shadow-dark-black-lg": {
          filter: `drop-shadow(0 10px 8px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.2)) drop-shadow(0 4px 3px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.4))`,
        },
        ".drop-shadow-dark-black-xl": {
          filter: `drop-shadow(0 20px 13px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.25)) drop-shadow(0 8px 5px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.7))`,
        },
        ".drop-shadow-dark-black-2xl": {
          filter: `drop-shadow(0 25px 25px rgb(${dark_black.r} ${dark_black.g} ${dark_black.b} / 0.8))`,
        },
      });
    }),

    plugin(function ({ addUtilities }) {
      addUtilities({
        ".linearbg-obi": {
          background:
            "linear-gradient(to right, theme('colors.mid'), theme('colors.light') 3%, theme('colors.light') 97%, theme('colors.mid'))",
        },
        ".linearbg-dark-obi": {
          background:
            "linear-gradient(to right, theme('colors.dark-mid'), theme('colors.dark-light') 3%, theme('colors.dark-light') 97%, theme('colors.dark-mid'))",
        },
      });
    }),
  ],
};

/*
The following is taken from https://codepen.io/sosuke/pen/Pjoqqp
Used for colorizing any element using filters. 
*/

function getFilterRecipe(rgb) {
  const color = new FilterColorTransform(rgb.r, rgb.g, rgb.b);
  const solver = new Solver(color);
  const result = solver.solve();
  return result;
}

class FilterColorTransform {
  constructor(r, g, b) {
    this.set(r, g, b);
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = (angle / 180) * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.14,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(
      this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]
    );
    const newG = this.clamp(
      this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]
    );
    const newB = this.clamp(
      this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]
    );
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + (this.r / 255) * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + (this.g / 255) * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + (this.b / 255) * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;

        case g:
          h = (b - r) / d + 2;
          break;

        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 100,
      s: s * 100,
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new FilterColorTransform(0, 0, 0);
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return this.css(result.values);
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = (lossDiff / (2 * ck)) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
        if (value > max) {
          value %= max;
        } else if (value < 0) {
          value = max + (value % max);
        }
      } else if (value < 0) {
        value = 0;
      } else if (value > max) {
        value = max;
      }
      return value;
    }
  }

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `
    brightness(0)
    saturate(100%)
    invert(${fmt(0)}%)
    sepia(${fmt(1)}%)
    saturate(${fmt(2)}%)
    hue-rotate(${fmt(3, 3.6)}deg)
    brightness(${fmt(4)}%)
    contrast(${fmt(5)}%);
    `;
  }
}
