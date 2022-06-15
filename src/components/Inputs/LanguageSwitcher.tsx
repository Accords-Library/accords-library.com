import { Icon } from "components/Ico";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cJoin } from "helpers/className";
import { prettyLanguage } from "helpers/formatters";
import { Immutable } from "helpers/types";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ToolTip } from "../ToolTip";
import { Button } from "./Button";

interface Props {
  className?: string;
  languages: AppStaticProps["languages"];
  locales: Map<string, number>;
  localesIndex: number | undefined;
  setLocalesIndex: Dispatch<SetStateAction<number | undefined>>;
}

export function LanguageSwitcher(props: Immutable<Props>): JSX.Element {
  const { locales, className, localesIndex, setLocalesIndex } = props;

  return (
    <ToolTip
      content={
        <div className={cJoin("flex flex-col gap-2", className)}>
          {[...locales].map(([locale, value], index) => (
            <Fragment key={index}>
              {locale && (
                <Button
                  active={value === localesIndex}
                  onClick={() => setLocalesIndex(value)}
                  text={prettyLanguage(locale, props.languages)}
                />
              )}
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
