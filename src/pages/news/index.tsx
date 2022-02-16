import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import AppLayout from "components/AppLayout";

type NewsProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function News(props: NewsProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="feed"
        title={langui.main_news}
        description={langui.news_description}
      />
    </SubPanel>
  );

  return <AppLayout title={langui.main_news} langui={langui} subPanel={subPanel} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: NewsProps = {
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
