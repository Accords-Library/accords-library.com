import { GetStaticProps } from "next";
import { useState, useMemo, useCallback } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { GetLibraryItemsPreviewQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyInlineTitle, prettyItemSubType } from "helpers/formatters";
import { LibraryItemUserStatus } from "helpers/types";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { PreviewCard } from "components/PreviewCard";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { filterHasAttributes, isDefined, isUndefined } from "helpers/others";
import { useAppLayout } from "contexts/AppLayoutContext";
import { convertPrice } from "helpers/numbers";
import { SmartList } from "components/SmartList";
import { SelectiveNonNullable } from "helpers/types/SelectiveNonNullable";
import { useBoolean } from "hooks/useBoolean";
import { getOpenGraph } from "helpers/openGraph";
import { compareDate } from "helpers/date";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  searchName: "",
  showSubitems: false,
  showPrimaryItems: true,
  showSecondaryItems: false,
  sortingMethod: 0,
  groupingMethod: -1,
  keepInfoVisible: false,
  filterUserStatus: undefined,
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
  items: NonNullable<GetLibraryItemsPreviewQuery["libraryItems"]>["data"];
}

const Library = ({
  langui,
  items,
  currencies,
  ...otherProps
}: Props): JSX.Element => {
  const hoverable = useMediaHoverable();
  const { libraryItemUserStatus } = useAppLayout();

  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );

  const {
    state: showSubitems,
    toggleState: toggleShowSubitems,
    setState: setShowSubitems,
  } = useBoolean(DEFAULT_FILTERS_STATE.showSubitems);

  const {
    state: showPrimaryItems,
    toggleState: toggleShowPrimaryItems,
    setState: setShowPrimaryItems,
  } = useBoolean(DEFAULT_FILTERS_STATE.showPrimaryItems);

  const {
    state: showSecondaryItems,
    toggleState: toggleShowSecondaryItems,
    setState: setShowSecondaryItems,
  } = useBoolean(DEFAULT_FILTERS_STATE.showSecondaryItems);

  const {
    state: keepInfoVisible,
    toggleState: toggleKeepInfoVisible,
    setState: setKeepInfoVisible,
  } = useBoolean(DEFAULT_FILTERS_STATE.keepInfoVisible);

  const [sortingMethod, setSortingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.sortingMethod
  );

  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );

  const [filterUserStatus, setFilterUserStatus] = useState<
    LibraryItemUserStatus | undefined
  >(DEFAULT_FILTERS_STATE.filterUserStatus);

  const filteringFunction = useCallback(
    (
      item: SelectiveNonNullable<Props["items"][number], "attributes" | "id">
    ) => {
      if (!showSubitems && !item.attributes.root_item) return false;
      if (
        showSubitems &&
        isUntangibleGroupItem(item.attributes.metadata?.[0])
      ) {
        return false;
      }
      if (item.attributes.primary && !showPrimaryItems) return false;
      if (!item.attributes.primary && !showSecondaryItems) return false;

      if (isDefined(filterUserStatus) && item.id && libraryItemUserStatus) {
        if (isUntangibleGroupItem(item.attributes.metadata?.[0])) {
          return false;
        }
        if (filterUserStatus === LibraryItemUserStatus.None) {
          if (libraryItemUserStatus[item.id]) {
            return false;
          }
        } else if (filterUserStatus !== libraryItemUserStatus[item.id]) {
          return false;
        }
      }
      return true;
    },
    [
      libraryItemUserStatus,
      filterUserStatus,
      showPrimaryItems,
      showSecondaryItems,
      showSubitems,
    ]
  );

  const sortingFunction = useCallback(
    (
      a: SelectiveNonNullable<Props["items"][number], "attributes" | "id">,
      b: SelectiveNonNullable<Props["items"][number], "attributes" | "id">
    ) => {
      switch (sortingMethod) {
        case 0: {
          const titleA = prettyInlineTitle(
            "",
            a.attributes.title,
            a.attributes.subtitle
          );
          const titleB = prettyInlineTitle(
            "",
            b.attributes.title,
            b.attributes.subtitle
          );
          return titleA.localeCompare(titleB);
        }
        case 1: {
          const priceA = a.attributes.price
            ? convertPrice(a.attributes.price, currencies[0])
            : Infinity;
          const priceB = b.attributes.price
            ? convertPrice(b.attributes.price, currencies[0])
            : Infinity;
          return priceA - priceB;
        }
        case 2: {
          return compareDate(
            a.attributes.release_date,
            b.attributes.release_date
          );
        }
        default:
          return 0;
      }
    },
    [currencies, sortingMethod]
  );

  const groupingFunction = useCallback(
    (
      item: SelectiveNonNullable<Props["items"][number], "attributes" | "id">
    ): string[] => {
      switch (groupingMethod) {
        case 0: {
          const categories = filterHasAttributes(
            item.attributes.categories?.data,
            ["attributes"] as const
          );
          if (categories.length > 0) {
            return categories.map((category) => category.attributes.name);
          }
          return [langui.no_category ?? "No category"];
        }
        case 1: {
          if (item.attributes.metadata && item.attributes.metadata.length > 0) {
            switch (item.attributes.metadata[0]?.__typename) {
              case "ComponentMetadataAudio":
                return [langui.audio ?? "Audio"];
              case "ComponentMetadataGame":
                return [langui.game ?? "Game"];
              case "ComponentMetadataBooks":
                return [langui.textual ?? "Textual"];
              case "ComponentMetadataVideo":
                return [langui.video ?? "Video"];
              case "ComponentMetadataOther":
                return [langui.other ?? "Other"];
              case "ComponentMetadataGroup": {
                switch (
                  item.attributes.metadata[0]?.subitems_type?.data?.attributes
                    ?.slug
                ) {
                  case "audio":
                    return [langui.audio ?? "Audio"];
                  case "video":
                    return [langui.video ?? "Video"];
                  case "game":
                    return [langui.game ?? "Game"];
                  case "textual":
                    return [langui.textual ?? "Textual"];
                  case "mixed":
                    return [langui.group ?? "Group"];
                  default: {
                    return [langui.no_type ?? "No type"];
                  }
                }
              }
              default:
                return [langui.no_type ?? "No type"];
            }
          } else {
            return [langui.no_type ?? "No type"];
          }
        }
        case 2: {
          if (item.attributes.release_date?.year) {
            return [item.attributes.release_date.year.toString()];
          }
          return [langui.no_year ?? "No year"];
        }
        default:
          return [""];
      }
    },
    [groupingMethod, langui]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.LibraryBooks}
          title={langui.library}
          description={langui.library_description}
        />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? "Search..."}
          value={searchName}
          onChange={setSearchName}
        />

        <WithLabel
          label={langui.group_by}
          input={
            <Select
              className="w-full"
              options={[
                langui.category ?? "Category",
                langui.type ?? "Type",
                langui.release_year ?? "Year",
              ]}
              value={groupingMethod}
              onChange={setGroupingMethod}
              allowEmpty
            />
          }
        />

        <WithLabel
          label={langui.order_by}
          input={
            <Select
              className="w-full"
              options={[
                langui.name ?? "Name",
                langui.price ?? "Price",
                langui.release_date ?? "Release date",
              ]}
              value={sortingMethod}
              onChange={setSortingMethod}
            />
          }
        />

        <WithLabel
          label={langui.show_subitems}
          input={<Switch value={showSubitems} onClick={toggleShowSubitems} />}
        />

        <WithLabel
          label={langui.show_primary_items}
          input={
            <Switch value={showPrimaryItems} onClick={toggleShowPrimaryItems} />
          }
        />

        <WithLabel
          label={langui.show_secondary_items}
          input={
            <Switch
              value={showSecondaryItems}
              onClick={toggleShowSecondaryItems}
            />
          }
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch value={keepInfoVisible} onClick={toggleKeepInfoVisible} />
            }
          />
        )}

        <ButtonGroup
          className="mt-4"
          buttonsProps={[
            {
              tooltip: langui.only_display_items_i_want,
              icon: Icon.Favorite,
              onClick: () => setFilterUserStatus(LibraryItemUserStatus.Want),
              active: filterUserStatus === LibraryItemUserStatus.Want,
            },
            {
              tooltip: langui.only_display_items_i_have,
              icon: Icon.BackHand,
              onClick: () => setFilterUserStatus(LibraryItemUserStatus.Have),
              active: filterUserStatus === LibraryItemUserStatus.Have,
            },
            {
              tooltip: langui.only_display_unmarked_items,
              icon: Icon.RadioButtonUnchecked,
              onClick: () => setFilterUserStatus(LibraryItemUserStatus.None),
              active: filterUserStatus === LibraryItemUserStatus.None,
            },
            {
              tooltip: langui.only_display_unmarked_items,
              text: langui.all,
              onClick: () => setFilterUserStatus(undefined),
              active: isUndefined(filterUserStatus),
            },
          ]}
        />

        <Button
          className="mt-8"
          text={langui.reset_all_filters}
          icon={Icon.Replay}
          onClick={() => {
            setSearchName(DEFAULT_FILTERS_STATE.searchName);
            setShowSubitems(DEFAULT_FILTERS_STATE.showSubitems);
            setShowPrimaryItems(DEFAULT_FILTERS_STATE.showPrimaryItems);
            setShowSecondaryItems(DEFAULT_FILTERS_STATE.showSecondaryItems);
            setSortingMethod(DEFAULT_FILTERS_STATE.sortingMethod);
            setGroupingMethod(DEFAULT_FILTERS_STATE.groupingMethod);
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
            setFilterUserStatus(DEFAULT_FILTERS_STATE.filterUserStatus);
          }}
        />
      </SubPanel>
    ),
    [
      filterUserStatus,
      groupingMethod,
      hoverable,
      keepInfoVisible,
      langui,
      searchName,
      setKeepInfoVisible,
      setShowPrimaryItems,
      setShowSecondaryItems,
      setShowSubitems,
      showPrimaryItems,
      showSecondaryItems,
      showSubitems,
      sortingMethod,
      toggleKeepInfoVisible,
      toggleShowPrimaryItems,
      toggleShowSecondaryItems,
      toggleShowSubitems,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <SmartList
          items={filterHasAttributes(items, ["id", "attributes"] as const)}
          getItemId={(item) => item.id}
          renderItem={({ item }) => (
            <PreviewCard
              href={`/library/${item.attributes.slug}`}
              title={item.attributes.title}
              subtitle={item.attributes.subtitle}
              thumbnail={item.attributes.thumbnail?.data?.attributes}
              thumbnailAspectRatio="21/29.7"
              thumbnailRounded={false}
              keepInfoVisible={keepInfoVisible}
              topChips={
                item.attributes.metadata &&
                item.attributes.metadata.length > 0 &&
                item.attributes.metadata[0]
                  ? [prettyItemSubType(item.attributes.metadata[0])]
                  : []
              }
              bottomChips={item.attributes.categories?.data.map(
                (category) => category.attributes?.short ?? ""
              )}
              metadata={{
                currencies: currencies,
                releaseDate: item.attributes.release_date,
                price: item.attributes.price,
                position: "Bottom",
              }}
              infoAppend={
                !isUntangibleGroupItem(item.attributes.metadata?.[0]) && (
                  <PreviewCardCTAs id={item.id} langui={langui} />
                )
              }
            />
          )}
          className="grid-cols-2 items-end desktop:grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))]"
          searchingTerm={searchName}
          sortingFunction={sortingFunction}
          groupingFunction={groupingFunction}
          searchingBy={(item) =>
            prettyInlineTitle(
              "",
              item.attributes.title,
              item.attributes.subtitle
            )
          }
          filteringFunction={filteringFunction}
          paginationItemPerPage={25}
          langui={langui}
        />
      </ContentPanel>
    ),
    [
      currencies,
      filteringFunction,
      groupingFunction,
      items,
      keepInfoVisible,
      langui,
      searchName,
      sortingFunction,
    ]
  );

  return (
    <AppLayout
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      currencies={currencies}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Library;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const items = await sdk.getLibraryItemsPreview({
    language_code: context.locale ?? "en",
  });
  if (!items.libraryItems?.data) return { notFound: true };
  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    items: items.libraryItems.data,
    openGraph: getOpenGraph(
      appStaticProps.langui,
      appStaticProps.langui.library ?? "Library"
    ),
  };
  return {
    props: props,
  };
};
