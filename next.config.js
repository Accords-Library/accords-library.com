/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'ja', 'es'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['strapi.accords-library.com'],
  },
}
