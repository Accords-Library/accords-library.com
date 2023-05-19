import { prettyMarkdown } from "helpers/formatters";
import { filterDefined, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";

export const getDescription = (
  description: string | null | undefined,
  chipsGroups?: Record<string, (string | undefined)[]>
): string => {
  let result = "";

  for (const key in chipsGroups) {
    if (Object.hasOwn(chipsGroups, key)) {
      const chipsGroup = filterDefined(chipsGroups[key]);
      if (chipsGroup.length > 0) {
        result += `${key}: ${prettyChip(chipsGroup)}\n`;
      }
    }
  }

  if (isDefinedAndNotEmpty(description)) {
    if (result !== "") {
      result += "\n";
    }
    result += prettyMarkdown(description);
  }

  return result;
};

const prettyChip = (items: (string | undefined)[]): string =>
  items
    .filter((item) => isDefined(item))
    .map((item) => `(${item})`)
    .join(" ");
