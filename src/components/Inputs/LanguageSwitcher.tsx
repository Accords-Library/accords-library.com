import { AppStaticProps } from "graphql/getAppStaticProps";
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
        <div className={`flex flex-col gap-2 ${className}`}>
          {[...locales].map(([locale, value], index) => (
            <Fragment key={index}>
              {locale && (
                <Button
                  active={value === localesIndex}
                  onClick={() => setLocalesIndex(value)}
                >
                  {prettyLanguage(locale, props.languages)}
                </Button>
              )}
            </Fragment>
          ))}
        </div>
      }
    >
      <Button badgeNumber={locales.size > 1 ? locales.size : undefined}>
        <span className="material-icons">translate</span>
      </Button>
    </ToolTip>
  );
}
