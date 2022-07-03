import { AppLayout } from "components/AppLayout";
import { Icon } from "components/Ico";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { GetStaticProps } from "next";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {}

const AboutUs = ({ langui, ...otherProps }: Props): JSX.Element => (
  <AppLayout
    navTitle={langui.about_us}
    subPanel={
      <SubPanel>
        <PanelHeader
          icon={Icon.Info}
          title={langui.about_us}
          description={langui.about_us_description}
        />
        <NavOption
          title={langui.accords_handbook}
          url="/about-us/accords-handbook"
          border
        />
        <NavOption title={langui.legality} url="/about-us/legality" border />
        <NavOption
          title={langui.sharing_policy}
          url="/about-us/sharing-policy"
          border
        />
        <NavOption title={langui.contact_us} url="/about-us/contact" border />
      </SubPanel>
    }
    langui={langui}
    {...otherProps}
  />
);
export default AboutUs;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
