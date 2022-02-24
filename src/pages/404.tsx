import Link from "next/link";
import ContentPanel from "components/Panels/ContentPanel";
import { getWebsiteInterface } from "graphql/operations";
import { GetStaticProps } from "next";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import AppLayout from "components/AppLayout";

type FourOhFourProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function FourOhFour(props: FourOhFourProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const contentPanel = (
    <ContentPanel>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </ContentPanel>
  );
  return <AppLayout navTitle="404" langui={langui} contentPanel={contentPanel} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: FourOhFourProps = {
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
