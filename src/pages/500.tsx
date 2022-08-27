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

const FiveHundred = ({ openGraph, ...otherProps }: Props): JSX.Element => (
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
export default FiveHundred;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const langui = getLangui(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(langui, "500 - Internal Server Error"),
  };
  return {
    props: props,
  };
};
