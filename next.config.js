/* @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["img.accords-library.com", "watch.accords-library.com"],
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
      {
        source: "/contents/folder",
        destination: "/contents",
        permanent: false,
      },
    ];
  },
};
