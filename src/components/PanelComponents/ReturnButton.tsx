import { useCallback } from "react";
import { Button } from "components/Inputs/Button";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { isUndefined } from "helpers/asserts";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  href: string;
  title: string | null | undefined;

  displayOnlyOn?: "1ColumnLayout" | "3ColumnsLayout";
  className?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ReturnButton = ({ href, title, displayOnlyOn, className }: Props): JSX.Element => {
  const langui = useAtomGetter(atoms.localData.langui);
  const is3ColumnsLayout = useAtomGetter(atoms.containerQueries.is3ColumnsLayout);

  return (
    <>
      {((is3ColumnsLayout && displayOnlyOn === "3ColumnsLayout") ||
        (!is3ColumnsLayout && displayOnlyOn === "1ColumnLayout") ||
        isUndefined(displayOnlyOn)) && (
        <div className={className}>
          <Button href={href} text={`${langui.return_to} ${title}`} icon="navigate_before" />
        </div>
      )}
    </>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedReturnButton = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });

  return <ReturnButton title={selectedTranslation?.title ?? fallback.title} {...otherProps} />;
};
