import SubPanel from "components/Panels/SubPanel";
import NavOption from "components/PanelComponents/NavOption";
import { applyCustomAppProps } from "pages/_app";
import PanelHeader from "components/PanelComponents/PanelHeader";
import MainPanel from "components/Panels/MainPanel";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";

applyCustomAppProps(Data, {
  useSubPanel: true,
  useContentPanel: false,
});

type Props = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Data(props: Props): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  return (
    <>
      <MainPanel langui={langui} />
      <SubPanel>
        <PanelHeader
          icon="travel_explore"
          title={langui.main_data}
          description="Reiciendis id reiciendis at ullam. Corrupti voluptatibus quo magnam enim voluptas eaque. Quia id consequatur fuga magni. Voluptate eaque pariatur porro voluptate rerum. Harum velit in laborum eligendi. Nihil eius dolor et omnis."
        />

        <NavOption
          url="/data/timelines"
          title={langui.chronology_timelines}
          subtitle={langui.chronology_timelines_description}
          border={true}
        />

        <NavOption
          url="/data/chronology"
          title="Chronology"
          subtitle={langui.chronology_overview_description}
          border={true}
        />

        <NavOption
          url="/data/weapon-stories"
          title="Weapon Stories"
          subtitle="Reiciendis id reiciendis at ullam."
          border={true}
        />

        <NavOption
          url="/data/glossary"
          title="Glossary"
          subtitle="Reiciendis id reiciendis at ullam."
          border={true}
        />
      </SubPanel>
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
