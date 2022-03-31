import Chip from "components/Chip";
import ToolTip from "components/ToolTip";
import {
  Enum_Componenttranslationschronologyitem_Status,
  GetChronologyItemsQuery,
} from "graphql/generated";
import { AppStaticProps } from "queries/getAppStaticProps";
import { getStatusDescription } from "queries/helpers";

export type ChronologyItemComponentProps = {
  item: Exclude<
    GetChronologyItemsQuery["chronologyItems"],
    null | undefined
  >["data"][number];
  displayYear: boolean;
  langui: AppStaticProps["langui"];
};

export default function ChronologyItemComponent(
  props: ChronologyItemComponentProps
): JSX.Element {
  const { langui } = props;

  function generateAnchor(
    year: number | undefined,
    month: number | null | undefined,
    day: number | null | undefined
  ): string {
    let result = "";
    if (year) result += year;
    if (month) result += `- ${month.toString().padStart(2, "0")}`;
    if (day) result += `- ${day.toString().padStart(2, "0")}`;
    return result;
  }

  function generateYear(
    displayed_date: string | null | undefined,
    year: number | undefined
  ): string {
    return displayed_date ?? year?.toString() ?? "";
  }

  function generateDate(
    month: number | null | undefined,
    day: number | null | undefined
  ): string {
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
  }

  if (props.item.attributes) {
    return (
      <div
        className="grid place-content-start grid-rows-[auto_1fr] grid-cols-[4em] py-4 px-8 rounded-2xl target:bg-mid target:py-8 target:my-4"
        id={generateAnchor(
          props.item.attributes.year,
          props.item.attributes.month,
          props.item.attributes.day
        )}
      >
        {props.displayYear && (
          <p className="text-lg mt-[-.2em] font-bold">
            {generateYear(
              props.item.attributes.displayed_date,
              props.item.attributes.year
            )}
          </p>
        )}

        <p className="col-start-1 text-dark text-sm">
          {generateDate(props.item.attributes.month, props.item.attributes.day)}
        </p>

        <div className="col-start-2 row-start-1 row-span-2 grid gap-4">
          {props.item.attributes.events?.map((event) => (
            <>
              {event && (
                <div className="m-0" key={event.id}>
                  {event.translations?.map((translation) => (
                    <>
                      {translation && (
                        <>
                          <div className="place-items-start place-content-start grid grid-flow-col gap-2">
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
                                event.translations &&
                                event.translations.length > 1
                                  ? "before:content-['-'] before:text-dark before:inline-block before:w-4 before:ml-[-1em] mt-2 whitespace-pre-line"
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
                        </>
                      )}
                    </>
                  ))}

                  <p className="text-dark text-xs grid place-self-start grid-flow-col gap-1 mt-1">
                    {event.source?.data ? (
                      `(${event.source.data.attributes?.name})`
                    ) : (
                      <>
                        <span className="material-icons !text-sm">warning</span>
                        No sources!
                      </>
                    )}
                  </p>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }

  return <></>;
}
