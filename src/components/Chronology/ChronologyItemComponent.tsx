import styles from "styles/Chronology/ChronologyItemComponent.module.css";
import {
  ChronologyItem,
  ChronologyItemsEvent,
} from "queries/chronology/overview";

export type ChronologyItemComponentProps = {
  item: ChronologyItem;
  displayYear: boolean;
};

export default function ChronologyItemComponent(
  props: ChronologyItemComponentProps
) {
  function generateAnchor(
    year: number,
    month: number,
    day: number,
    event?: number
  ): string {
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
      className={styles.chronologyItem}
      id={generateAnchor(
        props.item.attributes.year,
        props.item.attributes.month,
        props.item.attributes.day
      )}
    >
      {props.displayYear ? (
        <p className={styles.year}>
          {generateYear(
            props.item.attributes.displayed_date,
            props.item.attributes.year
          )}
        </p>
      ) : (
        ""
      )}

      <p className={styles.date}>
        {generateDate(props.item.attributes.month, props.item.attributes.day)}
      </p>

      <div className={styles.events}>
        {props.item.attributes.events.map((event: ChronologyItemsEvent) => (
          <div className={styles.event} key={event.id}>
            {event.translations.map(
              (translation) => (
                <>
                  {translation.title ? <h3>{translation.title}</h3> : ""}

                  {translation.description ? (
                    <p
                      className={
                        event.translations.length > 1 ? styles.bulletItem : ""
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
              )
            )}

            <p className={styles.source}>
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
