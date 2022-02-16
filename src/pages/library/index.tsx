import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import {
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  getWebsiteInterface,
} from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import AppLayout from "components/AppLayout";
import NavOption from "components/PanelComponents/NavOption";

type LibraryProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Library(props: LibraryProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="library_books"
        title={langui.main_library}
        description="Reiciendis id reiciendis at ullam. Corrupti voluptatibus quo magnam enim voluptas eaque. Quia id consequatur fuga magni. Voluptate eaque pariatur porro voluptate rerum. Harum velit in laborum eligendi. Nihil eius dolor et omnis."
      />
      <NavOption
        url="/library/items"
        title="Items"
        subtitle="A comprehensive list of all Yokoverse’s physical or digital items"
        border={true}
      />
      <NavOption
        url="/library/content"
        title="Content"
        subtitle="Search for a specific content depending on its type or category"
        border={true}
      />
    </SubPanel>
  );

  return <AppLayout title="Library" langui={langui} subPanel={subPanel} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: LibraryProps = {
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
