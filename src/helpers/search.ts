/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/named
import { MatchesPosition, MeiliSearch, SearchParams, SearchResponse } from "meilisearch";
import { isDefined } from "./asserts";
import { MeiliDocumentsType } from "shared/meilisearch-graphql-typings/meiliTypes";

const meili = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_URL_MEILISEARCH ?? "",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_KEY,
});

interface CustomSearchParams
  extends Omit<
    SearchParams,
    "cropMarker" | "highlightPostTag" | "highlightPreTag" | "q" | "showMatchesPosition"
  > {}

type CustomHit<T = Record<string, any>> = T & {
  _formatted: Partial<T>;
  _matchesPosition: MatchesPosition<T>;
};

type CustomHits<T = Record<string, any>> = CustomHit<T>[];

export interface CustomSearchResponse<T> extends Omit<SearchResponse<T>, "hits"> {
  hits: CustomHits<T>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
