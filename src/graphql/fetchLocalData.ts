/* eslint-disable import/no-nodejs-modules */
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { config } from "dotenv";
import { getReadySdk } from "./sdk";
import {
  LocalDataGetTypesTranslationsQuery,
  LocalDataGetWebsiteInterfacesQuery,
} from "./generated";
import {
  processLangui,
  Langui,
  TypesTranslations,
  processTypesTranslations,
} from "helpers/localData";
import { getLogger } from "helpers/logger";

config({ path: resolve(process.cwd(), ".env.local") });

const LOCAL_DATA_FOLDER = `${process.cwd()}/public/local-data`;
const logger = getLogger("💽 [Local Data]", "server");

const writeLocalData = (name: LocalDataFile, localData: object) => {
  const path = `${LOCAL_DATA_FOLDER}/${name}.json`;
  writeFileSync(path, JSON.stringify(localData), { encoding: "utf-8" });
  logger.log(`${name}.json has been written`);
};

const readLocalData = <T>(name: LocalDataFile): T => {
  const path = `${LOCAL_DATA_FOLDER}/${name}.json`;
  return JSON.parse(readFileSync(path, { encoding: "utf8" }));
};

export const fetchWebsiteInterfaces = async (): Promise<void> => {
  const sdk = getReadySdk();
  writeLocalData("websiteInterfaces", await sdk.localDataGetWebsiteInterfaces());
};

export const fetchCurrencies = async (): Promise<void> => {
  const sdk = getReadySdk();
  writeLocalData("currencies", await sdk.localDataGetCurrencies());
};

export const fetchLanguages = async (): Promise<void> => {
  const sdk = getReadySdk();
  writeLocalData("languages", await sdk.localDataGetLanguages());
};

export const fetchRecorders = async (): Promise<void> => {
  const sdk = getReadySdk();
  writeLocalData("recorders", await sdk.localDataGetRecorders());
};

export const fetchTypesTranslations = async (): Promise<void> => {
  const sdk = getReadySdk();
  writeLocalData("typesTranslations", await sdk.localDataGetTypesTranslations());
};

const fetchLocalData = async (): Promise<void> => {
  await fetchWebsiteInterfaces();
  await fetchCurrencies();
  await fetchLanguages();
  await fetchRecorders();
  await fetchTypesTranslations();
};

if (process.argv[2] === "--esrun") {
  fetchLocalData();
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type LocalDataFile =
  | "currencies"
  | "languages"
  | "recorders"
  | "typesTranslations"
  | "websiteInterfaces";

export const getLangui = (locale: string): Langui => {
  const websiteInterfaces = readLocalData<LocalDataGetWebsiteInterfacesQuery>("websiteInterfaces");
  return processLangui(websiteInterfaces, locale);
};

export const getTypesTranslations = (): TypesTranslations => {
  const typesTranslations = readLocalData<LocalDataGetTypesTranslationsQuery>("typesTranslations");
  return processTypesTranslations(typesTranslations);
};
