import AppLayout from "components/AppLayout";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface ChroniclesProps extends AppStaticProps {}

export default function Chronicles(props: ChroniclesProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="watch_later"
        title={langui.chronicles}
        description={langui.chronicles_description}
      />
    </SubPanel>
  );
  return (
    <AppLayout navTitle={langui.chronicles} subPanel={subPanel} {...props} />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: ChroniclesProps }> {
  const props: ChroniclesProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
