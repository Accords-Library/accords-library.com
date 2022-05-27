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
import { PreviewCard } from "components/PreviewCard";
import { GetLibraryItemsPreviewQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import {
  prettyDate,
  prettyinlineTitle,
  prettyItemSubType,
} from "helpers/formatters";
import { convertPrice } from "helpers/numbers";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { Fragment, useEffect, useState } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { TextInput } from "components/Inputs/TextInput";
import { Button } from "components/Inputs/Button";

interface Props extends AppStaticProps {
  items: NonNullable<GetLibraryItemsPreviewQuery["libraryItems"]>["data"];
}

type GroupLibraryItems = Map<string, Immutable<Props["items"]>>;

const defaultFiltersState = {
  searchName: "",
  showSubitems: false,
  showPrimaryItems: true,
  showSecondaryItems: false,
  sortingMethod: 0,
  groupingMethod: -1,
  keepInfoVisible: false,
};

export default function Library(props: Immutable<Props>): JSX.Element {
  const { langui, items: libraryItems, currencies } = props;

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

  const [filteredItems, setFilteredItems] = useState(
    filterItems(
      libraryItems,
      searchName,
      showSubitems,
      showPrimaryItems,
      showSecondaryItems
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
        libraryItems,
        searchName,
        showSubitems,
        showPrimaryItems,
        showSecondaryItems
      )
    );
  }, [
    showSubitems,
    libraryItems,
    showPrimaryItems,
    showSecondaryItems,
    searchName,
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

      <WithLabel
        label={langui.always_show_info}
        input={<Switch state={keepInfoVisible} setState={setKeepInfoVisible} />}
      />

      {/* TODO: Add to Langui */}
      <Button
        className="mt-8"
        text={"Reset all filters"}
        icon={Icon.Replay}
        onClick={() => {
          setSearchName(defaultFiltersState.searchName);
          setShowSubitems(defaultFiltersState.showSubitems);
          setShowPrimaryItems(defaultFiltersState.showPrimaryItems);
          setShowSecondaryItems(defaultFiltersState.showSecondaryItems);
          setSortingMethod(defaultFiltersState.sortingMethod);
          setGroupingMethod(defaultFiltersState.groupingMethod);
          setKeepInfoVisible(defaultFiltersState.keepInfoVisible);
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
                    {item.attributes && (
                      <PreviewCard
                        href={`/library/${item.attributes.slug}`}
                        title={item.attributes.title}
                        subtitle={item.attributes.subtitle}
                        thumbnail={item.attributes.thumbnail?.data?.attributes}
                        thumbnailAspectRatio="21/29.7"
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
  if (!items.libraryItems) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    items: items.libraryItems.data,
  };
  return {
    props: props,
  };
}

function getGroups(
  langui: AppStaticProps["langui"],
  groupByType: number,
  items: Immutable<Props["items"]>
): GroupLibraryItems {
  switch (groupByType) {
    case 0: {
      const typeGroup = new Map();
      typeGroup.set("Drakengard 1", []);
      typeGroup.set("Drakengard 1.3", []);
      typeGroup.set("Drakengard 2", []);
      typeGroup.set("Drakengard 3", []);
      typeGroup.set("Drakengard 4", []);
      typeGroup.set("NieR Gestalt", []);
      typeGroup.set("NieR Replicant", []);
      typeGroup.set("NieR Replicant ver.1.22474487139...", []);
      typeGroup.set("NieR:Automata", []);
      typeGroup.set("NieR Re[in]carnation", []);
      typeGroup.set("SINoALICE", []);
      typeGroup.set("Voice of Cards", []);
      typeGroup.set("Final Fantasy XIV", []);
      typeGroup.set("Thou Shalt Not Die", []);
      typeGroup.set("Bakuken", []);
      typeGroup.set("YoRHa", []);
      typeGroup.set("YoRHa Boys", []);
      typeGroup.set(langui.no_category, []);

      items.map((item) => {
        if (item.attributes?.categories?.data.length === 0) {
          typeGroup.get(langui.no_category)?.push(item);
        } else {
          item.attributes?.categories?.data.map((category) => {
            typeGroup.get(category.attributes?.name)?.push(item);
          });
        }
      });

      return typeGroup;
    }

    case 1: {
      const group = new Map();
      group.set(langui.audio ?? "Audio", []);
      group.set(langui.game ?? "Game", []);
      group.set(langui.textual ?? "Textual", []);
      group.set(langui.video ?? "Video", []);
      group.set(langui.other ?? "Other", []);
      group.set(langui.group ?? "Group", []);
      group.set(langui.no_type ?? "No type", []);
      items.map((item) => {
        if (item.attributes?.metadata && item.attributes.metadata.length > 0) {
          switch (item.attributes.metadata[0]?.__typename) {
            case "ComponentMetadataAudio":
              group.get(langui.audio ?? "Audio")?.push(item);
              break;
            case "ComponentMetadataGame":
              group.get(langui.game ?? "Game")?.push(item);
              break;
            case "ComponentMetadataBooks":
              group.get(langui.textual ?? "Textual")?.push(item);
              break;
            case "ComponentMetadataVideo":
              group.get(langui.video ?? "Video")?.push(item);
              break;
            case "ComponentMetadataOther":
              group.get(langui.other ?? "Other")?.push(item);
              break;
            case "ComponentMetadataGroup":
              switch (
                item.attributes.metadata[0]?.subitems_type?.data?.attributes
                  ?.slug
              ) {
                case "audio":
                  group.get(langui.audio ?? "Audio")?.push(item);
                  break;
                case "video":
                  group.get(langui.video ?? "Video")?.push(item);
                  break;
                case "game":
                  group.get(langui.game ?? "Game")?.push(item);
                  break;
                case "textual":
                  group.get(langui.textual ?? "Textual")?.push(item);
                  break;
                case "mixed":
                  group.get(langui.group ?? "Group")?.push(item);
                  break;
                default: {
                  throw new Error(
                    "An unexpected subtype of group-metadata was given"
                  );
                }
              }
              break;
            default: {
              throw new Error("An unexpected type of metadata was given");
            }
          }
        } else {
          group.get(langui.no_type ?? "No type")?.push(item);
        }
      });
      return group;
    }

    case 2: {
      const years: number[] = [];
      items.map((item) => {
        if (item.attributes?.release_date?.year) {
          if (!years.includes(item.attributes.release_date.year))
            years.push(item.attributes.release_date.year);
        }
      });
      const group = new Map();
      years.sort((a, b) => a - b);
      years.map((year) => {
        group.set(year.toString(), []);
      });
      group.set(langui.no_year ?? "No year", []);
      items.map((item) => {
        if (item.attributes?.release_date?.year) {
          group.get(item.attributes.release_date.year.toString())?.push(item);
        } else {
          group.get(langui.no_year ?? "No year")?.push(item);
        }
      });

      return group;
    }

    default: {
      const group = new Map();
      group.set("", items);
      return group;
    }
  }
}

function filterItems(
  items: Immutable<Props["items"]>,
  searchName: string,
  showSubitems: boolean,
  showPrimaryItems: boolean,
  showSecondaryItems: boolean
): Immutable<Props["items"]> {
  return [...items].filter((item) => {
    if (!showSubitems && !item.attributes?.root_item) return false;
    if (
      showSubitems &&
      item.attributes?.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
      (item.attributes.metadata[0].subtype?.data?.attributes?.slug ===
        "variant-set" ||
        item.attributes.metadata[0].subtype?.data?.attributes?.slug ===
          "relation-set")
    ) {
      return false;
    }
    if (item.attributes?.primary && !showPrimaryItems) return false;
    if (!item.attributes?.primary && !showSecondaryItems) return false;
    if (searchName.length > 1) {
      if (
        prettyinlineTitle("", item.attributes?.title, item.attributes?.subtitle)
          .toLowerCase()
          .includes(searchName.toLowerCase())
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
}

function sortBy(
  orderByType: number,
  items: Immutable<Props["items"]>,
  currencies: AppStaticProps["currencies"]
): Immutable<Props["items"]> {
  switch (orderByType) {
    case 0:
      return [...items].sort((a, b) => {
        const titleA = prettyinlineTitle(
          "",
          a.attributes?.title,
          a.attributes?.subtitle
        );
        const titleB = prettyinlineTitle(
          "",
          b.attributes?.title,
          b.attributes?.subtitle
        );
        return titleA.localeCompare(titleB);
      });
    case 1:
      return [...items].sort((a, b) => {
        const priceA = a.attributes?.price
          ? convertPrice(a.attributes.price, currencies[0])
          : 99999;
        const priceB = b.attributes?.price
          ? convertPrice(b.attributes.price, currencies[0])
          : 99999;
        return priceA - priceB;
      });
    case 2:
      return [...items].sort((a, b) => {
        const dateA = a.attributes?.release_date
          ? prettyDate(a.attributes.release_date)
          : "9999";
        const dateB = b.attributes?.release_date
          ? prettyDate(b.attributes.release_date)
          : "9999";
        return dateA.localeCompare(dateB);
      });
    default:
      return items;
  }
}
