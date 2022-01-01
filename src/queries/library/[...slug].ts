import {
  BasicDate,
  BasicPrice,
  BasicSize,
  queryGraphQL,
  UploadImage,
} from "queries/helpers";

export type LibraryItemSkeleton = {
  attributes: {
    slug: string;
    subitems: {
      data: LibraryItemSkeleton[];
    };
  };
};

export async function getLibraryItemsSkeleton(): Promise<
  LibraryItemSkeleton[]
> {
  return (
    await queryGraphQL(
      `
      {
        libraryItems(filters: { root_item: { eq: true } }) {
          data {
            attributes {
              slug
              subitems {
                data {
                  attributes {
                    slug
                    subitems {
                      data {
                        attributes {
                          slug
                          subitems {
                            data {
                              attributes {
                                slug
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    )
  ).libraryItems.data;
}

export function getBreadcrumbs(
  parentBreadcrumb: string[],
  data: LibraryItemSkeleton
) {
  const result: string[][] = [];
  const itemBreadcrumb = [...parentBreadcrumb, data.attributes.slug];
  result.push(itemBreadcrumb);
  data.attributes.subitems.data.map((subitem) => {
    result.push(...getBreadcrumbs(itemBreadcrumb, subitem));
  });
  return result;
}

export type LibraryItem = {
  id: string;
  attributes: {
    title: string;
    subtitle: string;
    slug: string;
    thumbnail: UploadImage;
    release_date: BasicDate;
    price: BasicPrice;
    size: BasicSize;
    description: {
      description: string;
    };
    subitems: {
      data: LibrarySubItem[];
    };
  };
};

export type LibrarySubItem = {
  id: string;
  attributes: {
    title: string;
    subtitle: string;
    slug: string;
    thumbnail: UploadImage;
  };
};

export async function getLibraryItem(
  slug: string[],
  language_code: string | undefined
): Promise<LibraryItem> {
  return (
    await queryGraphQL(
      `
      {
        libraryItems(
          filters: {slug: {eq: "${slug.pop()}"}}
        ) {
          data {
            id
            attributes {
              title
              subtitle
              slug
              thumbnail {
                data {
                  attributes {
                    name
                    alternativeText
                    caption
                    width
                    height
                    url
                  }
                }
              }
              release_date {
                year
                month
                day
              }
              price {
                amount
                currency {
                  data {
                    attributes {
                      symbol
                      code
                    }
                  }
                }
              }
              size {
                width
                height
                thickness
              }
              descriptions(filters: { language: { code: { eq: "${language_code}" } } }) {
                description
              }
              subitems {
                data {
                  id
                  attributes {
                    slug
                    title
                    subtitle
                    thumbnail {
                      data {
                        attributes {
                          name
                          alternativeText
                          caption
                          width
                          height
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `
    )
  ).libraryItems.data[0];
}
