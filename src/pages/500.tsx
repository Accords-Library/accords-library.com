import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getOpenGraph } from "helpers/openGraph";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {}

const FiveHundred = ({
  langui,
  openGraph,
  ...otherProps
}: Props): JSX.Element => (
  <AppLayout
    contentPanel={
      <ContentPanel>
        <h1>{openGraph.title}</h1>
        <ReturnButton href="/" title="Home" langui={langui} />
      </ContentPanel>
    }
    openGraph={openGraph}
    langui={langui}
    {...otherProps}
  />
);
export default FiveHundred;

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
      "500 - Internal Server Error"
    ),
  };
  return {
    props: props,
  };
};
