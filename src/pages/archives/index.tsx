import { GetStaticProps } from "next";
import { useMemo } from "react";
import { AppLayout } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Icon } from "components/Ico";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {}

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
  return (
    <AppLayout
      navTitle={langui.archives}
      subPanel={subPanel}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Archives;

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
