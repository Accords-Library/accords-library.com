import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import {
  GetLibraryItemsPreviewQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  getLibraryItemsPreview,
  getWebsiteInterface,
} from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import AppLayout from "components/AppLayout";
import LibraryItemsPreview from "components/Library/LibraryItemsPreview";
import Select from "components/Select";
import { useEffect, useState } from "react";
import { prettyDate, prettyinlineTitle } from "queries/helpers";
import Switch from "components/Switch";

type LibraryProps = {
  libraryItems: GetLibraryItemsPreviewQuery;
  langui: GetWebsiteInterfaceQuery;
};

type GroupLibraryItems = Map<
  string,
  GetLibraryItemsPreviewQuery["libraryItems"]["data"]
>;

export default function Library(props: LibraryProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;

  const [showSubitems, setShowSubitems] = useState<boolean>(false);
  const [sortingMethod, setSortingMethod] = useState<string>("title");
  const [groupingMethod, setGroupingMethod] = useState<string>("");

  const [filteredItems, setFilteredItems] = useState<
    LibraryProps["libraryItems"]["libraryItems"]["data"]
  >(filterItems(showSubitems, props.libraryItems.libraryItems.data));

  const [sortedItems, setSortedItem] = useState<
    LibraryProps["libraryItems"]["libraryItems"]["data"]
  >(sortBy(groupingMethod, filteredItems));

  const [groups, setGroups] = useState<GroupLibraryItems>(
    getGroups("", sortedItems)
  );

  useEffect(() => {
    setFilteredItems(
      filterItems(showSubitems, props.libraryItems.libraryItems.data)
    );
  }, [showSubitems, props.libraryItems.libraryItems.data]);

  useEffect(() => {
    setSortedItem(sortBy(sortingMethod, filteredItems));
  }, [filteredItems, sortingMethod]);

  useEffect(() => {
    setGroups(getGroups(groupingMethod, sortedItems));
  }, [groupingMethod, sortedItems]);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="library_books"
        title={langui.main_library}
        description={langui.library_description}
      />

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">Group by:</p>
        <Select
          className="w-full"
          options={[
            { name: "category", label: "Category" },
            { name: "type", label: "Type" },
            { name: "releaseYear", label: "Release year" },
          ]}
          onChange={setGroupingMethod}
          allowEmpty
        />
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">Order by:</p>
        <Select
          className="w-full"
          options={[
            { name: "title", label: "Title" },
            { name: "releaseDate", label: "Release date" },
            { name: "price", label: "Price" },
          ]}
          onChange={setSortingMethod}
        />
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">Show subitems:</p>
        <Switch state={showSubitems} setState={setShowSubitems} />
      </div>
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      {[...groups].map(([name, items]) => (
        <>
          {items.length > 0 && (
            <>
              <h2 className="text-2xl pb-2 pt-10 first-of-type:pt-0">{name}</h2>
              <div
                key={name}
                className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(13rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0"
              >
                {items.map((item) => (
                  <LibraryItemsPreview key={item.id} item={item.attributes} />
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
      navTitle={langui.main_library}
      langui={langui}
      subPanel={subPanel}
      contentPanel={contentPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: LibraryProps = {
      libraryItems: await getLibraryItemsPreview({
        language_code: context.locale,
      }),
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  } else {
    return { props: {} };
  }
};

function getGroups(
  groupByType: string,
  items: LibraryProps["libraryItems"]["libraryItems"]["data"]
): GroupLibraryItems {
  switch (groupByType) {
    case "category":
      return new Map();

    case "type":
      const groupType: GroupLibraryItems = new Map();
      groupType.set("Audio", []);
      groupType.set("Game", []);
      groupType.set("Textual", []);
      groupType.set("Video", []);
      groupType.set("Other", []);
      groupType.set("No type", []);
      items.map((item) => {
        if (item.attributes.metadata.length > 0) {
          switch (item.attributes.metadata[0].__typename) {
            case "ComponentMetadataAudio":
              groupType.get("Audio")?.push(item);
              break;
            case "ComponentMetadataGame":
              groupType.get("Game")?.push(item);
              break;
            case "ComponentMetadataBooks":
              groupType.get("Textual")?.push(item);
              break;
            case "ComponentMetadataVideo":
              groupType.get("Video")?.push(item);
              break;
            case "ComponentMetadataOther":
              switch (
                item.attributes.metadata[0].subtype.data.attributes.slug
              ) {
                case "audio-case":
                  groupType.get("Audio")?.push(item);
                  break;

                case "video-case":
                  groupType.get("Video")?.push(item);
                  break;

                case "game-case":
                  groupType.get("Game")?.push(item);
                  break;

                default:
                  groupType.get("Other")?.push(item);
                  break;
              }

              break;
          }
        } else {
          groupType.get("No type")?.push(item);
        }
      });
      return groupType;

    case "releaseYear":
      const years: number[] = [];
      items.map((item) => {
        if (item.attributes.release_date) {
          if (!years.includes(item.attributes.release_date.year))
            years.push(item.attributes.release_date.year);
        }
      });
      const groupYear: GroupLibraryItems = new Map();
      years.sort();
      years.map((year) => {
        groupYear.set(year.toString(), []);
      });
      groupYear.set("No year", []);
      items.map((item) => {
        if (item.attributes.release_date) {
          groupYear
            .get(item.attributes.release_date.year.toString())
            ?.push(item);
        } else {
          groupYear.get("No year")?.push(item);
        }
      });

      return groupYear;

    default:
      const groupDefault: GroupLibraryItems = new Map();
      groupDefault.set("", items);
      return groupDefault;
  }
}

function filterItems(
  showSubitems: boolean,
  items: LibraryProps["libraryItems"]["libraryItems"]["data"]
): LibraryProps["libraryItems"]["libraryItems"]["data"] {
  return [...items].filter((item) => {
    let result = true;
    if (!showSubitems && !item.attributes.root_item) result = false;
    if (
      item.attributes.metadata.length > 0 &&
      item.attributes.metadata[0].__typename === "ComponentMetadataOther" &&
      (item.attributes.metadata[0].subtype.data.attributes.slug ===
        "variant-set" ||
        item.attributes.metadata[0].subtype.data.attributes.slug ===
          "relation-set")
    )
      result = false;
    return result;
  });
}

function sortBy(
  orderByType: string,
  items: LibraryProps["libraryItems"]["libraryItems"]["data"]
): LibraryProps["libraryItems"]["libraryItems"]["data"] {
  switch (orderByType) {
    case "title":
      return [...items].sort((a, b) => {
        const titleA = prettyinlineTitle(
          "",
          a.attributes.title,
          a.attributes.subtitle
        );
        const titleB = prettyinlineTitle(
          "",
          b.attributes.title,
          b.attributes.subtitle
        );
        return titleA.localeCompare(titleB);
      });
    case "price":
      return [...items].sort((a, b) => {
        const priceA = a.attributes.price ? a.attributes.price.amount : 99999;
        const priceB = b.attributes.price ? b.attributes.price.amount : 99999;
        return priceA - priceB;
      });
    case "releaseDate":
      return [...items].sort((a, b) => {
        const dateA =
          a.attributes.release_date !== null
            ? prettyDate(a.attributes.release_date)
            : "9999";
        const dateB =
          b.attributes.release_date !== null
            ? prettyDate(b.attributes.release_date)
            : "9999";
        return dateA.localeCompare(dateB);
      });
  }
  return items;
}
