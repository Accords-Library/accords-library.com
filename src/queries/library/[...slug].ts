import { queryGraphQL, AssetImage } from "queries/helpers";

export type LibraryItem = {
  title: string;
  subtitle: string;
  slug: string;
  thumbnail: AssetImage;
  subitems: Subitem[];
};

export type Subitem = {
  subitem_id: LibrarySubitem;
};

export type LibrarySubitem = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  thumbnail: AssetImage;
};

export async function getLibraryItem(slug: string[]) {
  return (
    await queryGraphQL(
      `
      {
        compendium_items(filter: {_and: [` + getFilterForItem(slug) + `]}) {
          title
          subtitle
          slug
          thumbnail {
            id
            title
            width
            height
          }
          subitems {
            subitem_id {
              id
              title
              subtitle
              slug
              thumbnail {
                id
                title
                width
                height
              }
            }
          }
        }
      }
      `
    )
  ).compendium_items[0];
}

export async function getRecursiveSlugs() {
  const yetToExploreSlugs = level0Filtering(
    (
      await queryGraphQL(
        `
    {
      compendium_items(
        filter: { _and: [{ not_sold_separately: { _eq: false } }] }
      ) {
        subitem_of {
          item_id {
            virtual_set
          }
        }
        slug
      }
    }    
    `
      )
    ).compendium_items
  );

  const result: string[][] = [];
  while (yetToExploreSlugs.length > 0) {
    const slug = yetToExploreSlugs.pop();
    if (slug !== undefined) {
      const subitems = levelnFiltering((await queryGraphQL(
          `
          {
            compendium_items(filter: {_and: [` + getFilterForSubitemsOf(slug) + `]}) {
              slug
            }
          }
          `
          )
        ).compendium_items
      );
      result.push(slug);
      subitems.map((subitemSlug) => {
        const newSlug = [...slug];
        newSlug.push(subitemSlug);
        yetToExploreSlugs.push(newSlug);
      });
    }
  }
  return result;
}

export function getFilterForSubitemsOf(slug: string[]) {
  let filter = "";
  slug.map((segment, index) => {
    const depth = slug.length - index;
    filter += "{ subitem_of: { item_id: ".repeat(depth);
    filter += '{ slug: { _eq: "' + segment + '" } } ';
    filter += "} } ".repeat(depth);
    filter += ",";
  });
  return filter;
}

export function getFilterForItem(slug: string[]) {
  let filter = "";
  slug.map((segment, index) => {
    const depth = slug.length - index - 1;
    filter += "{ subitem_of: { item_id: ".repeat(depth);
    filter += '{ slug: { _eq: "' + segment + '" } } ';
    filter += "} } ".repeat(depth);
    filter += ",";
  });
  return filter;
}


function level0Filtering(data: SlugLvl0[]): string[][] {
  // Remove element if their parent item is a virtual_set
  let result: string[][] = [];
  data.map((item: SlugLvl0) => {
    if (item.subitem_of.length > 0) {
      if (item.subitem_of[0].item_id.virtual_set === false) {
        result.push([item.slug]);
      }
    } else {
      result.push([item.slug]);
    }
  });
  return result;
}

function levelnFiltering(data: SlugLvln[]): string[] {
  let result: string[] = [];
  data.map((item: SlugLvln) => {
    result.push(item.slug);
  });
  return result;
}

type SlugLvl0 = {
  subitem_of: SlugLvl0Subitem_of[];
  slug: string;
};

type SlugLvl0Subitem_of = {
  item_id: SlugLvl0Subitem;
};

type SlugLvl0Subitem = {
  virtual_set: boolean;
};

type SlugLvln = {
  slug: string;
};
