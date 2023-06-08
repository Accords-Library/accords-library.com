import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher } from "components/Inputs/LanguageSwitcher";
import { isDefined } from "helpers/asserts";
import { getPreferredLanguage } from "helpers/locales";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

interface Props<T> {
  items: T[];
  languageExtractor: (item: NonNullable<T>) => string | undefined;
  transform?: (item: NonNullable<T>) => NonNullable<T>;
}

export const useSmartLanguage = <T>({
  items,
  languageExtractor,
  transform = (item) => item,
}: Props<T>): [T | undefined, typeof LanguageSwitcher, Parameters<typeof LanguageSwitcher>[0]] => {
  const preferredLanguages = useAtomGetter(atoms.settings.preferredLanguages);
  const languages = useAtomGetter(atoms.localData.languages);
  const router = useRouter();

  const availableLocales = useMemo<Map<string, number>>(() => {
    const memo: [string, number][] = [];
    items.map((elem, index) => {
      const result = isDefined(elem) ? languageExtractor(elem) : undefined;
      if (isDefined(result)) memo.push([result, index]);
    });
    memo.sort((a, b) => {
      const evaluate = (locale: string) => preferredLanguages.findIndex((elem) => elem === locale);
      return evaluate(a[0]) - evaluate(b[0]);
    });
    return new Map(memo);
  }, [items, languageExtractor, preferredLanguages]);

  const [selectedTranslationIndex, setSelectedTranslationIndex] = useState<number | undefined>();

  useEffect(() => {
    setSelectedTranslationIndex(getPreferredLanguage(preferredLanguages, availableLocales));
  }, [preferredLanguages, availableLocales, router.locale]);

  const selectedTranslation = (() => {
    if (isDefined(selectedTranslationIndex)) {
      const item = items[selectedTranslationIndex];
      if (isDefined(item)) {
        return transform(item);
      }
    }
    return undefined;
  })();

  const languageSwitcherProps = {
    languages: languages,
    locales: availableLocales,
    localesIndex: selectedTranslationIndex,
    onLanguageChanged: setSelectedTranslationIndex,
  };

  return [selectedTranslation, LanguageSwitcher, languageSwitcherProps];
};
