import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import Select from "components/Inputs/Select";
import Switch from "components/Inputs/Switch";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ThumbnailPreview from "components/PreviewCard";
import { GetLibraryItemsPreviewQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  prettyDate,
  prettyinlineTitle,
  prettyItemSubType,
} from "helpers/formatters";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";
import { convertPrice } from "helpers/numbers";
import { GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";

interface Props extends AppStaticProps {
  items: Exclude<
    GetLibraryItemsPreviewQuery["libraryItems"],
    null | undefined
  >["data"];
}

type GroupLibraryItems = Map<string, Props["items"]>;

export default function Library(props: Props): JSX.Element {
  const { langui, items: libraryItems, currencies } = props;

  const [showSubitems, setShowSubitems] = useState<boolean>(false);
  const [showPrimaryItems, setShowPrimaryItems] = useState<boolean>(true);
  const [showSecondaryItems, setShowSecondaryItems] = useState<boolean>(false);
  const [sortingMethod, setSortingMethod] = useState<number>(0);
  const [groupingMethod, setGroupingMethod] = useState<number>(-1);
  const [keepInfoVisible, setKeepInfoVisible] = useState(false);

  const [filteredItems, setFilteredItems] = useState<Props["items"]>(
    filterItems(
      showSubitems,
      showPrimaryItems,
      showSecondaryItems,
      libraryItems
    )
  );

  const [sortedItems, setSortedItem] = useState<Props["items"]>(
    sortBy(groupingMethod, filteredItems, currencies)
  );

  const [groups, setGroups] = useState<GroupLibraryItems>(
    getGroups(langui, groupingMethod, sortedItems)
  );

  useEffect(() => {
    setFilteredItems(
      filterItems(
        showSubitems,
        showPrimaryItems,
        showSecondaryItems,
        libraryItems
      )
    );
  }, [showSubitems, libraryItems, showPrimaryItems, showSecondaryItems]);

  useEffect(() => {
    setSortedItem(sortBy(sortingMethod, filteredItems, currencies));
  }, [currencies, filteredItems, sortingMethod]);

  useEffect(() => {
    setGroups(getGroups(langui, groupingMethod, sortedItems));
  }, [langui, groupingMethod, sortedItems]);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="library_books"
        title={langui.library}
        description={langui.library_description}
      />

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.group_by}:</p>
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
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.order_by}:</p>
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
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.show_subitems}:</p>
        <Switch state={showSubitems} setState={setShowSubitems} />
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.show_primary_items}:</p>
        <Switch state={showPrimaryItems} setState={setShowPrimaryItems} />
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.show_secondary_items}:</p>
        <Switch state={showSecondaryItems} setState={setShowSecondaryItems} />
      </div>

      <div className="flex flex-row gap-2 place-items-center coarse:hidden">
        <p className="flex-shrink-0">{"Always show info"}:</p>
        <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
      </div>
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      {[...groups].map(([name, items]) => (
        <>
          {items.length > 0 && (
            <>
              {name && (
                <h2
                  key={`h2${name}`}
                  className="text-2xl pb-2 pt-10 first-of-type:pt-0 flex flex-row place-items-center gap-2"
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
                key={`items${name}`}
                className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0"
              >
                {items.map((item) => (
                  <>
                    {item.attributes && (
                      <ThumbnailPreview
                        key={item.id}
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
                  </>
                ))}
              </div>
            </>
          )}
        </>
      ))}
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle={langui.library}
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
  items: Props["items"]
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
      const group: GroupLibraryItems = new Map();
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
      const group: GroupLibraryItems = new Map();
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
      const group: GroupLibraryItems = new Map();
      group.set("", items);
      return group;
    }
  }
}

function filterItems(
  showSubitems: boolean,
  showPrimaryItems: boolean,
  showSecondaryItems: boolean,
  items: Props["items"]
): Props["items"] {
  return [...items].filter((item) => {
    if (!showSubitems && !item.attributes?.root_item) return false;
    if (
      showSubitems &&
      item.attributes?.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
      (item.attributes.metadata[0].subtype?.data?.attributes?.slug ===
        "variant-set" ||
        item.attributes.metadata[0].subtype?.data?.attributes?.slug ===
          "relation-set")
    )
      return false;
    if (item.attributes?.primary && !showPrimaryItems) return false;
    if (!item.attributes?.primary && !showSecondaryItems) return false;
    return true;
  });
}

function sortBy(
  orderByType: number,
  items: Props["items"],
  currencies: AppStaticProps["currencies"]
): Props["items"] {
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
