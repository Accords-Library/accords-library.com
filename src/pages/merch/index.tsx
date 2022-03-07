import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface MerchProps extends AppStaticProps {}
export default function Merch(props: MerchProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="store"
        title={langui.merch}
        description={langui.merch_description}
      />
    </SubPanel>
  );

  return <AppLayout navTitle={langui.merch} subPanel={subPanel} {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: MerchProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
