import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import NavOption from "components/PanelComponents/NavOption";

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
      <NavOption
        title="Accord’s Handbook"
        url="/about-us/accords-handbook"
        border
      />
      <NavOption title="Legality" url="/about-us/legality" border />
      <NavOption title="Members" url="/about-us/members" border />
      <NavOption title="Sharing Policy" url="/about-us/sharing-policy" border />
      <NavOption title="Contact us" url="/about-us/contact" border />
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
