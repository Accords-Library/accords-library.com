import { AppLayoutState } from "contexts/AppLayoutContext";
import { GetLibraryItemsPreviewQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettyinlineTitle, prettyDate } from "./formatters";
import { convertPrice } from "./numbers";
import { isDefined, mapRemoveEmptyValues } from "./others";
import { LibraryItemUserStatus } from "./types";
import LibraryPage from "../pages/library/index";

type Items = Parameters<typeof LibraryPage>[0]["items"];
type GroupLibraryItems = Map<string, Items>;

export function getGroups(
  langui: AppStaticProps["langui"],
  groupByType: number,
  items: Items
): GroupLibraryItems {
  const groups: GroupLibraryItems = new Map();

  switch (groupByType) {
    case 0: {
      const noCategory = langui.no_category ?? "No category";
      groups.set("Drakengard 1", []);
      groups.set("Drakengard 1.3", []);
      groups.set("Drakengard 2", []);
      groups.set("Drakengard 3", []);
      groups.set("Drakengard 4", []);
      groups.set("NieR Gestalt", []);
      groups.set("NieR Replicant", []);
      groups.set("NieR Replicant ver.1.22474487139...", []);
      groups.set("NieR:Automata", []);
      groups.set("NieR Re[in]carnation", []);
      groups.set("SINoALICE", []);
      groups.set("Voice of Cards", []);
      groups.set("Final Fantasy XIV", []);
      groups.set("Thou Shalt Not Die", []);
      groups.set("Bakuken", []);
      groups.set("YoRHa", []);
      groups.set("YoRHa Boys", []);
      groups.set(noCategory, []);

      items.map((item) => {
        if (item.attributes?.categories?.data.length === 0) {
          groups.get(noCategory)?.push(item);
        } else {
          item.attributes?.categories?.data.map((category) => {
            groups.get(category.attributes?.name ?? noCategory)?.push(item);
          });
        }
      });
      break;
    }

    case 1: {
      groups.set(langui.audio ?? "Audio", []);
      groups.set(langui.game ?? "Game", []);
      groups.set(langui.textual ?? "Textual", []);
      groups.set(langui.video ?? "Video", []);
      groups.set(langui.other ?? "Other", []);
      groups.set(langui.group ?? "Group", []);
      groups.set(langui.no_type ?? "No type", []);
      items.map((item) => {
        if (item.attributes?.metadata && item.attributes.metadata.length > 0) {
          switch (item.attributes.metadata[0]?.__typename) {
            case "ComponentMetadataAudio":
              groups.get(langui.audio ?? "Audio")?.push(item);
              break;
            case "ComponentMetadataGame":
              groups.get(langui.game ?? "Game")?.push(item);
              break;
            case "ComponentMetadataBooks":
              groups.get(langui.textual ?? "Textual")?.push(item);
              break;
            case "ComponentMetadataVideo":
              groups.get(langui.video ?? "Video")?.push(item);
              break;
            case "ComponentMetadataOther":
              groups.get(langui.other ?? "Other")?.push(item);
              break;
            case "ComponentMetadataGroup":
              switch (
                item.attributes.metadata[0]?.subitems_type?.data?.attributes
                  ?.slug
              ) {
                case "audio":
                  groups.get(langui.audio ?? "Audio")?.push(item);
                  break;
                case "video":
                  groups.get(langui.video ?? "Video")?.push(item);
                  break;
                case "game":
                  groups.get(langui.game ?? "Game")?.push(item);
                  break;
                case "textual":
                  groups.get(langui.textual ?? "Textual")?.push(item);
                  break;
                case "mixed":
                  groups.get(langui.group ?? "Group")?.push(item);
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
          groups.get(langui.no_type ?? "No type")?.push(item);
        }
      });
      break;
    }

    case 2: {
      const years: number[] = [];
      items.map((item) => {
        if (item.attributes?.release_date?.year) {
          if (!years.includes(item.attributes.release_date.year))
            years.push(item.attributes.release_date.year);
        }
      });

      years.sort((a, b) => a - b);
      years.map((year) => {
        groups.set(year.toString(), []);
      });
      groups.set(langui.no_year ?? "No year", []);
      items.map((item) => {
        if (item.attributes?.release_date?.year) {
          groups.get(item.attributes.release_date.year.toString())?.push(item);
        } else {
          groups.get(langui.no_year ?? "No year")?.push(item);
        }
      });
      break;
    }

    default: {
      groups.set("", items);
      break;
    }
  }
  return mapRemoveEmptyValues(groups);
}

export function filterItems(
  appLayout: AppLayoutState,
  items: Items,
  searchName: string,
  showSubitems: boolean,
  showPrimaryItems: boolean,
  showSecondaryItems: boolean,
  filterUserStatus: LibraryItemUserStatus | undefined
): Items {
  return items.filter((item) => {
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
  items: Items,
  currencies: AppStaticProps["currencies"]
) {
  switch (orderByType) {
    case 0:
      return items.sort((a, b) => {
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
      return items.sort((a, b) => {
        const priceA = a.attributes?.price
          ? convertPrice(a.attributes.price, currencies[0])
          : 99999;
        const priceB = b.attributes?.price
          ? convertPrice(b.attributes.price, currencies[0])
          : 99999;
        return priceA - priceB;
      });
    case 2:
      return items.sort((a, b) => {
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
