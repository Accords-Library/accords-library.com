import type { AppProps } from "next/app";
import Head from "next/head";
import MainPanel from "components/Panels/MainPanel";
import "styles/globals.css";

function AccordsLibraryApp({ Component, pageProps }: AppProps) {
  /* [BIG HACK]
      Yes this is probably terrible, I'm trying to apply a different style to my appContainer div
      depending on if the page uses a subpanel or contentpanel, or both, or neither. This is because
      I want the first column to be always 20rem, the second one to be 20rem when it's the subbar, but
      1fr if it's the content...
      
      Anyway, there is probably a much better way to do this, it it might backfire in my face in the future
      Much love,

      Mint  
  */

  const componentProcessed = Component(pageProps);
  let useSubPanel = false;
  let useContentPanel = false;

  const children = componentProcessed.props.children;

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (child.type.name === "SubPanel") {
        useSubPanel = true;
      } else if (child.type.name === "ContentPanel") {
        useContentPanel = true;
      }
    });
  } else {
    if (children.type.name === "SubPanel") {
      useSubPanel = true;
    } else if (children.type.name === "ContentPanel") {
      useContentPanel = true;
    }
  }

  let additionalClasses = "";
  if (useSubPanel) additionalClasses += " withSubPanel";
  if (useContentPanel) additionalClasses += " withContentPanel";

  /* [End of BIG HACK] */

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

      {componentProcessed}
    </div>
  );
}

export default AccordsLibraryApp;
