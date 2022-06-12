const colors = {
  light: {
    hightlight: { r: 255, g: 241, b: 224 },
    light: { r: 255, g: 237, b: 216 },
    mid: { r: 240, g: 209, b: 179 },
    dark: { r: 156, g: 102, b: 68 },
    shade: { r: 156, g: 102, b: 68 },
    black: { r: 27, g: 24, b: 17 },
  },
  dark: {
    highlight: { r: 44, g: 40, b: 37 },
    light: { r: 38, g: 34, b: 30 },
    mid: { r: 57, g: 45, b: 34 },
    dark: { r: 192, g: 132, b: 94 },
    shade: { r: 0, g: 0, b: 0 },
    black: { r: 235, g: 234, b: 231 },
  },
};

const breaks = {
  thin: { raw: "(max-width: 25rem)" },
  mobile: { raw: "(max-width: 60rem)" },
  desktop: { raw: "(min-width: 60rem)" },
};

const fonts = {
  openDyslexic: "OpenDyslexic",
  vollkorn: "Vollkorn",
  zenMaruGothic: "Zen Maru Gothic",
  shareTechMono: "Share Tech Mono",
};

const fontFamilies = {
  standard: {
    body: fonts.zenMaruGothic,
    headers: fonts.vollkorn,
    mono: fonts.shareTechMono,
  },
  dyslexic: {
    body: fonts.openDyslexic,
    headers: fonts.openDyslexic,
    mono: fonts.shareTechMono,
  },
};

module.exports = {
  colors,
  breaks,
  fonts,
  fontFamilies,
};
