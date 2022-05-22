import { UploadImageFragment } from "graphql/generated";
import { MeiliSearch, SearchResponse } from "meilisearch";
import { prettySlug } from "./formatters";

export enum Indexes {
  ChronologyEra = "chronology-era",
  ChronologyItem = "chronology-item",
  Content = "content",
  GlossaryItem = "glossary-item",
  LibraryItem = "library-item",
  MerchItem = "merch-item",
  Post = "post",
  Video = "video",
  VideoChannel = "video-channel",
  WeaponStory = "weapon-story",
}

export function getClient() {
  return new MeiliSearch({
    host: process.env.NEXT_PUBLIC_URL_SEARCH ?? "",
    apiKey: "",
  });
}

export async function getIndexes(client: MeiliSearch) {
  return await client.getIndexes();
}

export async function search(
  client: MeiliSearch,
  indexName: Indexes,
  query: string
) {
  const index = await client.getIndex(indexName);
  const results = await index.search(query);
  return processSearchResults(results, indexName);
}

export type SearchResult = {
  hits: {
    id: string;
    href: string;
    title: string;
    thumbnail?: UploadImageFragment;
  }[];
  indexName: string;
};

export function processSearchResults(
  result: SearchResponse<Record<string, any>>,
  indexName: Indexes
): SearchResult {
  return {
    hits: result.hits.map((hit) => {
      switch (indexName) {
        case Indexes.Post: {
          return {
            id: hit.id,
            title:
              hit.translations.length > 0
                ? hit.translations[0].title
                : prettySlug(hit.slug),
            href: `/news/${hit.slug}`,
            thumbnail: hit.thumbnail,
          };
        }
        default: {
          return { id: hit.id, title: prettySlug(hit.slug), href: "error" };
        }
      }
    }),
    indexName: indexName,
  };
}
