import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { getWebsiteInterface } from "graphql/operations";
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
        description={langui.library_description}
      />
      <NavOption
        url="/library/items"
        title={langui.library_items}
        subtitle={langui.library_items_description}
        border={true}
      />
      <NavOption
        url="/library/content"
        title={langui.library_content}
        subtitle={langui.library_content_description}
        border={true}
      />
    </SubPanel>
  );

  return (
    <AppLayout
      title={langui.main_library}
      langui={langui}
      subPanel={subPanel}
    />
  );
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
