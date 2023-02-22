/* eslint-disable import/no-nodejs-modules */
import { createWriteStream } from "fs";
import { parse, TYPE } from "@formatjs/icu-messageformat-parser";
import { getLangui } from "./fetchLocalData";
import { filterDefined } from "helpers/asserts";
import { getLogger } from "helpers/logger";

const OUTPUT_FOLDER = `${process.cwd()}/src/graphql`;
const logger = getLogger("💽 [ICU to TS]", "server");

const icuToTypescript = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ui_language, ...langui } = getLangui("en");

  const output = createWriteStream(`${OUTPUT_FOLDER}/icuParams.ts`);

  output.write("export interface ICUParams {\n");

  Object.keys(langui).map((oKey) => {
    const key = oKey as keyof typeof langui;
    const parsedMessage = parse(langui[key] ?? "");

    const variables = filterDefined(
      parsedMessage.map((elem) => {
        if (elem.type === TYPE.argument) {
          return `${elem.value}: Date | boolean | number | string`;
        } else if (elem.type === TYPE.plural) {
          return `${elem.value}: number`;
        } else if (elem.type === TYPE.select) {
          const options = Object.keys(elem.options);
          const stringOptions = options.filter(
            (option) => option !== "undefined" && option !== "other"
          );
          const type: string[] = stringOptions.map((option) => `"${option}"`);
          if (options.includes("undefined")) type.push(...["undefined", "null"]);
          if (options.includes("other")) type.push(...["Date", "boolean", "number", "string"]);
          return `${elem.value}: ${type.join(` | `)}`;
        }
        return undefined;
      })
    );

    const variablesType = variables.length > 0 ? `{ ${variables.join(";")} }` : "never";

    output.write(`  ${key}: ${variablesType};\n`);
  });

  output.write("}\n");

  logger.log(`icu-params.ts has been written!`);
};

if (process.argv[2] === "--icu") {
  icuToTypescript();
}
