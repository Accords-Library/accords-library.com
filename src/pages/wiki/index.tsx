import AppLayout from "components/AppLayout";
import NavOption from "components/PanelComponents/NavOption";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

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
      <NavOption title={langui.chronology} url="/wiki/chronology" border />
    </SubPanel>
  );

  return <AppLayout navTitle={langui.wiki} subPanel={subPanel} {...props} />;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: WikiProps }> {
  const props: WikiProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
