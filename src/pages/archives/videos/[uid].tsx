import AppLayout from "components/AppLayout";
import Button from "components/Button";
import HorizontalLine from "components/HorizontalLine";
import InsetBox from "components/InsetBox";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetVideoQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { useMediaMobile } from "hooks/useMediaQuery";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { getVideoFile, prettyDate, prettyShortenNumber } from "queries/helpers";

interface Props extends AppStaticProps {
  video: Exclude<
    Exclude<
      GetVideoQuery["videos"],
      null | undefined
    >["data"][number]["attributes"],
    null | undefined
  >;
}

export default function Video(props: Props): JSX.Element {
  const { langui, video } = props;
  const isMobile = useMediaMobile();
  const appLayout = useAppLayout();
  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/archives/videos/"
        title={"Videos"}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        className="mb-10"
      />

      <HorizontalLine />

      <NavOption
        title={langui.video}
        url="#video"
        border
        onClick={() => appLayout.setSubPanelOpen(false)}
      />

      <NavOption
        title={"Channel"}
        url="#channel"
        border
        onClick={() => appLayout.setSubPanelOpen(false)}
      />

      <NavOption
        title={"Description"}
        url="#description"
        border
        onClick={() => appLayout.setSubPanelOpen(false)}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <ReturnButton
        href="/library/"
        title={langui.library}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />

      <div className="grid gap-12 place-items-center">
        <div
          id="video"
          className="w-full rounded-xl shadow-shade shadow-lg overflow-hidden"
        >
          <video className="w-full" src={getVideoFile(video.uid)} controls></video>
          <div className="p-6 mt-2">
            <h1 className="text-2xl">{video.title}</h1>
            <div className="flex flex-row flex-wrap gap-x-6 w-full">
              <p>
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  event
                </span>
                {prettyDate(video.published_date)}
              </p>
              <p>
                <span className="material-icons !text-base translate-y-[.15em] mr-1">
                  visibility
                </span>
                {isMobile
                  ? prettyShortenNumber(video.views)
                  : video.views.toLocaleString()}
              </p>
              {video.channel?.data?.attributes && (
                <p>
                  <span className="material-icons !text-base translate-y-[.15em] mr-1">
                    thumb_up
                  </span>
                  {isMobile
                    ? prettyShortenNumber(video.likes)
                    : video.likes.toLocaleString()}
                </p>
              )}
              <Button href="" className="!py-0 !px-3">{`View on ${video.source}`}</Button>
            </div>
          </div>
        </div>

        {video.channel?.data?.attributes && (
          <InsetBox id="channel" className="grid place-items-center">
            <div className="w-[clamp(0px,100%,42rem)] grid place-items-center gap-4 text-center">
              <h2 className="text-2xl">{"Channel"}</h2>
              <div>
                <Button href="#">
                  <h3>{video.channel.data.attributes.title}</h3>
                </Button>

                <p>
                  {video.channel.data.attributes.subscribers.toLocaleString()}{" "}
                  subscribers
                </p>
              </div>
            </div>
          </InsetBox>
        )}

        <InsetBox id="description" className="grid place-items-center">
          <div className="w-[clamp(0px,100%,42rem)] grid place-items-center gap-8">
            <h2 className="text-2xl">{"Description"}</h2>
            <p className="whitespace-pre-line">{video.description}</p>
          </div>
        </InsetBox>
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
  const videos = await sdk.getVideo({
    uid: context.params?.uid ? context.params.uid.toString() : "",
  });
  if (!videos.videos?.data[0].attributes) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    video: videos.videos.data[0].attributes,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const videos = await sdk.getVideo();
  const paths: GetStaticPathsResult["paths"] = [];
  if (videos.videos?.data)
    videos.videos.data.map((video) => {
      context.locales?.map((local) => {
        if (video.attributes)
          paths.push({ params: { uid: video.attributes.uid }, locale: local });
      });
    });
  return {
    paths,
    fallback: "blocking",
  };
}
