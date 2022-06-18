import {
  GetContentTextQuery,
  GetPostQuery,
  GetWikiPageQuery,
} from "graphql/generated";
import React from "react";

type Post = NonNullable<
  NonNullable<GetPostQuery["posts"]>["data"][number]["attributes"]
>;

export interface PostWithTranslations extends Omit<Post, "translations"> {
  translations: NonNullable<Post["translations"]>;
}

export type Content = NonNullable<
  NonNullable<GetContentTextQuery["contents"]>["data"][number]["attributes"]
>;

export interface ContentWithTranslations extends Omit<Content, "translations"> {
  translations: NonNullable<Content["translations"]>;
}

type WikiPage = NonNullable<
  NonNullable<GetWikiPageQuery["wikiPages"]>["data"][number]["attributes"]
>;

export interface WikiPageWithTranslations
  extends Omit<WikiPage, "translations"> {
  translations: NonNullable<WikiPage["translations"]>;
}

export type RequiredNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

export type SelectiveRequiredNonNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

export enum LibraryItemUserStatus {
  None = 0,
  Want = 1,
  Have = 2,
}
