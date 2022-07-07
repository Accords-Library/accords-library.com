import { ChronologyItemComponent } from "components/Wiki/Chronology/ChronologyItemComponent";
import { GetChronologyItemsQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  year: number;
  items: NonNullable<
    GetChronologyItemsQuery["chronologyItems"]
  >["data"][number][];
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ChronologyYearComponent = ({
  langui,
  year,
  items,
}: Props): JSX.Element => (
  <div
    className="rounded-2xl target:my-4 target:bg-mid target:py-4"
    id={items.length > 1 ? year.toString() : undefined}
  >
    {items.map((item, index) => (
      <ChronologyItemComponent
        key={index}
        item={item}
        displayYear={index === 0}
        langui={langui}
      />
    ))}
  </div>
);
