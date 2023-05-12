import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { CustomSearchResponse, meiliSearch } from "helpers/search";
import { MeiliIndices, MeiliVideo } from "shared/meilisearch-graphql-typings/meiliTypes";
import { PreviewCard } from "components/PreviewCard";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getVideoThumbnailURL } from "helpers/videos";
import { useTypedRouter } from "hooks/useTypedRouter";
import { Select } from "components/Inputs/Select";
import { sendAnalytics } from "helpers/analytics";
import { Button } from "components/Inputs/Button";
import { GetVideoChannelQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { Paginator } from "components/Containers/Paginator";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  searchName: "",
  page: 1,
  sortingMethod: 1,
  onlyShowGone: false,
  keepInfoVisible: true,
};

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
  sort: z.coerce.number().min(0).max(5).optional(),
  gone: z.coerce.boolean().optional(),
});

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  channel: NonNullable<
    NonNullable<GetVideoChannelQuery["videoChannels"]>["data"][number]["attributes"]
  >;
}

const Channel = ({ channel, ...otherProps }: Props): JSX.Element => {
  const { format } = useFormat();
  const hoverable = useDeviceSupportsHover();
  const router = useTypedRouter(queryParamSchema);

  const sortingMethods = useMemo(
    () => [
      { meiliAttribute: "sortable_published_date:asc", displayedName: format("oldest") },
      { meiliAttribute: "sortable_published_date:desc", displayedName: format("newest") },
      { meiliAttribute: "views:asc", displayedName: format("least_popular") },
      { meiliAttribute: "views:desc", displayedName: format("most_popular") },
      { meiliAttribute: "duration:asc", displayedName: format("shortest") },
      { meiliAttribute: "duration:desc", displayedName: format("longest") },
    ],
    [format]
  );

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const {
    value: onlyShowGone,
    toggle: toggleOnlyShowGone,
    setValue: setOnlyShowGone,
  } = useBoolean(router.query.gone ?? DEFAULT_FILTERS_STATE.onlyShowGone);

  const [query, setQuery] = useState<string>(
    router.query.query ?? DEFAULT_FILTERS_STATE.searchName
  );

  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);

  const [sortingMethod, setSortingMethod] = useState<number>(
    router.query.sort ?? DEFAULT_FILTERS_STATE.sortingMethod
  );

  const [videos, setVideos] = useState<CustomSearchResponse<MeiliVideo>>();

  useEffect(() => {
    const fetchVideos = async () => {
      const currentSortingMethod = sortingMethods[sortingMethod];
      const searchResult = await meiliSearch(MeiliIndices.VIDEOS, query, {
        hitsPerPage: 25,
        page,
        attributesToRetrieve: [
          "title",
          "channel",
          "uid",
          "published_date",
          "views",
          "duration",
          "description",
        ],
        attributesToHighlight: ["title", "channel", "description"],
        attributesToCrop: ["description"],
        sort: isDefined(currentSortingMethod) ? [currentSortingMethod.meiliAttribute] : undefined,
        filter: [onlyShowGone ? "gone = true" : "", `channel_uid = ${channel.uid}`],
      });

      setVideos(searchResult);
    };
    fetchVideos();
  }, [query, page, sortingMethod, onlyShowGone, channel, sortingMethods]);

  useEffect(() => {
    if (router.isReady)
      router.updateQuery({
        page,
        query,
        sort: sortingMethod,
        gone: onlyShowGone,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, sortingMethod, onlyShowGone, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setPage(router.query.page);
      if (isDefined(router.query.query)) setQuery(router.query.query);
      if (isDefined(router.query.sort)) setSortingMethod(router.query.sort);
      if (isDefined(router.query.gone)) setOnlyShowGone(router.query.gone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/archives/videos"
        title={format("videos")}
        displayOnlyOn={"3ColumnsLayout"}
        className="mb-10"
      />

      <PanelHeader
        icon="movie"
        title={channel.title}
        description={`${channel.subscribers.toLocaleString()} ${format(
          "subscribers"
        ).toLowerCase()}`}
      />

      <HorizontalLine />

      <TextInput
        className="mb-6 w-full"
        placeholder={format("search_placeholder")}
        value={query}
        onChange={(newQuery) => {
          setPage(1);
          setQuery(newQuery);
          if (isDefinedAndNotEmpty(newQuery)) {
            sendAnalytics("Videos", "Change search term");
          } else {
            sendAnalytics("Videos", "Clear search term");
          }
        }}
      />

      <WithLabel label={format("order_by")}>
        <Select
          className="w-full"
          options={sortingMethods.map((item) => item.displayedName)}
          value={sortingMethod}
          onChange={(newSort) => {
            setPage(1);
            setSortingMethod(newSort);
            sendAnalytics(
              "Videos",
              `Change sorting method (${
                sortingMethods.map((item) => item.meiliAttribute)[newSort]
              })`
            );
          }}
        />
      </WithLabel>

      <WithLabel label={format("only_unavailable_videos")}>
        <Switch
          value={onlyShowGone}
          onClick={() => {
            toggleOnlyShowGone();
          }}
        />
      </WithLabel>

      {hoverable && (
        <WithLabel label={format("always_show_info")}>
          <Switch value={keepInfoVisible} onClick={toggleKeepInfoVisible} />
        </WithLabel>
      )}

      <Button
        className="mt-8"
        text={format("reset_all_filters")}
        icon="settings_backup_restore"
        onClick={() => {
          setOnlyShowGone(DEFAULT_FILTERS_STATE.onlyShowGone);
          setPage(DEFAULT_FILTERS_STATE.page);
          setQuery(DEFAULT_FILTERS_STATE.searchName);
          setSortingMethod(DEFAULT_FILTERS_STATE.sortingMethod);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          sendAnalytics("Videos", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <Paginator page={page} onPageChange={setPage} totalNumberOfPages={videos?.totalPages}>
        <div
          className="grid grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-start
          gap-x-6 gap-y-8">
          {videos?.hits.map((item) => (
            <PreviewCard
              key={item.uid}
              href={`/archives/videos/v/${item.uid}`}
              title={item._formatted.title}
              thumbnail={getVideoThumbnailURL(item.uid)}
              thumbnailAspectRatio="16/9"
              thumbnailForceAspectRatio
              keepInfoVisible={keepInfoVisible}
              metadata={{
                releaseDate: item.published_date,
                views: item.views,
                author: item._formatted.channel?.data?.attributes?.title,
                position: "Top",
              }}
              description={
                item._matchesPosition.description && item._matchesPosition.description.length > 0
                  ? item._formatted.description
                  : undefined
              }
              hoverlay={{
                __typename: "Video",
                duration: item.duration,
              }}
            />
          ))}
        </div>
      </Paginator>
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
  const { format } = getFormat(context.locale);
  const channel = await sdk.getVideoChannel({
    channel: context.params && isDefined(context.params.uid) ? context.params.uid.toString() : "",
  });
  if (!channel.videoChannels?.data[0]?.attributes) return { notFound: true };

  const props: Props = {
    channel: channel.videoChannels.data[0].attributes,
    openGraph: getOpenGraph(format, channel.videoChannels.data[0].attributes.title),
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
    filterHasAttributes(channels.videoChannels.data, ["attributes"]).map((channel) => {
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
