import type { AppProps } from "next/app";
import Head from "next/head";
import MainPanel from "components/Panels/MainPanel";
import "styles/globals.css";

export type CustomAppProps = {
  useSubPanel: boolean;
  useContentPanel: boolean;
};

export function applyCustomAppProps(
  page: Function,
  customAppProps: CustomAppProps
) {
  page.customAppProps = customAppProps;
}

export default function AccordsLibraryApp(appProps: AppProps) {
  let additionalClasses = "";
  if (appProps.Component.customAppProps.useSubPanel)
    additionalClasses += " withSubPanel";
  if (appProps.Component.customAppProps.useContentPanel)
    additionalClasses += " withContentPanel";

  const siteTitle =
    "Accord's Library - Discover • Analyse • Translate • Archive";
  const siteDescription =
    "Accord's Library aims at gathering and archiving all of Yoko Taro’s work. Yoko Taro is a Japanese video game director and scenario writer.";
  const siteFavicon = "/favicon.png";
  const thumbnailImage = "/default_og.jpg";

  return (
    <div className={"appContainer" + additionalClasses}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href={siteFavicon} />
        <meta property="og:image" content={thumbnailImage}></meta>
        <meta property="og:image:secure_url" content={thumbnailImage}></meta>
        <meta property="og:image:width" content="1200"></meta>
        <meta property="og:image:height" content="630"></meta>
        <meta property="og:image:alt" content="Accord's Library"></meta>
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content={siteTitle}></meta>
        <meta name="twitter:description" content={siteDescription}></meta>
        <meta name="twitter:image" content={thumbnailImage}></meta>
      </Head>

      <MainPanel />

      <appProps.Component {...appProps.pageProps} />
    </div>
  );
}
