import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import AppLayout from "components/AppLayout";

type ArchivesProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Archives(props: ArchivesProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="inventory"
        title={langui.archives}
        description={langui.archives_description}
      />
    </SubPanel>
  );
  return (
    <AppLayout
      navTitle={langui.archives}
      langui={langui}
      subPanel={subPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: ArchivesProps = {
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
