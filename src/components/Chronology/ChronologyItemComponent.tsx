import { GetChronologyItemsQuery } from "graphql/operations-types";

export type ChronologyItemComponentProps = {
  item: GetChronologyItemsQuery["chronologyItems"]["data"][number];
  displayYear: boolean;
};

export default function ChronologyItemComponent(
  props: ChronologyItemComponentProps
): JSX.Element {
  function generateAnchor(year: number, month: number, day: number): string {
    let result: string = "";
    result += year;
    if (month) result += "-" + month.toString().padStart(2, "0");
    if (day) result += "-" + day.toString().padStart(2, "0");
    return result;
  }

  function generateYear(displayed_date: string, year: number): string {
    if (displayed_date) {
      return displayed_date;
    } else {
      return year.toString();
    }
  }

  function generateDate(month: number, day: number): string {
    let lut = [
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

    let result: string = "";
    if (month) {
      result += lut[month - 1];
      if (day) {
        result += " " + day;
      }
    }

    return result;
  }

  return (
    <div
      className="grid place-content-start grid-rows-[auto_1fr] grid-cols-[4em] py-4 px-8 rounded-2xl target:bg-mid target:py-8 target:my-4"
      id={generateAnchor(
        props.item.attributes.year,
        props.item.attributes.month,
        props.item.attributes.day
      )}
    >
      {props.displayYear ? (
        <p className="text-lg mt-[-.2em] font-bold">
          {generateYear(
            props.item.attributes.displayed_date,
            props.item.attributes.year
          )}
        </p>
      ) : (
        ""
      )}

      <p className="col-start-1 text-dark text-sm">
        {generateDate(props.item.attributes.month, props.item.attributes.day)}
      </p>

      <div className="col-start-2 row-start-1 row-span-2 grid gap-4">
        {props.item.attributes.events.map((event) => (
          <div className="m-0" key={event.id}>
            {event.translations.map((translation) => (
              <>
                {translation.title ? <h3>{translation.title}</h3> : ""}

                {translation.description ? (
                  <p
                    className={
                      event.translations.length > 1
                        ? "before:content-['-'] before:text-dark before:inline-block before:w-4 before:ml-[-1em] mt-2 whitespace-pre-line"
                        : "whitespace-pre-line"
                    }
                  >
                    {translation.description}
                  </p>
                ) : (
                  ""
                )}
                {translation.note ? (
                  <em>{"Notes: " + translation.note}</em>
                ) : (
                  ""
                )}
              </>
            ))}

            <p className="text-dark text-xs">
              {event.source.data
                ? "(" + event.source.data.attributes.name + ")"
                : "(WARNING: NO SOURCE!)"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
