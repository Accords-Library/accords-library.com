import { GetStaticProps } from "next";
import { useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Icon } from "components/Ico";
import { getReadySdk } from "graphql/sdk";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { filterHasAttributes } from "helpers/others";
import { prettySlug } from "helpers/formatters";
import { getOpenGraph } from "helpers/openGraph";
import { TranslatedChroniclesList } from "components/Chronicles/ChroniclesList";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
  chapters: NonNullable<
    GetChroniclesChaptersQuery["chroniclesChapters"]
  >["data"];
}

const Chronicles = ({
  langui,
  chapters,
  ...otherProps
}: Props): JSX.Element => {
  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.WatchLater}
          title={langui.chronicles}
          description={langui.chronicles_description}
        />
        <div className="grid gap-16">
          {filterHasAttributes(chapters, [
            "attributes.chronicles",
            "id",
          ] as const).map((chapter) => (
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
    ),
    [chapters, langui]
  );

  return <AppLayout subPanel={subPanel} langui={langui} {...otherProps} />;
};
export default Chronicles;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const chronicles = await sdk.getChroniclesChapters();
  if (!chronicles.chroniclesChapters?.data) return { notFound: true };
  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    chapters: chronicles.chroniclesChapters.data,
    openGraph: getOpenGraph(
      appStaticProps.langui,
      appStaticProps.langui.chronicles ?? "Chronicles"
    ),
  };
  return {
    props: props,
  };
};
