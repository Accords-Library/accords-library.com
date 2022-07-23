import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { GetVideoChannelQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { getVideoThumbnailURL } from "helpers/videos";
import { Icon } from "components/Ico";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";
import { filterHasAttributes, isDefined } from "helpers/others";
import { useBoolean } from "hooks/useBoolean";
import { getOpenGraph } from "helpers/openGraph";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
  channel: NonNullable<
    GetVideoChannelQuery["videoChannels"]
  >["data"][number]["attributes"];
}

const Channel = ({ langui, channel, ...otherProps }: Props): JSX.Element => {
  const { state: keepInfoVisible, toggleState: toggleKeepInfoVisible } =
    useBoolean(true);
  const hoverable = useMediaHoverable();

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href="/archives/videos/"
          title={langui.videos}
          langui={langui}
          displayOn={ReturnButtonType.Desktop}
          className="mb-10"
        />

        <PanelHeader
          icon={Icon.Movie}
          title={langui.videos}
          description={langui.archives_description}
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch value={keepInfoVisible} onClick={toggleKeepInfoVisible} />
            }
          />
        )}
      </SubPanel>
    ),
    [hoverable, keepInfoVisible, langui, toggleKeepInfoVisible]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <div className="mb-8">
          <h1 className="text-3xl">{channel?.title}</h1>
          <p>{channel?.subscribers.toLocaleString()} subscribers</p>
        </div>
        <div
          className="grid items-start gap-8 border-b-[3px] border-dotted pb-12 last-of-type:border-0
        desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] mobile:grid-cols-2"
        >
          {filterHasAttributes(channel?.videos?.data, [
            "attributes",
          ] as const).map((video) => (
            <Fragment key={video.id}>
              <PreviewCard
                href={`/archives/videos/v/${video.attributes.uid}`}
                title={video.attributes.title}
                thumbnail={getVideoThumbnailURL(video.attributes.uid)}
                thumbnailAspectRatio="16/9"
                keepInfoVisible={keepInfoVisible}
                metadata={{
                  releaseDate: video.attributes.published_date,
                  views: video.attributes.views,
                  author: channel?.title,
                  position: "Top",
                }}
                hoverlay={{
                  __typename: "Video",
                  duration: video.attributes.duration,
                }}
              />
            </Fragment>
          ))}
        </div>
      </ContentPanel>
    ),
    [
      channel?.subscribers,
      channel?.title,
      channel?.videos?.data,
      keepInfoVisible,
    ]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Channel;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const channel = await sdk.getVideoChannel({
    channel:
      context.params && isDefined(context.params.uid)
        ? context.params.uid.toString()
        : "",
  });
  if (!channel.videoChannels?.data[0].attributes) return { notFound: true };
  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    channel: channel.videoChannels.data[0].attributes,
    openGraph: getOpenGraph(
      appStaticProps.langui,
      channel.videoChannels.data[0].attributes.title
    ),
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const channels = await sdk.getVideoChannelsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (channels.videoChannels?.data)
    filterHasAttributes(channels.videoChannels.data, [
      "attributes",
    ] as const).map((channel) => {
      context.locales?.map((local) => {
        paths.push({
          params: { uid: channel.attributes.uid },
          locale: local,
        });
      });
    });
  return {
    paths,
    fallback: "blocking",
  };
};
