import { AppLayout } from "components/AppLayout";
import { Icon } from "components/Ico";
import { PageSelector } from "components/Inputs/PageSelector";
import { Switch } from "components/Inputs/Switch";
import { WithLabel } from "components/Inputs/WithLabel";
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
import { GetVideosPreviewQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyDate } from "helpers/formatters";
import { filterHasAttributes } from "helpers/others";
import { getVideoThumbnailURL } from "helpers/videos";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { GetStaticPropsContext } from "next";
import { Fragment, useState } from "react";

interface Props extends AppStaticProps {
  videos: NonNullable<GetVideosPreviewQuery["videos"]>["data"];
}

export default function Videos(props: Props): JSX.Element {
  const { langui, videos } = props;
  const hoverable = useMediaHoverable();

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
        displayOn={ReturnButtonType.Desktop}
        className="mb-10"
      />

      <PanelHeader
        icon={Icon.Movie}
        title="Videos"
        description={langui.archives_description}
      />

      {hoverable && (
        <WithLabel
          label={langui.always_show_info}
          input={
            <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
          }
        />
      )}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <PageSelector
        maxPage={Math.floor(videos.length / itemPerPage)}
        page={page}
        setPage={setPage}
        className="mb-12"
      />

      <div
        className="grid items-start gap-8 border-b-[3px] border-dotted pb-12 last-of-type:border-0
        desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] mobile:grid-cols-2
        thin:grid-cols-1"
      >
        {filterHasAttributes(paginatedVideos[page]).map((video) => (
          <Fragment key={video.id}>
            <PreviewCard
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
          </Fragment>
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
