import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetch } from "usehooks-ts";
import { useAtomSetter } from "helpers/atoms";

import {
  LocalDataGetWebsiteInterfacesQuery,
  LocalDataGetCurrenciesQuery,
  LocalDataGetLanguagesQuery,
} from "graphql/generated";
import { LocalDataFile } from "graphql/fetchLocalData";
import { internalAtoms } from "contexts/atoms";
import { processLanguages, processCurrencies, processLangui } from "helpers/localData";

const getFileName = (name: LocalDataFile): string => `/local-data/${name}.json`;

export const useLocalData = (): void => {
  const setLanguages = useAtomSetter(internalAtoms.localData.languages);
  const setCurrencies = useAtomSetter(internalAtoms.localData.currencies);
  const setLangui = useAtomSetter(internalAtoms.localData.langui);
  const setFallbackLangui = useAtomSetter(internalAtoms.localData.fallbackLangui);

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
