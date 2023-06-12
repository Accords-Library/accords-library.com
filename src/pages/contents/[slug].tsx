import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { getTocFromMarkdawn, Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import { TranslatedReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { PreviewCard, TranslatedPreviewCard } from "components/PreviewCard";
import { ThumbnailHeader } from "components/ThumbnailHeader";
import { getReadySdk } from "graphql/sdk";
import { prettyInlineTitle, prettySlug } from "helpers/formatters";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { ContentWithTranslations } from "types/types";
import { useScrollTopOnChange } from "hooks/useScrollOnChange";
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
import { ButtonGroup, ButtonGroupProps } from "components/Inputs/ButtonGroup";
import { AudioPlayer, VideoPlayer } from "components/Player";
import { HorizontalLine } from "components/HorizontalLine";
import { Credits } from "components/Credits";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

type SetType = "audio_set" | "text_set" | "video_set";

interface Props extends AppLayoutRequired {
  content: ContentWithTranslations;
}

const Content = ({ content, ...otherProps }: Props): JSX.Element => {
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const { format, formatCategory, formatLibraryItemSubType, formatContentType } = useFormat();

  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: content.translations,
    languageExtractor: useCallback(
      (item: NonNullable<Props["content"]["translations"][number]>) =>
        item.language?.data?.attributes?.code,
      []
    ),
  });

  useScrollTopOnChange(Ids.ContentPanel, [selectedTranslation]);
  const [selectedSetType, setSelectedSetType] = useState<SetType>();

  useEffect(() => {
    if (isDefined(selectedSetType) && selectedTranslation?.[selectedSetType]) return;
    if (selectedTranslation?.text_set) {
      setSelectedSetType("text_set");
    } else if (selectedTranslation?.audio_set) {
      setSelectedSetType("audio_set");
    } else if (selectedTranslation?.video_set) {
      setSelectedSetType("video_set");
    } else {
      setSelectedSetType(undefined);
    }
  }, [selectedSetType, selectedTranslation]);

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

  const setTypeSelectorProps: ButtonGroupProps["buttonsProps"] = [
    {
      text: "Text",
      icon: "subject",
      visible: isDefined(selectedTranslation?.text_set),
      onClick: () => setSelectedSetType("text_set"),
      active: selectedSetType === "text_set",
    },
    {
      text: "Audio",
      icon: "headphones",
      visible: isDefined(selectedTranslation?.audio_set),
      onClick: () => setSelectedSetType("audio_set"),
      active: selectedSetType === "audio_set",
    },
    {
      text: "Video",
      icon: "movie",
      visible: isDefined(selectedTranslation?.video_set),
      onClick: () => setSelectedSetType("video_set"),
      active: selectedSetType === "video_set",
    },
  ];

  const subPanel = (
    <SubPanel>
      <ElementsSeparator>
        {[
          !is1ColumnLayout && <TranslatedReturnButton {...returnButtonProps} />,

          selectedSetType === "text_set" ? (
            <Credits
              key="credits"
              languageCode={selectedTranslation?.language?.data?.attributes?.code}
              sourceLanguageCode={
                selectedTranslation?.text_set?.source_language?.data?.attributes?.code
              }
              status={selectedTranslation?.text_set?.status}
              transcribers={selectedTranslation?.text_set?.transcribers?.data}
              translators={selectedTranslation?.text_set?.translators?.data}
              proofreaders={selectedTranslation?.text_set?.proofreaders?.data}
              notes={selectedTranslation?.text_set?.notes}
            />
          ) : selectedSetType === "audio_set" ? (
            <Credits
              key="credits"
              languageCode={selectedTranslation?.language?.data?.attributes?.code}
              sourceLanguageCode={
                selectedTranslation?.audio_set?.source_language?.data?.attributes?.code
              }
              status={selectedTranslation?.audio_set?.status}
              dubbers={selectedTranslation?.audio_set?.dubbers?.data}
              notes={selectedTranslation?.audio_set?.notes}
            />
          ) : (
            selectedSetType === "video_set" && (
              <Credits
                key="credits"
                languageCode={selectedTranslation?.language?.data?.attributes?.code}
                sourceLanguageCode={
                  selectedTranslation?.video_set?.source_language?.data?.attributes?.code
                }
                status={selectedTranslation?.video_set?.status}
                subbers={selectedTranslation?.video_set?.subbers?.data}
                notes={selectedTranslation?.video_set?.notes}
              />
            )
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
                            ? [formatLibraryItemSubType(libraryItem.attributes.metadata[0])]
                            : []
                        }
                        bottomChips={filterHasAttributes(libraryItem.attributes.categories?.data, [
                          "attributes",
                        ]).map((category) => formatCategory(category.attributes.slug))}
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
      {is1ColumnLayout && <TranslatedReturnButton {...returnButtonProps} className="mb-10" />}

      <div className="grid place-items-center">
        <ElementsSeparator
          separator={
            selectedSetType === "text_set" ? (
              <HorizontalLine className="max-w-2xl" />
            ) : (
              <div className="py-8" />
            )
          }>
          {[
            <div key="thumbnailHeader" className="grid place-items-center gap-6">
              <ThumbnailHeader
                className="max-w-2xl"
                thumbnail={content.thumbnail?.data?.attributes}
                pre_title={selectedTranslation?.pre_title}
                title={selectedTranslation?.title}
                subtitle={selectedTranslation?.subtitle}
                description={selectedTranslation?.description}
                categories={filterHasAttributes(content.categories?.data, ["attributes"]).map(
                  (category) => formatCategory(category.attributes.slug)
                )}
                type={
                  content.type?.data?.attributes
                    ? formatContentType(content.type.data.attributes.slug)
                    : undefined
                }
                languageSwitcher={
                  languageSwitcherProps.locales.size > 1 ? (
                    <LanguageSwitcher {...languageSwitcherProps} />
                  ) : undefined
                }
              />
              {setTypeSelectorProps.filter((button) => button.visible).length > 1 && (
                <ButtonGroup buttonsProps={setTypeSelectorProps} />
              )}
            </div>,

            content.previous_contents?.data && content.previous_contents.data.length > 0 && (
              <RelatedContentsSection
                title={format("previous_content", { count: content.previous_contents.data.length })}
                contents={filterHasAttributes(content.previous_contents.data, ["attributes"]).map(
                  ({ attributes }) => attributes
                )}
                isInitiallyOpened={false}
              />
            ),

            selectedSetType === "text_set" && selectedTranslation?.text_set?.text ? (
              <Markdawn className="max-w-2xl" text={selectedTranslation.text_set.text} />
            ) : selectedSetType === "audio_set" &&
              selectedTranslation?.audio_set &&
              selectedTranslation.language?.data?.attributes?.code ? (
              <AudioPlayer
                title={prettyInlineTitle(
                  selectedTranslation.pre_title,
                  selectedTranslation.title,
                  selectedTranslation.subtitle
                )}
                src={getAudioURL(content.slug, selectedTranslation.language.data.attributes.code)}
                className="max-w-2xl"
              />
            ) : (
              selectedSetType === "video_set" &&
              selectedTranslation?.video_set &&
              selectedTranslation.language?.data?.attributes?.code && (
                <VideoPlayer
                  title={prettyInlineTitle(
                    selectedTranslation.pre_title,
                    selectedTranslation.title,
                    selectedTranslation.subtitle
                  )}
                  src={getVideoURL(content.slug, selectedTranslation.language.data.attributes.code)}
                  subSrc={`${process.env.NEXT_PUBLIC_URL_ASSETS}/contents/videos/\
${content.slug}_${selectedTranslation.language.data.attributes.code}.vtt`}
                  className="max-w-[90vh]"
                />
              )
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
  const { format, formatCategory, formatContentType } = getFormat(context.locale);
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const content = await sdk.getContentText({ slug: slug });

  if (!content.contents?.data[0]?.attributes?.translations) {
    return { notFound: true };
  }

  const { title, description, audio, video } = (() => {
    if (context.locale && context.locales) {
      const selectedTranslation = staticSmartLanguage({
        items: content.contents.data[0].attributes.translations,
        languageExtractor: (item) => item.language?.data?.attributes?.code,
        preferredLanguages: getDefaultPreferredLanguages(context.locale, context.locales),
      });
      if (selectedTranslation) {
        const rawDescription = isDefinedAndNotEmpty(selectedTranslation.description)
          ? selectedTranslation.description
          : selectedTranslation.text_set?.text;

        return {
          title: prettyInlineTitle(
            selectedTranslation.pre_title,
            selectedTranslation.title,
            selectedTranslation.subtitle
          ),
          description: getDescription(rawDescription, {
            [format("type", { count: Infinity })]: [
              content.contents.data[0].attributes.type?.data?.attributes
                ? formatContentType(content.contents.data[0].attributes.type.data.attributes.slug)
                : undefined,
            ],
            [format("category", { count: Infinity })]: filterHasAttributes(
              content.contents.data[0].attributes.categories?.data,
              ["attributes"]
            ).map((category) => formatCategory(category.attributes.slug)),
          }),
          audio:
            selectedTranslation.language?.data?.attributes?.code && selectedTranslation.audio_set
              ? getAudioURL(slug, selectedTranslation.language.data.attributes.code)
              : undefined,
          video:
            selectedTranslation.language?.data?.attributes?.code && selectedTranslation.video_set
              ? getVideoURL(slug, selectedTranslation.language.data.attributes.code)
              : undefined,
        };
      }
    }
    return {
      title: prettySlug(content.contents.data[0].attributes.slug),
      description: undefined,
      audio: undefined,
      video: undefined,
    };
  })();

  const thumbnail = content.contents.data[0].attributes.thumbnail?.data?.attributes;

  const props: Props = {
    content: content.contents.data[0].attributes as ContentWithTranslations,
    openGraph: getOpenGraph(format, title, description, thumbnail, audio, video),
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
      overflowWhenOpen="visible"
      trigger={
        <div className="flex place-content-center place-items-center gap-4">
          <h2 className="text-center text-2xl">{title}</h2>
          <Button icon={isOpened ? "expand_less" : "expand_more"} active={isOpened} size="small" />
        </div>
      }
      contentInnerClassName={cJoin(
        cIf(contents.length > 1, "py-10", "py-6"),
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
  const { formatCategory, formatContentType } = useFormat();
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
      topChips={type?.data?.attributes ? [formatContentType(type.data.attributes.slug)] : undefined}
      bottomChips={filterHasAttributes(categories?.data, ["attributes"]).map((category) =>
        formatCategory(category.attributes.slug)
      )}
      keepInfoVisible
    />
  );
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const getAudioURL = (slug: string, langCode: string): string =>
  `${process.env.NEXT_PUBLIC_URL_ASSETS}/contents/audios/\
${slug}_${langCode}.mp3`;

const getVideoURL = (slug: string, langCode: string): string =>
  `${process.env.NEXT_PUBLIC_URL_ASSETS}/contents/videos/\
${slug}_${langCode}.mp4`;
