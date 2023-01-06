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
import { getLangui } from "graphql/fetchLocalData";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  chapters: NonNullable<GetChroniclesChaptersQuery["chroniclesChapters"]>["data"];
}

const Chronicles = ({ chapters, ...otherProps }: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="schedule"
        title={langui.chronicles}
        description={langui.chronicles_description}
      />

      <HorizontalLine />

      <div className="grid gap-16">
        {filterHasAttributes(chapters, ["attributes.chronicles", "id"] as const).map((chapter) => (
          <TranslatedChroniclesList
            key={chapter.id}
            chronicles={chapter.attributes.chronicles.data}
            translations={filterHasAttributes(chapter.attributes.titles, [
              "language.data.attributes.code",
            ] as const).map((translation) => ({
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
  const langui = getLangui(context.locale);
  const chronicles = await sdk.getChroniclesChapters();
  if (!chronicles.chroniclesChapters?.data) return { notFound: true };

  const props: Props = {
    chapters: chronicles.chroniclesChapters.data,
    openGraph: getOpenGraph(langui, langui.chronicles ?? "Chronicles"),
  };
  return {
    props: props,
  };
};
