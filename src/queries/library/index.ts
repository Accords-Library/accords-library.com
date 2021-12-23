import { queryGraphQL, AssetImage } from "queries/helpers";

export type LibraryItem = {
  id: string;
  subitem_of: Subitem_of[];
  title: string;
  subtitle: string;
  slug: string;
  thumbnail: AssetImage;
  release_date: string;
  type: "Text" | "Video" | "Games" | "Soundtrack" | "Audiobooks" | "Other";
};

export type Subitem_of = {
  item_id: LibrarySubitem;
};

export type LibrarySubitem = {
  title: string;
  subtitle: string;
  virtual_set: boolean;
};

export async function getLibraryItems() {
    return filterGetLibraryItems((await queryGraphQL(
      `
      {
        compendium_items(
          filter: { _and: [{ not_sold_separately: { _eq: false } }] }
          sort: "title"
        ) {
          id
          subitem_of {
            item_id {
              title
              subtitle
              virtual_set
            }
          }
          title
          subtitle
          slug
          thumbnail {
            id
            title
            width
            height
          }
          release_date
          type
        }
      }
      `
    )
  ).compendium_items);
}

function filterGetLibraryItems(data: LibraryItem[]): LibraryItem[] {

  // Remove element if their parent item is a virtual_set
  let result: LibraryItem[] = [];
  data.map((item: LibraryItem) => {
    if (item.subitem_of.length > 0) {
      if (item.subitem_of[0].item_id.virtual_set === false) {
        result.push(item);
      }
    } else {
      result.push(item);
    }
  });
  return result;
}