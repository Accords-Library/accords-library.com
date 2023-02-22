import { useCallback } from "react";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { TranslatedProps } from "types/TranslatedProps";
import { UpPressable } from "components/Containers/UpPressable";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface PreviewFolderProps {
  href: string;
  title?: string | null;
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const PreviewFolder = ({ href, title, disabled }: PreviewFolderProps): JSX.Element => (
  <UpPressable href={href} disabled={disabled}>
    <div
      className={cJoin(
        `flex w-full cursor-pointer flex-row place-content-center place-items-center gap-4
      p-6`,
        cIf(disabled, "pointer-events-none touch-none select-none")
      )}>
      {title && <p className="text-center font-headers text-lg font-bold leading-none">{title}</p>}
    </div>
  </UpPressable>
);

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedPreviewFolder = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<PreviewFolderProps, "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });
  return <PreviewFolder title={selectedTranslation?.title ?? fallback.title} {...otherProps} />;
};
