import AppLayout from "components/AppLayout";
import Button from "components/Button";
import Chip from "components/Chip";
import HorizontalLine from "components/HorizontalLine";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import TOC from "components/Markdown/TOC";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import RecorderChip from "components/RecorderChip";
import ThumbnailHeader from "components/ThumbnailHeader";
import ToolTip from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetContentTextQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import {
  getPreferredLanguage,
  getStatusDescription,
  prettyinlineTitle,
  prettyLanguage,
  prettySlug,
  prettyTestError,
  prettyTestWarning,
} from "queries/helpers";
import { useEffect, useMemo, useState } from "react";

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

export default function Content(props: Props): JSX.Element {
  useTesting(props);
  const { langui, content, languages } = props;
  const router = useRouter();
  const appLayout = useAppLayout();

  const [selectedTextSet, setSelectedTextSet] = useState<
    | Exclude<
        Exclude<Props["content"], null | undefined>["text_set"],
        null | undefined
      >[number]
  >();
  const [selectedTitle, setSelectedTitle] = useState<
    | Exclude<
        Exclude<Props["content"], null | undefined>["titles"],
        null | undefined
      >[number]
  >();
  const textSetLocales: Map<string, number> = new Map();

  const [selectedTextSetIndex, setSelectedTextSetIndex] = useState<
    number | undefined
  >();

  if (content?.text_set) {
    content.text_set.map((textSet, index) => {
      if (textSet?.language?.data?.attributes?.code && textSet.text) {
        textSetLocales.set(textSet.language.data.attributes.code, index);
      }
    });
  }

  useMemo(() => {
    setSelectedTextSetIndex(
      getPreferredLanguage(
        appLayout.preferredLanguages ?? [router.locale],
        textSetLocales
      )
    );
  }, [appLayout.preferredLanguages]);

  useEffect(() => {
    if (selectedTextSetIndex !== undefined)
      setSelectedTextSet(content?.text_set?.[selectedTextSetIndex]);
    if (selectedTextSetIndex !== undefined)
      setSelectedTitle(content?.titles?.[selectedTextSetIndex]);
  }, [selectedTextSetIndex]);

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
              <Button
                href={router.asPath}
                locale={selectedTextSet.source_language.data.attributes.code}
              >
                {prettyLanguage(
                  selectedTextSet.source_language.data.attributes.code,
                  languages
                )}
              </Button>
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
            languageSwitcher={
              selectedTextSet ? (
                <LanguageSwitcher
                  locales={textSetLocales}
                  languages={props.languages}
                  localesIndex={selectedTextSetIndex}
                  setLocalesIndex={setSelectedTextSetIndex}
                />
              ) : undefined
            }
          />

          <HorizontalLine />

          <Markdawn text={selectedTextSet?.text ?? ""} />
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
  const slug = context.params?.slug?.toString() ?? "";
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
        paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
}

function useTesting(props: Props) {
  const router = useRouter();
  const { content, contentId } = props;

  const contentURL = `/admin/content-manager/collectionType/api::content.content/${contentId}`;

  if (router.locale === "en") {
    if (content?.categories?.data.length === 0) {
      prettyTestError(router, "Missing categories", ["content"], contentURL);
    }
  }

  if (content?.ranged_contents?.data.length === 0) {
    prettyTestWarning(
      router,
      "Unconnected to any source",
      ["content"],
      contentURL
    );
  }

  if (content?.text_set?.length === 0) {
    prettyTestWarning(
      router,
      "Has no textset, nor audioset, nor videoset",
      ["content"],
      contentURL
    );
  }

  if (content?.text_set && content.text_set.length > 1) {
    prettyTestError(
      router,
      "More than one textset for this language",
      ["content", "text_set"],
      contentURL
    );
  }

  if (content?.text_set?.length === 1) {
    const textset = content.text_set[0];

    if (!textset?.text) {
      prettyTestError(
        router,
        "Missing text",
        ["content", "text_set"],
        contentURL
      );
    }
    if (!textset?.source_language?.data) {
      prettyTestError(
        router,
        "Missing source language",
        ["content", "text_set"],
        contentURL
      );
    } else if (
      textset.source_language.data.attributes?.code === router.locale
    ) {
      // This is a transcript
      if (textset.transcribers?.data.length === 0) {
        prettyTestError(
          router,
          "Missing transcribers attribution",
          ["content", "text_set"],
          contentURL
        );
      }
      if (textset.translators && textset.translators.data.length > 0) {
        prettyTestError(
          router,
          "Transcripts shouldn't have translators",
          ["content", "text_set"],
          contentURL
        );
      }
    } else {
      // This is a translation
      if (textset.translators?.data.length === 0) {
        prettyTestError(
          router,
          "Missing translators attribution",
          ["content", "text_set"],
          contentURL
        );
      }
      if (textset.transcribers && textset.transcribers.data.length > 0) {
        prettyTestError(
          router,
          "Translations shouldn't have transcribers",
          ["content", "text_set"],
          contentURL
        );
      }
    }
  }
}
