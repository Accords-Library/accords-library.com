import AppLayout from "components/AppLayout";
import { getWebsiteInterface } from "graphql/operations";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";

type GalleryProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Gallery(props: GalleryProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const contentPanel = (
    <iframe
      className="w-full h-screen"
      src="https://gallery.accords-library.com/posts"
    ></iframe>
  );

  return (
    <AppLayout
      title={langui.main_gallery}
      langui={langui}
      contentPanel={contentPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: GalleryProps = {
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
