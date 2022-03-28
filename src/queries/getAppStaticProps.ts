import {
  getCurrencies,
  getLanguages,
  getWebsiteInterface,
} from "graphql/operations";
import {
  GetCurrenciesQuery,
  GetLanguagesQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { GetStaticPropsContext } from "next";

export interface AppStaticProps {
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  currencies: GetCurrenciesQuery["currencies"]["data"];
  languages: GetLanguagesQuery["languages"]["data"];
}

export async function getAppStaticProps(
  context: GetStaticPropsContext
): Promise<AppStaticProps> {
  const languages = (await getLanguages({})).languages.data;
  languages.sort((a, b) =>
    a.attributes.localized_name.localeCompare(b.attributes.localized_name)
  );

  const currencies = (await getCurrencies({})).currencies.data;
  currencies.sort((a, b) => a.attributes.code.localeCompare(b.attributes.code));

  return {
    langui: (
      await getWebsiteInterface({
        language_code: context.locale ?? "en",
      })
    ).websiteInterfaces.data[0].attributes,
    currencies: currencies,
    languages: languages,
  };
}
