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
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#9c6644" />
          <meta name="apple-mobile-web-app-title" content="Accord's Library" />
          <meta name="application-name" content="Accord's Library" />
          <meta name="msapplication-TileColor" content="#feecd6" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#feecd6"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#26221e"
          />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
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
