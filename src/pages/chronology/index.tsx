import SubPanel from "components/Panels/SubPanel";
import NavOption from "components/PanelComponents/NavOption";
import { applyCustomAppProps } from "pages/_app";
import PanelHeader from "components/PanelComponents/PanelHeader";
import MainPanel from "components/Panels/MainPanel";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";

applyCustomAppProps(Chronology, {
  useSubPanel: true,
  useContentPanel: false,
});

type Props = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Chronology(props: Props): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  return (
    <>
      <MainPanel langui={langui} />
      <SubPanel>
        <PanelHeader
          icon="watch_later"
          title={langui.main_chronology}
          description={langui.chronology_description}
        />

        <NavOption
          url="/chronology/timelines"
          title={langui.chronology_timelines}
          subtitle={langui.chronology_timelines_description}
          border={true}
        />

        <NavOption
          url="/chronology/overview"
          title={langui.chronology_overview}
          subtitle={langui.chronology_overview_description}
          border={true}
        />

        <NavOption
          url="/chronology/walkthrough"
          title={langui.chronology_walkthrough}
          subtitle={langui.chronology_walkthrough_description}
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
