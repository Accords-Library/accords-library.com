/*
export const queryGraphQL = async (query: string) => {
  const res = await fetch(
    process.env.URL_GRAPHQL +
      "?access_token=" +
      process.env.ACCESS_TOKEN +
      "&query=" +
      query
  );
  return (await res.json()).data;
};
*/

export const queryGraphQL = async (query: String) => {
  const res = await fetch(process.env.URL_GRAPHQL, {
    method: "POST",
    body: JSON.stringify({
      query: query,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
  });
  return (await res.json()).data;
};


export const queryGraphQLSystem = async (query: string) => {
  const res = await fetch(
    process.env.URL_GRAPHQL_SYSTEM +
      "?access_token=" +
      process.env.ACCESS_TOKEN +
      "&query=" +
      query
  );
  return (await res.json()).data;
};

export type AssetImage = {
  id: string;
  title: string;
  width: number;
  height: number;
};

export function getAssetURL(id: string): string {
  return "https://cms.accords-library.com/assets/" + id;
}