import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Icon } from "components/Ico";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { useAppLayout } from "contexts/AppLayoutContext";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const AboutUs = (props: Props): JSX.Element => {
  const { langui } = useAppLayout();
  return (
    <AppLayout
      subPanel={
        <SubPanel>
          <PanelHeader
            icon={Icon.Info}
            title={langui.about_us}
            description={langui.about_us_description}
          />

          <HorizontalLine />

          <NavOption title={langui.accords_handbook} url="/about-us/accords-handbook" border />
          <NavOption title={langui.legality} url="/about-us/legality" border />
          <NavOption title={langui.sharing_policy} url="/about-us/sharing-policy" border />
          <NavOption title={langui.contact_us} url="/about-us/contact" border />
        </SubPanel>
      }
      {...props}
    />
  );
};
export default AboutUs;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const langui = getLangui(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(langui, langui.about_us ?? "About us"),
  };
  return {
    props: props,
  };
};
