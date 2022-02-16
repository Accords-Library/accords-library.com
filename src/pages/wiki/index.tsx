import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import ContentPanel from "components/Panels/ContentPanel";
import AppLayout from "components/AppLayout";

type WikiProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Hubs(props: WikiProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="travel_explore"
        title={langui.main_wiki}
        description={langui.wiki_description}
      />
    </SubPanel>
  );
  const contentPanel = <ContentPanel>Hello</ContentPanel>;

  return (
    <AppLayout
      title={langui.main_wiki}
      langui={langui}
      contentPanel={contentPanel}
      subPanel={subPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: WikiProps = {
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
