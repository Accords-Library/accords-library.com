import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher } from "components/Inputs/LanguageSwitcher";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { filterDefined, isDefined } from "helpers/others";
import { getPreferredLanguage } from "helpers/locales";

interface Props<T> {
  items: T[];
  languages?: AppStaticProps["languages"];
  languageExtractor: (item: NonNullable<T>) => string | undefined;
  transform?: (item: NonNullable<T>) => NonNullable<T>;
}

export const useSmartLanguage = <T>({
  items,
  languageExtractor,
  languages = [],
  transform = (item) => item,
}: Props<T>): [
  T | undefined,
  typeof LanguageSwitcher,
  Parameters<typeof LanguageSwitcher>[0]
] => {
  const { preferredLanguages } = useAppLayout();
  const router = useRouter();

  const availableLocales = useMemo(() => {
    const memo = new Map<string, number>();
    filterDefined(items).map((elem, index) => {
      const result = languageExtractor(elem);
      if (isDefined(result)) memo.set(result, index);
    });
    return memo;
  }, [items, languageExtractor]);

  const [selectedTranslationIndex, setSelectedTranslationIndex] = useState<
    number | undefined
  >();

  useEffect(() => {
    setSelectedTranslationIndex(
      getPreferredLanguage(
        preferredLanguages ?? [router.locale],
        availableLocales
      )
    );
  }, [preferredLanguages, availableLocales, router.locale]);

  const selectedTranslation = useMemo(() => {
    if (isDefined(selectedTranslationIndex)) {
      const item = items[selectedTranslationIndex];
      if (isDefined(item)) {
        return transform(item);
      }
    }
    return undefined;
  }, [items, selectedTranslationIndex, transform]);

  const languageSwitcherProps = {
    languages: languages,
    locales: availableLocales,
    localesIndex: selectedTranslationIndex,
    onLanguageChanged: setSelectedTranslationIndex,
  };

  return [selectedTranslation, LanguageSwitcher, languageSwitcherProps];
};
