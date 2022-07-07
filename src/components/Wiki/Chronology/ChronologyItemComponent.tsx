import { Fragment } from "react";
import { Chip } from "components/Chip";
import { Ico, Icon } from "components/Ico";
import { ToolTip } from "components/ToolTip";
import {
  Enum_Componenttranslationschronologyitem_Status,
  GetChronologyItemsQuery,
} from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import {
  filterDefined,
  filterHasAttributes,
  getStatusDescription,
} from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  item: NonNullable<GetChronologyItemsQuery["chronologyItems"]>["data"][number];
  displayYear: boolean;
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ChronologyItemComponent = ({
  langui,
  item,
  displayYear,
}: Props): JSX.Element => {
  if (item.attributes) {
    return (
      <div
        className="grid grid-cols-[4em] grid-rows-[auto_1fr] place-content-start
        rounded-2xl py-4 px-8 target:my-4 target:bg-mid target:py-8"
        id={generateAnchor(
          item.attributes.year,
          item.attributes.month,
          item.attributes.day
        )}
      >
        {displayYear && (
          <p className="mt-[-.2em] text-lg font-bold">
            {generateYear(item.attributes.displayed_date, item.attributes.year)}
          </p>
        )}

        <p className="col-start-1 text-sm text-dark">
          {generateDate(item.attributes.month, item.attributes.day)}
        </p>

        <div className="col-start-2 row-span-2 row-start-1 grid gap-4">
          {item.attributes.events &&
            filterHasAttributes(item.attributes.events, [
              "id",
              "translations",
            ]).map((event) => (
              <Fragment key={event.id}>
                <div className="m-0">
                  {filterDefined(event.translations).map(
                    (translation, translationIndex) => (
                      <Fragment key={translationIndex}>
                        <Fragment>
                          <div
                            className="grid
                            grid-flow-col place-content-start place-items-start gap-2"
                          >
                            {translation.status !==
                              Enum_Componenttranslationschronologyitem_Status.Done && (
                              <ToolTip
                                content={getStatusDescription(
                                  translation.status,
                                  langui
                                )}
                                maxWidth={"20rem"}
                              >
                                <Chip>{translation.status}</Chip>
                              </ToolTip>
                            )}
                            {translation.title ? (
                              <h3>{translation.title}</h3>
                            ) : (
                              ""
                            )}
                          </div>

                          {translation.description && (
                            <p
                              className={
                                event.translations.length > 1
                                  ? `mt-2 whitespace-pre-line before:ml-[-1em] before:inline-block
                                  before:w-4 before:text-dark before:content-['-']`
                                  : "whitespace-pre-line"
                              }
                            >
                              {translation.description}
                            </p>
                          )}
                          {translation.note ? (
                            <em>{`Notes: ${translation.note}`}</em>
                          ) : (
                            ""
                          )}
                        </Fragment>
                      </Fragment>
                    )
                  )}

                  <p className="mt-1 grid grid-flow-col gap-1 place-self-start text-xs text-dark">
                    {event.source?.data ? (
                      `(${event.source.data.attributes?.name})`
                    ) : (
                      <div className="flex items-center gap-1">
                        <Ico icon={Icon.Warning} className="!text-sm" />
                        No sources!
                      </div>
                    )}
                  </p>
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    );
  }

  return <></>;
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const generateAnchor = (
  year: number | undefined,
  month: number | null | undefined,
  day: number | null | undefined
): string => {
  let result = "";
  if (year) result += year;
  if (month) result += `- ${month.toString().padStart(2, "0")}`;
  if (day) result += `- ${day.toString().padStart(2, "0")}`;
  return result;
};

const generateYear = (
  displayed_date: string | null | undefined,
  year: number | undefined
): string => displayed_date ?? year?.toString() ?? "";

const generateDate = (
  month: number | null | undefined,
  day: number | null | undefined
): string => {
  const lut = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let result = "";
  if (month && month >= 1 && month <= 12) {
    result += lut[month - 1];
    if (day) {
      result += ` ${day}`;
    }
  }

  return result;
};
