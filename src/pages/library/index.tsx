import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
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
import { prettyItemSubType } from "helpers/formatters";
import { LibraryItemUserStatus } from "helpers/types";
import { GetStaticProps } from "next";
import { Fragment, useState, useMemo } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { useAppLayout } from "contexts/AppLayoutContext";
import {
  filterItems,
  getGroups,
  sortBy,
  isUntangibleGroupItem,
} from "helpers/libraryItem";
import { PreviewCard } from "components/PreviewCard";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import {
  filterHasAttributes,
  isDefinedAndNotEmpty,
  isUndefined,
  iterateMap,
} from "helpers/others";
import { ContentPlaceholder } from "components/PanelComponents/ContentPlaceholder";

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

interface Props extends AppStaticProps {
  items: NonNullable<GetLibraryItemsPreviewQuery["libraryItems"]>["data"];
}

const Library = ({
  langui,
  items: libraryItems,
  currencies,
  ...otherProps
}: Props): JSX.Element => {
  const appLayout = useAppLayout();
  const hoverable = useMediaHoverable();

  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );
  const [showSubitems, setShowSubitems] = useState<boolean>(
    DEFAULT_FILTERS_STATE.showSubitems
  );
  const [showPrimaryItems, setShowPrimaryItems] = useState<boolean>(
    DEFAULT_FILTERS_STATE.showPrimaryItems
  );
  const [showSecondaryItems, setShowSecondaryItems] = useState<boolean>(
    DEFAULT_FILTERS_STATE.showSecondaryItems
  );
  const [sortingMethod, setSortingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.sortingMethod
  );
  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    DEFAULT_FILTERS_STATE.keepInfoVisible
  );
  const [filterUserStatus, setFilterUserStatus] = useState<
    LibraryItemUserStatus | undefined
  >(DEFAULT_FILTERS_STATE.filterUserStatus);

  const filteredItems = useMemo(
    () =>
      filterItems(
        appLayout,
        libraryItems,
        searchName,
        showSubitems,
        showPrimaryItems,
        showSecondaryItems,
        filterUserStatus
      ),
    [
      appLayout,
      filterUserStatus,
      libraryItems,
      searchName,
      showPrimaryItems,
      showSecondaryItems,
      showSubitems,
    ]
  );

  const sortedItems = useMemo(
    () => sortBy(sortingMethod, filteredItems, currencies),
    [currencies, filteredItems, sortingMethod]
  );

  const groups = useMemo(
    () => getGroups(langui, groupingMethod, sortedItems),
    [langui, groupingMethod, sortedItems]
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
          placeholder={langui.search_title ?? undefined}
          state={searchName}
          setState={setSearchName}
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
              state={groupingMethod}
              setState={setGroupingMethod}
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
              state={sortingMethod}
              setState={setSortingMethod}
            />
          }
        />

        <WithLabel
          label={langui.show_subitems}
          input={<Switch state={showSubitems} setState={setShowSubitems} />}
        />

        <WithLabel
          label={langui.show_primary_items}
          input={
            <Switch state={showPrimaryItems} setState={setShowPrimaryItems} />
          }
        />

        <WithLabel
          label={langui.show_secondary_items}
          input={
            <Switch
              state={showSecondaryItems}
              setState={setShowSecondaryItems}
            />
          }
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch state={keepInfoVisible} setState={setKeepInfoVisible} />
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
      showPrimaryItems,
      showSecondaryItems,
      showSubitems,
      sortingMethod,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        {groups.size === 0 && (
          <ContentPlaceholder
            message={langui.no_results_message ?? "No results"}
            icon={Icon.ChevronLeft}
          />
        )}
        {iterateMap(groups, (name, items) => (
          <Fragment key={name}>
            {isDefinedAndNotEmpty(name) && (
              <h2
                className="flex flex-row place-items-center gap-2
                  pb-2 pt-10 text-2xl first-of-type:pt-0"
              >
                {name}
                <Chip>{`${items.length} ${
                  items.length <= 1
                    ? langui.result?.toLowerCase() ?? "result"
                    : langui.results?.toLowerCase() ?? "results"
                }`}</Chip>
              </h2>
            )}
            <div
              className="grid items-end gap-8 border-b-[3px] border-dotted pb-12
                last-of-type:border-0 desktop:grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))]
                mobile:grid-cols-2 mobile:gap-4"
            >
              {filterHasAttributes(items).map((item) => (
                <Fragment key={item.id}>
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
                      release_date: item.attributes.release_date,
                      price: item.attributes.price,
                      position: "Bottom",
                    }}
                    infoAppend={
                      !isUntangibleGroupItem(item.attributes.metadata?.[0]) && (
                        <PreviewCardCTAs id={item.id} langui={langui} />
                      )
                    }
                  />
                </Fragment>
              ))}
            </div>
          </Fragment>
        ))}
      </ContentPanel>
    ),
    [currencies, groups, keepInfoVisible, langui]
  );

  return (
    <AppLayout
      navTitle={langui.library}
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
  const props: Props = {
    ...(await getAppStaticProps(context)),
    items: items.libraryItems.data,
  };
  return {
    props: props,
  };
};
