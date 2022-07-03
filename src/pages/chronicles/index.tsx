import { AppLayout } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";

import { GetStaticProps } from "next";
import { Icon } from "components/Ico";
import { useMemo } from "react";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {}

const Chronicles = ({ langui, ...otherProps }: Props): JSX.Element => {
  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.WatchLater}
          title={langui.chronicles}
          description={langui.chronicles_description}
        />
      </SubPanel>
    ),
    [langui]
  );

  return (
    <AppLayout
      navTitle={langui.chronicles}
      subPanel={subPanel}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Chronicles;

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
