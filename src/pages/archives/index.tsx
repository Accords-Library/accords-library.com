import AppLayout from "components/AppLayout";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface ArchivesProps extends AppStaticProps {}

export default function Archives(props: ArchivesProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="inventory"
        title={langui.archives}
        description={langui.archives_description}
      />
    </SubPanel>
  );
  return (
    <AppLayout navTitle={langui.archives} subPanel={subPanel} {...props} />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: ArchivesProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
