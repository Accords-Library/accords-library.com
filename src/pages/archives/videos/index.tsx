import AppLayout from "components/AppLayout";
import HorizontalLine from "components/HorizontalLine";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import VideoPreview from "components/Videos/VideoPreview";
import { GetVideosPreviewQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface Props extends AppStaticProps {
  videos: Exclude<GetVideosPreviewQuery["videos"], null | undefined>["data"];
}

export default function Videos(props: Props): JSX.Element {
  const { langui, videos } = props;
  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/archives/"
        title={"Archives"}
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
      <div className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
        {videos.map((video) => (
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
  const videos = await sdk.getVideosPreview();
  if (!videos.videos) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    videos: videos.videos.data,
  };
  return {
    props: props,
  };
}
