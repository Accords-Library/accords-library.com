import styles from "styles/Chronology/ChronologyYearComponent.module.css";
import ChronologyItemComponent from "components/Chronology/ChronologyItemComponent";
import { ChronologyItemEntity } from "graphql/operations-types";

type ChronologyYearComponentProps = {
  year: number;
  items: ChronologyItemEntity[];
};

export default function ChronologyYearComponent(
  props: ChronologyYearComponentProps
): JSX.Element {
  return (
    <div
      className={styles.chronologyYear}
      id={props.items.length > 1 ? props.year.toString() : undefined}
    >
      {props.items.map((item: ChronologyItemEntity, index: number) => (
        <ChronologyItemComponent
          key={index}
          item={item}
          displayYear={index === 0}
        />
      ))}
    </div>
  );
}
