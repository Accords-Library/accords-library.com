import { PreviewCard } from "./PreviewCard";
import { PreviewLine } from "./PreviewLine";
import { ScanSet } from "./Library/ScanSet";
import { NavOption } from "./PanelComponents/NavOption";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";

type TranslatedProps<P, K extends keyof P> = Omit<P, K> & {
  translations: (Pick<P, K> & { language: string })[];
  fallback: Pick<P, K>;
  languages: AppStaticProps["languages"];
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type TranslatedPreviewCardProps = TranslatedProps<
  Parameters<typeof PreviewCard>[0],
  "description" | "pre_title" | "subtitle" | "title"
>;

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedPreviewCard = ({
  translations,
  languages,
  fallback,
  ...otherProps
}: TranslatedPreviewCardProps): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languages: languages,
    languageExtractor: (item) => item.language,
  });

  return (
    <PreviewCard
      pre_title={selectedTranslation?.pre_title ?? fallback.pre_title}
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      description={selectedTranslation?.description ?? fallback.description}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type TranslatedPreviewLineProps = TranslatedProps<
  Parameters<typeof PreviewLine>[0],
  "pre_title" | "subtitle" | "title"
>;

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedPreviewLine = ({
  translations,
  languages,
  fallback,
  ...otherProps
}: TranslatedPreviewLineProps): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languages: languages,
    languageExtractor: (item) => item.language,
  });

  return (
    <PreviewLine
      pre_title={selectedTranslation?.pre_title ?? fallback.pre_title}
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type TranslatedScanSetProps = TranslatedProps<
  Parameters<typeof ScanSet>[0],
  "title"
>;

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedScanSet = ({
  translations,
  languages,
  fallback,
  ...otherProps
}: TranslatedScanSetProps): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languages: languages,
    languageExtractor: (item) => item.language,
  });

  return (
    <ScanSet
      title={selectedTranslation?.title ?? fallback.title}
      languages={languages}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type TranslatedNavOptionProps = TranslatedProps<
  Parameters<typeof NavOption>[0],
  "subtitle" | "title"
>;

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedNavOption = ({
  translations,
  languages,
  fallback,
  ...otherProps
}: TranslatedNavOptionProps): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languages: languages,
    languageExtractor: (item) => item.language,
  });

  return (
    <NavOption
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      {...otherProps}
    />
  );
};
