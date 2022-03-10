import { GetStaticProps } from "next";
import SubPanel from "components/Panels/SubPanel";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import {
  GetCurrenciesQuery,
  GetLibraryItemsPreviewQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { getLibraryItemsPreview } from "graphql/operations";
import PanelHeader from "components/PanelComponents/PanelHeader";
import AppLayout from "components/AppLayout";
import LibraryItemsPreview from "components/Library/LibraryItemsPreview";
import Select from "components/Select";
import { useEffect, useState } from "react";
import { convertPrice, prettyDate, prettyinlineTitle } from "queries/helpers";
import Switch from "components/Switch";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface LibraryProps extends AppStaticProps {
  items: GetLibraryItemsPreviewQuery["libraryItems"]["data"];
}

type GroupLibraryItems = Map<
  string,
  GetLibraryItemsPreviewQuery["libraryItems"]["data"]
>;

export default function Library(props: LibraryProps): JSX.Element {
  const { langui, items, currencies } = props;

  const [showSubitems, setShowSubitems] = useState<boolean>(false);
  const [showPrimaryItems, setShowPrimaryItems] = useState<boolean>(true);
  const [showSecondaryItems, setShowSecondaryItems] = useState<boolean>(false);
  const [sortingMethod, setSortingMethod] = useState<number>(0);
  const [groupingMethod, setGroupingMethod] = useState<number>(-1);

  const [filteredItems, setFilteredItems] = useState<LibraryProps["items"]>(
    filterItems(showSubitems, showPrimaryItems, showSecondaryItems, items)
  );

  const [sortedItems, setSortedItem] = useState<LibraryProps["items"]>(
    sortBy(groupingMethod, filteredItems, currencies)
  );

  const [groups, setGroups] = useState<GroupLibraryItems>(
    getGroups(langui, groupingMethod, sortedItems)
  );

  useEffect(() => {
    setFilteredItems(
      filterItems(showSubitems, showPrimaryItems, showSecondaryItems, items)
    );
  }, [showSubitems, items, showPrimaryItems, showSecondaryItems]);

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
          options={[langui.category, langui.type, langui.release_year]}
          state={groupingMethod}
          setState={setGroupingMethod}
          allowEmpty
        />
      </div>

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.order_by}:</p>
        <Select
          className="w-full"
          options={[langui.name, langui.price, langui.release_date]}
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
                  <LibraryItemsPreview
                    key={item.id}
                    item={item.attributes}
                    currencies={props.currencies}
                  />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const props: LibraryProps = {
    ...(await getAppStaticProps(context)),
    items: (
      await getLibraryItemsPreview({
        language_code: context.locale || "en",
      })
    ).libraryItems.data,
  };
  return {
    props: props,
  };
};

function getGroups(
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"],
  groupByType: number,
  items: LibraryProps["items"]
): GroupLibraryItems {
  switch (groupByType) {
    case 0:
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
      typeGroup.set("No category", []);

      items.map((item) => {
        if (item.attributes.categories.data.length === 0) {
          typeGroup.get("No category")?.push(item);
        } else {
          item.attributes.categories.data.map((category) => {
            typeGroup.get(category.attributes.name)?.push(item);
          });
        }
      });

      return typeGroup;

    case 1:
      const groupType: GroupLibraryItems = new Map();
      groupType.set(langui.audio, []);
      groupType.set(langui.game, []);
      groupType.set(langui.textual, []);
      groupType.set(langui.video, []);
      groupType.set(langui.other, []);
      groupType.set(langui.group, []);
      groupType.set(langui.no_type, []);
      items.map((item) => {
        if (item.attributes.metadata.length > 0) {
          switch (item.attributes.metadata[0].__typename) {
            case "ComponentMetadataAudio":
              groupType.get(langui.audio)?.push(item);
              break;
            case "ComponentMetadataGame":
              groupType.get(langui.game)?.push(item);
              break;
            case "ComponentMetadataBooks":
              groupType.get(langui.textual)?.push(item);
              break;
            case "ComponentMetadataVideo":
              groupType.get(langui.video)?.push(item);
              break;
            case "ComponentMetadataOther":
              groupType.get(langui.other)?.push(item);
              break;
            case "ComponentMetadataGroup":
              switch (
                item.attributes.metadata[0].subitems_type.data.attributes.slug
              ) {
                case "audio":
                  groupType.get(langui.audio)?.push(item);
                  break;
                case "video":
                  groupType.get(langui.video)?.push(item);
                  break;
                case "game":
                  groupType.get(langui.game)?.push(item);
                  break;
                case "textual":
                  groupType.get(langui.textual)?.push(item);
                  break;
                case "mixed":
                  groupType.get(langui.group)?.push(item);
                  break;
              }
              break;
          }
        } else {
          groupType.get(langui.no_type)?.push(item);
        }
      });
      return groupType;

    case 2:
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
      groupYear.set(langui.no_year, []);
      items.map((item) => {
        if (item.attributes.release_date) {
          groupYear
            .get(item.attributes.release_date.year.toString())
            ?.push(item);
        } else {
          groupYear.get(langui.no_year)?.push(item);
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
  showPrimaryItems: boolean,
  showSecondaryItems: boolean,
  items: LibraryProps["items"]
): LibraryProps["items"] {
  return [...items].filter((item) => {
    if (!showSubitems && !item.attributes.root_item) return false;
    if (
      showSubitems &&
      item.attributes.metadata.length > 0 &&
      item.attributes.metadata[0].__typename === "ComponentMetadataGroup" &&
      (item.attributes.metadata[0].subtype.data.attributes.slug ===
        "variant-set" ||
        item.attributes.metadata[0].subtype.data.attributes.slug ===
          "relation-set")
    )
      return false;
    if (item.attributes.primary && !showPrimaryItems) return false;
    if (!item.attributes.primary && !showSecondaryItems) return false;
    return true;
  });
}

function sortBy(
  orderByType: number,
  items: LibraryProps["items"],
  currencies: GetCurrenciesQuery["currencies"]["data"]
): LibraryProps["items"] {
  switch (orderByType) {
    case 0:
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
    case 1:
      return [...items].sort((a, b) => {
        const priceA = a.attributes.price
          ? convertPrice(a.attributes.price, currencies[0])
          : 99999;
        const priceB = b.attributes.price
          ? convertPrice(b.attributes.price, currencies[0])
          : 99999;
        return priceA - priceB;
      });
    case 2:
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
    default:
      return items;
  }
}
