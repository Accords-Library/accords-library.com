/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'fr', 'ja', 'pt-br', 'pt-pt'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['strapi.accords-library.com'],
  },
}
