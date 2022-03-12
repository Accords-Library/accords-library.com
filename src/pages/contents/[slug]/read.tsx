import { GetStaticPaths, GetStaticProps } from "next";
import { getContentsSlugs, getContentText } from "graphql/operations";
import {
  Enum_Componentsetstextset_Status,
  GetContentTextQuery,
} from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import HorizontalLine from "components/HorizontalLine";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ThumbnailHeader from "components/Content/ThumbnailHeader";
import AppLayout from "components/AppLayout";
import Markdawn from "components/Markdown/Markdawn";
import {
  prettyinlineTitle,
  prettyLanguage,
  prettySlug,
  prettyTestError,
  prettyTestWarning,
} from "queries/helpers";
import Button from "components/Button";
import { useRouter } from "next/router";
import Chip from "components/Chip";
import ReactTooltip from "react-tooltip";
import RecorderChip from "components/RecorderChip";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import TOC from "components/Markdown/TOC";

interface ContentReadProps extends AppStaticProps {
  content: GetContentTextQuery["contents"]["data"][number]["attributes"];
  contentId: GetContentTextQuery["contents"]["data"][number]["id"];
}

export default function ContentRead(props: ContentReadProps): JSX.Element {
  useTesting(props);
  const { langui, content } = props;
  const router = useRouter();

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/contents/${content.slug}`}
        title={"Content"}
        langui={langui}
        displayOn={ReturnButtonType.Desktop}
        horizontalLine
      />

      {content.text_set.length > 0 && (
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
                  content.text_set[0].source_language.data.attributes.code
                )}
              </Button>
            </div>
          )}

          <div className="grid grid-flow-col place-items-center place-content-center gap-2">
            <p className="font-headers">{langui.status}:</p>

            <Chip
              data-tip={
                content.text_set[0].status ===
                Enum_Componentsetstextset_Status.Incomplete
                  ? langui.status_incomplete
                  : content.text_set[0].status ===
                    Enum_Componentsetstextset_Status.Draft
                  ? langui.status_draft
                  : content.text_set[0].status ===
                    Enum_Componentsetstextset_Status.Review
                  ? langui.status_review
                  : langui.status_done
              }
              data-for={"StatusTooltip"}
            >
              {content.text_set[0].status}
            </Chip>
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
        title={"Content"}
        langui={langui}
        displayOn={ReturnButtonType.Mobile}
        className="mb-10"
      />
      <div className="grid place-items-center">
        <ThumbnailHeader content={content} langui={langui} />

        <HorizontalLine />

        {content.text_set.length > 0 && content.text_set[0].text && (
          <Markdawn text={content.text_set[0].text} />
        )}
      </div>
    </ContentPanel>
  );

  const extra = (
    <>
      <ReactTooltip
        id="StatusTooltip"
        place="top"
        type="light"
        effect="solid"
        delayShow={50}
        clickable={true}
        className="drop-shadow-shade-xl !opacity-100 !bg-light !rounded-lg desktop:after:!border-t-light text-left !text-black max-w-xs"
      />

      <ReactTooltip
        id="RecordersTooltip"
        place="top"
        type="light"
        effect="solid"
        delayShow={100}
        delayUpdate={100}
        delayHide={100}
        clickable={true}
        className="drop-shadow-shade-xl !opacity-100 !bg-light !rounded-lg desktop:after:!border-t-light text-left !text-black max-w-[22rem]"
      />
    </>
  );

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
      extra={extra}
      description={`${langui.type}: ${
        content.type.data.attributes.titles.length > 0
          ? content.type.data.attributes.titles[0].title
          : prettySlug(content.type.data.attributes.slug)
      }
      ${langui.categories}: ${
        content.categories.data.length > 0 &&
        content.categories.data
          .map((category) => {
            return category.attributes.short;
          })
          .join(" | ")
      }
         
        ${content.titles.length > 0 ? content.titles[0].description : undefined}
        `}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const content = (
    await getContentText({
      slug: context.params?.slug?.toString() || "",
      language_code: context.locale || "en",
    })
  ).contents.data[0];
  const props: ContentReadProps = {
    ...(await getAppStaticProps(context)),
    content: content.attributes,
    contentId: content.id,
  };
  return {
    props: props,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  type Path = {
    params: {
      slug: string;
    };
    locale: string;
  };

  const data = await getContentsSlugs({});
  const paths: Path[] = [];
  data.contents.data.map((item) => {
    context.locales?.map((local) => {
      paths.push({ params: { slug: item.attributes.slug }, locale: local });
    });
  });
  return {
    paths,
    fallback: false,
  };
};

export function useTesting(props: ContentReadProps) {
  const router = useRouter();
  const { content, contentId } = props;

  const contentURL =
    "/admin/content-manager/collectionType/api::content.content/" + contentId;

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
    console.warn(
      prettyTestError(
        router,
        "More than one textset for this language",
        ["content", "text_set"],
        contentURL
      )
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
    }
    if (textset.source_language.data.attributes.code === router.locale) {
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
