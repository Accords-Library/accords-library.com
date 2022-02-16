import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import AppLayout from "components/AppLayout";

type AboutUsProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function AboutUs(props: AboutUsProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="info"
        title={langui.main_about_us}
        description={langui.about_us_description}
      />
    </SubPanel>
  );
  return <AppLayout title={langui.main_about_us} langui={langui} subPanel={subPanel} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: AboutUsProps = {
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
