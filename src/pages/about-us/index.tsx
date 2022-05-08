import AppLayout from "components/AppLayout";
import NavOption from "components/PanelComponents/NavOption";
import PanelHeader from "components/PanelComponents/PanelHeader";
import SubPanel from "components/Panels/SubPanel";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";

interface Props extends AppStaticProps {}

export default function AboutUs(props: Props): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="info"
        title={langui.about_us}
        description={langui.about_us_description}
      />
      <NavOption
        title={langui.accords_handbook}
        url="/about-us/accords-handbook"
        border
      />
      <NavOption title={langui.legality} url="/about-us/legality" border />
      {/* <NavOption title={langui.members} url="/about-us/members" border /> */}
      <NavOption
        title={langui.sharing_policy}
        url="/about-us/sharing-policy"
        border
      />
      <NavOption title={langui.contact_us} url="/about-us/contact" border />
    </SubPanel>
  );
  return (
    <AppLayout navTitle={langui.about_us} subPanel={subPanel} {...props} />
  );
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
