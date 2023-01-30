import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { getLangui } from "graphql/fetchLocalData";
import { useFormat } from "hooks/useFormat";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const AboutUs = (props: Props): JSX.Element => {
  const { format } = useFormat();
  return (
    <AppLayout
      subPanel={
        <SubPanel>
          <PanelHeader
            icon="info"
            title={format("about_us")}
            description={format("about_us_description")}
          />

          <HorizontalLine />

          <NavOption title={format("accords_handbook")} url="/about-us/accords-handbook" border />
          <NavOption title={format("legality")} url="/about-us/legality" border />
          <NavOption title={format("sharing_policy")} url="/about-us/sharing-policy" border />
          <NavOption title={format("contact_us")} url="/about-us/contact" border />
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
