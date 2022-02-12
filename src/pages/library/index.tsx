import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import LibraryItemComponent from "components/Library/LibraryItemComponent";
import { applyCustomAppProps } from "pages/_app";
import {
  GetLibraryItemsPreviewQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  getLibraryItemsPreview,
  getWebsiteInterface,
} from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import MainPanel from "components/Panels/MainPanel";
import Head from "next/head";

type Props = {
  libraryItems: GetLibraryItemsPreviewQuery;
  langui: GetWebsiteInterfaceQuery;
};

applyCustomAppProps(Library, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function Library(props: Props): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  return (
    <>
      <Head>
        <title>Accord&rsquo;s Library - Library</title>
      </Head>
      <MainPanel langui={langui} />
      <SubPanel>
        <PanelHeader
          icon="library_books"
          title={langui.main_library}
          description={langui.library_description}
        />
      </SubPanel>

      <ContentPanel width={ContentPanelWidthSizes.large}>
        <div className="grid gap-8 items-end grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]">
          {props.libraryItems.libraryItems.data.map((item) => (
            <LibraryItemComponent key={item.id} item={item.attributes} />
          ))}
        </div>
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: Props = {
      libraryItems: await getLibraryItemsPreview({
        language_code: context.locale,
      }),
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  } else {
    return { props: {} };
  }
};
