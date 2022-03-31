import { GraphQLClient } from "graphql-request";
import { getSdk } from "graphql/generated";

export function getReadySdk() {
  const client = new GraphQLClient(process.env.URL_GRAPHQL ?? "", {
    headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
  });
  return getSdk(client);
}
