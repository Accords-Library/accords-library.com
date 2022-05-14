import { ContentWithTranslations, Immutable } from "./types";

type Group = Immutable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<ContentWithTranslations["group"]>["data"]
      >["attributes"]
    >["contents"]
  >["data"]
>;

export function getPreviousContent(group: Group, currentSlug: string) {
  for (let index = 0; index < group.length; index += 1) {
    const content = group[index];
    if (content.attributes?.slug === currentSlug && index > 0) {
      return group[index - 1];
    }
  }
  return undefined;
}

export function getNextContent(group: Group, currentSlug: string) {
  for (let index = 0; index < group.length; index += 1) {
    const content = group[index];
    if (content.attributes?.slug === currentSlug && index < group.length - 1) {
      return group[index + 1];
    }
  }
  return undefined;
}
