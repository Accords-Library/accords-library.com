import { useCallback } from "react";
import { DatePickerFragment } from "graphql/generated";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { DownPressable } from "components/Containers/DownPressable";
import { isDefined } from "helpers/others";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  date: DatePickerFragment;
  title: string;
  url: string;
  active?: boolean;
  disabled?: boolean;
}

export const ChroniclePreview = ({ date, url, title, active, disabled }: Props): JSX.Element => (
  <DownPressable
    className="flex w-full gap-4 py-4 px-5"
    href={url}
    active={active}
    border
    disabled={disabled}>
    {isDefined(date.year) && (
      <div className="text-right">
        <p>{date.year}</p>
        <p className="text-sm text-dark">{prettyMonthDay(date.month, date.day)}</p>
      </div>
    )}

    <p
      className={cJoin(
        "text-lg leading-tight",
        cIf(isDefined(date.year), "text-left", "w-full text-center")
      )}>
      {title}
    </p>
  </DownPressable>
);

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedChroniclePreview = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Parameters<typeof ChroniclePreview>[0], "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });

  return <ChroniclePreview title={selectedTranslation?.title ?? fallback.title} {...otherProps} />;
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const prettyMonthDay = (
  month?: number | null | undefined,
  day?: number | null | undefined
): string => {
  let result = "";
  if (month) {
    result += month.toString().padStart(2, "0");
    if (day) {
      result += "/";
      result += day.toString().padStart(2, "0");
    }
  }
  return result;
};
