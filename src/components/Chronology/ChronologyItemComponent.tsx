import styles from "styles/Chronology/ChronologyItemComponent.module.css";
import {
  ChronologyItem,
  ChronologyItemsEvent,
  ChronologyItemsEventTranslation,
} from "queries/chronology/overview";

export default function ChronologyItemComponent(pageProps: ChronologyItem) {
  function generateAnchor(
    year: number,
    month: number,
    day: number,
    event?: number
  ): string {
    let result: string = "";
    result += year;
    if (month) result += "-" + month;
    if (day) result += "-" + day;
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
    let result: string = "";
    if (month) result += month.toString().padStart(2, "0");
    if (day) result += "/" + day.toString().padStart(2, "0");
    return result;
  }

  return (
    <div
      className={styles.chronologyItem}
      id={generateAnchor(
        pageProps.attributes.year,
        pageProps.attributes.month,
        pageProps.attributes.day
      )}
    >
      <p className={styles.year}>
        {generateYear(
          pageProps.attributes.displayed_date,
          pageProps.attributes.year
        )}
      </p>

      <p className={styles.date}>
        {generateDate(pageProps.attributes.month, pageProps.attributes.day)}
      </p>

      <div className={styles.events}>
        {pageProps.attributes.events.map((event: ChronologyItemsEvent) => (
          <div className={styles.event} key={event.id}>
            {event.translations.map(
              (translation: ChronologyItemsEventTranslation) => (
                <>
                  <h3>{translation.title}</h3>
                  <p className={event.translations.length > 1 ? styles.bulletItem : ""}>
                    {translation.description}
                    <em> {translation.note}</em>
                  </p>
                </>
              )
            )}

            <p className={styles.source}>
              {event.source.data
                ? "(" + event.source.data.attributes.name + ")"
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
