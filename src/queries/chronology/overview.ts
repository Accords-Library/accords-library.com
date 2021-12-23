import { queryGraphQL } from "queries/helpers";

export type ChronologyItem = {
  id: string;
  year: number;
  month: number;
  day: number;
  translations: ChronologyItemsTranslation[];
};

export type ChronologyItemsTranslation = {
  title: string;
};

export async function getChronologyItems(
  languages_code: String | undefined
): Promise<ChronologyItem[]> {
  return (
    await queryGraphQL(
      `
          {
              chronology_items {
                  id
                  year
                  month
                  day
                  translations(filter: { languages_code: { code: { _eq: "` + languages_code + `" } } }) {
                      title
                  }
              }
          }
          `
    )
  ).chronology_items;
}

export type ChronologyEra = {
  id: string;
  attributes: ChronologyEraAttributes;
};

export type ChronologyEraAttributes = {
  starting_year: number;
  ending_year: number;
  slug: string;
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
            attributes {
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
