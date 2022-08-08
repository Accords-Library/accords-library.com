/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL_SELF && "https://accords-library.com",
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_URL_SELF}/en/`,
      hreflang: "en",
    },
    {
      href: `${process.env.NEXT_PUBLIC_URL_SELF}/es/`,
      hreflang: "es",
    },
    {
      href: `${process.env.NEXT_PUBLIC_URL_SELF}/fr/`,
      hreflang: "fr",
    },
    {
      href: `${process.env.NEXT_PUBLIC_URL_SELF}/pt-br/`,
      hreflang: "pt-br",
    },
    {
      href: `${process.env.NEXT_PUBLIC_URL_SELF}/ja/`,
      hreflang: "ja",
    },
  ],
  exclude: [
    "/en/*",
    "/fr/*",
    "/ja/*",
    "/es/*",
    "/pt-br/*",
    "/404",
    "/500",
    "/dev/*",
  ],
};
