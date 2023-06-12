import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from "next";
import { useCallback } from "react";
import { getReadySdk } from "graphql/sdk";
import { isDefined, filterHasAttributes } from "helpers/asserts";
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
import { getOpenGraph } from "helpers/openGraph";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { getDescription } from "helpers/description";
import { useScrollTopOnChange } from "hooks/useScrollOnChange";
import { Ids } from "types/ids";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { ElementsSeparator } from "helpers/component";
import { ChroniclesLists } from "components/Chronicles/ChroniclesLists";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  chronicle: ChronicleWithTranslations;
  chapters: NonNullable<GetChroniclesChaptersQuery["chroniclesChapters"]>["data"];
}

const Chronicle = ({ chronicle, chapters, ...otherProps }: Props): JSX.Element => {
  const { format, formatContentType, formatCategory } = useFormat();
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  useScrollTopOnChange(Ids.ContentPanel, [chronicle.slug]);

  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: chronicle.translations,
    languageExtractor: useCallback(
      (item: ChronicleWithTranslations["translations"][number]) =>
        item?.language?.data?.attributes?.code,
      []
    ),
  });

  const primaryContent = chronicle.contents
    ? filterHasAttributes(chronicle.contents.data, ["attributes.translations"])[0]?.attributes
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

  const subPanel = (
    <SubPanel>
      {!is1ColumnLayout && (
        <>
          <ReturnButton href="/chronicles" title={format("chronicles")} />
          <HorizontalLine />
        </>
      )}

      <ChroniclesLists chapters={chapters} currentChronicleSlug={chronicle.slug} />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      {is1ColumnLayout && (
        <ReturnButton href="/chronicles" title={format("chronicles")} className="mb-10" />
      )}

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
            <ElementsSeparator>
              {[
                <ThumbnailHeader
                  key="thumbnailHeader"
                  pre_title={selectedContentTranslation.pre_title}
                  title={selectedContentTranslation.title}
                  subtitle={selectedContentTranslation.subtitle}
                  languageSwitcher={
                    ContentLanguageSwitcherProps.locales.size > 1 ? (
                      <ContentLanguageSwitcher {...ContentLanguageSwitcherProps} />
                    ) : undefined
                  }
                  categories={filterHasAttributes(primaryContent?.categories?.data, [
                    "attributes",
                  ]).map((category) => formatCategory(category.attributes.slug))}
                  type={
                    primaryContent?.type?.data?.attributes
                      ? formatContentType(primaryContent.type.data.attributes.slug)
                      : undefined
                  }
                  description={selectedContentTranslation.description}
                  thumbnail={primaryContent?.thumbnail?.data?.attributes}
                />,

                selectedContentTranslation.text_set?.text && (
                  <Markdawn text={selectedContentTranslation.text_set.text} />
                ),
              ]}
            </ElementsSeparator>
          )}
        </>
      )}
    </ContentPanel>
  );

  return (
    <AppLayout
      contentPanel={contentPanel}
      subPanel={subPanel}
      subPanelIcon="format_list_numbered"
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
  const { format, formatCategory, formatContentType } = getFormat(context.locale);
  const slug =
    context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "";
  const chronicle = await sdk.getChronicle({ slug: slug });
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
              [format("type", { count: Infinity })]: [
                chronicle.chronicles.data[0].attributes.contents.data[0].attributes.type?.data
                  ?.attributes
                  ? formatContentType(
                      chronicle.chronicles.data[0].attributes.contents.data[0].attributes.type.data
                        .attributes.slug
                    )
                  : undefined,
              ],
              [format("category", { count: Infinity })]: filterHasAttributes(
                chronicle.chronicles.data[0].attributes.contents.data[0].attributes.categories
                  ?.data,
                ["attributes"]
              ).map((category) => formatCategory(category.attributes.slug)),
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
    openGraph: getOpenGraph(format, title, description, thumbnail),
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
  filterHasAttributes(contents.chronicles?.data, ["attributes"]).map((wikiPage) => {
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
