import { GetStaticProps } from "next";
import { useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { Icon } from "components/Ico";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { useAppLayout } from "contexts/AppLayoutContext";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Archives = (props: Props): JSX.Element => {
  const { langui } = useAppLayout();
  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Inventory}
          title={langui.archives}
          description={langui.archives_description}
        />
        <HorizontalLine />
        <NavOption title={"Videos"} url="/archives/videos/" border />
      </SubPanel>
    ),
    [langui]
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
