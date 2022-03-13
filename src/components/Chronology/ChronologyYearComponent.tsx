import ChronologyItemComponent from "components/Chronology/ChronologyItemComponent";
import {
  GetChronologyItemsQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";

type ChronologyYearComponentProps = {
  year: number;
  items: GetChronologyItemsQuery["chronologyItems"]["data"][number][];
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
};

export default function ChronologyYearComponent(
  props: ChronologyYearComponentProps
): JSX.Element {
  const { langui } = props;

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
          langui={langui}
        />
      ))}
    </div>
  );
}
