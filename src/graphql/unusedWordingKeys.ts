/* eslint-disable import/no-nodejs-modules */
import { exit } from "process";
import { execSync } from "child_process";
import chalk from "chalk";
import { getLangui } from "./fetchLocalData";
import { getLogger } from "helpers/logger";

const logger = getLogger("💽 [Unused wording keys]", "server");

const unusedWordingKeys = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ui_language, ...langui } = getLangui("en");
  const results = Object.keys(langui).map((oKey) => {
    const buffer = execSync(`grep -r "format(\\"${oKey}\\"" -o src | wc -l`).toString();
    const result = parseInt(buffer.trim(), 10);
    if (result === 0) {
      logger.error(`"${oKey}" was not found in the codebase`);
    }
    return result;
  });

  const foundUnusedCount = results.filter((result) => result === 0).length;

  if (foundUnusedCount > 0) {
    console.log();
    console.error(chalk.red(`${chalk.bold(foundUnusedCount)} wording keys are unused`));
    exit(1);
  } else {
    console.log(`${chalk.bold(foundUnusedCount)} wording key are unused`);
    exit(0);
  }
};

if (process.argv[2] === "--uwk") {
  unusedWordingKeys();
}
