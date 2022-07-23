import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getOpenGraph } from "helpers/openGraph";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {}

const FourOhFour = ({
  langui,
  openGraph,
  ...otherProps
}: Props): JSX.Element => (
  <AppLayout
    contentPanel={
      <ContentPanel>
        <h1>{openGraph.title}</h1>
        <ReturnButton
          href="/"
          title="Home"
          langui={langui}
          displayOn={ReturnButtonType.Both}
        />
      </ContentPanel>
    }
    openGraph={openGraph}
    langui={langui}
    {...otherProps}
  />
);
export default FourOhFour;

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
      `404 - ${appStaticProps.langui.page_not_found}`
    ),
  };
  return {
    props: props,
  };
};
