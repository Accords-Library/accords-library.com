import styles from "styles/Chronology/ChronologyYearComponent.module.css";
import { ChronologyItem } from "queries/chronology/overview";
import ChronologyItemComponent from "components/Chronology/ChronologyItemComponent";

type ChronologyYearComponentProps = {
  items: ChronologyItem[];
};

export default function ChronologyYearComponent(
  props: ChronologyYearComponentProps
) {
  return (
    <div
      className={styles.chronologyYear}
      id={
        props.items.length > 1
          ? props.items[0].attributes.year.toString()
          : undefined
      }
    >
      {props.items.map((item: ChronologyItem, index: number) => (
        <ChronologyItemComponent
          key={index}
          item={item}
          displayYear={index === 0}
        />
      ))}
    </div>
  );
}
