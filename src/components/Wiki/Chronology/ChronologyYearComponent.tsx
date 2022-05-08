import ChronologyItemComponent from "components/Wiki/Chronology/ChronologyItemComponent";
import { GetChronologyItemsQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";

interface Props {
  year: number;
  items: Exclude<
    GetChronologyItemsQuery["chronologyItems"],
    null | undefined
  >["data"][number][];
  langui: AppStaticProps["langui"];
}

export default function ChronologyYearComponent(
  props: Immutable<Props>
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
