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
import { Immutable, LibraryItemUserStatus } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { Fragment, useEffect, useState } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { useAppLayout } from "contexts/AppLayoutContext";
import { ToolTip } from "components/ToolTip";
import {
  filterItems,
  getGroups,
  sortBy,
  isUntangibleGroupItem,
} from "helpers/libraryItem";
import { PreviewCard } from "components/PreviewCard";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { ButtonGroup } from "components/Inputs/ButtonGroup";

interface Props extends AppStaticProps {
  items: NonNullable<GetLibraryItemsPreviewQuery["libraryItems"]>["data"];
}

const defaultFiltersState = {
  searchName: "",
  showSubitems: false,
  showPrimaryItems: true,
  showSecondaryItems: false,
  sortingMethod: 0,
  groupingMethod: -1,
  keepInfoVisible: false,
  filterUserStatus: undefined,
};

export default function Library(props: Immutable<Props>): JSX.Element {
  const { langui, items: libraryItems, currencies } = props;
  const appLayout = useAppLayout();
  const hoverable = useMediaHoverable();

  const [searchName, setSearchName] = useState(defaultFiltersState.searchName);
  const [showSubitems, setShowSubitems] = useState<boolean>(
    defaultFiltersState.showSubitems
  );
  const [showPrimaryItems, setShowPrimaryItems] = useState<boolean>(
    defaultFiltersState.showPrimaryItems
  );
  const [showSecondaryItems, setShowSecondaryItems] = useState<boolean>(
    defaultFiltersState.showSecondaryItems
  );
  const [sortingMethod, setSortingMethod] = useState<number>(
    defaultFiltersState.sortingMethod
  );
  const [groupingMethod, setGroupingMethod] = useState<number>(
    defaultFiltersState.groupingMethod
  );
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    defaultFiltersState.keepInfoVisible
  );
  const [filterUserStatus, setFilterUserStatus] = useState<
    LibraryItemUserStatus | undefined
  >(defaultFiltersState.filterUserStatus);

  const [filteredItems, setFilteredItems] = useState(
    filterItems(
      appLayout,
      libraryItems,
      searchName,
      showSubitems,
      showPrimaryItems,
      showSecondaryItems,
      filterUserStatus
    )
  );

  const [sortedItems, setSortedItem] = useState(
    sortBy(groupingMethod, filteredItems, currencies)
  );

  const [groups, setGroups] = useState(
    getGroups(langui, groupingMethod, sortedItems)
  );

  useEffect(() => {
    setFilteredItems(
      filterItems(
        appLayout,
        libraryItems,
        searchName,
        showSubitems,
        showPrimaryItems,
        showSecondaryItems,
        filterUserStatus
      )
    );
  }, [
    showSubitems,
    libraryItems,
    showPrimaryItems,
    showSecondaryItems,
    searchName,
    filterUserStatus,
    appLayout,
  ]);

  useEffect(() => {
    setSortedItem(sortBy(sortingMethod, filteredItems, currencies));
  }, [currencies, filteredItems, sortingMethod]);

  useEffect(() => {
    setGroups(getGroups(langui, groupingMethod, sortedItems));
  }, [langui, groupingMethod, sortedItems]);

  const subPanel = (
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
          <Switch state={showSecondaryItems} setState={setShowSecondaryItems} />
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

      <ButtonGroup className="mt-4">
        <ToolTip content={langui.only_display_items_i_want}>
          <Button
            icon={Icon.Favorite}
            onClick={() => setFilterUserStatus(LibraryItemUserStatus.Want)}
            active={filterUserStatus === LibraryItemUserStatus.Want}
          />
        </ToolTip>
        <ToolTip content={langui.only_display_items_i_have}>
          <Button
            icon={Icon.BackHand}
            onClick={() => setFilterUserStatus(LibraryItemUserStatus.Have)}
            active={filterUserStatus === LibraryItemUserStatus.Have}
          />
        </ToolTip>
        <ToolTip content={langui.only_display_unmarked_items}>
          <Button
            icon={Icon.RadioButtonUnchecked}
            onClick={() => setFilterUserStatus(LibraryItemUserStatus.None)}
            active={filterUserStatus === LibraryItemUserStatus.None}
          />
        </ToolTip>
        <ToolTip content={langui.display_all_items}>
          <Button
            text={"All"}
            onClick={() => setFilterUserStatus(undefined)}
            active={filterUserStatus === undefined}
          />
        </ToolTip>
      </ButtonGroup>

      <Button
        className="mt-8"
        text={langui.reset_all_filters}
        icon={Icon.Replay}
        onClick={() => {
          setSearchName(defaultFiltersState.searchName);
          setShowSubitems(defaultFiltersState.showSubitems);
          setShowPrimaryItems(defaultFiltersState.showPrimaryItems);
          setShowSecondaryItems(defaultFiltersState.showSecondaryItems);
          setSortingMethod(defaultFiltersState.sortingMethod);
          setGroupingMethod(defaultFiltersState.groupingMethod);
          setKeepInfoVisible(defaultFiltersState.keepInfoVisible);
          setFilterUserStatus(defaultFiltersState.filterUserStatus);
        }}
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Large}>
      {[...groups].map(([name, items]) => (
        <Fragment key={name}>
          {items.length > 0 && (
            <>
              {name && (
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
                {items.map((item) => (
                  <Fragment key={item.id}>
                    {item.id && item.attributes && (
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
                          <PreviewCardCTAs
                            id={item.id}
                            displayCTAs={
                              !isUntangibleGroupItem(
                                item.attributes.metadata?.[0]
                              )
                            }
                            langui={langui}
                          />
                        }
                      />
                    )}
                  </Fragment>
                ))}
              </div>
            </>
          )}
        </Fragment>
      ))}
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle={langui.library}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
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
}
