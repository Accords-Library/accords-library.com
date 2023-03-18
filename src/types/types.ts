import {
  GetChronicleQuery,
  GetContentTextQuery,
  GetPostQuery,
  GetReinCostumesQuery,
  GetReinEmblemsQuery,
  GetWeaponQuery,
  GetWikiPageQuery,
} from "graphql/generated";

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type Post = NonNullable<NonNullable<GetPostQuery["posts"]>["data"][number]["attributes"]>;

export interface PostWithTranslations extends Omit<Post, "translations"> {
  translations: NonNullable<Post["translations"]>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type Content = NonNullable<
  NonNullable<GetContentTextQuery["contents"]>["data"][number]["attributes"]
>;

export interface ContentWithTranslations extends Omit<Content, "translations"> {
  translations: NonNullable<Content["translations"]>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type WikiPage = NonNullable<
  NonNullable<GetWikiPageQuery["wikiPages"]>["data"][number]["attributes"]
>;

export interface WikiPageWithTranslations extends Omit<WikiPage, "translations"> {
  translations: NonNullable<WikiPage["translations"]>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type Chronicle = NonNullable<
  NonNullable<GetChronicleQuery["chronicles"]>["data"][number]["attributes"]
>;

export interface ChronicleWithTranslations extends Omit<Chronicle, "translations"> {
  translations: NonNullable<Chronicle["translations"]>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type Weapon = NonNullable<
  NonNullable<NonNullable<GetWeaponQuery["weaponStories"]>["data"][number]>["attributes"]
>;

type WeaponStory = NonNullable<NonNullable<Weapon["stories"]>[number]>;

export interface WeaponStoryWithTranslations extends Omit<WeaponStory, "translations"> {
  translations: NonNullable<NonNullable<WeaponStory>["translations"]>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type WeaponGroupPreview = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<NonNullable<Weapon["weapon_group"]>["data"]>["attributes"]>["weapons"]
    >["data"][number]["attributes"]
  >
>;

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type ReinEmblem = NonNullable<GetReinEmblemsQuery["reinEmblems"]>["data"][number];

export type ReinCostume = NonNullable<GetReinCostumesQuery["reinCostumes"]>["data"][number];

export type ReinEmblemCostume = {
  id: ReinEmblem["id"];
  attributes: NonNullable<ReinEmblem["attributes"]> & { costumes: ReinCostume[] };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export enum LibraryItemUserStatus {
  None = 0,
  Want = 1,
  Have = 2,
}
