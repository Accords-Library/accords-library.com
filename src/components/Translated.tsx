import { PreviewCard } from "./PreviewCard";
import { PreviewLine } from "./PreviewLine";
import { ScanSet } from "./Library/ScanSet";
import { NavOption } from "./PanelComponents/NavOption";
import { ChroniclePreview } from "./Chronicles/ChroniclePreview";
import { ChroniclesList } from "./Chronicles/ChroniclesList";
import { Button } from "./Inputs/Button";
import { ReturnButton } from "./PanelComponents/ReturnButton";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { PreviewFolder } from "pages/contents/folder/[slug]";

export type TranslatedProps<P, K extends keyof P> = Omit<P, K> & {
  translations: (Pick<P, K> & { language: string })[];
  fallback: Pick<P, K>;
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

type TranslatedPreviewCardProps = TranslatedProps<
  Parameters<typeof PreviewCard>[0],
  "description" | "pre_title" | "subtitle" | "title"
>;

const languageExtractor = (item: { language: string }): string => item.language;

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedPreviewCard = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedPreviewCardProps): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
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

export const TranslatedPreviewLine = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<
  Parameters<typeof PreviewLine>[0],
  "pre_title" | "subtitle" | "title"
>): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,

    languageExtractor,
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

export const TranslatedScanSet = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Parameters<typeof ScanSet>[0], "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <ScanSet
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedNavOption = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<
  Parameters<typeof NavOption>[0],
  "subtitle" | "title"
>): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <NavOption
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedChroniclePreview = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<
  Parameters<typeof ChroniclePreview>[0],
  "title"
>): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <ChroniclePreview
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedChroniclesList = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<
  Parameters<typeof ChroniclesList>[0],
  "title"
>): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <ChroniclesList
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedButton = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Parameters<typeof Button>[0], "text">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <Button text={selectedTranslation?.text ?? fallback.text} {...otherProps} />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedPreviewFolder = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<
  Parameters<typeof PreviewFolder>[0],
  "title"
>): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <PreviewFolder
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const TranslatedReturnButton = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<
  Parameters<typeof ReturnButton>[0],
  "title"
>): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor,
  });

  return (
    <ReturnButton
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};
