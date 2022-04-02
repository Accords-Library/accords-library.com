import AppLayout from "components/AppLayout";
import PageSelector from "components/PageSelector";
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
import { prettyDate } from "queries/helpers";
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
      <PageSelector
        maxPage={Math.floor(videos.length / itemPerPage)}
        page={page}
        setPage={setPage}
        className="mb-12"
      />

      <div className="grid gap-8 items-start mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
        {paginatedVideos[page].map((video) => (
          <>
            {video.attributes && (
              <VideoPreview key={video.id} video={video.attributes} />
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
