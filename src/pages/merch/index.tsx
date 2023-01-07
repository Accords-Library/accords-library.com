import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { getOpenGraph } from "helpers/openGraph";
import { getLangui } from "graphql/fetchLocalData";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}
const Merch = (props: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  return (
    <AppLayout
      subPanel={
        <SubPanel>
          <PanelHeader icon="store" title={langui.merch} description={langui.merch_description} />
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
