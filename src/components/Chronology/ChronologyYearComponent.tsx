import styles from "styles/Chronology/ChronologyYearComponent.module.css";
import {
  ChronologyItem
} from "queries/chronology/overview";
import ChronologyItemComponent from "components/Chronology/ChronologyItemComponent";

type ChronologyYearComponentProps = {
    items: ChronologyItem[];
}

export default function ChronologyYearComponent(props: ChronologyYearComponentProps) {
  return (
    <div>
      {props.items.map((item: ChronologyItem, index: number) => (
        <ChronologyItemComponent
          key={item.id}
          id={item.id}
          attributes={item.attributes}
        />
      ))}
    </div>
  );
}
