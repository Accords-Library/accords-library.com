import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettyLanguage } from "helpers/formatters";
import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction } from "react";
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
            <>
              {locale && (
                <Button
                  key={index}
                  active={value === localesIndex}
                  onClick={() => setLocalesIndex(value)}
                >
                  {prettyLanguage(locale, props.languages)}
                </Button>
              )}
            </>
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
