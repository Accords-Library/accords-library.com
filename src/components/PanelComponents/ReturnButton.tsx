import { useCallback } from "react";
import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cIf, cJoin } from "helpers/className";
import { TranslatedProps } from "helpers/types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  href: string;
  title: string | null | undefined;
  langui: AppStaticProps["langui"];
  displayOn: ReturnButtonType;
  className?: string;
}

export enum ReturnButtonType {
  Mobile = "mobile",
  Desktop = "desktop",
  Both = "both",
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ReturnButton = ({
  href,
  title,
  langui,
  displayOn,
  className,
}: Props): JSX.Element => {
  const { setSubPanelOpen } = useAppLayout();

  return (
    <div
      className={cJoin(
        cIf(displayOn === ReturnButtonType.Mobile, "desktop:hidden"),
        cIf(displayOn === ReturnButtonType.Desktop, "mobile:hidden"),
        className
      )}
    >
      <Button
        onClick={() => setSubPanelOpen(false)}
        href={href}
        text={`${langui.return_to} ${title}`}
        icon={Icon.NavigateBefore}
      />
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
    languageExtractor: useCallback(
      (item: { language: string }): string => item.language,
      []
    ),
  });

  return (
    <ReturnButton
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};
