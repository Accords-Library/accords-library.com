import { GetStaticProps } from "next";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { SmartList } from "components/SmartList";
import { Icon } from "components/Ico";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { GetVideosPreviewQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { filterHasAttributes } from "helpers/others";
import { getVideoThumbnailURL } from "helpers/videos";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { getOpenGraph } from "helpers/openGraph";
import { compareDate } from "helpers/date";
import { HorizontalLine } from "components/HorizontalLine";
import { cIf } from "helpers/className";
import { getLangui } from "graphql/fetchLocalData";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  searchName: "",
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  videos: NonNullable<GetVideosPreviewQuery["videos"]>["data"];
}

const Videos = ({ videos, ...otherProps }: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const hoverable = useDeviceSupportsHover();
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);

  const { value: keepInfoVisible, toggle: toggleKeepInfoVisible } = useBoolean(true);

  const [searchName, setSearchName] = useState(DEFAULT_FILTERS_STATE.searchName);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/archives/"
        title={"Archives"}
        displayOnlyOn={"3ColumnsLayout"}
        className="mb-10"
      />

      <PanelHeader icon={Icon.Movie} title="Videos" description={langui.archives_description} />

      <HorizontalLine />

      <TextInput
        className="mb-6 w-full"
        placeholder={langui.search_title ?? "Search title..."}
        value={searchName}
        onChange={setSearchName}
      />

      {hoverable && (
        <WithLabel label={langui.always_show_info}>
          <Switch value={keepInfoVisible} onClick={toggleKeepInfoVisible} />
        </WithLabel>
      )}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <SmartList
        items={filterHasAttributes(videos, ["id", "attributes"] as const)}
        getItemId={(item) => item.id}
        renderItem={({ item }) => (
          <PreviewCard
            href={`/archives/videos/v/${item.attributes.uid}`}
            title={item.attributes.title}
            thumbnail={getVideoThumbnailURL(item.attributes.uid)}
            thumbnailAspectRatio="16/9"
            thumbnailForceAspectRatio
            keepInfoVisible={keepInfoVisible}
            metadata={{
              releaseDate: item.attributes.published_date,
              views: item.attributes.views,
              author: item.attributes.channel?.data?.attributes?.title,
              position: "Top",
            }}
            hoverlay={{
              __typename: "Video",
              duration: item.attributes.duration,
            }}
          />
        )}
        className={cIf(
          isContentPanelAtLeast4xl,
          "grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] gap-x-6 gap-y-8",
          "grid-cols-2 gap-x-3 gap-y-5"
        )}
        paginationItemPerPage={25}
        searchingTerm={searchName}
        searchingBy={(item) => item.attributes.title}
      />
    </ContentPanel>
  );
  return <AppLayout subPanel={subPanel} contentPanel={contentPanel} {...otherProps} />;
};
export default Videos;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const videos = await sdk.getVideosPreview();
  if (!videos.videos) return { notFound: true };
  videos.videos.data
    .sort((a, b) => compareDate(a.attributes?.published_date, b.attributes?.published_date))
    .reverse();

  const props: Props = {
    videos: videos.videos.data,
    openGraph: getOpenGraph(langui, langui.videos ?? "Videos"),
  };
  return {
    props: props,
  };
};
