import { GetStaticProps } from "next";
import { useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
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

const Archives = ({ langui, ...otherProps }: Props): JSX.Element => {
  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Inventory}
          title={langui.archives}
          description={langui.archives_description}
        />
        <NavOption title={"Videos"} url="/archives/videos/" border />
      </SubPanel>
    ),
    [langui]
  );
  return <AppLayout subPanel={subPanel} langui={langui} {...otherProps} />;
};
export default Archives;

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
      appStaticProps.langui.archives ?? "Archives"
    ),
  };
  return {
    props: props,
  };
};
