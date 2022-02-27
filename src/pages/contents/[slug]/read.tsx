import { GetStaticPaths, GetStaticProps } from "next";
import {
  getContentsSlugs,
  getContentText,
  getWebsiteInterface,
} from "graphql/operations";
import {
  Enum_Componentsetstextset_Status,
  GetContentTextQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import ContentPanel from "components/Panels/ContentPanel";
import HorizontalLine from "components/HorizontalLine";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/PanelComponents/ReturnButton";
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

type ContentReadProps = {
  content: GetContentTextQuery;
  langui: GetWebsiteInterfaceQuery;
};

export default function ContentRead(props: ContentReadProps): JSX.Element {
  const content = props.content.contents.data[0].attributes;
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const router = useRouter();

  useTesting(props.content);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/contents/${content.slug}`}
        title={"Content"}
        langui={langui}
      />

      <HorizontalLine />

      {content.text_set.length > 0 ? (
        <div className="grid gap-5">
          <h2 className="text-xl">
            {content.text_set[0].source_language.data.attributes.code ===
            router.locale
              ? "This content is a transcript"
              : "This content is a fan-translation"}
          </h2>

          {content.text_set[0].source_language.data.attributes.code !==
            router.locale && (
            <div className="grid place-items-center gap-2">
              <p className="font-headers">Source language:</p>
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
            <p className="font-headers">Status:</p>

            <Chip
              data-tip={
                content.text_set[0].status ===
                Enum_Componentsetstextset_Status.Incomplete
                  ? "This entry is only partially translated/transcribed."
                  : content.text_set[0].status ===
                    Enum_Componentsetstextset_Status.Draft
                  ? "This entry is just a draft. It usually means that this is a work-in-progress. Translation/transcription might be poor and/or computer-generated."
                  : content.text_set[0].status ===
                    Enum_Componentsetstextset_Status.Review
                  ? "This entry has not yet being proofread. The content should still be accurate."
                  : "This entry has been checked and proofread. If you notice any translation errors or typos, please contact us so we can fix it!"
              }
              data-for={"StatusTooltip"}
            >
              {content.text_set[0].status}
            </Chip>
          </div>

          {content.text_set[0].transcribers.data.length > 0 && (
            <div>
              <p className="font-headers">Transcribers:</p>
              <div className="grid place-items-center place-content-center gap-2">
                {content.text_set[0].transcribers.data.map((recorder) => (
                  <RecorderChip key={recorder.id} recorder={recorder} />
                ))}
              </div>
            </div>
          )}

          {content.text_set[0].translators.data.length > 0 && (
            <div>
              <p className="font-headers">Translators:</p>
              <div className="grid place-items-center place-content-center gap-2">
                {content.text_set[0].translators.data.map((recorder) => (
                  <RecorderChip key={recorder.id} recorder={recorder} />
                ))}
              </div>
            </div>
          )}

          {content.text_set[0].proofreaders.data.length > 0 && (
            <div>
              <p className="font-headers">Proofreaders:</p>
              <div className="grid place-items-center place-content-center gap-2">
                {content.text_set[0].proofreaders.data.map((recorder) => (
                  <RecorderChip key={recorder.id} recorder={recorder} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel>
      <div className="grid place-items-center">
        <ThumbnailHeader content={content} langui={langui} />

        <HorizontalLine />

        {content.text_set.length > 0 ? (
          <Markdawn text={content.text_set[0].text} />
        ) : (
          ""
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
      thumbnail={content.thumbnail.data.attributes}
      langui={langui}
      contentPanel={contentPanel}
      subPanel={subPanel}
      extra={extra}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params) {
    if (context.params.slug && context.locale) {
      if (context.params.slug instanceof Array)
        context.params.slug = context.params.slug.join("");

      const props: ContentReadProps = {
        content: await getContentText({
          slug: context.params.slug,
          language_code: context.locale,
        }),
        langui: await getWebsiteInterface({
          language_code: context.locale,
        }),
      };
      return {
        props: props,
      };
    }
  }
  return { props: {} };
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

export function useTesting(content: GetContentTextQuery) {
  const router = useRouter();
  const contentAtr = content.contents.data[0].attributes;
  if (contentAtr.categories.data.length === 0) {
    prettyTestError(router, "Missing categories", ["content"]);
  }

  if (contentAtr.ranged_contents.data.length === 0) {
    prettyTestWarning(router, "Unconnected to any source", ["content"]);
  }

  if (contentAtr.text_set.length === 0) {
    prettyTestWarning(router, "Has no textset, nor audioset, nor videoset", [
      "content",
    ]);
  }

  if (contentAtr.text_set.length > 1) {
    console.warn(
      prettyTestError(router, "More than one textset for this language", [
        "content",
        "text_set",
      ])
    );
  }

  if (contentAtr.text_set.length === 1) {
    const textset = contentAtr.text_set[0];
    if (!textset.text) {
      prettyTestError(router, "Missing text", ["content", "text_set"]);
    }
    if (!textset.source_language.data) {
      prettyTestError(router, "Missing source language", [
        "content",
        "text_set",
      ]);
    }
    if (textset.source_language.data.attributes.code === router.locale) {
      // This is a transcript
      if (textset.transcribers.data.length === 0) {
        prettyTestError(router, "Missing transcribers attribution", [
          "content",
          "text_set",
        ]);
      }
      if (textset.translators.data.length > 0) {
        prettyTestError(router, "Transcripts shouldn't have translators", [
          "content",
          "text_set",
        ]);
      }
    } else {
      // This is a translation
      if (textset.translators.data.length === 0) {
        prettyTestError(router, "Missing translators attribution", [
          "content",
          "text_set",
        ]);
      }
      if (textset.transcribers.data.length > 0) {
        prettyTestError(router, "Translations shouldn't have transcribers", [
          "content",
          "text_set",
        ]);
      }
    }
  }
}
