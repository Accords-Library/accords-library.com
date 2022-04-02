import AppLayout from "components/AppLayout";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import VideoPreview from "components/Videos/VideoPreview";
import { GetVideoChannelQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface Props extends AppStaticProps {
  channel: Exclude<
    GetVideoChannelQuery["videoChannels"],
    null | undefined
  >["data"][number]["attributes"];
}

export default function Channel(props: Props): JSX.Element {
  const { langui, channel } = props;
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
          <>{video.attributes && <VideoPreview video={video.attributes} />}</>
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
    channel: context.params?.uid?.toString() ?? "",
  });
  if (!channel.videoChannels?.data[0].attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    channel: channel.videoChannels?.data[0].attributes,
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
