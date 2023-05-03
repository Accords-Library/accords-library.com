import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useCallback, useState } from "react";
import Collapsible from "react-collapsible";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Chip } from "components/Chip";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { getTocFromMarkdawn, Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import { TranslatedReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { PreviewCard, TranslatedPreviewCard } from "components/PreviewCard";
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
import { filterHasAttributes, isDefinedAndNotEmpty } from "helpers/asserts";
import { ContentWithTranslations } from "types/types";
import { useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { getOpenGraph } from "helpers/openGraph";
import { getDefaultPreferredLanguages, staticSmartLanguage } from "helpers/locales";
import { getDescription } from "helpers/description";
import { cIf, cJoin } from "helpers/className";
import { Ids } from "types/ids";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { ElementsSeparator } from "helpers/component";
import { RelatedContentPreviewFragment } from "graphql/generated";
import { Button } from "components/Inputs/Button";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  content: ContentWithTranslations;
}

const Content = ({ content, ...otherProps }: Props): JSX.Element => {
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const { format, formatStatusDescription } = useFormat();
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

  const returnButtonProps = {
    href: content.folder?.data?.attributes
      ? `/contents/folder/${content.folder.data.attributes.slug}`
      : "/contents",

    translations: filterHasAttributes(content.folder?.data?.attributes?.titles, [
      "language.data.attributes.code",
    ]).map((title) => ({
      language: title.language.data.attributes.code,
      title: title.title,
    })),
    fallback: {
      title: content.folder?.data?.attributes
        ? prettySlug(content.folder.data.attributes.slug)
        : format("contents"),
    },
  };

  const toc = getTocFromMarkdawn(
    selectedTranslation?.text_set?.text,
    prettyInlineTitle(
      selectedTranslation?.pre_title,
      selectedTranslation?.title,
      selectedTranslation?.subtitle
    )
  );

  const subPanel = (
    <SubPanel>
      <ElementsSeparator>
        {[
          !is1ColumnLayout && <TranslatedReturnButton {...returnButtonProps} />,

          selectedTranslation?.text_set?.source_language?.data?.attributes?.code !== undefined && (
            <div className="grid gap-5">
              <h2 className="text-xl">
                {selectedTranslation.text_set.source_language.data.attributes.code ===
                selectedTranslation.language?.data?.attributes?.code
                  ? format("transcript_notice")
                  : format("translation_notice")}
              </h2>

              {selectedTranslation.text_set.source_language.data.attributes.code !==
                selectedTranslation.language?.data?.attributes?.code && (
                <div className="grid place-items-center gap-2">
                  <p className="font-headers font-bold">{format("source_language")}:</p>
                  <Chip
                    text={prettyLanguage(
                      selectedTranslation.text_set.source_language.data.attributes.code,
                      languages
                    )}
                  />
                </div>
              )}

              <div className="grid grid-flow-col place-content-center place-items-center gap-2">
                <p className="font-headers font-bold">{format("status")}:</p>

                <ToolTip
                  content={formatStatusDescription(selectedTranslation.text_set.status)}
                  maxWidth={"20rem"}>
                  <Chip text={selectedTranslation.text_set.status} />
                </ToolTip>
              </div>

              {selectedTranslation.text_set.transcribers &&
                selectedTranslation.text_set.transcribers.data.length > 0 && (
                  <div>
                    <p className="font-headers font-bold">{format("transcribers")}:</p>
                    <div className="grid place-content-center place-items-center gap-2">
                      {filterHasAttributes(selectedTranslation.text_set.transcribers.data, [
                        "attributes",
                        "id",
                      ]).map((recorder) => (
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
                    <p className="font-headers font-bold">{format("translators")}:</p>
                    <div className="grid place-content-center place-items-center gap-2">
                      {filterHasAttributes(selectedTranslation.text_set.translators.data, [
                        "attributes",
                        "id",
                      ]).map((recorder) => (
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
                    <p className="font-headers font-bold">{format("proofreaders")}:</p>
                    <div className="grid place-content-center place-items-center gap-2">
                      {filterHasAttributes(selectedTranslation.text_set.proofreaders.data, [
                        "attributes",
                        "id",
                      ]).map((recorder) => (
                        <Fragment key={recorder.id}>
                          <RecorderChip recorder={recorder.attributes} />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}

              {isDefinedAndNotEmpty(selectedTranslation.text_set.notes) && (
                <div>
                  <p className="font-headers font-bold">{format("notes")}:</p>
                  <div className="grid place-content-center place-items-center gap-2">
                    <Markdawn text={selectedTranslation.text_set.notes} />
                  </div>
                </div>
              )}
            </div>
          ),

          toc && <TableOfContents toc={toc} onContentClicked={() => setSubPanelOpened(false)} />,

          content.ranged_contents?.data && content.ranged_contents.data.length > 0 && (
            <div>
              <p className="font-headers text-2xl font-bold">{format("source")}</p>
              <div className="mt-6 grid place-items-center gap-6">
                {filterHasAttributes(content.ranged_contents.data, [
                  "attributes.library_item.data.attributes",
                  "attributes.library_item.data.id",
                ]).map((rangedContent) => {
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
                        ]).map((category) => category.attributes.short)}
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
          ),
        ]}
      </ElementsSeparator>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <TranslatedReturnButton
        {...returnButtonProps}
        displayOnlyOn="1ColumnLayout"
        className="mb-10"
      />

      <div className="grid place-items-center">
        <ElementsSeparator className="max-w-2xl">
          {[
            <ThumbnailHeader
              key="thumbnailHeader"
              className="max-w-2xl"
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
            />,

            content.previous_contents?.data && content.previous_contents.data.length > 0 && (
              <RelatedContentsSection
                title={format("previous_content", { count: content.previous_contents.data.length })}
                contents={filterHasAttributes(content.previous_contents.data, ["attributes"]).map(
                  ({ attributes }) => attributes
                )}
                isInitiallyOpened={false}
              />
            ),

            selectedTranslation?.text_set?.text && (
              <Markdawn className="max-w-2xl" text={selectedTranslation.text_set.text} />
            ),

            content.next_contents?.data && content.next_contents.data.length > 0 && (
              <RelatedContentsSection
                title={format("followup_content", { count: content.next_contents.data.length })}
                contents={filterHasAttributes(content.next_contents.data, ["attributes"]).map(
                  ({ attributes }) => attributes
                )}
              />
            ),
          ]}
        </ElementsSeparator>
      </div>
    </ContentPanel>
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
  const { format } = getFormat(context.locale);
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
            [format("type", { count: Infinity })]: [
              content.contents.data[0].attributes.type?.data?.attributes?.titles?.[0]?.title,
            ],
            [format("category", { count: Infinity })]: filterHasAttributes(
              content.contents.data[0].attributes.categories?.data,
              ["attributes"]
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

  const props: Props = {
    content: content.contents.data[0].attributes as ContentWithTranslations,
    openGraph: getOpenGraph(format, title, description, thumbnail),
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
  filterHasAttributes(contents.contents?.data, ["attributes"]).map((item) => {
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
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface RelatedContentsSectionProps {
  title: string;
  contents: RelatedContentPreviewFragment[];
  isInitiallyOpened?: boolean;
}

const RelatedContentsSection = ({
  title,
  contents,
  isInitiallyOpened = true,
}: RelatedContentsSectionProps) => {
  const [isOpened, setOpened] = useState(isInitiallyOpened);

  return (
    <Collapsible
      open={isOpened}
      onClosing={() => setOpened(false)}
      onOpening={() => setOpened(true)}
      trigger={
        <div className="flex place-content-center place-items-center gap-4">
          <h2 className="text-center text-2xl">{title}</h2>
          <Button icon={isOpened ? "expand_less" : "expand_more"} active={isOpened} size="small" />
        </div>
      }
      contentInnerClassName={cJoin(
        cIf(contents.length > 1, "px-4 py-10", "px-4 py-6"),
        "flex w-full flex-wrap place-content-center items-start gap-x-6 gap-y-8"
      )}
      easing="ease-in-out"
      transitionTime={400}
      lazyRender
      contentHiddenWhenClosed>
      {contents.map((relatedContent) => (
        <RelatedContentPreview key={relatedContent.slug} {...relatedContent} />
      ))}
    </Collapsible>
  );
};

const RelatedContentPreview = ({
  slug,
  translations,
  thumbnail,
  categories,
  type,
}: RelatedContentPreviewFragment) => {
  const isContentPanelAtLeastXl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeastXl);

  return (
    <TranslatedPreviewCard
      href={`/contents/${slug}`}
      className={cIf(isContentPanelAtLeastXl, "max-w-xs")}
      translations={filterHasAttributes(translations, ["language.data.attributes.code"]).map(
        (translation) => ({
          pre_title: translation.pre_title,
          title: translation.title,
          subtitle: translation.subtitle,
          language: translation.language.data.attributes.code,
        })
      )}
      fallback={{ title: slug }}
      thumbnail={thumbnail?.data?.attributes}
      topChips={
        type?.data?.attributes
          ? [
              type.data.attributes.titles?.[0]
                ? type.data.attributes.titles[0]?.title
                : prettySlug(type.data.attributes.slug),
            ]
          : undefined
      }
      bottomChips={categories?.data.map((category) => category.attributes?.short ?? "")}
      keepInfoVisible
    />
  );
};
