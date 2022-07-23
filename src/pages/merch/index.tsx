import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Icon } from "components/Ico";
import { getOpenGraph } from "helpers/openGraph";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {}
const Merch = ({ langui, ...otherProps }: Props): JSX.Element => (
  <AppLayout
    subPanel={
      <SubPanel>
        <PanelHeader
          icon={Icon.Store}
          title={langui.merch}
          description={langui.merch_description}
        />
      </SubPanel>
    }
    langui={langui}
    {...otherProps}
  />
);
export default Merch;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    openGraph: getOpenGraph(
      appStaticProps.langui,
      appStaticProps.langui.merch ?? "Merch"
    ),
  };
  return {
    props: props,
  };
};
