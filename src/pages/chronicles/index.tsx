import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { getReadySdk } from "graphql/sdk";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { ChroniclesLists } from "components/Chronicles/ChroniclesLists";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  chapters: NonNullable<GetChroniclesChaptersQuery["chroniclesChapters"]>["data"];
}

const Chronicles = ({ chapters, ...otherProps }: Props): JSX.Element => {
  const { format } = useFormat();

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="schedule"
        title={format("chronicles")}
        description={format("chronicles_description")}
      />
      <HorizontalLine />
      <ChroniclesLists chapters={chapters} />
    </SubPanel>
  );

  return <AppLayout subPanel={subPanel} {...otherProps} />;
};
export default Chronicles;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);
  const chronicles = await sdk.getChroniclesChapters();
  if (!chronicles.chroniclesChapters?.data) return { notFound: true };

  const props: Props = {
    chapters: chronicles.chroniclesChapters.data,
    openGraph: getOpenGraph(format, format("chronicles")),
  };
  return {
    props: props,
  };
};
