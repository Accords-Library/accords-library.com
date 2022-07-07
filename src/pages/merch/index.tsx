import { GetStaticProps } from "next";
import { AppLayout } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Icon } from "components/Ico";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {}
const Merch = ({ langui, ...otherProps }: Props): JSX.Element => (
  <AppLayout
    navTitle={langui.merch}
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
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
