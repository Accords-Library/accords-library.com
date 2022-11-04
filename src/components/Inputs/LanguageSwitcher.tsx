import { Fragment } from "react";
import { ToolTip } from "../ToolTip";
import { Button } from "./Button";
import { Icon } from "components/Ico";
import { cJoin } from "helpers/className";
import { prettyLanguage } from "helpers/formatters";
import { iterateMap } from "helpers/others";
import { sendAnalytics } from "helpers/analytics";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

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
  const languages = useAtomGetter(atoms.localData.languages);
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
                text={prettyLanguage(locale, languages)}
              />
            </Fragment>
          ))}
        </div>
      }>
      <Button
        badgeNumber={showBadge && locales.size > 1 ? locales.size : undefined}
        icon={Icon.Translate}
        size={size}
      />
    </ToolTip>
  );
};
