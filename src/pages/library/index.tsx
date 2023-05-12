import { GetStaticProps } from "next";
import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { LibraryItemUserStatus } from "types/types";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty, isUndefined } from "helpers/asserts";
import { getOpenGraph } from "helpers/openGraph";
import { HorizontalLine } from "components/HorizontalLine";
import { sendAnalytics } from "helpers/analytics";
import {
  containsHighlight,
  CustomSearchResponse,
  filterHitsWithHighlight,
  meiliSearch,
} from "helpers/search";
import { MeiliIndices, MeiliLibraryItem } from "shared/meilisearch-graphql-typings/meiliTypes";
import { useTypedRouter } from "hooks/useTypedRouter";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { prettyItemSubType } from "helpers/formatters";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { useLibraryItemUserStatus } from "hooks/useLibraryItemUserStatus";
import { Paginator } from "components/Containers/Paginator";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  query: "",
  showSubitems: false,
  showPrimaryItems: true,
  showSecondaryItems: false,
  page: 1,
  sortingMethod: 0,
  keepInfoVisible: false,
  filterUserStatus: undefined,
};

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().positive().optional(),
  sort: z.coerce.number().min(0).max(5).optional(),
  subitems: z.coerce.boolean().optional(),
  primary: z.coerce.boolean().optional(),
  secondary: z.coerce.boolean().optional(),
  status: z.coerce.string().optional(),
});

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Library = (props: Props): JSX.Element => {
  const hoverable = useDeviceSupportsHover();
  const { format } = useFormat();
  const { libraryItemUserStatus } = useLibraryItemUserStatus();

  const sortingMethods = useMemo(
    () => [
      { meiliAttribute: "sortable_name:asc", displayedName: format("name") },
      { meiliAttribute: "sortable_date:asc", displayedName: format("release_date") },
      { meiliAttribute: "sortable_price:asc", displayedName: format("price") },
    ],
    [format]
  );

  const router = useTypedRouter(queryParamSchema);
  const [page, setPage] = useState<number>(router.query.page ?? DEFAULT_FILTERS_STATE.page);
  const [libraryItems, setLibraryItems] = useState<CustomSearchResponse<MeiliLibraryItem>>();
  const [query, setQuery] = useState(router.query.query ?? DEFAULT_FILTERS_STATE.query);

  const {
    value: showSubitems,
    toggle: toggleShowSubitems,
    setValue: setShowSubitems,
  } = useBoolean(router.query.subitems ?? DEFAULT_FILTERS_STATE.showSubitems);

  const {
    value: showPrimaryItems,
    toggle: toggleShowPrimaryItems,
    setValue: setShowPrimaryItems,
  } = useBoolean(router.query.primary ?? DEFAULT_FILTERS_STATE.showPrimaryItems);

  const {
    value: showSecondaryItems,
    toggle: toggleShowSecondaryItems,
    setValue: setShowSecondaryItems,
  } = useBoolean(router.query.secondary ?? DEFAULT_FILTERS_STATE.showSecondaryItems);

  const {
    value: keepInfoVisible,
    toggle: toggleKeepInfoVisible,
    setValue: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [sortingMethod, setSortingMethod] = useState<number>(
    router.query.sort ?? DEFAULT_FILTERS_STATE.sortingMethod
  );

  const [filterUserStatus, setFilterUserStatus] = useState<LibraryItemUserStatus | undefined>(
    fromStringToLibraryItemUserStatus(router.query.status) ?? DEFAULT_FILTERS_STATE.filterUserStatus
  );

  useEffect(() => {
    const fetchLibraryItems = async () => {
      const currentSortingMethod = sortingMethods[sortingMethod];
      const filter: string[] = [];

      if (!showPrimaryItems && !showSecondaryItems) {
        filter.push("primary NOT EXISTS");
      } else if (showPrimaryItems && !showSecondaryItems) {
        filter.push("primary = true");
      } else if (!showPrimaryItems && showSecondaryItems) {
        filter.push("primary = false");
      }

      if (showSubitems) {
        filter.push("untangible_group_item = false");
      } else {
        filter.push("root_item = true");
      }

      if (isDefined(filterUserStatus)) {
        filter.push("untangible_group_item = false");
        if (filterUserStatus === LibraryItemUserStatus.None) {
          filter.push(
            `id NOT IN [${Object.entries(libraryItemUserStatus)
              .filter(([, value]) => value !== filterUserStatus)
              .map(([id]) => id)
              .join(", ")}]`
          );
        } else {
          filter.push(
            `id IN [${Object.entries(libraryItemUserStatus)
              .filter(([, value]) => value === filterUserStatus)
              .map(([id]) => id)
              .join(", ")}]`
          );
        }
      }

      const searchResult = await meiliSearch(MeiliIndices.LIBRARY_ITEM, query, {
        hitsPerPage: 25,
        page,
        attributesToRetrieve: [
          "title",
          "subtitle",
          "descriptions",
          "id",
          "slug",
          "thumbnail",
          "release_date",
          "price",
          "categories",
          "metadata",
        ],
        attributesToHighlight: ["title", "subtitle", "descriptions"],
        attributesToCrop: ["descriptions"],
        sort: isDefined(currentSortingMethod) ? [currentSortingMethod.meiliAttribute] : undefined,
        filter,
      });
      setLibraryItems(filterHitsWithHighlight<MeiliLibraryItem>(searchResult, "descriptions"));
    };
    fetchLibraryItems();
  }, [
    filterUserStatus,
    libraryItemUserStatus,
    page,
    query,
    showPrimaryItems,
    showSecondaryItems,
    showSubitems,
    sortingMethod,
    sortingMethods,
  ]);

  useEffect(() => {
    if (router.isReady) {
      router.updateQuery({
        page,
        query,
        sort: sortingMethod,
        primary: showPrimaryItems,
        secondary: showSecondaryItems,
        subitems: showSubitems,
        status: fromLibraryItemUserStatusToString(filterUserStatus),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    query,
    sortingMethod,
    router.isReady,
    showPrimaryItems,
    showSecondaryItems,
    showSubitems,
    filterUserStatus,
  ]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setPage(router.query.page);
      if (isDefined(router.query.query)) setQuery(router.query.query);
      if (isDefined(router.query.sort)) setSortingMethod(router.query.sort);
      if (isDefined(router.query.primary)) setShowPrimaryItems(router.query.primary);
      if (isDefined(router.query.secondary)) setShowSecondaryItems(router.query.secondary);
      if (isDefined(router.query.subitems)) setShowSubitems(router.query.subitems);
      if (isDefined(router.query.status))
        setFilterUserStatus(fromStringToLibraryItemUserStatus(router.query.status));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    const totalPages = libraryItems?.totalPages;
    if (isDefined(totalPages) && totalPages < page && totalPages >= 1) setPage(totalPages);
  }, [libraryItems?.totalPages, page]);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="auto_stories"
        title={format("library")}
        description={format("library_description")}
      />

      <HorizontalLine />

      <TextInput
        className="mb-6 w-full"
        placeholder={format("search_placeholder")}
        value={query}
        onChange={(name) => {
          setPage(1);
          setQuery(name);
          if (isDefinedAndNotEmpty(name)) {
            sendAnalytics("Library", "Change search term");
          } else {
            sendAnalytics("Library", "Clear search term");
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
              "Library",
              `Change sorting method (${
                sortingMethods.map((item) => item.meiliAttribute)[newSort]
              })`
            );
          }}
        />
      </WithLabel>

      <WithLabel label={format("show_subitems")}>
        <Switch
          value={showSubitems}
          onClick={() => {
            setPage(1);
            toggleShowSubitems();
            sendAnalytics("Library", `${showSubitems ? "Hide" : "Show"} subitems`);
          }}
        />
      </WithLabel>

      <WithLabel label={format("show_primary_items")}>
        <Switch
          value={showPrimaryItems}
          onClick={() => {
            setPage(1);
            toggleShowPrimaryItems();
            sendAnalytics("Library", `${showPrimaryItems ? "Hide" : "Show"} primary items`);
          }}
        />
      </WithLabel>

      <WithLabel label={format("show_secondary_items")}>
        <Switch
          value={showSecondaryItems}
          onClick={() => {
            setPage(1);
            toggleShowSecondaryItems();
            sendAnalytics("Library", `${showSecondaryItems ? "Hide" : "Show"} secondary items`);
          }}
        />
      </WithLabel>

      {hoverable && (
        <WithLabel label={format("always_show_info")}>
          <Switch
            value={keepInfoVisible}
            onClick={() => {
              toggleKeepInfoVisible();
              sendAnalytics("Library", `Always ${keepInfoVisible ? "hide" : "show"} info`);
            }}
          />
        </WithLabel>
      )}

      <ButtonGroup
        className="mt-4"
        buttonsProps={[
          {
            tooltip: format("only_display_items_i_want"),
            icon: "favorite",
            onClick: () => {
              setPage(1);
              setFilterUserStatus(LibraryItemUserStatus.Want);
              sendAnalytics("Library", "Set filter status (I want)");
            },
            active: filterUserStatus === LibraryItemUserStatus.Want,
          },
          {
            tooltip: format("only_display_items_i_have"),
            icon: "back_hand",
            onClick: () => {
              setPage(1);
              setFilterUserStatus(LibraryItemUserStatus.Have);
              sendAnalytics("Library", "Set filter status (I have)");
            },
            active: filterUserStatus === LibraryItemUserStatus.Have,
          },
          {
            tooltip: format("only_display_unmarked_items"),
            icon: "nearby_off",
            onClick: () => {
              setPage(1);
              setFilterUserStatus(LibraryItemUserStatus.None);
              sendAnalytics("Library", "Set filter status (unmarked)");
            },
            active: filterUserStatus === LibraryItemUserStatus.None,
          },
          {
            tooltip: format("only_display_unmarked_items"),
            text: format("all"),
            onClick: () => {
              setPage(1);
              setFilterUserStatus(undefined);
              sendAnalytics("Library", "Set filter status (all)");
            },
            active: isUndefined(filterUserStatus),
          },
        ]}
      />

      <Button
        className="mt-8"
        text={format("reset_all_filters")}
        icon="settings_backup_restore"
        onClick={() => {
          setQuery(DEFAULT_FILTERS_STATE.query);
          setShowSubitems(DEFAULT_FILTERS_STATE.showSubitems);
          setShowPrimaryItems(DEFAULT_FILTERS_STATE.showPrimaryItems);
          setShowSecondaryItems(DEFAULT_FILTERS_STATE.showSecondaryItems);
          setSortingMethod(DEFAULT_FILTERS_STATE.sortingMethod);
          setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          setFilterUserStatus(DEFAULT_FILTERS_STATE.filterUserStatus);
          sendAnalytics("Library", "Reset all filters");
        }}
      />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <Paginator page={page} onPageChange={setPage} totalNumberOfPages={libraryItems?.totalPages}>
        <div
          className="grid grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] items-end
              gap-x-6 gap-y-8">
          {libraryItems?.hits.map((item) => (
            <TranslatedPreviewCard
              key={item.id}
              href={`/library/${item.slug}`}
              translations={filterHasAttributes(item._formatted.descriptions, [
                "language.data.attributes.code",
              ]).map((translation) => ({
                language: translation.language.data.attributes.code,
                title: item.title,
                subtitle: item.subtitle,
                description: containsHighlight(translation.description)
                  ? translation.description
                  : undefined,
              }))}
              fallback={{ title: item._formatted.title, subtitle: item._formatted.subtitle }}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="21/29.7"
              thumbnailRounded={false}
              keepInfoVisible={keepInfoVisible}
              topChips={
                item.metadata && item.metadata.length > 0 && item.metadata[0]
                  ? [prettyItemSubType(item.metadata[0])]
                  : []
              }
              bottomChips={item.categories?.data.map(
                (category) => category.attributes?.short ?? ""
              )}
              metadata={{
                releaseDate: item.release_date,
                price: item.price,
                position: "Bottom",
              }}
              infoAppend={
                !isUntangibleGroupItem(item.metadata?.[0]) && <PreviewCardCTAs id={item.id} />
              }
            />
          ))}
        </div>
      </Paginator>
    </ContentPanel>
  );

  return (
    <AppLayout subPanel={subPanel} contentPanel={contentPanel} subPanelIcon="search" {...props} />
  );
};
export default Library;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, format("library")),
  };
  return {
    props: props,
  };
};

const fromLibraryItemUserStatusToString = (status: LibraryItemUserStatus | undefined): string => {
  switch (status) {
    case LibraryItemUserStatus.None:
      return "none";
    case LibraryItemUserStatus.Have:
      return "have";
    case LibraryItemUserStatus.Want:
      return "want";
    default:
      return "all";
  }
};

const fromStringToLibraryItemUserStatus = (
  status: string | undefined
): LibraryItemUserStatus | undefined => {
  switch (status) {
    case "none":
      return LibraryItemUserStatus.None;
    case "have":
      return LibraryItemUserStatus.Have;
    case "want":
      return LibraryItemUserStatus.Want;
    default:
      return undefined;
  }
};
