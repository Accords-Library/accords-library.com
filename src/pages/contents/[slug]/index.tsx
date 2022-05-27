import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
import { HorizontalLine } from "components/HorizontalLine";
import { Markdawn } from "components/Markdown/Markdawn";
import { TOC } from "components/Markdown/TOC";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { PreviewLine } from "components/PreviewLine";
import { RecorderChip } from "components/RecorderChip";
import { ThumbnailHeader } from "components/ThumbnailHeader";
import { ToolTip } from "components/ToolTip";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { getNextContent, getPreviousContent } from "helpers/contents";
import {
  prettyinlineTitle,
  prettyLanguage,
  prettySlug,
} from "helpers/formatters";
import { getStatusDescription } from "helpers/others";
import { ContentWithTranslations, Immutable } from "helpers/types";
import { useMediaMobile } from "hooks/useMediaQuery";
import { AnchorIds, useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { Fragment } from "react";

interface Props extends AppStaticProps {
  content: ContentWithTranslations;
}

export default function Content(props: Immutable<Props>): JSX.Element {
  const { langui, content, languages } = props;
  const isMobile = useMediaMobile();

  const [selectedTranslation, LanguageSwitcher] = useSmartLanguage({
    items: content.translations,
    languages: languages,
    languageExtractor: (item) => item.language?.data?.attributes?.code,
  });

  useScrollTopOnChange(AnchorIds.ContentPanel, [selectedTranslation]);

  const previousContent = content.group?.data?.attributes?.contents
    ? getPreviousContent(
        content.group.data.attributes.contents.data,
        content.slug
      )
    : undefined;

  const nextContent = content.group?.data?.attributes?.contents
    ? getNextContent(content.group.data.attributes.contents.data, content.slug)
    : undefined;

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/contents`}
        title={langui.contents}
        langui={langui}
        displayOn={ReturnButtonType.Desktop}
        horizontalLine
      />

      {selectedTranslation?.text_set && (
        <div className="grid gap-5">
          <h2 className="text-xl">
            {selectedTranslation.text_set.source_language?.data?.attributes
              ?.code === selectedTranslation.language?.data?.attributes?.code
              ? langui.transcript_notice
              : langui.translation_notice}
          </h2>

          {selectedTranslation.text_set.source_language?.data?.attributes
            ?.code &&
            selectedTranslation.text_set.source_language.data.attributes
              .code !==
              selectedTranslation.language?.data?.attributes?.code && (
              <div className="grid place-items-center gap-2">
                <p className="font-headers">{langui.source_language}:</p>
                <Chip>
                  {prettyLanguage(
                    selectedTranslation.text_set.source_language.data.attributes
                      .code,
                    languages
                  )}
                </Chip>
              </div>
            )}

          <div className="grid grid-flow-col place-content-center place-items-center gap-2">
            <p className="font-headers">{langui.status}:</p>

            <ToolTip
              content={getStatusDescription(
                selectedTranslation.text_set.status,
                langui
              )}
              maxWidth={"20rem"}
            >
              <Chip>{selectedTranslation.text_set.status}</Chip>
            </ToolTip>
          </div>

          {selectedTranslation.text_set.transcribers &&
            selectedTranslation.text_set.transcribers.data.length > 0 && (
              <div>
                <p className="font-headers">{langui.transcribers}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {selectedTranslation.text_set.transcribers.data.map(
                    (recorder) => (
                      <Fragment key={recorder.id}>
                        {recorder.attributes && (
                          <RecorderChip
                            langui={langui}
                            recorder={recorder.attributes}
                          />
                        )}
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            )}

          {selectedTranslation.text_set.translators &&
            selectedTranslation.text_set.translators.data.length > 0 && (
              <div>
                <p className="font-headers">{langui.translators}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {selectedTranslation.text_set.translators.data.map(
                    (recorder) => (
                      <Fragment key={recorder.id}>
                        {recorder.attributes && (
                          <RecorderChip
                            langui={langui}
                            recorder={recorder.attributes}
                          />
                        )}
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            )}

          {selectedTranslation.text_set.proofreaders &&
            selectedTranslation.text_set.proofreaders.data.length > 0 && (
              <div>
                <p className="font-headers">{langui.proofreaders}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {selectedTranslation.text_set.proofreaders.data.map(
                    (recorder) => (
                      <Fragment key={recorder.id}>
                        {recorder.attributes && (
                          <RecorderChip
                            langui={langui}
                            recorder={recorder.attributes}
                          />
                        )}
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            )}

          {selectedTranslation.text_set.notes && (
            <div>
              <p className="font-headers">{"Notes"}:</p>
              <div className="grid place-content-center place-items-center gap-2">
                <Markdawn text={selectedTranslation.text_set.notes} />
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTranslation?.text_set?.text && (
        <>
          <HorizontalLine />
          <TOC
            text={selectedTranslation.text_set.text}
            title={prettyinlineTitle(
              selectedTranslation.pre_title,
              selectedTranslation.title,
              selectedTranslation.subtitle
            )}
          />
        </>
      )}
    </SubPanel>
  );
  const contentPanel = (
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
          languageSwitcher={<LanguageSwitcher />}
        />

        {previousContent?.attributes && (
          <div className="mt-12 mb-8 w-full">
            <h2 className="mb-4 text-center text-2xl">
              {langui.previous_content}
            </h2>
            <PreviewLine
              href={`/contents/${previousContent.attributes.slug}`}
              pre_title={
                previousContent.attributes.translations?.[0]?.pre_title
              }
              title={
                previousContent.attributes.translations?.[0]?.title ??
                prettySlug(previousContent.attributes.slug)
              }
              subtitle={previousContent.attributes.translations?.[0]?.subtitle}
              thumbnail={previousContent.attributes.thumbnail?.data?.attributes}
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
                            previousContent.attributes.type.data.attributes.slug
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
            <PreviewLine
              href={`/contents/${nextContent.attributes.slug}`}
              pre_title={nextContent.attributes.translations?.[0]?.pre_title}
              title={
                nextContent.attributes.translations?.[0]?.title ??
                prettySlug(nextContent.attributes.slug)
              }
              subtitle={nextContent.attributes.translations?.[0]?.subtitle}
              thumbnail={nextContent.attributes.thumbnail?.data?.attributes}
              thumbnailAspectRatio="3/2"
              topChips={
                isMobile
                  ? undefined
                  : nextContent.attributes.type?.data?.attributes
                  ? [
                      nextContent.attributes.type.data.attributes.titles?.[0]
                        ? nextContent.attributes.type.data.attributes.titles[0]
                            ?.title
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
  );

  let description = "";
  if (content.type?.data) {
    description += `${langui.type}: `;

    description +=
      content.type.data.attributes?.titles?.[0]?.title ??
      prettySlug(content.type.data.attributes?.slug);

    description += "\n";
  }
  if (content.categories?.data && content.categories.data.length > 0) {
    description += `${langui.categories}: `;
    description += content.categories.data
      .map((category) => category.attributes?.short)
      .join(" | ");
    description += "\n";
  }

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
      thumbnail={content.thumbnail?.data?.attributes ?? undefined}
      contentPanel={contentPanel}
      subPanel={subPanel}
      description={description}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const content = await sdk.getContentText({
    slug: slug,
    language_code: context.locale ?? "en",
  });

  if (!content.contents || !content.contents.data[0]?.attributes?.translations) {
    return { notFound: true };
  }
  const props: Props = {
    ...(await getAppStaticProps(context)),
    content: content.contents.data[0].attributes as ContentWithTranslations,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const contents = await sdk.getContentsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  contents.contents?.data.map((item) => {
    context.locales?.map((local) => {
      if (item.attributes)
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
}
