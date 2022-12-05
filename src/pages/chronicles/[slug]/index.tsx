import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next";
import { useCallback, useMemo } from "react";
import { getReadySdk } from "graphql/sdk";
import { isDefined, filterHasAttributes } from "helpers/others";
import { ChronicleWithTranslations } from "types/types";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { ContentPanel } from "components/Containers/ContentPanel";
import { Markdawn } from "components/Markdown/Markdawn";
import { SubPanel } from "components/Containers/SubPanel";
import { ThumbnailHeader } from "components/ThumbnailHeader";
import { HorizontalLine } from "components/HorizontalLine";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { prettyInlineTitle, prettySlug } from "helpers/formatters";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { Icon } from "components/Ico";
import { getOpenGraph } from "helpers/openGraph";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { getDescription } from "helpers/description";
import { TranslatedChroniclesList } from "components/Chronicles/ChroniclesList";
import { getLangui } from "graphql/fetchLocalData";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  chronicle: ChronicleWithTranslations;
  chapters: NonNullable<GetChroniclesChaptersQuery["chroniclesChapters"]>["data"];
}

const Chronicle = ({ chronicle, chapters, ...otherProps }: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: chronicle.translations,
    languageExtractor: useCallback(
      (item: ChronicleWithTranslations["translations"][number]) =>
        item?.language?.data?.attributes?.code,
      []
    ),
  });

  const primaryContent = chronicle.contents
    ? filterHasAttributes(chronicle.contents.data, ["attributes.translations"] as const)[0]
        ?.attributes
    : undefined;

  const [selectedContentTranslation, ContentLanguageSwitcher, ContentLanguageSwitcherProps] =
    useSmartLanguage({
      items: primaryContent?.translations ?? [],
      languageExtractor: useCallback(
        (
          item: NonNullable<
            NonNullable<
              NonNullable<ChronicleWithTranslations["contents"]>["data"][number]["attributes"]
            >["translations"]
          >[number]
        ) => item?.language?.data?.attributes?.code,
        []
      ),
    });

  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        displayOnlyOn={"1ColumnLayout"}
        href="/chronicles"
        title={langui.chronicles}
        className="mb-10"
      />

      {isDefined(selectedTranslation) ? (
        <>
          <h1 className="mb-16 text-center text-3xl">{selectedTranslation.title}</h1>

          {languageSwitcherProps.locales.size > 1 && (
            <LanguageSwitcher {...languageSwitcherProps} />
          )}

          {isDefined(selectedTranslation.body) && <Markdawn text={selectedTranslation.body.body} />}
        </>
      ) : (
        <>
          {selectedContentTranslation && (
            <>
              <ThumbnailHeader
                pre_title={selectedContentTranslation.pre_title}
                title={selectedContentTranslation.title}
                subtitle={selectedContentTranslation.subtitle}
                languageSwitcher={
                  ContentLanguageSwitcherProps.locales.size > 1 ? (
                    <ContentLanguageSwitcher {...ContentLanguageSwitcherProps} />
                  ) : undefined
                }
                categories={primaryContent?.categories}
                type={primaryContent?.type}
                description={selectedContentTranslation.description}
                thumbnail={primaryContent?.thumbnail?.data?.attributes}
              />

              {selectedContentTranslation.text_set?.text && (
                <>
                  <HorizontalLine />
                  <Markdawn text={selectedContentTranslation.text_set.text} />
                </>
              )}
            </>
          )}
        </>
      )}
    </ContentPanel>
  );

  const subPanel = (
    <SubPanel>
      <ReturnButton displayOnlyOn={"3ColumnsLayout"} href="/chronicles" title={langui.chronicles} />

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
            currentSlug={chronicle.slug}
          />
        ))}
      </div>
    </SubPanel>
  );

  return (
    <AppLayout
      contentPanel={contentPanel}
      subPanel={subPanel}
      subPanelIcon={Icon.FormatListNumbered}
      {...otherProps}
    />
  );
};
export default Chronicle;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const slug =
    context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "";
  const chronicle = await sdk.getChronicle({
    language_code: context.locale ?? "en",
    slug: slug,
  });
  const chronicles = await sdk.getChroniclesChapters();
  if (
    !chronicle.chronicles?.data[0]?.attributes?.translations ||
    !chronicles.chroniclesChapters?.data
  )
    return { notFound: true };

  const { title, description } = (() => {
    if (context.locale && context.locales) {
      if (chronicle.chronicles.data[0].attributes.contents?.data[0]?.attributes?.translations) {
        const selectedContentTranslation = staticSmartLanguage({
          items: chronicle.chronicles.data[0].attributes.contents.data[0].attributes.translations,
          languageExtractor: (item) => item.language?.data?.attributes?.code,
          preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
        });
        if (selectedContentTranslation) {
          return {
            title: prettyInlineTitle(
              selectedContentTranslation.pre_title,
              selectedContentTranslation.title,
              selectedContentTranslation.subtitle
            ),
            description: getDescription(selectedContentTranslation.description, {
              [langui.type ?? "Type"]: [
                chronicle.chronicles.data[0].attributes.contents.data[0].attributes.type?.data
                  ?.attributes?.titles?.[0]?.title,
              ],
              [langui.categories ?? "Categories"]: filterHasAttributes(
                chronicle.chronicles.data[0].attributes.contents.data[0].attributes.categories
                  ?.data,
                ["attributes"] as const
              ).map((category) => category.attributes.short),
            }),
          };
        }
      } else {
        const selectedTranslation = staticSmartLanguage({
          items: chronicle.chronicles.data[0].attributes.translations,
          languageExtractor: (item) => item.language?.data?.attributes?.code,
          preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
        });
        if (selectedTranslation) {
          return {
            title: selectedTranslation.title,
            description: selectedTranslation.summary,
          };
        }
      }
    }
    return {
      title: prettySlug(chronicle.chronicles.data[0].attributes.slug),
      description: undefined,
    };
  })();

  const thumbnail =
    chronicle.chronicles.data[0].attributes.translations.length === 0
      ? chronicle.chronicles.data[0].attributes.contents?.data[0]?.attributes?.thumbnail?.data
          ?.attributes
      : undefined;

  const props: Props = {
    chronicle: chronicle.chronicles.data[0].attributes as ChronicleWithTranslations,
    chapters: chronicles.chroniclesChapters.data,
    openGraph: getOpenGraph(langui, title, description, thumbnail),
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getChroniclesSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(contents.chronicles?.data, ["attributes"] as const).map((wikiPage) => {
    context.locales?.map((local) =>
      paths.push({
        params: { slug: wikiPage.attributes.slug },
        locale: local,
      })
    );
  });
  return {
    paths,
    fallback: "blocking",
  };
};
