import {
  LocalDataGetCurrenciesQuery,
  LocalDataGetLanguagesQuery,
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
