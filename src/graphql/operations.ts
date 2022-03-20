import { readFileSync } from "fs";

import {
  GetChronologyItemsQuery,
  GetChronologyItemsQueryVariables,
  GetContentLanguagesQuery,
  GetContentLanguagesQueryVariables,
  GetContentQuery,
  GetContentQueryVariables,
  GetContentsQuery,
  GetContentsQueryVariables,
  GetContentsSlugsQuery,
  GetContentsSlugsQueryVariables,
  GetContentTextQuery,
  GetContentTextQueryVariables,
  GetCurrenciesQuery,
  GetCurrenciesQueryVariables,
  GetErasQuery,
  GetErasQueryVariables,
  GetLanguagesQuery,
  GetLanguagesQueryVariables,
  GetLibraryItemQuery,
  GetLibraryItemQueryVariables,
  GetLibraryItemsPreviewQuery,
  GetLibraryItemsPreviewQueryVariables,
  GetLibraryItemsSlugsQuery,
  GetLibraryItemsSlugsQueryVariables,
  GetPostLanguagesQuery,
  GetPostLanguagesQueryVariables,
  GetPostQuery,
  GetPostQueryVariables,
  GetPostsPreviewQuery,
  GetPostsPreviewQueryVariables,
  GetPostsSlugsQuery,
  GetPostsSlugsQueryVariables,
  GetWebsiteInterfaceQuery,
  GetWebsiteInterfaceQueryVariables,
} from "graphql/operations-types";

const graphQL = async (query: string, variables?: string) => {
  const res = await fetch(`${process.env.URL_GRAPHQL}`, {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
  });
  return (await res.json()).data;
};

function getQueryFromOperations(queryName: string): string {
  const operations = readFileSync("./src/graphql/operation.graphql", "utf8");
  let startingIndex = -1;
  let endingIndex = -1;
  const lines = operations.split("\n");
  lines.map((line, index) => {
    if (startingIndex === -1) {
      if (line.startsWith(`query ${queryName}(`)) startingIndex = index;
      if (line.startsWith(`query ${queryName} {`)) startingIndex = index;
    } else if (endingIndex === -1) {
      if (line.startsWith("query")) endingIndex = index;
    }
  });
  return lines.slice(startingIndex, endingIndex).join("\n");
}

export async function getWebsiteInterface(
  variables: GetWebsiteInterfaceQueryVariables
): Promise<GetWebsiteInterfaceQuery> {
  const query = getQueryFromOperations("getWebsiteInterface");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getEras(
  variables: GetErasQueryVariables
): Promise<GetErasQuery> {
  const query = getQueryFromOperations("getEras");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getChronologyItems(
  variables: GetChronologyItemsQueryVariables
): Promise<GetChronologyItemsQuery> {
  const query = getQueryFromOperations("getChronologyItems");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLibraryItemsPreview(
  variables: GetLibraryItemsPreviewQueryVariables
): Promise<GetLibraryItemsPreviewQuery> {
  const query = getQueryFromOperations("getLibraryItemsPreview");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLibraryItemsSlugs(
  variables: GetLibraryItemsSlugsQueryVariables
): Promise<GetLibraryItemsSlugsQuery> {
  const query = getQueryFromOperations("getLibraryItemsSlugs");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLibraryItem(
  variables: GetLibraryItemQueryVariables
): Promise<GetLibraryItemQuery> {
  const query = getQueryFromOperations("getLibraryItem");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getContentsSlugs(
  variables: GetContentsSlugsQueryVariables
): Promise<GetContentsSlugsQuery> {
  const query = getQueryFromOperations("getContentsSlugs");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getContents(
  variables: GetContentsQueryVariables
): Promise<GetContentsQuery> {
  const query = getQueryFromOperations("getContents");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getContent(
  variables: GetContentQueryVariables
): Promise<GetContentQuery> {
  const query = getQueryFromOperations("getContent");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getContentText(
  variables: GetContentTextQueryVariables
): Promise<GetContentTextQuery> {
  const query = getQueryFromOperations("getContentText");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getCurrencies(
  variables: GetCurrenciesQueryVariables
): Promise<GetCurrenciesQuery> {
  const query = getQueryFromOperations("getCurrencies");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getLanguages(
  variables: GetLanguagesQueryVariables
): Promise<GetLanguagesQuery> {
  const query = getQueryFromOperations("getLanguages");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getPost(
  variables: GetPostQueryVariables
): Promise<GetPostQuery> {
  const query = getQueryFromOperations("getPost");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getPostsSlugs(
  variables: GetPostsSlugsQueryVariables
): Promise<GetPostsSlugsQuery> {
  const query = getQueryFromOperations("getPostsSlugs");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getPostsPreview(
  variables: GetPostsPreviewQueryVariables
): Promise<GetPostsPreviewQuery> {
  const query = getQueryFromOperations("getPostsPreview");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getPostLanguages(
  variables: GetPostLanguagesQueryVariables
): Promise<GetPostLanguagesQuery> {
  const query = getQueryFromOperations("getPostLanguages");
  return await graphQL(query, JSON.stringify(variables));
}

export async function getContentLanguages(
  variables: GetContentLanguagesQueryVariables
): Promise<GetContentLanguagesQuery> {
  const query = getQueryFromOperations("getContentLanguages");
  return await graphQL(query, JSON.stringify(variables));
}
