import { GraphQLClient } from "graphql-request";
import { getSdk } from "graphql/generated";

export const getReadySdk = (): ReturnType<typeof getSdk> => {
  const client = new GraphQLClient(process.env.URL_GRAPHQL ?? "", {
    headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
  });
  return getSdk(client);
};
