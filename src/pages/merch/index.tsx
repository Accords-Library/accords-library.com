import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import AppLayout from "components/AppLayout";

type MerchProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Merch(props: MerchProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="store"
        title={langui.main_merch}
        description={langui.merch_description}
      />
    </SubPanel>
  );

  return (
    <AppLayout
      navTitle={langui.main_merch}
      langui={langui}
      subPanel={subPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: MerchProps = {
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
