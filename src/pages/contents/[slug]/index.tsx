import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
import { HorizontalLine } from "components/HorizontalLine";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { TranslatedPreviewLine } from "components/PreviewLine";
import { RecorderChip } from "components/RecorderChip";
import { ThumbnailHeader } from "components/ThumbnailHeader";
import { ToolTip } from "components/ToolTip";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { getDescription } from "helpers/description";
import {
  prettyinlineTitle,
  prettyLanguage,
  prettyItemSubType,
  prettySlug,
} from "helpers/formatters";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import {
  filterDefined,
  filterHasAttributes,
  getStatusDescription,
  isDefinedAndNotEmpty,
} from "helpers/others";
import { ContentWithTranslations } from "helpers/types";
import { useMediaMobile } from "hooks/useMediaQuery";
import { AnchorIds, useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {
  content: ContentWithTranslations;
}

const Content = ({
  langui,
  content,
  languages,
  currencies,
  ...otherProps
}: Props): JSX.Element => {
  const isMobile = useMediaMobile();

  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: content.translations,
      languages: languages,
      languageExtractor: useCallback(
        (item: NonNullable<Props["content"]["translations"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
    });

  useScrollTopOnChange(AnchorIds.ContentPanel, [selectedTranslation]);

  const { previousContent, nextContent } = useMemo(
    () => ({
      previousContent: content.group?.data?.attributes?.contents
        ? getPreviousContent(
            content.group.data.attributes.contents.data,
            content.slug
          )
        : undefined,
      nextContent: content.group?.data?.attributes?.contents
        ? getNextContent(
            content.group.data.attributes.contents.data,
            content.slug
          )
        : undefined,
    }),
    [content.group, content.slug]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href={`/contents`}
          title={langui.contents}
          langui={langui}
          displayOn={ReturnButtonType.Desktop}
          horizontalLine
        />

        {selectedTranslation?.text_set?.source_language?.data?.attributes
          ?.code !== undefined && (
          <div className="grid gap-5">
            <h2 className="text-xl">
              {selectedTranslation.text_set.source_language.data.attributes
                .code === selectedTranslation.language?.data?.attributes?.code
                ? langui.transcript_notice
                : langui.translation_notice}
            </h2>

            {selectedTranslation.text_set.source_language.data.attributes
              .code !==
              selectedTranslation.language?.data?.attributes?.code && (
              <div className="grid place-items-center gap-2">
                <p className="font-headers font-bold">
                  {langui.source_language}:
                </p>
                <Chip
                  text={prettyLanguage(
                    selectedTranslation.text_set.source_language.data.attributes
                      .code,
                    languages
                  )}
                />
              </div>
            )}

            <div className="grid grid-flow-col place-content-center place-items-center gap-2">
              <p className="font-headers font-bold">{langui.status}:</p>

              <ToolTip
                content={getStatusDescription(
                  selectedTranslation.text_set.status,
                  langui
                )}
                maxWidth={"20rem"}
              >
                <Chip text={selectedTranslation.text_set.status} />
              </ToolTip>
            </div>

            {selectedTranslation.text_set.transcribers &&
              selectedTranslation.text_set.transcribers.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">
                    {langui.transcribers}:
                  </p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(
                      selectedTranslation.text_set.transcribers.data,
                      ["attributes", "id"] as const
                    ).map((recorder) => (
                      <Fragment key={recorder.id}>
                        <RecorderChip
                          langui={langui}
                          recorder={recorder.attributes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

            {selectedTranslation.text_set.translators &&
              selectedTranslation.text_set.translators.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">
                    {langui.translators}:
                  </p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(
                      selectedTranslation.text_set.translators.data,
                      ["attributes", "id"] as const
                    ).map((recorder) => (
                      <Fragment key={recorder.id}>
                        <RecorderChip
                          langui={langui}
                          recorder={recorder.attributes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

            {selectedTranslation.text_set.proofreaders &&
              selectedTranslation.text_set.proofreaders.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">
                    {langui.proofreaders}:
                  </p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(
                      selectedTranslation.text_set.proofreaders.data,
                      ["attributes", "id"] as const
                    ).map((recorder) => (
                      <Fragment key={recorder.id}>
                        <RecorderChip
                          langui={langui}
                          recorder={recorder.attributes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

            {isDefinedAndNotEmpty(selectedTranslation.text_set.notes) && (
              <div>
                <p className="font-headers font-bold">{"Notes"}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  <Markdawn text={selectedTranslation.text_set.notes} />
                </div>
              </div>
            )}
          </div>
        )}

        {content.ranged_contents?.data &&
          content.ranged_contents.data.length > 0 && (
            <>
              <HorizontalLine />
              <div>
                <p className="font-headers text-2xl font-bold">
                  {langui.source}
                </p>
                <div className="mt-6 grid place-items-center gap-6 text-left">
                  {filterHasAttributes(content.ranged_contents.data, [
                    "attributes.library_item.data.attributes",
                    "attributes.library_item.data.id",
                  ] as const).map((rangedContent) => {
                    const libraryItem =
                      rangedContent.attributes.library_item.data;
                    return (
                      <div
                        key={libraryItem.attributes.slug}
                        className="mobile:w-[80%]"
                      >
                        <PreviewCard
                          href={`/library/${libraryItem.attributes.slug}`}
                          title={libraryItem.attributes.title}
                          subtitle={libraryItem.attributes.subtitle}
                          thumbnail={
                            libraryItem.attributes.thumbnail?.data?.attributes
                          }
                          thumbnailAspectRatio="21/29.7"
                          thumbnailRounded={false}
                          topChips={
                            libraryItem.attributes.metadata &&
                            libraryItem.attributes.metadata.length > 0 &&
                            libraryItem.attributes.metadata[0]
                              ? [
                                  prettyItemSubType(
                                    libraryItem.attributes.metadata[0]
                                  ),
                                ]
                              : []
                          }
                          bottomChips={filterHasAttributes(
                            libraryItem.attributes.categories?.data,
                            ["attributes"] as const
                          ).map((category) => category.attributes.short)}
                          metadata={{
                            currencies: currencies,
                            release_date: libraryItem.attributes.release_date,
                            price: libraryItem.attributes.price,
                            position: "Bottom",
                          }}
                          infoAppend={
                            !isUntangibleGroupItem(
                              libraryItem.attributes.metadata?.[0]
                            ) && (
                              <PreviewCardCTAs
                                id={libraryItem.id}
                                langui={langui}
                              />
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

        {selectedTranslation?.text_set?.text && (
          <>
            <HorizontalLine />
            <TableOfContents
              text={selectedTranslation.text_set.text}
              title={prettyinlineTitle(
                selectedTranslation.pre_title,
                selectedTranslation.title,
                selectedTranslation.subtitle
              )}
              langui={langui}
            />
          </>
        )}
      </SubPanel>
    ),
    [
      content.ranged_contents?.data,
      currencies,
      languages,
      langui,
      selectedTranslation,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel>
        <ReturnButton
          href={`/contents`}
          title={langui.contents}
          langui={langui}
          displayOn={ReturnButtonType.Mobile}
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
            langui={langui}
            languageSwitcher={<LanguageSwitcher {...languageSwitcherProps} />}
          />

          {previousContent?.attributes && (
            <div className="mt-12 mb-8 w-full">
              <h2 className="mb-4 text-center text-2xl">
                {langui.previous_content}
              </h2>
              <TranslatedPreviewLine
                href={`/contents/${previousContent.attributes.slug}`}
                translations={filterDefined(
                  previousContent.attributes.translations
                ).map((translation) => ({
                  pre_title: translation.pre_title,
                  title: translation.title,
                  subtitle: translation.subtitle,
                  language: translation.language?.data?.attributes?.code,
                }))}
                slug={previousContent.attributes.slug}
                languages={languages}
                thumbnail={
                  previousContent.attributes.thumbnail?.data?.attributes
                }
                thumbnailAspectRatio="3/2"
                topChips={
                  isMobile
                    ? undefined
                    : previousContent.attributes.type?.data?.attributes
                    ? [
                        previousContent.attributes.type.data.attributes
                          .titles?.[0]
                          ? previousContent.attributes.type.data.attributes
                              .titles[0]?.title
                          : prettySlug(
                              previousContent.attributes.type.data.attributes
                                .slug
                            ),
                      ]
                    : undefined
                }
                bottomChips={
                  isMobile
                    ? undefined
                    : previousContent.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )
                }
              />
            </div>
          )}

          <HorizontalLine />

          <Markdawn text={selectedTranslation?.text_set?.text ?? ""} />

          {nextContent?.attributes && (
            <>
              <HorizontalLine />
              <h2 className="mb-4 text-center text-2xl">
                {langui.followup_content}
              </h2>
              <TranslatedPreviewLine
                href={`/contents/${nextContent.attributes.slug}`}
                translations={filterDefined(
                  nextContent.attributes.translations
                ).map((translation) => ({
                  pre_title: translation.pre_title,
                  title: translation.title,
                  subtitle: translation.subtitle,
                  language: translation.language?.data?.attributes?.code,
                }))}
                slug={nextContent.attributes.slug}
                languages={languages}
                thumbnail={nextContent.attributes.thumbnail?.data?.attributes}
                thumbnailAspectRatio="3/2"
                topChips={
                  isMobile
                    ? undefined
                    : nextContent.attributes.type?.data?.attributes
                    ? [
                        nextContent.attributes.type.data.attributes.titles?.[0]
                          ? nextContent.attributes.type.data.attributes
                              .titles[0]?.title
                          : prettySlug(
                              nextContent.attributes.type.data.attributes.slug
                            ),
                      ]
                    : undefined
                }
                bottomChips={
                  isMobile
                    ? undefined
                    : nextContent.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )
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
      isMobile,
      languageSwitcherProps,
      languages,
      langui,
      nextContent?.attributes,
      previousContent?.attributes,
      selectedTranslation?.description,
      selectedTranslation?.pre_title,
      selectedTranslation?.subtitle,
      selectedTranslation?.text_set?.text,
      selectedTranslation?.title,
    ]
  );

  return (
    <AppLayout
      navTitle={
        selectedTranslation
          ? prettyinlineTitle(
              selectedTranslation.pre_title,
              selectedTranslation.title,
              selectedTranslation.subtitle
            )
          : prettySlug(content.slug)
      }
      description={getDescription({
        langui: langui,
        description: selectedTranslation?.description,
        type: content.type,
        categories: content.categories,
      })}
      thumbnail={content.thumbnail?.data?.attributes ?? undefined}
      contentPanel={contentPanel}
      subPanel={subPanel}
      currencies={currencies}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Content;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const content = await sdk.getContentText({
    slug: slug,
    language_code: context.locale ?? "en",
  });

  if (!content.contents?.data[0]?.attributes?.translations) {
    return { notFound: true };
  }
  const props: Props = {
    ...(await getAppStaticProps(context)),
    content: content.contents.data[0].attributes as ContentWithTranslations,
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
  filterHasAttributes(contents.contents?.data, ["attributes"] as const).map(
    (item) => {
      context.locales?.map((local) => {
        paths.push({
          params: { slug: item.attributes.slug },
          locale: local,
        });
      });
    }
  );
  return {
    paths,
    fallback: "blocking",
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

type Group = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<ContentWithTranslations["group"]>["data"]
    >["attributes"]
  >["contents"]
>["data"];

const getPreviousContent = (group: Group, currentSlug: string) => {
  for (let index = 0; index < group.length; index++) {
    const content = group[index];
    if (content.attributes?.slug === currentSlug && index > 0) {
      return group[index - 1];
    }
  }
  return undefined;
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const getNextContent = (group: Group, currentSlug: string) => {
  for (let index = 0; index < group.length; index++) {
    const content = group[index];
    if (content.attributes?.slug === currentSlug && index < group.length - 1) {
      return group[index + 1];
    }
  }
  return undefined;
};
