export const generateStaticParams: GenerateStaticParams = () =>
  ["en", "es", "fr", "pt-br", "ja", ""].map((locale) => ({ locale }));

// Disabled using locales other than the one defined
export const dynamicParams = false;

const Page: Page = () => <>Hello from within locale</>;
export default Page;
