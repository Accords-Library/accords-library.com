import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    // General info about the site
    const siteTitle =
      "Accord's Library - Discover • Analyse • Translate • Archive";
    const siteDescription =
      "Accord's Library aims at gathering and archiving all of Yoko Taro’s work. Yoko Taro is a Japanese video game director and scenario writer.";
    const siteFavicon = "/favicon.png";
    const thumbnailImage = "/default_og.jpg";

    return (
      <Html>
        <Head>
          <meta
            name="description"
            content={siteDescription}
            key="description"
          />
          <link rel="icon" href={siteFavicon} key="icon" />
          <meta property="og:image" content={thumbnailImage} key="ogImage" />
          <meta
            property="og:image:secure_url"
            content={thumbnailImage}
            key="ogImageSecure"
          />
          <meta property="og:image:width" content="1200" key="ogImageWidth" />
          <meta property="og:image:height" content="630" key="ogImageHeight" />
          <meta
            property="og:image:alt"
            content="Accord's Library"
            key="ogImageAlt"
          />
          <meta
            property="og:image:type"
            content="image/jpeg"
            key="ogImageType"
          />
          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitterCard"
          />
          <meta name="twitter:title" content={siteTitle} key="twitterTitle" />
          <meta
            name="twitter:description"
            content={siteDescription}
            key="twitterDescription"
          />
          <meta
            name="twitter:image"
            content={thumbnailImage}
            key="twitterImage"
          />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="manifest" href="manifest.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
