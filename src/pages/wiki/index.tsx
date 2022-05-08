import AppLayout from "components/AppLayout";
import NavOption from "components/PanelComponents/NavOption";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";

interface Props extends AppStaticProps {}

export default function Wiki(props: Immutable<Props>): JSX.Element {
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
): Promise<{ notFound: boolean } | { props: Props }> {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
