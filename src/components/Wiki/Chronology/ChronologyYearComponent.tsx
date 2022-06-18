import { ChronologyItemComponent } from "components/Wiki/Chronology/ChronologyItemComponent";
import { GetChronologyItemsQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";

interface Props {
  year: number;
  items: NonNullable<
    GetChronologyItemsQuery["chronologyItems"]
  >["data"][number][];
  langui: AppStaticProps["langui"];
}

export function ChronologyYearComponent(props: Props): JSX.Element {
  const { langui } = props;

  return (
    <div
      className="rounded-2xl target:my-4 target:bg-mid target:py-4"
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
