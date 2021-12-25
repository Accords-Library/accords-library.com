import { queryGraphQL } from "queries/helpers";

export type ChronologyItem = {
  id: string;
  attributes: ChronologyItemAttributes;
};

export type ChronologyItemAttributes = {
  year: number;
  month: number;
  day: number;
  displayed_date: string;
  events: ChronologyItemsEvent[];
}

export type ChronologyItemsEvent = {
  id: string;
  source: Source
  translations: ChronologyItemsEventTranslation[];
};

export type ChronologyItemsEventTranslation = {
  title: string;
  description: string;
  note: string;
  status: string;
}

export type Source = {
  data: {
    attributes: {
      name: string;
    }
  }
}

export async function getChronologyItems(
  language_code: String | undefined
): Promise<ChronologyItem[]> {
  return (
    await queryGraphQL(
      `
      {
        chronologyItems (pagination: {limit: -1}, sort: ["year:asc", "month:asc", "day:asc"]) {
          data {
            id
            attributes {
              year
              month
              day
              displayed_date
              events {
                id
                source {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                translations(filters: { language: { code: { eq: "` + language_code + `" } } }) {
                  title
                  description
                  note
                  status
                }
              }
            }
          }
        }
      }
      `
    )
  ).chronologyItems.data;
}

export type ChronologyEra = {
  id: string;
  attributes: ChronologyEraAttributes;
};

export type ChronologyEraAttributes = {
  slug: string;
  starting_year: number;
  ending_year: number;
  title: ChronologyEraTranslation[];
}

export type ChronologyEraTranslation = {
  title: string;
};

export async function getChronologyEras(
  language_code: String | undefined
): Promise<ChronologyEra[]> {
  return (
    await queryGraphQL(
      `
      {
        chronologyEras {
          data {
            id
            attributes {
              slug
              starting_year
              ending_year
              title (filters: {language: {code: {eq: "` + language_code + `"}}}){
                title
              }
            }
          }
        }
      }
      `
    )
  ).chronologyEras.data;
}
