import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Containers/ContentPanel";
import { getOpenGraph } from "helpers/openGraph";
import { Img } from "components/Img";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const FiveHundred = ({ openGraph, ...otherProps }: Props): JSX.Element => {
  const { format } = useFormat();
  return (
    <AppLayout
      contentPanel={
        <ContentPanel>
          <Img
            src={"/gameover_cards.webp"}
            className="animate-zoom-in drop-shadow-lg shadow-shade"
          />
          <div className="mt-8 grid place-items-center gap-6">
            <h2>{format("page_not_found")}</h2>
            <ReturnButton href="/" title="Home" />
          </div>
        </ContentPanel>
      }
      openGraph={openGraph}
      {...otherProps}
    />
  );
};
export default FiveHundred;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    /* TODO: Langui */
    openGraph: getOpenGraph(format, "500 - Internal Server Error"),
  };
  return {
    props: props,
  };
};
