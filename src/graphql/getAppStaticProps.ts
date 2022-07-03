import {
  GetCurrenciesQuery,
  GetLanguagesQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";

import { GetStaticPropsContext } from "next";

export type AppStaticProps = {
  langui: NonNullable<
    NonNullable<
      GetWebsiteInterfaceQuery["websiteInterfaces"]
    >["data"][number]["attributes"]
  >;
  currencies: NonNullable<GetCurrenciesQuery["currencies"]>["data"];
  languages: NonNullable<GetLanguagesQuery["languages"]>["data"];
};

export const getAppStaticProps = async (
  context: GetStaticPropsContext
): Promise<AppStaticProps> => {
  const sdk = getReadySdk();
  const languages = (await sdk.getLanguages()).languages;

  if (languages?.data) {
    languages.data.sort((a, b) =>
      a.attributes && b.attributes
        ? a.attributes.localized_name.localeCompare(b.attributes.localized_name)
        : 0
    );
  }

  const currencies = (await sdk.getCurrencies()).currencies;
  if (currencies?.data) {
    currencies.data.sort((a, b) =>
      a.attributes && b.attributes
        ? a.attributes.code.localeCompare(b.attributes.code)
        : 0
    );
  }

  const langui = (
    await sdk.getWebsiteInterface({
      language_code: context.locale ?? "en",
    })
  ).websiteInterfaces?.data[0].attributes;

  const appStaticProps: AppStaticProps = {
    langui: langui ?? {},
    currencies: currencies?.data ?? [],
    languages: languages?.data ?? [],
  };

  return appStaticProps;
};
