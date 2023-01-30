import { atom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetch } from "usehooks-ts";
import { atomPairing, useAtomSetter } from "helpers/atoms";
import {
  Languages,
  Currencies,
  Langui,
  processLangui,
  processCurrencies,
  processLanguages,
} from "helpers/localData";
import {
  LocalDataGetWebsiteInterfacesQuery,
  LocalDataGetCurrenciesQuery,
  LocalDataGetLanguagesQuery,
} from "graphql/generated";
import { LocalDataFile } from "graphql/fetchLocalData";

const languages = atomPairing(atom<Languages>([]));
const currencies = atomPairing(atom<Currencies>([]));
const langui = atomPairing(atom<Langui>({}));
const fallbackLangui = atomPairing(atom<Langui>({}));

export const localData = {
  languages: languages[0],
  currencies: currencies[0],
  langui: langui[0],
  fallbackLangui: fallbackLangui[0],
};

const getFileName = (name: LocalDataFile): string => `/local-data/${name}.json`;

export const useLocalData = (): void => {
  const setLanguages = useAtomSetter(languages);
  const setCurrencies = useAtomSetter(currencies);
  const setLangui = useAtomSetter(langui);
  const setFallbackLangui = useAtomSetter(fallbackLangui);

  const { locale } = useRouter();
  const { data: rawLanguages } = useFetch<LocalDataGetLanguagesQuery>(getFileName("languages"));
  const { data: rawCurrencies } = useFetch<LocalDataGetCurrenciesQuery>(getFileName("currencies"));
  const { data: rawLangui } = useFetch<LocalDataGetWebsiteInterfacesQuery>(
    getFileName("websiteInterfaces")
  );

  useEffect(() => {
    console.log("[useLocalData] Refresh languages");
    setLanguages(processLanguages(rawLanguages));
  }, [rawLanguages, setLanguages]);

  useEffect(() => {
    console.log("[useLocalData] Refresh currencies");
    setCurrencies(processCurrencies(rawCurrencies));
  }, [rawCurrencies, setCurrencies]);

  useEffect(() => {
    console.log("[useLocalData] Refresh langui");
    setLangui(processLangui(rawLangui, locale));
  }, [locale, rawLangui, setLangui]);

  useEffect(() => {
    console.log("[useLocalData] Refresh fallback langui");
    setFallbackLangui(processLangui(rawLangui, "en"));
  }, [rawLangui, setFallbackLangui]);
};
