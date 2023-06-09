import { Fragment } from "react";
import { ToolTip } from "../ToolTip";
import { Button } from "./Button";
import { cJoin } from "helpers/className";
import { iterateMap } from "helpers/others";
import { sendAnalytics } from "helpers/analytics";
import { useFormat } from "hooks/useFormat";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  locales: Map<string, number>;
  localesIndex: number | undefined;
  onLanguageChanged: (index: number) => void;
  size?: Parameters<typeof Button>[0]["size"];
  showBadge?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const LanguageSwitcher = ({
  className,
  locales,
  localesIndex,
  size,
  onLanguageChanged,
  showBadge = true,
}: Props): JSX.Element => {
  const { formatLanguage } = useFormat();
  return (
    <ToolTip
      content={
        <div className={cJoin("flex flex-col gap-2", className)}>
          {iterateMap(locales, (locale, value, index) => (
            <Fragment key={index}>
              <Button
                active={value === localesIndex}
                onClick={() => {
                  onLanguageChanged(value);
                  sendAnalytics("Language Switcher", `Switch language (${locale})`);
                }}
                text={formatLanguage(locale)}
              />
            </Fragment>
          ))}
        </div>
      }>
      <Button
        badgeNumber={showBadge && locales.size > 1 ? locales.size : undefined}
        icon="translate"
        size={size}
      />
    </ToolTip>
  );
};
