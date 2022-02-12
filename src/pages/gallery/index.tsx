import MainPanel from "components/Panels/MainPanel";
import { getWebsiteInterface } from "graphql/operations";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { applyCustomAppProps } from "pages/_app";

applyCustomAppProps(Gallery, {
  useSubPanel: false,
  useContentPanel: true,
});

type Props = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Gallery(props: Props): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  return (
    <>
      <MainPanel langui={langui} />
      <iframe
        className="w-full h-screen"
        src="https://gallery.accords-library.com/posts"
      ></iframe>
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
