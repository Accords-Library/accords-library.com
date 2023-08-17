import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useCallback } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { HorizontalLine } from "components/HorizontalLine";
import { Ico } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { InsetBox } from "components/Containers/InsetBox";
import { NavOption } from "components/PanelComponents/NavOption";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { Enum_Video_Source } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { prettyShortenNumber } from "helpers/formatters";
import { filterHasAttributes, isDefined, isUndefined } from "helpers/asserts";
import { getVideoFile, getVideoThumbnailURL } from "helpers/videos";
import { getOpenGraph } from "helpers/openGraph";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { VideoPlayer } from "components/Player";
import { getDescription } from "helpers/description";
import { Markdown } from "components/Markdown/Markdown";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  video: {
    isGone: boolean;
    uid: string;
    title: string;
    description: string;
    publishedDate: string;
    views: number;
    likes: number;
    source?: Enum_Video_Source;
  };
  channel?: {
    title: string;
    href: string;
    subscribers: number;
  };
}

const Video = ({ video, channel, ...otherProps }: Props): JSX.Element => {
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const closeSubPanel = useCallback(() => setSubPanelOpened(false), [setSubPanelOpened]);
  const { format } = useFormat();

  const subPanel = (
    <SubPanel>
      {!is1ColumnLayout && (
        <>
          <ReturnButton href="/archives/videos/" title={format("videos")} />
          <HorizontalLine />
        </>
      )}

      <NavOption title={format("video")} url="#video" border onClick={closeSubPanel} />
      <NavOption title={format("channel")} url="#channel" border onClick={closeSubPanel} />
      <NavOption title={format("description")} url="#description" border onClick={closeSubPanel} />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      {is1ColumnLayout && (
        <ReturnButton href="/library/" title={format("library")} className="mb-10" />
      )}

      <div className="grid place-items-center gap-12">
        <div id="video" className="w-full overflow-hidden rounded-xl shadow-xl shadow-shade/80">
          {video.isGone ? (
            <VideoPlayer className="w-full" src={getVideoFile(video.uid)} rounded={false} />
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.uid}`}
              className="aspect-video w-full"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          <div className="mt-2 p-6">
            <h1 className="text-2xl">{video.title}</h1>
            <div className="flex w-full flex-row flex-wrap place-items-center gap-x-6">
              <p>
                <Ico icon="event" className="mr-1 translate-y-[.15em] !text-base" />
                {video.publishedDate}
              </p>
              <p>
                <Ico icon="visibility" className="mr-1 translate-y-[.15em] !text-base" />
                {isContentPanelAtLeast4xl
                  ? video.views.toLocaleString()
                  : prettyShortenNumber(video.views)}
              </p>
              {video.likes > 0 && (
                <p>
                  <Ico icon="thumb_up" className="mr-1 translate-y-[.15em] !text-base" />
                  {isContentPanelAtLeast4xl
                    ? video.likes.toLocaleString()
                    : prettyShortenNumber(video.likes)}
                </p>
              )}
              {video.source === "YouTube" && (
                <Button
                  size="small"
                  text={format("view_on_x", { x: video.source })}
                  href={`https://youtu.be/${video.uid}`}
                  alwaysNewTab
                />
              )}
            </div>
          </div>
        </div>

        {channel && (
          <InsetBox id="channel" className="grid place-items-center">
            <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-4 text-center">
              <h2 className="text-2xl">{format("channel")}</h2>
              <div>
                <Button href={channel.href} text={channel.title} />
                <p>
                  {`${channel.subscribers.toLocaleString()}
                   ${format("subscribers").toLowerCase()}`}
                </p>
              </div>
            </div>
          </InsetBox>
        )}

        <InsetBox id="description" className="grid place-items-center">
          <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-8">
            <h2 className="text-2xl">{format("description")}</h2>
            <Markdown className="whitespace-pre-line" text={video.description} />
          </div>
        </InsetBox>
      </div>
    </ContentPanel>
  );

  return <AppLayout subPanel={subPanel} contentPanel={contentPanel} {...otherProps} />;
};
export default Video;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format, formatDate } = getFormat(context.locale);
  const videos = await sdk.getVideo({
    uid: context.params && isDefined(context.params.uid) ? context.params.uid.toString() : "",
  });
  const rawVideo = videos.videos?.data[0]?.attributes;
  if (isUndefined(rawVideo)) return { notFound: true };

  const channel: Props["channel"] = rawVideo.channel?.data?.attributes
    ? {
        href: `/archives/videos/c/${rawVideo.channel.data.attributes.uid}`,
        subscribers: rawVideo.channel.data.attributes.subscribers,
        title: rawVideo.channel.data.attributes.title,
      }
    : undefined;

  const video: Props["video"] = {
    uid: rawVideo.uid,
    isGone: rawVideo.gone,
    description: rawVideo.description,
    likes: rawVideo.likes,
    source: rawVideo.source ?? undefined,
    publishedDate: formatDate(rawVideo.published_date),
    title: rawVideo.title,
    views: rawVideo.views,
  };

  const props: Props = {
    video,
    channel,
    openGraph: getOpenGraph(
      format,
      rawVideo.title,
      getDescription(rawVideo.description, {
        [format("channel")]: [rawVideo.channel?.data?.attributes?.title],
      }),
      getVideoThumbnailURL(rawVideo.uid),
      undefined,
      rawVideo.gone ? getVideoFile(rawVideo.uid) : undefined
    ),
  };
  return {
    props: JSON.parse(JSON.stringify(props)),
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const videos = await sdk.getVideosSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (videos.videos?.data)
    filterHasAttributes(videos.videos.data, ["attributes"]).map((video) => {
      context.locales?.map((local) => {
        paths.push({ params: { uid: video.attributes.uid }, locale: local });
      });
    });
  return {
    paths,
    fallback: "blocking",
  };
};
