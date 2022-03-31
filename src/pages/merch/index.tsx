import AppLayout from "components/AppLayout";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { GetStaticPropsContext } from "next";
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

  return (
    <AppLayout
      navTitle={langui.merch}
      subPanel={subPanel}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: MerchProps }> {
  const props: MerchProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
