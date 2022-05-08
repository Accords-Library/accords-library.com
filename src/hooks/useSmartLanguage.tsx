import LanguageSwitcher from "components/Inputs/LanguageSwitcher";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "helpers/getAppStaticProps";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface Props<T> {
  items: T[];
  languages: AppStaticProps["languages"];
  languageExtractor: (item: T) => string | undefined;
  transform?: (item: T) => T;
}

function getPreferredLanguage(
  preferredLanguages: (string | undefined)[],
  availableLanguages: Map<string, number>
): number | undefined {
  for (const locale of preferredLanguages) {
    if (locale && availableLanguages.has(locale)) {
      return availableLanguages.get(locale);
    }
  }
  return undefined;
}

export default function useSmartLanguage<T>(
  props: Props<T>
): [T | undefined, () => JSX.Element] {
  const {
    items,
    languageExtractor,
    languages,
    transform = (item) => item,
  } = props;
  const appLayout = useAppLayout();
  const router = useRouter();

  const availableLocales: Map<string, number> = useMemo(() => new Map(), []);
  const [selectedTranslationIndex, setSelectedTranslationIndex] = useState<
    number | undefined
  >();
  const [selectedTranslation, setSelectedTranslation] = useState<T>();

  useEffect(() => {
    items.map((elem, index) => {
      const result = languageExtractor(elem);
      if (result !== undefined) availableLocales.set(result, index);
    });
  }, [availableLocales, items, languageExtractor]);

  useEffect(() => {
    setSelectedTranslationIndex(
      getPreferredLanguage(
        appLayout.preferredLanguages ?? [router.locale],
        availableLocales
      )
    );
  }, [appLayout.preferredLanguages, availableLocales, router.locale]);

  useEffect(() => {
    if (selectedTranslationIndex !== undefined)
      setSelectedTranslation(transform(items[selectedTranslationIndex]));
  }, [items, selectedTranslationIndex, transform]);

  return [
    selectedTranslation,
    () => (
      <LanguageSwitcher
        languages={languages}
        locales={availableLocales}
        localesIndex={selectedTranslationIndex}
        setLocalesIndex={setSelectedTranslationIndex}
      />
    ),
  ];
}
