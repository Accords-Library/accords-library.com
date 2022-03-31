import { useRouter } from "next/router";
import { AppStaticProps } from "queries/getAppStaticProps";
import { prettyLanguage } from "queries/helpers";
import Button from "./Button";

type HorizontalLineProps = {
  className?: string;
  locales: (string | undefined)[];
  languages: AppStaticProps["languages"];
  langui: AppStaticProps["langui"];
  href?: string;
};

export default function HorizontalLine(
  props: HorizontalLineProps
): JSX.Element {
  const { locales, langui, href } = props;
  const router = useRouter();

  return (
    <div className="w-full grid place-content-center">
      <div className="flex flex-col place-items-center text-center gap-4 my-12 border-2 border-mid rounded-xl p-8 max-w-lg">
        <p>{langui.language_switch_message}</p>
        <div className="flex flex-wrap flex-row gap-2">
          {locales.map((locale, index) => (
            <>
              {locale && (
                <Button
                  key={index}
                  active={locale === router.locale}
                  href={href}
                  locale={locale}
                >
                  {prettyLanguage(locale, props.languages)}
                </Button>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
