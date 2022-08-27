import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { HorizontalLine } from "components/HorizontalLine";
import { Ico, Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { InsetBox } from "components/InsetBox";
import { NavOption } from "components/PanelComponents/NavOption";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetVideoQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { prettyDate, prettyShortenNumber } from "helpers/formatters";
import { filterHasAttributes, isDefined } from "helpers/others";
import { getVideoFile } from "helpers/videos";
import { getOpenGraph } from "helpers/openGraph";
import { useIsContentPanelAtLeast } from "hooks/useContainerQuery";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  video: NonNullable<
    NonNullable<GetVideoQuery["videos"]>["data"][number]["attributes"]
  >;
}

const Video = ({ video, ...otherProps }: Props): JSX.Element => {
  const isContentPanelAtLeast4xl = useIsContentPanelAtLeast("4xl");
  const { setSubPanelOpen, langui } = useAppLayout();
  const router = useRouter();

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href="/archives/videos/"
          title={langui.videos}
          displayOnlyOn={"3ColumnsLayout"}
        />

        <HorizontalLine />

        <NavOption
          title={langui.video}
          url="#video"
          border
          onClick={() => setSubPanelOpen(false)}
        />

        <NavOption
          title={langui.channel}
          url="#channel"
          border
          onClick={() => setSubPanelOpen(false)}
        />

        <NavOption
          title={langui.description}
          url="#description"
          border
          onClick={() => setSubPanelOpen(false)}
        />
      </SubPanel>
    ),
    [setSubPanelOpen, langui]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <ReturnButton
          href="/library/"
          title={langui.library}
          displayOnlyOn={"1ColumnLayout"}
          className="mb-10"
        />

        <div className="grid place-items-center gap-12">
          <div
            id="video"
            className="w-full overflow-hidden rounded-xl shadow-lg shadow-shade"
          >
            {video.gone ? (
              <video
                className="w-full"
                src={getVideoFile(video.uid)}
                controls
              ></video>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.uid}`}
                className="aspect-video w-full"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            <div className="mt-2 p-6">
              <h1 className="text-2xl">{video.title}</h1>
              <div className="flex w-full flex-row flex-wrap gap-x-6">
                <p>
                  <Ico
                    icon={Icon.Event}
                    className="mr-1 translate-y-[.15em] !text-base"
                  />
                  {prettyDate(video.published_date, router.locale)}
                </p>
                <p>
                  <Ico
                    icon={Icon.Visibility}
                    className="mr-1 translate-y-[.15em] !text-base"
                  />
                  {isContentPanelAtLeast4xl
                    ? video.views.toLocaleString()
                    : prettyShortenNumber(video.views)}
                </p>
                {video.channel?.data?.attributes && (
                  <p>
                    <Ico
                      icon={Icon.ThumbUp}
                      className="mr-1 translate-y-[.15em] !text-base"
                    />
                    {isContentPanelAtLeast4xl
                      ? video.likes.toLocaleString()
                      : prettyShortenNumber(video.likes)}
                  </p>
                )}
                <a
                  href={`https://youtu.be/${video.uid}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    className="!py-0 !px-3"
                    text={`${langui.view_on} ${video.source}`}
                  />
                </a>
              </div>
            </div>
          </div>

          {video.channel?.data?.attributes && (
            <InsetBox id="channel" className="grid place-items-center">
              <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-4 text-center">
                <h2 className="text-2xl">{langui.channel}</h2>
                <div>
                  <Button
                    href={`/archives/videos/c/${video.channel.data.attributes.uid}`}
                    text={video.channel.data.attributes.title}
                  />
                  <p>
                    {`${video.channel.data.attributes.subscribers.toLocaleString()}
                   ${langui.subscribers?.toLowerCase()}`}
                  </p>
                </div>
              </div>
            </InsetBox>
          )}

          <InsetBox id="description" className="grid place-items-center">
            <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-8">
              <h2 className="text-2xl">{langui.description}</h2>
              <p className="whitespace-pre-line">{video.description}</p>
            </div>
          </InsetBox>
        </div>
      </ContentPanel>
    ),
    [
      isContentPanelAtLeast4xl,
      langui,
      router.locale,
      video.channel?.data?.attributes,
      video.description,
      video.gone,
      video.likes,
      video.published_date,
      video.source,
      video.title,
      video.uid,
      video.views,
    ]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      {...otherProps}
    />
  );
};
export default Video;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const videos = await sdk.getVideo({
    uid:
      context.params && isDefined(context.params.uid)
        ? context.params.uid.toString()
        : "",
  });
  if (!videos.videos?.data[0]?.attributes) return { notFound: true };

  const props: Props = {
    video: videos.videos.data[0].attributes,
    openGraph: getOpenGraph(langui, videos.videos.data[0].attributes.title),
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const videos = await sdk.getVideosSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (videos.videos?.data)
    filterHasAttributes(videos.videos.data, ["attributes"] as const).map(
      (video) => {
        context.locales?.map((local) => {
          paths.push({ params: { uid: video.attributes.uid }, locale: local });
        });
      }
    );
  return {
    paths,
    fallback: "blocking",
  };
};
