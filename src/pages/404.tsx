import Link from "next/link";
import ContentPanel from "components/Panels/ContentPanel";
import { applyCustomAppProps } from "./_app";
import Head from "next/head";

applyCustomAppProps(FourOhFour, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function FourOhFour(): JSX.Element {
  return (
    <>
      <Head>
        <title>Accord&rsquo;s Library - 404</title>
      </Head>
      <ContentPanel>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </ContentPanel>
    </>
  );
}
