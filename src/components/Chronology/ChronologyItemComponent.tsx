import { ChronologyItemEntity, Maybe } from "graphql/operations-types";
import styles from "styles/Chronology/ChronologyItemComponent.module.css";

export type ChronologyItemComponentProps = {
  item: ChronologyItemEntity;
  displayYear: boolean;
};

export default function ChronologyItemComponent(
  props: ChronologyItemComponentProps
): JSX.Element {
  function generateAnchor(
    year: number,
    month: Maybe<number> | undefined,
    day: Maybe<number> | undefined
  ): string {
    let result: string = "";
    result += year;
    if (month) result += "-" + month.toString().padStart(2, "0");
    if (day) result += "-" + day.toString().padStart(2, "0");
    return result;
  }

  function generateYear(
    displayed_date: Maybe<string> | undefined,
    year: number
  ): string {
    if (displayed_date) {
      return displayed_date;
    } else {
      return year.toString();
    }
  }

  function generateDate(
    month: Maybe<number> | undefined,
    day: Maybe<number> | undefined
  ): string {
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

  if (props.item && props.item.attributes) {
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
          {props.item.attributes.events?.map((event) => {
            if (event) {
              return (
                <div className={styles.event} key={event.id}>
                  {event.translations?.map((translation) => {
                    if (translation)
                      return (
                        <>
                          {translation.title ? (
                            <h3>{translation.title}</h3>
                          ) : (
                            ""
                          )}

                          {translation.description ? (
                            <p
                              className={
                                event.translations &&
                                event.translations.length > 1
                                  ? styles.bulletItem
                                  : ""
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
                      );
                  })}

                  <p className={styles.source}>
                    {event.source &&
                    event.source.data &&
                    event.source.data.attributes
                      ? "(" + event.source.data.attributes.name + ")"
                      : "(WARNING: NO SOURCE!)"}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
