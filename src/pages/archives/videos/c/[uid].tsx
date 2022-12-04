import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { GetVideoChannelQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { getVideoThumbnailURL } from "helpers/videos";
import { Icon } from "components/Ico";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";
import { filterHasAttributes, isDefined } from "helpers/others";
import { getOpenGraph } from "helpers/openGraph";
import { compareDate } from "helpers/date";
import { HorizontalLine } from "components/HorizontalLine";
import { SmartList } from "components/SmartList";
import { cIf } from "helpers/className";
import { TextInput } from "components/Inputs/TextInput";
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
  channel: NonNullable<GetVideoChannelQuery["videoChannels"]>["data"][number]["attributes"];
}

const Channel = ({ channel, ...otherProps }: Props): JSX.Element => {
  const { value: keepInfoVisible, toggle: toggleKeepInfoVisible } = useBoolean(true);
  const langui = useAtomGetter(atoms.localData.langui);
  const hoverable = useDeviceSupportsHover();
  const isContentPanelAtLeast4xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast4xl);

  const [searchName, setSearchName] = useState(DEFAULT_FILTERS_STATE.searchName);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/archives/videos/"
        title={langui.videos}
        displayOnlyOn={"3ColumnsLayout"}
        className="mb-10"
      />

      <PanelHeader
        icon={Icon.Movie}
        title={langui.videos}
        description={langui.archives_description}
      />

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
        items={filterHasAttributes(channel?.videos?.data, ["id", "attributes"] as const)}
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
              author: channel?.title,
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
        groupingFunction={() => [channel?.title ?? ""]}
        paginationItemPerPage={25}
        searchingTerm={searchName}
        searchingBy={(item) => item.attributes.title}
      />
    </ContentPanel>
  );

  return <AppLayout subPanel={subPanel} contentPanel={contentPanel} {...otherProps} />;
};
export default Channel;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const channel = await sdk.getVideoChannel({
    channel: context.params && isDefined(context.params.uid) ? context.params.uid.toString() : "",
  });
  if (!channel.videoChannels?.data[0].attributes) return { notFound: true };

  channel.videoChannels.data[0].attributes.videos?.data
    .sort((a, b) => compareDate(a.attributes?.published_date, b.attributes?.published_date))
    .reverse();

  const props: Props = {
    channel: channel.videoChannels.data[0].attributes,
    openGraph: getOpenGraph(langui, channel.videoChannels.data[0].attributes.title),
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
    filterHasAttributes(channels.videoChannels.data, ["attributes"] as const).map((channel) => {
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
