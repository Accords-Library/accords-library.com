import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface AboutUsProps extends AppStaticProps {}

export default function AboutUs(props: AboutUsProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="info"
        title={langui.about_us}
        description={langui.about_us_description}
      />
    </SubPanel>
  );
  return (
    <AppLayout navTitle={langui.about_us} subPanel={subPanel} {...props} />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: AboutUsProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
