import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import {
  GetContentsQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { getContents, getWebsiteInterface } from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import AppLayout from "components/AppLayout";
import ReturnButton from "components/PanelComponents/ReturnButton";
import HorizontalLine from "components/HorizontalLine";
import LibraryContentPreview from "components/Library/LibraryContentPreview";
import { prettyinlineTitle } from "queries/helpers";

type LibraryProps = {
  contents: GetContentsQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function Library(props: LibraryProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;

  props.contents.contents.data.sort((a, b) => {
    const titleA = a.attributes.titles.length > 0 ? prettyinlineTitle(a.attributes.titles[0].pre_title, a.attributes.titles[0].title, a.attributes.titles[0].subtitle) : a.attributes.slug
    const titleB = b.attributes.titles.length > 0 ? prettyinlineTitle(b.attributes.titles[0].pre_title, b.attributes.titles[0].title, b.attributes.titles[0].subtitle) : b.attributes.slug
    return titleA.localeCompare(titleB);
  });

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/library"
        title={langui.main_library}
        langui={langui}
      />
      <HorizontalLine />
      <PanelHeader
        icon="library_books"
        title={langui.library_content}
        description={langui.library_content_description}
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <div className="grid gap-8 items-end grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]">
        {props.contents.contents.data.map((item) => (
          <LibraryContentPreview key={item.id} item={item.attributes} />
        ))}
      </div>
    </ContentPanel>
  );
  return (
    <AppLayout
      title={langui.library_content}
      langui={langui}
      subPanel={subPanel}
      contentPanel={contentPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: LibraryProps = {
      contents: await getContents({
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
