import { Link } from "components/Inputs/Link";
import { DatePickerFragment } from "graphql/generated";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  date: DatePickerFragment;
  title: string;
  url: string;
  isActive?: boolean;
}

export const ChroniclePreview = ({
  date,
  url,
  title,
  isActive,
}: Props): JSX.Element => (
  <Link
    href={url}
    className={cJoin(
      `flex w-full cursor-pointer gap-4 rounded-2xl py-4 px-5
      text-left align-top outline outline-2 outline-offset-[-2px] outline-mid transition-all
      hover:bg-mid hover:shadow-inner-sm hover:shadow-shade
      hover:outline-[transparent] hover:active:shadow-inner hover:active:shadow-shade`,
      cIf(isActive, "bg-mid shadow-inner-sm shadow-shade outline-[transparent]")
    )}
  >
    <div className="text-right">
      <p>{date.year}</p>
      <p className="text-sm text-dark">
        {prettyMonthDay(date.month, date.day)}
      </p>
    </div>
    <p className="text-lg leading-tight">{title}</p>
  </Link>
);

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
