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
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="manifest" href="manifest.json" />
          <meta name="theme-color" content="#FFEDD8" />
        </Head>
        <body className="bg-light text-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
