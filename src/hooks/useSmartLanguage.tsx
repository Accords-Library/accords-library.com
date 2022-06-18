import { LanguageSwitcher } from "components/Inputs/LanguageSwitcher";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { isDefined } from "helpers/others";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface Props<T> {
  items: T[];
  languages: AppStaticProps["languages"];
  languageExtractor: (item: NonNullable<T>) => string | undefined;
  transform?: (item: NonNullable<T>) => NonNullable<T>;
}

function getPreferredLanguage(
  preferredLanguages: (string | undefined)[],
  availableLanguages: Map<string, number>
): number | undefined {
  for (const locale of preferredLanguages) {
    if (isDefined(locale) && availableLanguages.has(locale)) {
      return availableLanguages.get(locale);
    }
  }
  return undefined;
}

export function useSmartLanguage<T>(
  props: Props<T>
): [T | undefined, () => JSX.Element] {
  const {
    items,
    languageExtractor,
    languages,
    transform = (item) => item,
  } = props;
  const { preferredLanguages } = useAppLayout();
  const router = useRouter();

  const availableLocales = useMemo(() => {
    const map = new Map<string, number>();
    items.map((elem, index) => {
      if (isDefined(elem)) {
        const result = languageExtractor(elem);
        if (isDefined(result)) map.set(result, index);
      }
    });
    return map;
  }, [items, languageExtractor]);

  const [selectedTranslationIndex, setSelectedTranslationIndex] = useState<
    number | undefined
  >();

  useEffect(() => {
    setSelectedTranslationIndex(
      (current) =>
        current ??
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

  return [
    selectedTranslation,
    () => (
      <LanguageSwitcher
        languages={languages}
        locales={availableLocales}
        localesIndex={selectedTranslationIndex}
        onLanguageChanged={setSelectedTranslationIndex}
      />
    ),
  ];
}
