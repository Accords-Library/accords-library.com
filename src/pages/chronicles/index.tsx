import { AppLayout } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";

import { GetStaticPropsContext } from "next";
import { Icon } from "components/Ico";
import { useMemo } from "react";

interface Props extends AppStaticProps {}

export default function Chronicles(props: Props): JSX.Element {
  const { langui } = props;
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
    <AppLayout navTitle={langui.chronicles} subPanel={subPanel} {...props} />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
