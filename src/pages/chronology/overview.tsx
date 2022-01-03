import { GetStaticProps } from "next";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ChronologyYearComponent from "components/Chronology/ChronologyYearComponent";
import { applyCustomAppProps } from "pages/_app";
import {
  GetChronologyItemsQuery,
  GetErasQuery,
} from "graphql/operations-types";
import { getEras, getChronologyItems } from "graphql/operations";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton from "components/PanelComponents/ReturnButton";

interface Props {
  chronologyItems: GetChronologyItemsQuery;
  chronologyEras: GetErasQuery;
}

applyCustomAppProps(ChronologyOverview, {
  useSubPanel: true,
  useContentPanel: true,
});

export default function ChronologyOverview(props: Props): JSX.Element {
  // Group by year the Chronology items

  let chronologyItemYearGroups: GetChronologyItemsQuery["chronologyItems"]["data"][number][][] =
    [];

  if (props.chronologyItems.chronologyItems) {
    props.chronologyItems.chronologyItems.data.map((item) => {
      if (!chronologyItemYearGroups.hasOwnProperty(item.attributes.year)) {
        chronologyItemYearGroups[item.attributes.year] = [item];
      } else {
        chronologyItemYearGroups[item.attributes.year].push(item);
      }
    });
  }

  return (
    <>
      <SubPanel>
        <ReturnButton url="/chronology" title="Chronology" />
        <hr />

        {props.chronologyEras.chronologyEras.data.map((era) => (
          <NavOption
            key={era.id}
            url={"#" + era.attributes.slug}
            title={era.attributes.title[0] ? era.attributes.title[0].title : ""}
            subtitle={
              era.attributes.starting_year + " → " + era.attributes.ending_year
            }
            border={true}
          />
        ))}
      </SubPanel>

      <ContentPanel>
        {chronologyItemYearGroups.map((items, index: number) => {
          if (items && items[0].attributes.year) {
            return (
              <ChronologyYearComponent
                key={index}
                year={items[0].attributes.year}
                items={items}
              />
            );
          }
        })}
      </ContentPanel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale)
    return {
      props: {
        chronologyItems: await getChronologyItems({
          language_code: context.locale,
        }),
        chronologyEras: await getEras({ language_code: context.locale }),
      },
    };
  else {
    return { props: {} };
  }
};
