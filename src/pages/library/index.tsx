import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import {
  GetLibraryItemsPreviewQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  getLibraryItemsPreview,
  getWebsiteInterface,
} from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import AppLayout from "components/AppLayout";
import LibraryItemsPreview from "components/Library/LibraryItemsPreview";

type LibraryProps = {
  libraryItems: GetLibraryItemsPreviewQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function Library(props: LibraryProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="library_books"
        title={langui.main_library}
        description={langui.library_description}
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <div className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))]">
        {props.libraryItems.libraryItems.data.map((item) => (
          <LibraryItemsPreview key={item.id} item={item.attributes} />
        ))}
      </div>
    </ContentPanel>
  );
  return (
    <AppLayout
      title={langui.library_items}
      langui={langui}
      subPanel={subPanel}
      contentPanel={contentPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: LibraryProps = {
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
