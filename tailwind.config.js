module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    colors: {
      light: "#ffedd8",
      base: "#e6ccb2",
      dark: "#9c6644",
      black: "#1B1811",
    },
    extend: {
      gridTemplateColumns: {
        appDefault: "20rem",
        appUseSub: "20rem 20rem",
        appUseContent: "20rem 1fr",
        appUseSubContent: "20rem 20rem 1fr",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
