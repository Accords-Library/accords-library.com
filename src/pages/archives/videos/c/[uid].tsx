import AppLayout from "components/AppLayout";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import Switch from "components/Switch";
import ThumbnailPreview from "components/PreviewCard";
import { GetVideoChannelQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { getVideoThumbnailURL } from "queries/helpers";
import { useState } from "react";

interface Props extends AppStaticProps {
  channel: Exclude<
    GetVideoChannelQuery["videoChannels"],
    null | undefined
  >["data"][number]["attributes"];
}

export default function Channel(props: Props): JSX.Element {
  const { langui, channel } = props;
  const [keepInfoVisible, setKeepInfoVisible] = useState(true);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/archives/videos/"
        title={"Videos"}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        className="mb-10"
      />

      <PanelHeader
        icon="movie"
        title="Videos"
        description={langui.archives_description}
      />

      <div className="flex flex-row gap-2 place-items-center coarse:hidden">
        <p className="flex-shrink-0">{"Always show info"}:</p>
        <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
      </div>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <div className="mb-8">
        <h1 className="text-3xl">{channel?.title}</h1>
        <p>{channel?.subscribers.toLocaleString()} subscribers</p>
      </div>
      <div className="grid gap-8 items-start mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
        {channel?.videos?.data.map((video) => (
          <>
            {video.attributes && (
              <ThumbnailPreview
                key={video.id}
                href={`/archives/videos/v/${video.attributes.uid}`}
                title={video.attributes.title}
                thumbnail={getVideoThumbnailURL(video.attributes.uid)}
                thumbnailAspectRatio="16/9"
                keepInfoVisible={keepInfoVisible}
                metadata={{
                  release_date: video.attributes.published_date,
                  views: video.attributes.views,
                  author: channel.title,
                  position: "Top",
                }}
                hoverlay={{
                  __typename: "Video",
                  duration: video.attributes.duration,
                }}
              />
            )}
          </>
        ))}
      </div>
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle={langui.archives}
      subPanel={subPanel}
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const channel = await sdk.getVideoChannel({
    channel: context.params?.uid ? context.params.uid.toString() : "",
  });
  if (!channel.videoChannels?.data[0].attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    channel: channel.videoChannels.data[0].attributes,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const channels = await sdk.getVideoChannelsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  if (channels.videoChannels?.data)
    channels.videoChannels.data.map((channel) => {
      context.locales?.map((local) => {
        if (channel.attributes)
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
}
