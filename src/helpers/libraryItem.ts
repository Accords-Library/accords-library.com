import { AppLayoutState } from "contexts/AppLayoutContext";
import { GetLibraryItemsPreviewQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettyinlineTitle, prettyDate } from "./formatters";
import { convertPrice } from "./numbers";
import { isDefined } from "./others";
import { Immutable, LibraryItemUserStatus } from "./types";
type Items = NonNullable<GetLibraryItemsPreviewQuery["libraryItems"]>["data"];
type GroupLibraryItems = Map<string, Immutable<Items>>;

export function getGroups(
  langui: AppStaticProps["langui"],
  groupByType: number,
  items: Immutable<Items>
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

export function filterItems(
  appLayout: AppLayoutState,
  items: Immutable<Items>,
  searchName: string,
  showSubitems: boolean,
  showPrimaryItems: boolean,
  showSecondaryItems: boolean,
  filterUserStatus: LibraryItemUserStatus | undefined
): Immutable<Items> {
  return [...items].filter((item) => {
    if (!showSubitems && !item.attributes?.root_item) return false;
    if (showSubitems && isUntangibleGroupItem(item.attributes?.metadata?.[0])) {
      return false;
    }
    if (item.attributes?.primary && !showPrimaryItems) return false;
    if (!item.attributes?.primary && !showSecondaryItems) return false;

    if (
      searchName.length > 1 &&
      !prettyinlineTitle("", item.attributes?.title, item.attributes?.subtitle)
        .toLowerCase()
        .includes(searchName.toLowerCase())
    ) {
      return false;
    }

    if (
      isDefined(filterUserStatus) &&
      item.id &&
      appLayout.libraryItemUserStatus
    ) {
      if (isUntangibleGroupItem(item.attributes?.metadata?.[0])) {
        return false;
      }
      if (filterUserStatus === LibraryItemUserStatus.None) {
        if (appLayout.libraryItemUserStatus[item.id]) {
          return false;
        }
      } else if (
        filterUserStatus !== appLayout.libraryItemUserStatus[item.id]
      ) {
        return false;
      }
    }

    return true;
  });
}

// TODO: Properly type this shit
// Best attempt was Immutable<NonNullable<NonNullable<Items[number]["attributes"]>["metadata"]>[number]>
export function isUntangibleGroupItem(metadata: any) {
  return (
    metadata &&
    metadata.__typename === "ComponentMetadataGroup" &&
    (metadata.subtype?.data?.attributes?.slug === "variant-set" ||
      metadata.subtype?.data?.attributes?.slug === "relation-set")
  );
}

export function sortBy(
  orderByType: number,
  items: Immutable<Items>,
  currencies: AppStaticProps["currencies"]
): Immutable<Items> {
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
