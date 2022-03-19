import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import HorizontalLine from "components/HorizontalLine";
import NavOption from "components/PanelComponents/NavOption";

interface WikiProps extends AppStaticProps {}

export default function Wiki(props: WikiProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="travel_explore"
        title={langui.wiki}
        description={langui.wiki_description}
      />
      <NavOption title="Chronology" url="/wiki/chronology" border/>
    </SubPanel>
  );

  return <AppLayout navTitle={langui.wiki} subPanel={subPanel} {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: WikiProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
