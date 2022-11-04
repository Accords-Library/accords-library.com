import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import naturalCompare from "string-natural-compare";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Chip } from "components/Chip";
import { HorizontalLine } from "components/HorizontalLine";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import { TranslatedReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { RecorderChip } from "components/RecorderChip";
import { ThumbnailHeader } from "components/ThumbnailHeader";
import { ToolTip } from "components/ToolTip";
import { getReadySdk } from "graphql/sdk";
import {
  prettyInlineTitle,
  prettyLanguage,
  prettyItemSubType,
  prettySlug,
} from "helpers/formatters";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { filterHasAttributes, getStatusDescription, isDefinedAndNotEmpty } from "helpers/others";
import { ContentWithTranslations } from "types/types";
import { useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { getOpenGraph } from "helpers/openGraph";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { getDescription } from "helpers/description";
import { TranslatedPreviewLine } from "components/PreviewLine";
import { cIf } from "helpers/className";
import { getLangui } from "graphql/fetchLocalData";
import { Ids } from "types/ids";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  content: ContentWithTranslations;
}

const Content = ({ content, ...otherProps }: Props): JSX.Element => {
  const isContentPanelAtLeast2xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast2xl);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const langui = useAtomGetter(atoms.localData.langui);
  const languages = useAtomGetter(atoms.localData.languages);

  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: content.translations,
    languageExtractor: useCallback(
      (item: NonNullable<Props["content"]["translations"][number]>) =>
        item.language?.data?.attributes?.code,
      []
    ),
  });

  useScrollTopOnChange(Ids.ContentPanel, [selectedTranslation]);

  const { previousContent, nextContent } = useMemo(
    () => ({
      previousContent:
        content.folder?.data?.attributes?.contents && content.folder.data.attributes.sequence
          ? getPreviousContent(content.folder.data.attributes.contents.data, content.slug)
          : undefined,
      nextContent:
        content.folder?.data?.attributes?.contents && content.folder.data.attributes.sequence
          ? getNextContent(content.folder.data.attributes.contents.data, content.slug)
          : undefined,
    }),
    [content.folder, content.slug]
  );

  const returnButtonProps = useMemo(
    () => ({
      href: content.folder?.data?.attributes
        ? `/contents/folder/${content.folder.data.attributes.slug}`
        : "/contents",

      translations: filterHasAttributes(content.folder?.data?.attributes?.titles, [
        "language.data.attributes.code",
      ] as const).map((title) => ({
        language: title.language.data.attributes.code,
        title: title.title,
      })),
      fallback: {
        title: content.folder?.data?.attributes
          ? prettySlug(content.folder.data.attributes.slug)
          : langui.contents,
      },
      langui,
    }),
    [content.folder?.data?.attributes, langui]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <TranslatedReturnButton {...returnButtonProps} displayOnlyOn="3ColumnsLayout" />

        {selectedTranslation?.text_set?.source_language?.data?.attributes?.code !== undefined && (
          <>
            <HorizontalLine />
            <div className="grid gap-5">
              <h2 className="text-xl">
                {selectedTranslation.text_set.source_language.data.attributes.code ===
                selectedTranslation.language?.data?.attributes?.code
                  ? langui.transcript_notice
                  : langui.translation_notice}
              </h2>

              {selectedTranslation.text_set.source_language.data.attributes.code !==
                selectedTranslation.language?.data?.attributes?.code && (
                <div className="grid place-items-center gap-2">
                  <p className="font-headers font-bold">{langui.source_language}:</p>
                  <Chip
                    text={prettyLanguage(
                      selectedTranslation.text_set.source_language.data.attributes.code,
                      languages
                    )}
                  />
                </div>
              )}

              <div className="grid grid-flow-col place-content-center place-items-center gap-2">
                <p className="font-headers font-bold">{langui.status}:</p>

                <ToolTip
                  content={getStatusDescription(selectedTranslation.text_set.status, langui)}
                  maxWidth={"20rem"}>
                  <Chip text={selectedTranslation.text_set.status} />
                </ToolTip>
              </div>

              {selectedTranslation.text_set.transcribers &&
                selectedTranslation.text_set.transcribers.data.length > 0 && (
                  <div>
                    <p className="font-headers font-bold">{langui.transcribers}:</p>
                    <div className="grid place-content-center place-items-center gap-2">
                      {filterHasAttributes(selectedTranslation.text_set.transcribers.data, [
                        "attributes",
                        "id",
                      ] as const).map((recorder) => (
                        <Fragment key={recorder.id}>
                          <RecorderChip recorder={recorder.attributes} />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}

              {selectedTranslation.text_set.translators &&
                selectedTranslation.text_set.translators.data.length > 0 && (
                  <div>
                    <p className="font-headers font-bold">{langui.translators}:</p>
                    <div className="grid place-content-center place-items-center gap-2">
                      {filterHasAttributes(selectedTranslation.text_set.translators.data, [
                        "attributes",
                        "id",
                      ] as const).map((recorder) => (
                        <Fragment key={recorder.id}>
                          <RecorderChip recorder={recorder.attributes} />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}

              {selectedTranslation.text_set.proofreaders &&
                selectedTranslation.text_set.proofreaders.data.length > 0 && (
                  <div>
                    <p className="font-headers font-bold">{langui.proofreaders}:</p>
                    <div className="grid place-content-center place-items-center gap-2">
                      {filterHasAttributes(selectedTranslation.text_set.proofreaders.data, [
                        "attributes",
                        "id",
                      ] as const).map((recorder) => (
                        <Fragment key={recorder.id}>
                          <RecorderChip recorder={recorder.attributes} />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}

              {isDefinedAndNotEmpty(selectedTranslation.text_set.notes) && (
                <div>
                  <p className="font-headers font-bold">{langui.notes}:</p>
                  <div className="grid place-content-center place-items-center gap-2">
                    <Markdawn text={selectedTranslation.text_set.notes} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {selectedTranslation?.text_set?.text && (
          <>
            <TableOfContents
              text={selectedTranslation.text_set.text}
              title={prettyInlineTitle(
                selectedTranslation.pre_title,
                selectedTranslation.title,
                selectedTranslation.subtitle
              )}
              horizontalLine
            />
          </>
        )}

        {content.ranged_contents?.data && content.ranged_contents.data.length > 0 && (
          <>
            <HorizontalLine />
            <div>
              <p className="font-headers text-2xl font-bold">{langui.source}</p>
              <div className="mt-6 grid place-items-center gap-6">
                {filterHasAttributes(content.ranged_contents.data, [
                  "attributes.library_item.data.attributes",
                  "attributes.library_item.data.id",
                ] as const).map((rangedContent) => {
                  const libraryItem = rangedContent.attributes.library_item.data;
                  return (
                    <div
                      key={libraryItem.attributes.slug}
                      className={cIf(is1ColumnLayout, "w-3/4")}>
                      <PreviewCard
                        href={`/library/${libraryItem.attributes.slug}`}
                        title={libraryItem.attributes.title}
                        subtitle={libraryItem.attributes.subtitle}
                        thumbnail={libraryItem.attributes.thumbnail?.data?.attributes}
                        thumbnailAspectRatio="21/29.7"
                        thumbnailRounded={false}
                        topChips={
                          libraryItem.attributes.metadata &&
                          libraryItem.attributes.metadata.length > 0 &&
                          libraryItem.attributes.metadata[0]
                            ? [prettyItemSubType(libraryItem.attributes.metadata[0])]
                            : []
                        }
                        bottomChips={filterHasAttributes(libraryItem.attributes.categories?.data, [
                          "attributes",
                        ] as const).map((category) => category.attributes.short)}
                        metadata={{
                          releaseDate: libraryItem.attributes.release_date,
                          price: libraryItem.attributes.price,
                          position: "Bottom",
                        }}
                        infoAppend={
                          !isUntangibleGroupItem(libraryItem.attributes.metadata?.[0]) && (
                            <PreviewCardCTAs id={libraryItem.id} />
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </SubPanel>
    ),
    [
      content.ranged_contents?.data,
      languages,
      langui,
      returnButtonProps,
      selectedTranslation,
      is1ColumnLayout,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel>
        <TranslatedReturnButton
          {...returnButtonProps}
          displayOnlyOn="1ColumnLayout"
          className="mb-10"
        />

        <div className="grid place-items-center">
          <ThumbnailHeader
            thumbnail={content.thumbnail?.data?.attributes}
            pre_title={selectedTranslation?.pre_title}
            title={selectedTranslation?.title}
            subtitle={selectedTranslation?.subtitle}
            description={selectedTranslation?.description}
            type={content.type}
            categories={content.categories}
            languageSwitcher={
              languageSwitcherProps.locales.size > 1 ? (
                <LanguageSwitcher {...languageSwitcherProps} />
              ) : undefined
            }
          />

          {previousContent?.attributes && (
            <div className="mt-12 mb-8 w-full">
              <h2 className="mb-4 text-center text-2xl">{langui.previous_content}</h2>
              <TranslatedPreviewLine
                href={`/contents/${previousContent.attributes.slug}`}
                translations={filterHasAttributes(previousContent.attributes.translations, [
                  "language.data.attributes.code",
                ] as const).map((translation) => ({
                  pre_title: translation.pre_title,
                  title: translation.title,
                  subtitle: translation.subtitle,
                  language: translation.language.data.attributes.code,
                }))}
                fallback={{
                  title: prettySlug(previousContent.attributes.slug),
                }}
                thumbnail={previousContent.attributes.thumbnail?.data?.attributes}
                topChips={
                  isContentPanelAtLeast2xl && previousContent.attributes.type?.data?.attributes
                    ? [
                        previousContent.attributes.type.data.attributes.titles?.[0]
                          ? previousContent.attributes.type.data.attributes.titles[0]?.title
                          : prettySlug(previousContent.attributes.type.data.attributes.slug),
                      ]
                    : undefined
                }
                bottomChips={
                  isContentPanelAtLeast2xl
                    ? previousContent.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )
                    : undefined
                }
              />
            </div>
          )}

          {selectedTranslation?.text_set?.text && (
            <>
              <HorizontalLine />
              <Markdawn text={selectedTranslation.text_set.text} />
            </>
          )}

          {nextContent?.attributes && (
            <>
              <HorizontalLine />
              <h2 className="mb-4 text-center text-2xl">{langui.followup_content}</h2>
              <TranslatedPreviewLine
                href={`/contents/${nextContent.attributes.slug}`}
                translations={filterHasAttributes(nextContent.attributes.translations, [
                  "language.data.attributes.code",
                ] as const).map((translation) => ({
                  pre_title: translation.pre_title,
                  title: translation.title,
                  subtitle: translation.subtitle,
                  language: translation.language.data.attributes.code,
                }))}
                fallback={{ title: nextContent.attributes.slug }}
                thumbnail={nextContent.attributes.thumbnail?.data?.attributes}
                topChips={
                  isContentPanelAtLeast2xl && nextContent.attributes.type?.data?.attributes
                    ? [
                        nextContent.attributes.type.data.attributes.titles?.[0]
                          ? nextContent.attributes.type.data.attributes.titles[0]?.title
                          : prettySlug(nextContent.attributes.type.data.attributes.slug),
                      ]
                    : undefined
                }
                bottomChips={
                  isContentPanelAtLeast2xl
                    ? nextContent.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )
                    : undefined
                }
              />
            </>
          )}
        </div>
      </ContentPanel>
    ),
    [
      LanguageSwitcher,
      content.categories,
      content.thumbnail?.data?.attributes,
      content.type,
      isContentPanelAtLeast2xl,
      languageSwitcherProps,
      langui,
      nextContent?.attributes,
      previousContent?.attributes,
      returnButtonProps,
      selectedTranslation?.description,
      selectedTranslation?.pre_title,
      selectedTranslation?.subtitle,
      selectedTranslation?.text_set?.text,
      selectedTranslation?.title,
    ]
  );

  return <AppLayout contentPanel={contentPanel} subPanel={subPanel} {...otherProps} />;
};
export default Content;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const content = await sdk.getContentText({
    slug: slug,
    language_code: context.locale ?? "en",
  });

  if (!content.contents?.data[0]?.attributes?.translations) {
    return { notFound: true };
  }

  const { title, description } = (() => {
    if (context.locale && context.locales) {
      const selectedTranslation = staticSmartLanguage({
        items: content.contents.data[0].attributes.translations,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
      });
      if (selectedTranslation) {
        return {
          title: prettyInlineTitle(
            selectedTranslation.pre_title,
            selectedTranslation.title,
            selectedTranslation.subtitle
          ),
          description: getDescription(selectedTranslation.description, {
            [langui.type ?? "Type"]: [
              content.contents.data[0].attributes.type?.data?.attributes?.titles?.[0]?.title,
            ],
            [langui.categories ?? "Categories"]: filterHasAttributes(
              content.contents.data[0].attributes.categories?.data,
              ["attributes"] as const
            ).map((category) => category.attributes.short),
          }),
        };
      }
    }
    return {
      title: prettySlug(content.contents.data[0].attributes.slug),
      description: undefined,
    };
  })();

  const thumbnail = content.contents.data[0].attributes.thumbnail?.data?.attributes;

  content.contents.data[0].attributes.folder?.data?.attributes?.contents?.data.sort((a, b) =>
    a.attributes && b.attributes ? naturalCompare(a.attributes.slug, b.attributes.slug) : 0
  );

  const props: Props = {
    content: content.contents.data[0].attributes as ContentWithTranslations,
    openGraph: getOpenGraph(langui, title, description, thumbnail),
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getContentsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(contents.contents?.data, ["attributes"] as const).map((item) => {
    context.locales?.map((local) => {
      paths.push({
        params: { slug: item.attributes.slug },
        locale: local,
      });
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

type FolderContents = NonNullable<
  NonNullable<
    NonNullable<NonNullable<ContentWithTranslations["folder"]>["data"]>["attributes"]
  >["contents"]
>["data"];

const getPreviousContent = (contents: FolderContents, currentSlug: string) => {
  for (let index = 0; index < contents.length; index++) {
    const content = contents[index];
    if (content.attributes?.slug === currentSlug && index > 0) {
      return contents[index - 1];
    }
  }
  return undefined;
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const getNextContent = (contents: FolderContents, currentSlug: string) => {
  for (let index = 0; index < contents.length; index++) {
    const content = contents[index];
    if (content.attributes?.slug === currentSlug && index < contents.length - 1) {
      return contents[index + 1];
    }
  }
  return undefined;
};
