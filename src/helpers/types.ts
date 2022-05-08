import { GetPostQuery } from "graphql/generated";

export type Post = Exclude<
  Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["attributes"],
  null | undefined
>;
