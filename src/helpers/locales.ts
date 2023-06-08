import { isDefined } from "./asserts";

export const getDefaultPreferredLanguages = (routerLocal: string, locales: string[]): string[] => {
  const defaultPreferredLanguages: Set<string> = new Set();
  defaultPreferredLanguages.add(routerLocal);
  defaultPreferredLanguages.add("en");
  locales.forEach((locale) => defaultPreferredLanguages.add(locale));
  return [...defaultPreferredLanguages.values()];
};

export const getPreferredLanguage = (
  preferredLanguages: (string | undefined)[],
  availableLanguages: Map<string, number>
): number | undefined => {
  for (const locale of preferredLanguages) {
    if (isDefined(locale) && availableLanguages.has(locale)) {
      return availableLanguages.get(locale);
    }
  }
  return undefined;
};

interface StaticSmartLanguageProps<T> {
  items: T[];
  preferredLanguages: string[];
  languageExtractor: (item: NonNullable<T>) => string | undefined;
}

export const staticSmartLanguage = <T>({
  languageExtractor,
  preferredLanguages,
  items,
}: StaticSmartLanguageProps<T>): T | undefined => {
  for (const language of preferredLanguages) {
    for (const item of items) {
      if (isDefined(item) && languageExtractor(item) === language) {
        return item;
      }
    }
  }
  return undefined;
};
