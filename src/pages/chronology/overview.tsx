import { GetStaticProps } from "next";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/Panels/ReturnButton";
import NavOption from "components/Panels/NavOption";
import ChronologyYearComponent from "components/Chronology/ChronologyYearComponent";
import {
  getChronologyItems,
  getChronologyEras,
  ChronologyItem,
  ChronologyItemsEvent,
} from "queries/chronology/overview";
import { applyCustomAppProps } from "pages/_app";
import { ChronologyEraEntityResponseCollection } from "queries/types";

type Props = {
  chronologyItems: ChronologyItem[];
  chronologyEras: ChronologyEraEntityResponseCollection;
};

applyCustomAppProps(ChronologyOverview, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function ChronologyOverview(props: Props): JSX.Element {
  // Group by year the Chronology items
  let chronologyItemYearGroups: ChronologyItem[][] = [];
  props.chronologyItems.map((item: ChronologyItem) => {
    if (!chronologyItemYearGroups.hasOwnProperty(item.attributes.year)) {
      chronologyItemYearGroups[item.attributes.year] = [item];
    } else {
      chronologyItemYearGroups[item.attributes.year].push(item);
    }
  });

  return (
    <>
      <SubPanel>

        <ReturnButton url="/chronology" title="Chronology" />
        <hr />

        {props.chronologyEras.data.map((era) => (
          <NavOption
            key={era.id}
            url={"#" + era.attributes.slug}
            title={
              era.attributes.title.length ? era.attributes.title[0].title : ""
            }
            subtitle={
              era.attributes.starting_year + " → " + era.attributes.ending_year
            }
            border={true}
          />
        ))}
      </SubPanel>

      <ContentPanel>
        {props.chronologyItems.map((item: ChronologyItem) => {
          if (!item.attributes.year)
            console.warn("Missing year on ChronologyItem (" + item.id + ")");
          item.attributes.events.map((event: ChronologyItemsEvent) => {
            if (!event.source.data) {
              console.warn(
                "Missing Source on ChronologyItem (" +
                  item.id +
                  "), Event (" +
                  event.id +
                  ")"
              );
            }
            if (event.translations.length < 1) {
              console.warn(
                "Missing Translation on ChronologyItem (" +
                  item.id +
                  "), Event (" +
                  event.id +
                  ")"
              );
            }
          });
        })}

        {chronologyItemYearGroups.map(
          (items: ChronologyItem[], index: number) => {
            return <ChronologyYearComponent key={index} items={items} />;
          }
        )}
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      chronologyItems: await getChronologyItems(context.locale),
      chronologyEras: await getChronologyEras(context.locale),
    },
  };
};
