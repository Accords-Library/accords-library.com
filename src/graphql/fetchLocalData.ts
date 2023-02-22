/* eslint-disable import/no-nodejs-modules */
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { config } from "dotenv";
import { getReadySdk } from "./sdk";
import { LocalDataGetWebsiteInterfacesQuery } from "./generated";
import { processLangui, Langui } from "helpers/localData";
import { getLogger } from "helpers/logger";

config({ path: resolve(process.cwd(), ".env.local") });

const LOCAL_DATA_FOLDER = `${process.cwd()}/public/local-data`;
const logger = getLogger("💽 [Local Data]");

const writeLocalData = (name: LocalDataFile, localData: unknown) => {
  const path = `${LOCAL_DATA_FOLDER}/${name}.json`;
  writeFileSync(path, JSON.stringify(localData), { encoding: "utf-8" });
  logger.log(`${name}.json has been written`);
};

const readLocalData = <T>(name: LocalDataFile): T => {
  const path = `${LOCAL_DATA_FOLDER}/${name}.json`;
  return JSON.parse(readFileSync(path, { encoding: "utf8" }));
};

export const fetchLocalData = async (): Promise<void> => {
  const sdk = getReadySdk();
  writeLocalData("websiteInterfaces", await sdk.localDataGetWebsiteInterfaces());
  writeLocalData("currencies", await sdk.localDataGetCurrencies());
  writeLocalData("languages", await sdk.localDataGetLanguages());
};

if (process.argv[2] === "--esrun") {
  fetchLocalData();
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export type LocalDataFile = "currencies" | "languages" | "websiteInterfaces";

export const getLangui = (locale: string | undefined): Langui => {
  const websiteInterfaces = readLocalData<LocalDataGetWebsiteInterfacesQuery>("websiteInterfaces");
  return processLangui(websiteInterfaces, locale);
};
