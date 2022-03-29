import AppLayout from "components/AppLayout";
import Button from "components/Button";
import Chip from "components/Chip";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
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
import ToolTip from "components/ToolTip";
import { getContentsSlugs, getContentText } from "graphql/operations";
import { GetContentTextQuery } from "graphql/operations-types";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import {
  getLocalesFromLanguages,
  getStatusDescription,
  prettyinlineTitle,
  prettyLanguage,
  prettySlug,
  prettyTestError,
  prettyTestWarning,
} from "queries/helpers";

interface ContentReadProps extends AppStaticProps {
  content: GetContentTextQuery["contents"]["data"][number]["attributes"];
  contentId: GetContentTextQuery["contents"]["data"][number]["id"];
}

export default function ContentRead(props: ContentReadProps): JSX.Element {
  useTesting(props);
  const { langui, content, languages } = props;
  const router = useRouter();
  const locales = getLocalesFromLanguages(content.text_set_languages);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/contents/${content.slug}`}
        title={"Content"}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />

      {content.text_set.length > 0 && content.text_set[0].source_language.data && (
        <div className="grid gap-5">
          <h2 className="text-xl">
            {content.text_set[0].source_language.data.attributes.code ===
            router.locale
              ? langui.transcript_notice
              : langui.translation_notice}
          </h2>

          {content.text_set[0].source_language.data.attributes.code !==
            router.locale && (
            <div className="grid place-items-center gap-2">
              <p className="font-headers">{langui.source_language}:</p>
              <Button
                href={router.asPath}
                locale={
                  content.text_set[0].source_language.data.attributes.code
                }
              >
                {prettyLanguage(
                  content.text_set[0].source_language.data.attributes.code,
                  languages
                )}
              </Button>
            </div>
          )}

          <div className="grid grid-flow-col place-items-center place-content-center gap-2">
            <p className="font-headers">{langui.status}:</p>

            <ToolTip
              content={getStatusDescription(content.text_set[0].status, langui)}
              maxWidth={"20rem"}
            >
              <Chip>{content.text_set[0].status}</Chip>
            </ToolTip>
          </div>

          {content.text_set[0].transcribers.data.length > 0 && (
            <div>
              <p className="font-headers">{langui.transcribers}:</p>
              <div className="grid place-items-center place-content-center gap-2">
                {content.text_set[0].transcribers.data.map((recorder) => (
                  <RecorderChip
                    key={recorder.id}
                    langui={langui}
                    recorder={recorder}
                  />
                ))}
              </div>
            </div>
          )}

          {content.text_set[0].translators.data.length > 0 && (
            <div>
              <p className="font-headers">{langui.translators}:</p>
              <div className="grid place-items-center place-content-center gap-2">
                {content.text_set[0].translators.data.map((recorder) => (
                  <RecorderChip
                    key={recorder.id}
                    langui={langui}
                    recorder={recorder}
                  />
                ))}
              </div>
            </div>
          )}

          {content.text_set[0].proofreaders.data.length > 0 && (
            <div>
              <p className="font-headers">{langui.proofreaders}:</p>
              <div className="grid place-items-center place-content-center gap-2">
                {content.text_set[0].proofreaders.data.map((recorder) => (
                  <RecorderChip
                    key={recorder.id}
                    langui={langui}
                    recorder={recorder}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {content.text_set.length > 0 && content.text_set[0].text && (
        <>
          <HorizontalLine />
          <TOC
            text={content.text_set[0].text}
            title={
              content.titles.length > 0
                ? prettyinlineTitle(
                    content.titles[0].pre_title,
                    content.titles[0].title,
                    content.titles[0].subtitle
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
        href={`/contents/${content.slug}`}
        title={langui.content}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />
      <div className="grid place-items-center">
        <ThumbnailHeader
          thumbnail={content.thumbnail.data?.attributes}
          pre_title={
            content.titles.length > 0 ? content.titles[0].pre_title : undefined
          }
          title={
            content.titles.length > 0
              ? content.titles[0].title
              : prettySlug(content.slug)
          }
          subtitle={
            content.titles.length > 0 ? content.titles[0].subtitle : undefined
          }
          description={
            content.titles.length > 0
              ? content.titles[0].description
              : undefined
          }
          type={content.type}
          categories={content.categories}
          langui={langui}
        />

        <HorizontalLine />

        {locales.includes(router.locale ?? "en") ? (
          <Markdawn text={content.text_set[0].text} />
        ) : (
          <LanguageSwitcher
            locales={locales}
            languages={props.languages}
            langui={props.langui}
          />
        )}
      </div>
    </ContentPanel>
  );

  let description = "";
  if (content.type.data) {
    description += `${langui.type}: `;
    if (content.type.data.attributes.titles.length > 0) {
      description += content.type.data.attributes.titles[0].title;
    } else {
      description += prettySlug(content.type.data.attributes.slug);
    }
    description += "\n";
  }
  if (content.categories.data.length > 0) {
    description += `${langui.categories}: `;
    description += content.categories.data
      .map((category) => category.attributes.short)
      .join(" | ");
    description += "\n";
  }

  return (
    <AppLayout
      navTitle="Contents"
      title={
        content.titles.length > 0
          ? prettyinlineTitle(
              content.titles[0].pre_title,
              content.titles[0].title,
              content.titles[0].subtitle
            )
          : prettySlug(content.slug)
      }
      thumbnail={content.thumbnail.data?.attributes}
      contentPanel={contentPanel}
      subPanel={subPanel}
      description={description}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: ContentReadProps }> {
  const slug = context.params?.slug?.toString() ?? "";
  const content = (
    await getContentText({
      slug: slug,
      language_code: context.locale ?? "en",
    })
  ).contents.data[0];
  if (!content) return { notFound: true };
  const props: ContentReadProps = {
    ...(await getAppStaticProps(context)),
    content: content.attributes,
    contentId: content.id,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const contents = await getContentsSlugs({});
  const paths: GetStaticPathsResult["paths"] = [];
  contents.contents.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
}

function useTesting(props: ContentReadProps) {
  const router = useRouter();
  const { content, contentId } = props;

  const contentURL = `/admin/content-manager/collectionType/api::content.content/${contentId}`;

  if (router.locale === "en") {
    if (content.categories.data.length === 0) {
      prettyTestError(router, "Missing categories", ["content"], contentURL);
    }
  }

  if (content.ranged_contents.data.length === 0) {
    prettyTestWarning(
      router,
      "Unconnected to any source",
      ["content"],
      contentURL
    );
  }

  if (content.text_set.length === 0) {
    prettyTestWarning(
      router,
      "Has no textset, nor audioset, nor videoset",
      ["content"],
      contentURL
    );
  }

  if (content.text_set.length > 1) {
    prettyTestError(
      router,
      "More than one textset for this language",
      ["content", "text_set"],
      contentURL
    );
  }

  if (content.text_set.length === 1) {
    const textset = content.text_set[0];

    if (!textset.text) {
      prettyTestError(
        router,
        "Missing text",
        ["content", "text_set"],
        contentURL
      );
    }
    if (!textset.source_language.data) {
      prettyTestError(
        router,
        "Missing source language",
        ["content", "text_set"],
        contentURL
      );
    } else if (textset.source_language.data.attributes.code === router.locale) {
      // This is a transcript
      if (textset.transcribers.data.length === 0) {
        prettyTestError(
          router,
          "Missing transcribers attribution",
          ["content", "text_set"],
          contentURL
        );
      }
      if (textset.translators.data.length > 0) {
        prettyTestError(
          router,
          "Transcripts shouldn't have translators",
          ["content", "text_set"],
          contentURL
        );
      }
    } else {
      // This is a translation
      if (textset.translators.data.length === 0) {
        prettyTestError(
          router,
          "Missing translators attribution",
          ["content", "text_set"],
          contentURL
        );
      }
      if (textset.transcribers.data.length > 0) {
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
