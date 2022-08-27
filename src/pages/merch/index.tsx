import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { Icon } from "components/Ico";
import { getOpenGraph } from "helpers/openGraph";
import { useAppLayout } from "contexts/AppLayoutContext";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}
const Merch = (props: Props): JSX.Element => {
  const { langui } = useAppLayout();
  return (
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
      {...props}
    />
  );
};
export default Merch;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const langui = getLangui(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(langui, langui.merch ?? "Merch"),
  };
  return {
    props: props,
  };
};
