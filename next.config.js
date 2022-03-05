/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "ja", "es"],
    defaultLocale: "en",
  },
  images: {
    domains: ["img.accords-library.com"],
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
