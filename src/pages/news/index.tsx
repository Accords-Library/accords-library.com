import SubPanel from "components/Panels/SubPanel";
import { applyCustomAppProps } from "pages/_app";
import PanelHeader from "components/PanelComponents/PanelHeader";
import MainPanel from "components/Panels/MainPanel";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import ContentPanel from "components/Panels/ContentPanel";

applyCustomAppProps(News, {
  useSubPanel: true,
  useContentPanel: true,
});

type Props = {
  langui: GetWebsiteInterfaceQuery;
};

export default function News(props: Props): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  return (
    <>
      <MainPanel langui={langui} />
      <SubPanel>
        <PanelHeader
          icon="feed"
          title={langui.main_news}
          description="Reiciendis id reiciendis at ullam. Corrupti voluptatibus quo magnam enim voluptas eaque. Quia id consequatur fuga magni. Voluptate eaque pariatur porro voluptate rerum. Harum velit in laborum eligendi. Nihil eius dolor et omnis."
        />
      </SubPanel>
      <ContentPanel>Hello</ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: Props = {
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
