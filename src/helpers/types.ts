import { GetContentTextQuery, GetPostQuery } from "graphql/generated";
import React from "react";

type Post = Exclude<
  Exclude<
    GetPostQuery["posts"],
    null | undefined
  >["data"][number]["attributes"],
  null | undefined
>;

export interface PostWithTranslations extends Omit<Post, "translations"> {
  translations: Exclude<Post["translations"], null | undefined>;
}

type Content = Exclude<
  Exclude<
    GetContentTextQuery["contents"],
    null | undefined
  >["data"][number]["attributes"],
  null | undefined
>;

export interface ContentWithTranslations extends Omit<Content, "translations"> {
  translations: Exclude<Content["translations"], null | undefined>;
}

type ImmutableBlackList<T> = JSX.Element | React.ReactNode | Function;

export type Immutable<T> = {
  readonly [K in keyof T]: T[K] extends ImmutableBlackList<T>
    ? T[K]
    : Immutable<T[K]>;
};
