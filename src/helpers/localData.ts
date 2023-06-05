import {
  LocalDataGetCurrenciesQuery,
  LocalDataGetLanguagesQuery,
  LocalDataGetRecordersQuery,
  LocalDataGetTypesTranslationsQuery,
  LocalDataGetWebsiteInterfacesQuery,
} from "graphql/generated";

export type Langui = NonNullable<
  NonNullable<LocalDataGetWebsiteInterfacesQuery["websiteInterfaces"]>["data"][number]["attributes"]
>;

export const processLangui = (
  websiteInterfaces: LocalDataGetWebsiteInterfacesQuery | undefined,
  locale: string | undefined
): Langui =>
  websiteInterfaces?.websiteInterfaces?.data.find(
    (langui) => langui.attributes?.ui_language?.data?.attributes?.code === locale
  )?.attributes ?? {};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type Currencies = NonNullable<LocalDataGetCurrenciesQuery["currencies"]>["data"];

export const processCurrencies = (
  currencies: LocalDataGetCurrenciesQuery | undefined
): Currencies => {
  if (currencies?.currencies?.data) {
    currencies.currencies.data.sort((a, b) =>
      a.attributes && b.attributes ? a.attributes.code.localeCompare(b.attributes.code) : 0
    );
  }
  return currencies?.currencies?.data ?? [];
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type Languages = NonNullable<LocalDataGetLanguagesQuery["languages"]>["data"];

export const processLanguages = (languages: LocalDataGetLanguagesQuery | undefined): Languages => {
  if (languages?.languages?.data) {
    languages.languages.data.sort((a, b) =>
      a.attributes && b.attributes
        ? a.attributes.localized_name.localeCompare(b.attributes.localized_name)
        : 0
    );
  }
  return languages?.languages?.data ?? [];
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type Recorders = NonNullable<LocalDataGetRecordersQuery["recorders"]>["data"];

export const processRecorders = (recorders: LocalDataGetRecordersQuery | undefined): Recorders =>
  recorders?.recorders?.data ?? [];

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type TypesTranslations = {
  audioSubtypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["audioSubtypes"]
  >["data"];
  gamePlatforms: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["gamePlatforms"]
  >["data"];
  groupSubtypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["groupSubtypes"]
  >["data"];
  metadataTypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["metadataTypes"]
  >["data"];
  textualSubtypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["textualSubtypes"]
  >["data"];
  videoSubtypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["videoSubtypes"]
  >["data"];
  contentTypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["contentTypes"]
  >["data"];
  wikiPagesTags: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["wikiPagesTags"]
  >["data"];
  weaponTypes: NonNullable<
    NonNullable<LocalDataGetTypesTranslationsQuery>["weaponStoryTypes"]
  >["data"];
  categories: NonNullable<NonNullable<LocalDataGetTypesTranslationsQuery>["categories"]>["data"];
};

export const processTypesTranslations = (
  data: LocalDataGetTypesTranslationsQuery | undefined
): TypesTranslations => ({
  audioSubtypes: data?.audioSubtypes?.data ?? [],
  categories: data?.categories?.data ?? [],
  contentTypes: data?.contentTypes?.data ?? [],
  gamePlatforms: data?.gamePlatforms?.data ?? [],
  groupSubtypes: data?.groupSubtypes?.data ?? [],
  metadataTypes: data?.metadataTypes?.data ?? [],
  textualSubtypes: data?.textualSubtypes?.data ?? [],
  videoSubtypes: data?.videoSubtypes?.data ?? [],
  weaponTypes: data?.weaponStoryTypes?.data ?? [],
  wikiPagesTags: data?.wikiPagesTags?.data ?? [],
});
