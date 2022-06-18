import { Icon } from "components/Ico";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cJoin } from "helpers/className";
import { prettyLanguage } from "helpers/formatters";
import { iterateMap } from "helpers/others";

import { Fragment } from "react";
import { ToolTip } from "../ToolTip";
import { Button } from "./Button";

interface Props {
  className?: string;
  languages: AppStaticProps["languages"];
  locales: Map<string, number>;
  localesIndex: number | undefined;
  onLanguageChanged: (index: number) => void;
}

export function LanguageSwitcher(props: Props): JSX.Element {
  const { locales, className, localesIndex, onLanguageChanged } = props;

  return (
    <ToolTip
      content={
        <div className={cJoin("flex flex-col gap-2", className)}>
          {iterateMap(locales, (locale, value, index) => (
            <Fragment key={index}>
              <Button
                active={value === localesIndex}
                onClick={() => onLanguageChanged(value)}
                text={prettyLanguage(locale, props.languages)}
              />
            </Fragment>
          ))}
        </div>
      }
    >
      <Button
        badgeNumber={locales.size > 1 ? locales.size : undefined}
        icon={Icon.Translate}
      />
    </ToolTip>
  );
}
