import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface WikiProps extends AppStaticProps {}

export default function Hubs(props: WikiProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="travel_explore"
        title={langui.wiki}
        description={langui.wiki_description}
      />
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
