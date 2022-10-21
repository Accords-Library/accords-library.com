import React, { ReactNode, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import { useFetch } from "usehooks-ts";
import {
  Langui,
  Languages,
  Currencies,
  processCurrencies,
  processLanguages,
  processLangui,
} from "helpers/localData";
import { RequiredNonNullable } from "types/types";
import { LocalDataFile } from "graphql/fetchLocalData";
import {
  LocalDataGetCurrenciesQuery,
  LocalDataGetLanguagesQuery,
  LocalDataGetWebsiteInterfacesQuery,
} from "graphql/generated";

interface LocalDataState {
  langui: Langui;
  languages: Languages;
  currencies: Currencies;
}

const initialState: RequiredNonNullable<LocalDataState> = {
  currencies: [],
  languages: [],
  langui: {},
};

const LocalDataContext = React.createContext<LocalDataState>(initialState);

export const useLocalData = (): LocalDataState => useContext(LocalDataContext);

interface Props {
  children: ReactNode;
}

export const LocalDataContextProvider = ({ children }: Props): JSX.Element => {
  const langui = useLangui();
  const languages = useLanguages();
  const currencies = useCurrencies();

  return (
    <LocalDataContext.Provider value={{ langui, languages, currencies }}>
      {children}
    </LocalDataContext.Provider>
  );
};

const getFileName = (name: LocalDataFile): string => `/local-data/${name}.json`;

const useLangui = (): Langui => {
  const { locale } = useRouter();
  const { data: websiteInterfaces } = useFetch<LocalDataGetWebsiteInterfacesQuery>(
    getFileName("websiteInterfaces")
  );
  return useMemo(() => processLangui(websiteInterfaces, locale), [websiteInterfaces, locale]);
};

const useCurrencies = (): Currencies => {
  const { data: currencies } = useFetch<LocalDataGetCurrenciesQuery>(getFileName("currencies"));
  return useMemo(() => processCurrencies(currencies), [currencies]);
};

const useLanguages = (): Languages => {
  const { data: languages } = useFetch<LocalDataGetLanguagesQuery>(getFileName("languages"));
  return useMemo(() => processLanguages(languages), [languages]);
};
