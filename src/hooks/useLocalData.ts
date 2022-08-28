import { useFetch } from "usehooks-ts";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { LocalDataGetWebsiteInterfacesQuery } from "graphql/generated";
import {
  Currencies,
  Languages,
  Langui,
  processCurrencies,
  processLanguages,
  processLangui,
} from "helpers/localData";
import { LocalDataFile } from "graphql/fetchLocalData";

const useFetchLocalData = (name: LocalDataFile) =>
  useFetch<LocalDataGetWebsiteInterfacesQuery>(`/local-data/${name}.json`);

export const useLangui = (): Langui => {
  const { locale } = useRouter();
  const { data: websiteInterfaces } = useFetchLocalData("websiteInterfaces");
  return useMemo(() => processLangui(websiteInterfaces, locale), [websiteInterfaces, locale]);
};

export const useCurrencies = (): Currencies => {
  const { data: currencies } = useFetchLocalData("currencies");
  return useMemo(() => processCurrencies(currencies), [currencies]);
};

export const useLanguages = (): Languages => {
  const { data: languages } = useFetchLocalData("languages");
  return useMemo(() => processLanguages(languages), [languages]);
};
