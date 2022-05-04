import AppLayout from "components/AppLayout";
import PageSelector from "components/Inputs/PageSelector";
import Switch from "components/Inputs/Switch";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ThumbnailPreview from "components/PreviewCard";
import { GetVideosPreviewQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { getVideoThumbnailURL, prettyDate } from "queries/helpers";
import { useState } from "react";

interface Props extends AppStaticProps {
  videos: Exclude<GetVideosPreviewQuery["videos"], null | undefined>["data"];
}

export default function Videos(props: Props): JSX.Element {
  const { langui, videos } = props;

  videos
    .sort((a, b) => {
      const dateA = a.attributes?.published_date
        ? prettyDate(a.attributes.published_date)
        : "9999";
      const dateB = b.attributes?.published_date
        ? prettyDate(b.attributes.published_date)
        : "9999";
      return dateA.localeCompare(dateB);
    })
    .reverse();

  const itemPerPage = 50;
  const paginatedVideos: Props["videos"][] = [];
  for (let index = 0; itemPerPage * index < videos.length; index += 1) {
    paginatedVideos.push(
      videos.slice(index * itemPerPage, (index + 1) * itemPerPage)
    );
  }

  const [page, setPage] = useState(0);
  const [keepInfoVisible, setKeepInfoVisible] = useState(true);

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

      <div className="flex flex-row gap-2 place-items-center coarse:hidden">
        <p className="flex-shrink-0">{"Always show info"}:</p>
        <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
      </div>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <PageSelector
        maxPage={Math.floor(videos.length / itemPerPage)}
        page={page}
        setPage={setPage}
        className="mb-12"
      />

      <div className="grid gap-8 items-start thin:grid-cols-1 mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
        {paginatedVideos[page].map((video) => (
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
                  author: video.attributes.channel?.data?.attributes?.title,
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

      <PageSelector
        maxPage={Math.floor(videos.length / itemPerPage)}
        page={page}
        setPage={setPage}
        className="mt-12"
      />
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
