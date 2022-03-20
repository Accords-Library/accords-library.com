import {
  GetLanguagesQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { NextRouter } from "next/router";
import { prettyLanguage } from "queries/helpers";
import Button from "./Button";

type HorizontalLineProps = {
  className?: string;
  locales: string[];
  router: NextRouter;
  languages: GetLanguagesQuery["languages"]["data"];
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function HorizontalLine(
  props: HorizontalLineProps
): JSX.Element {
  const { locales, router, langui } = props;
  return (
    <div className="w-full grid place-content-center">
      <div className="flex flex-col place-items-center text-center gap-4 my-12 border-2 border-mid rounded-xl p-8 max-w-lg">
        <p>{langui.language_switch_message}</p>
        <div className="flex flex-wrap flex-row gap-2">
          {locales.map((locale, index) => (
            <Button
              key={index}
              active={locale === router.locale}
              href={router.asPath}
              locale={locale}
            >
              {prettyLanguage(locale, props.languages)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
