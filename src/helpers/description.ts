import { filterDefined, isDefined, isDefinedAndNotEmpty } from "./others";

export const getDescription = (
  description: string | null | undefined,
  chipsGroups?: Record<string, (string | undefined)[]>
): string => {
  let result = "";

  if (isDefinedAndNotEmpty(description)) {
    result += prettyMarkdown(description);
    if (isDefined(chipsGroups)) {
      result += "\n\n";
    }
  }

  for (const key in chipsGroups) {
    if (Object.hasOwn(chipsGroups, key)) {
      const chipsGroup = filterDefined(chipsGroups[key]);
      if (chipsGroup.length > 0) {
        result += `${key}: ${prettyChip(chipsGroup)}\n`;
      }
    }
  }

  return result;
};

const prettyMarkdown = (markdown: string): string =>
  markdown.replace(/[*]/gu, "").replace(/[_]/gu, "");

const prettyChip = (items: (string | undefined)[]): string =>
  items
    .filter((item) => isDefined(item))
    .map((item) => `(${item})`)
    .join(" ");
