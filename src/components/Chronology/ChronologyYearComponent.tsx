import ChronologyItemComponent from "components/Chronology/ChronologyItemComponent";
import { GetChronologyItemsQuery } from "graphql/operations-types";

type ChronologyYearComponentProps = {
  year: number;
  items: GetChronologyItemsQuery["chronologyItems"]["data"][number][];
};

export default function ChronologyYearComponent(
  props: ChronologyYearComponentProps
): JSX.Element {
  return (
    <div
      className="target:bg-mid rounded-2xl target:py-4 target:my-4"
      id={props.items.length > 1 ? props.year.toString() : undefined}
    >
      {props.items.map((item, index) => (
        <ChronologyItemComponent
          key={index}
          item={item}
          displayYear={index === 0}
        />
      ))}
    </div>
  );
}
