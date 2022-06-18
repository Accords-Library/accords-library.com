import { AppLayout } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";

import { GetStaticPropsContext } from "next";
import { Icon } from "components/Ico";

interface Props extends AppStaticProps {}

export default function Archives(props: Props): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon={Icon.Inventory}
        title={langui.archives}
        description={langui.archives_description}
      />
      <NavOption title={"Videos"} url="/archives/videos/" border />
    </SubPanel>
  );
  return (
    <AppLayout navTitle={langui.archives} subPanel={subPanel} {...props} />
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
