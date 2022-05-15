import { GetContentTextQuery, GetPostQuery } from "graphql/generated";
import React from "react";

type Post = NonNullable<
  NonNullable<GetPostQuery["posts"]>["data"][number]["attributes"]
>;

export interface PostWithTranslations extends Omit<Post, "translations"> {
  translations: NonNullable<Post["translations"]>;
}

type Content = NonNullable<
  NonNullable<GetContentTextQuery["contents"]>["data"][number]["attributes"]
>;

export interface ContentWithTranslations extends Omit<Content, "translations"> {
  translations: NonNullable<Content["translations"]>;
}

type ImmutableBlackList<T> = JSX.Element | React.ReactNode | Function;

export type Immutable<T> = {
  readonly [K in keyof T]: T[K] extends ImmutableBlackList<T>
    ? T[K]
    : Immutable<T[K]>;
};
