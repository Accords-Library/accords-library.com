import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { getLangui } from "graphql/fetchLocalData";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Archives = (props: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const subPanel = (
    <SubPanel>
      <PanelHeader icon="save" title={langui.archives} description={langui.archives_description} />
      <HorizontalLine />
      <NavOption title={"Videos"} url="/archives/videos/" border />
    </SubPanel>
  );

  return <AppLayout subPanel={subPanel} {...props} />;
};
export default Archives;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const langui = getLangui(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(langui, langui.archives ?? "Archives"),
  };
  return {
    props: props,
  };
};
