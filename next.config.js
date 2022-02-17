/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "ja", "es", "xx"],
    defaultLocale: "en",
  },
  images: {
    domains: ["strapi.accords-library.com"],
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.com/invite/5mcXcRAczj",
        permanent: false,
      },
    ];
  },
};
