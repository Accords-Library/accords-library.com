import { useCallback } from "react";
import { Button } from "components/Inputs/Button";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { useFormat } from "hooks/useFormat";
import { cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  href: string;
  title: string | null | undefined;
  className?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ReturnButton = ({ href, title, className }: Props): JSX.Element => {
  const { format } = useFormat();

  return (
    <div className={cJoin("mx-auto w-full max-w-lg place-self-center", className)}>
      <Button href={href} text={format("return_to_x", { x: title })} icon="navigate_before" />
    </div>
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
