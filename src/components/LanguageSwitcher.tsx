import { AppStaticProps } from "queries/getAppStaticProps";
import { prettyLanguage } from "queries/helpers";
import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import ToolTip from "./ToolTip";

interface Props {
  className?: string;
  languages: AppStaticProps["languages"];
  locales: Map<string, number>;
  localesIndex: number | undefined;
  setLocalesIndex: Dispatch<SetStateAction<number | undefined>>;
}

export default function LanguageSwitcher(props: Props): JSX.Element {
  const { locales, localesIndex, setLocalesIndex } = props;

  return (
    <ToolTip
      content={
        <div className="flex flex-col gap-2">
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
      <Button badgeNumber={locales.size}>
        <span className="material-icons">translate</span>
      </Button>
    </ToolTip>
  );
}
