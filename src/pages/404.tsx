import Link from "next/link";
import ContentPanel from "components/Panels/ContentPanel";
import { applyCustomAppProps } from "./_app";
import Head from "next/head";
import { getWebsiteInterface } from "graphql/operations";
import { GetStaticProps } from "next";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import MainPanel from "components/Panels/MainPanel";

applyCustomAppProps(FourOhFour, {
  useSubPanel: false,
  useContentPanel: true,
});

type Props = {
  langui: GetWebsiteInterfaceQuery;
};

export default function FourOhFour(props: Props): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  return (
    <>
      <Head>
        <title>Accord&rsquo;s Library - 404</title>
      </Head>
      <MainPanel langui={langui} />
      <ContentPanel>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: Props = {
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  }
  return { props: {} };
};
