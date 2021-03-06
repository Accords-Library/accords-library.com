/* CONFIG */

const locales = ["en", "es", "fr", "pt-br", "ja"];

/* END CONFIG */

/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: locales,
    defaultLocale: "en",
  },
  images: {
    domains: ["img.accords-library.com", "watch.accords-library.com"],
  },
  serverRuntimeConfig: {
    locales: locales,
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.com/invite/5mcXcRAczj",
        permanent: false,
      },
      {
        source: "/gallery",
        destination: "https://gallery.accords-library.com/posts",
        permanent: false,
      },
    ];
  },
};
