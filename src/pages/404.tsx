import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { getOpenGraph } from "helpers/openGraph";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const FourOhFour = ({ openGraph, ...otherProps }: Props): JSX.Element => (
  <AppLayout
    contentPanel={
      <ContentPanel>
        <h1>{openGraph.title}</h1>
        <ReturnButton href="/" title="Home" />
      </ContentPanel>
    }
    openGraph={openGraph}
    {...otherProps}
  />
);
export default FourOhFour;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const langui = getLangui(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(langui, `404 - ${langui.page_not_found}`),
  };
  return {
    props: props,
  };
};
