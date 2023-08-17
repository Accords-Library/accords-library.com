/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { MeiliSearch } from "meilisearch";
import type {
  SearchParams,
  MatchesPosition,
  SearchResponse,
  MultiSearchQuery,
  MultiSearchResponse,
  MultiSearchResult,
} from "meilisearch";
import { filterDefined, isDefined } from "./asserts";
import { MeiliDocumentsType } from "shared/meilisearch-graphql-typings/meiliTypes";

const meili = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_URL_MEILISEARCH ?? "",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_KEY,
});

interface CustomSearchParams
  extends Omit<
    SearchParams,
    | "cropLength"
    | "cropMarker"
    | "cropMarker"
    | "highlightPostTag"
    | "highlightPreTag"
    | "q"
    | "showMatchesPosition"
  > {}

type CustomHit<T = Record<string, unknown>> = T & {
  _formatted: Partial<T>;
  _matchesPosition: MatchesPosition<T>;
};

type CustomHits<T = Record<string, unknown>> = CustomHit<T>[];

export interface CustomSearchResponse<T> extends Omit<SearchResponse<T>, "hits"> {
  hits: CustomHits<T>;
}

export const meiliMultiSearch = async (queries: MultiSearchQuery[]): Promise<MultiSearchResponse> =>
  await meili.multiSearch({
    queries: queries.map((query) => ({
      attributesToHighlight: ["*"],
      ...query,
      highlightPreTag: "<mark>",
      highlightPostTag: "</mark>",
      showMatchesPosition: true,
      cropLength: 20,
      cropMarker: "...",
    })),
  });

export const filterHitsWithHighlight = <T extends MeiliDocumentsType["documents"]>(
  searchResult: CustomSearchResponse<T> | MultiSearchResult<Record<string, unknown>>,
  keyToFilter?: keyof T
): CustomSearchResponse<T> => {
  const result = searchResult as unknown as CustomSearchResponse<T>;
  if (isDefined(keyToFilter)) {
    result.hits = result.hits.map((item) => {
      if (
        Object.keys(item._matchesPosition).some((match) => match.startsWith(keyToFilter as string))
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item._formatted[keyToFilter] = filterDefined(item._formatted[keyToFilter]).filter(
          (translation) => JSON.stringify(translation).includes("</mark>")
        );
      }
      return item;
    });
  }
  return result;
};

export const meiliSearch = async <I extends MeiliDocumentsType["index"]>(
  indexName: I,
  query: string,
  options: CustomSearchParams
) => {
  const index = meili.index(indexName);
  return (await index.search<Extract<MeiliDocumentsType, { index: I }>["documents"]>(query, {
    ...options,
    attributesToHighlight: options.attributesToHighlight ?? ["*"],
    highlightPreTag: "<mark>",
    highlightPostTag: "</mark>",
    showMatchesPosition: true,
    cropLength: 20,
    cropMarker: "...",
  })) as unknown as CustomSearchResponse<Extract<MeiliDocumentsType, { index: I }>["documents"]>;
};

export const containsHighlight = (text: string | null | undefined): boolean =>
  isDefined(text) && text.includes("</mark>");
