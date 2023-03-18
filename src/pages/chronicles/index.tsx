import { GetStaticProps } from "next";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Containers/SubPanel";
import { getReadySdk } from "graphql/sdk";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { filterHasAttributes } from "helpers/asserts";
import { prettySlug } from "helpers/formatters";
import { getOpenGraph } from "helpers/openGraph";
import { TranslatedChroniclesList } from "components/Chronicles/ChroniclesList";
import { HorizontalLine } from "components/HorizontalLine";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";

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

      <div className="grid gap-16">
        {filterHasAttributes(chapters, ["attributes.chronicles", "id"]).map((chapter) => (
          <TranslatedChroniclesList
            key={chapter.id}
            chronicles={chapter.attributes.chronicles.data}
            translations={filterHasAttributes(chapter.attributes.titles, [
              "language.data.attributes.code",
            ]).map((translation) => ({
              title: translation.title,
              language: translation.language.data.attributes.code,
            }))}
            fallback={{ title: prettySlug(chapter.attributes.slug) }}
          />
        ))}
      </div>
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
