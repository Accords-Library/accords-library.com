import styles from "styles/Chronology/ChronologyItemDisplay.module.css";
import {
    ChronologyItem,
    ChronologyItemsEvent,
  } from "queries/chronology/overview";


export default function ChronologyItemDisplay(pageProps: ChronologyItem) {

    function generateAnchor(year: number, month: number, day:number, event?: number): string {
        let result: string = "";
        result += year;
        if (month) result += '-' + month;
        if (day) result += '-' + day;
        return result;
    }

    function generateDate(displayed_date: string, year: number, month: number, day:number) {
        let result: string = "";
        if (displayed_date) {
            result += displayed_date;
        } else {
            result += year;
        }
        if (month) result += '/' + month;
        if (day) result += '/' + day;
        return result;
    }

  return (
    <div id={generateAnchor(item.attributes.year, item.attributes.month, item.attributes.day)}>
    <h2>{generateDate(item.attributes.displayed_date, item.attributes.year, item.attributes.month, item.attributes.day)}</h2>
    {item.attributes.events.map((event: ChronologyItemsEvent) => (
      <div key={"chronoEvent" + event.id}>
        <h3>
          {event.translations.length ? event.translations[0].title : ""}
        </h3>
        <p>
          {event.translations.length
            ? event.translations[0].description
            : ""}
          <em> {event.translations.length ? event.translations[0].note : ""}</em>
        </p>
        <p>
          <em>{event.source.data ? event.source.data.attributes.name : ""}</em>
        </p>
      </div>
    ))}
  </div>
  );
}
