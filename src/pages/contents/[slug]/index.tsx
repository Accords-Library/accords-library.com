import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import HorizontalLine from "components/HorizontalLine";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import PreviewLine from "components/PreviewLine";
import RecorderChip from "components/RecorderChip";
import ThumbnailHeader from "components/ThumbnailHeader";
import ToolTip from "components/ToolTip";
import { GetContentTextQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import {
  prettyinlineTitle,
  prettyLanguage,
  prettySlug,
} from "helpers/formatters";
import { getStatusDescription } from "helpers/others";
import { Immutable } from "helpers/types";
import { useMediaMobile } from "hooks/useMediaQuery";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";

interface Props extends AppStaticProps {
  content: Exclude<
    GetContentTextQuery["contents"],
    null | undefined
  >["data"][number]["attributes"];
  contentId: Exclude<
    GetContentTextQuery["contents"],
    null | undefined
  >["data"][number]["id"];
}

export default function Content(props: Immutable<Props>): JSX.Element {
  const { langui, content, languages } = props;
  const isMobile = useMediaMobile();

  const [selectedTextSet, LanguageSwitcher] = useSmartLanguage({
    items: content?.text_set,
    languages: languages,
    languageExtractor: (item) => item?.language?.data?.attributes?.code,
  });

  const selectedTitle = content?.titles?.[0];

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/contents`}
        title={langui.contents}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />

      {selectedTextSet?.source_language?.data?.attributes && (
        <div className="grid gap-5">
          <h2 className="text-xl">
            {selectedTextSet.source_language.data.attributes.code ===
            selectedTextSet.language?.data?.attributes?.code
              ? langui.transcript_notice
              : langui.translation_notice}
          </h2>

          {selectedTextSet.source_language.data.attributes.code !==
            selectedTextSet.language?.data?.attributes?.code && (
            <div className="grid place-items-center gap-2">
              <p className="font-headers">{langui.source_language}:</p>
              <Chip>
                {prettyLanguage(
                  selectedTextSet.source_language.data.attributes.code,
                  languages
                )}
              </Chip>
            </div>
          )}

          <div className="grid grid-flow-col place-items-center place-content-center gap-2">
            <p className="font-headers">{langui.status}:</p>

            <ToolTip
              content={getStatusDescription(selectedTextSet.status, langui)}
              maxWidth={"20rem"}
            >
              <Chip>{selectedTextSet.status}</Chip>
            </ToolTip>
          </div>

          {selectedTextSet.transcribers &&
            selectedTextSet.transcribers.data.length > 0 && (
              <div>
                <p className="font-headers">{langui.transcribers}:</p>
                <div className="grid place-items-center place-content-center gap-2">
                  {selectedTextSet.transcribers.data.map((recorder) => (
                    <>
                      {recorder.attributes && (
                        <RecorderChip
                          key={recorder.id}
                          langui={langui}
                          recorder={recorder.attributes}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}

          {selectedTextSet.translators &&
            selectedTextSet.translators.data.length > 0 && (
              <div>
                <p className="font-headers">{langui.translators}:</p>
                <div className="grid place-items-center place-content-center gap-2">
                  {selectedTextSet.translators.data.map((recorder) => (
                    <>
                      {recorder.attributes && (
                        <RecorderChip
                          key={recorder.id}
                          langui={langui}
                          recorder={recorder.attributes}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}

          {selectedTextSet.proofreaders &&
            selectedTextSet.proofreaders.data.length > 0 && (
              <div>
                <p className="font-headers">{langui.proofreaders}:</p>
                <div className="grid place-items-center place-content-center gap-2">
                  {selectedTextSet.proofreaders.data.map((recorder) => (
                    <>
                      {recorder.attributes && (
                        <RecorderChip
                          key={recorder.id}
                          langui={langui}
                          recorder={recorder.attributes}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            )}

          {selectedTextSet.notes && (
            <div>
              <p className="font-headers">{"Notes"}:</p>
              <div className="grid place-items-center place-content-center gap-2">
                <Markdawn text={selectedTextSet.notes} />
              </div>
            </div>
          )}
        </div>
      )}

      {selectedTextSet && content?.text_set && selectedTextSet.text && (
        <>
          <HorizontalLine />
          <TOC
            text={selectedTextSet.text}
            title={
              content.titles && content.titles.length > 0 && selectedTitle
                ? prettyinlineTitle(
                    selectedTitle.pre_title,
                    selectedTitle.title,
                    selectedTitle.subtitle
                  )
                : prettySlug(content.slug)
            }
          />
        </>
      )}
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href={`/contents/${content?.slug}`}
        title={langui.content}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />

      {content && (
        <div className="grid place-items-center">
          <ThumbnailHeader
            thumbnail={content.thumbnail?.data?.attributes}
            pre_title={
              selectedTitle?.pre_title ?? content.titles?.[0]?.pre_title
            }
            title={selectedTitle?.title ?? content.titles?.[0]?.title}
            subtitle={selectedTitle?.subtitle ?? content.titles?.[0]?.subtitle}
            description={
              selectedTitle?.description ?? content.titles?.[0]?.description
            }
            type={content.type}
            categories={content.categories}
            langui={langui}
            languageSwitcher={<LanguageSwitcher />}
          />

          {content.previous_recommended?.data?.attributes && (
            <div className="mt-12 mb-8 w-full">
              <h2 className="text-center text-2xl mb-4">Previous content</h2>
              <PreviewLine
                href={`/contents/${content.previous_recommended.data.attributes.slug}`}
                pre_title={
                  content.previous_recommended.data.attributes.titles?.[0]
                    ?.pre_title
                }
                title={
                  content.previous_recommended.data.attributes.titles?.[0]
                    ?.title ??
                  prettySlug(content.previous_recommended.data.attributes.slug)
                }
                subtitle={
                  content.previous_recommended.data.attributes.titles?.[0]
                    ?.subtitle
                }
                thumbnail={
                  content.previous_recommended.data.attributes.thumbnail?.data
                    ?.attributes
                }
                thumbnailAspectRatio="3/2"
                topChips={
                  isMobile
                    ? undefined
                    : content.previous_recommended.data.attributes.type?.data
                        ?.attributes
                    ? [
                        content.previous_recommended.data.attributes.type.data
                          .attributes.titles?.[0]
                          ? content.previous_recommended.data.attributes.type
                              .data.attributes.titles[0]?.title
                          : prettySlug(
                              content.previous_recommended.data.attributes.type
                                .data.attributes.slug
                            ),
                      ]
                    : undefined
                }
                bottomChips={
                  isMobile
                    ? undefined
                    : content.previous_recommended.data.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )
                }
              />
            </div>
          )}

          <HorizontalLine />

          <Markdawn text={selectedTextSet?.text ?? ""} />

          {content.next_recommended?.data?.attributes && (
            <>
              <HorizontalLine />
              <h2 className="text-center text-2xl mb-4">Follow-up content</h2>
              <PreviewLine
                href={`/contents/${content.next_recommended.data.attributes.slug}`}
                pre_title={
                  content.next_recommended.data.attributes.titles?.[0]
                    ?.pre_title
                }
                title={
                  content.next_recommended.data.attributes.titles?.[0]?.title ??
                  prettySlug(content.next_recommended.data.attributes.slug)
                }
                subtitle={
                  content.next_recommended.data.attributes.titles?.[0]?.subtitle
                }
                thumbnail={
                  content.next_recommended.data.attributes.thumbnail?.data
                    ?.attributes
                }
                thumbnailAspectRatio="3/2"
                topChips={
                  isMobile
                    ? undefined
                    : content.next_recommended.data.attributes.type?.data
                        ?.attributes
                    ? [
                        content.next_recommended.data.attributes.type.data
                          .attributes.titles?.[0]
                          ? content.next_recommended.data.attributes.type.data
                              .attributes.titles[0]?.title
                          : prettySlug(
                              content.next_recommended.data.attributes.type.data
                                .attributes.slug
                            ),
                      ]
                    : undefined
                }
                bottomChips={
                  isMobile
                    ? undefined
                    : content.next_recommended.data.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )
                }
              />
            </>
          )}
        </div>
      )}
    </ContentPanel>
  );

  let description = "";
  if (content?.type?.data) {
    description += `${langui.type}: `;

    description +=
      content.type.data.attributes?.titles?.[0]?.title ??
      prettySlug(content.type.data.attributes?.slug);

    description += "\n";
  }
  if (content?.categories?.data && content.categories.data.length > 0) {
    description += `${langui.categories}: `;
    description += content.categories.data
      .map((category) => category.attributes?.short)
      .join(" | ");
    description += "\n";
  }

  return (
    <AppLayout
      navTitle={
        content?.titles && content.titles.length > 0 && content.titles[0]
          ? prettyinlineTitle(
              content.titles[0].pre_title,
              content.titles[0].title,
              content.titles[0].subtitle
            )
          : prettySlug(content?.slug)
      }
      thumbnail={content?.thumbnail?.data?.attributes ?? undefined}
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

  if (!content.contents || content.contents.data.length === 0)
    return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    content: content.contents.data[0].attributes,
    contentId: content.contents.data[0].id,
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
