import {
  UploadImage,
  queryGraphQL,
  BasicPrice,
  BasicDate,
  BasicSize,
} from "queries/helpers";

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
  };
};

export async function getLibraryItems(
  language_code: string | undefined
): Promise<LibraryItem[]> {
  return (
    await queryGraphQL(
      `
      {
        libraryItems(
          filters: { root_item: { eq: true } }
          pagination: { limit: -1 }
          sort: ["slug:asc"]
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
            }
          }
        }
      }
      `
    )
  ).libraryItems.data;
}
