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

type LibraryProps = {
  contents: GetContentsQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function Library(props: LibraryProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
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
        title="Content"
        description="Reiciendis id reiciendis at ullam. Corrupti voluptatibus quo magnam enim voluptas eaque. Quia id consequatur fuga magni. Voluptate eaque pariatur porro voluptate rerum. Harum velit in laborum eligendi. Nihil eius dolor et omnis."
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
      title="Library"
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
