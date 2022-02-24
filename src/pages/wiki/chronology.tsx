import { GetStaticProps } from "next";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ChronologyYearComponent from "components/Chronology/ChronologyYearComponent";
import {
  GetChronologyItemsQuery,
  GetErasQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import {
  getEras,
  getChronologyItems,
  getWebsiteInterface,
} from "graphql/operations";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton from "components/PanelComponents/ReturnButton";
import HorizontalLine from "components/HorizontalLine";
import AppLayout from "components/AppLayout";
import { prettySlug } from "queries/helpers";
import InsetBox from "components/InsetBox";

interface DataChronologyProps {
  chronologyItems: GetChronologyItemsQuery;
  chronologyEras: GetErasQuery;
  langui: GetWebsiteInterfaceQuery;
}

export default function DataChronology(
  props: DataChronologyProps
): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const chronologyItems = props.chronologyItems.chronologyItems;
  const chronologyEras = props.chronologyEras.chronologyEras;

  // Group by year the Chronology items
  let chronologyItemYearGroups: GetChronologyItemsQuery["chronologyItems"]["data"][number][][][] =
    [];

  chronologyEras.data.map((era) => {
    chronologyItemYearGroups.push([]);
  });

  let currentChronologyEraIndex = 0;
  chronologyItems.data.map((item) => {
    if (
      item.attributes.year >
      chronologyEras.data[currentChronologyEraIndex].attributes.ending_year
    ) {
      currentChronologyEraIndex++;
    }
    if (
      !chronologyItemYearGroups[currentChronologyEraIndex].hasOwnProperty(
        item.attributes.year
      )
    ) {
      chronologyItemYearGroups[currentChronologyEraIndex][
        item.attributes.year
      ] = [item];
    } else {
      chronologyItemYearGroups[currentChronologyEraIndex][
        item.attributes.year
      ].push(item);
    }
  });

  const subPanel = (
    <SubPanel>
      <ReturnButton href="/data" title="Data" langui={langui} />
      <HorizontalLine />

      {props.chronologyEras.chronologyEras.data.map((era) => (
        <NavOption
          key={era.id}
          url={"#" + era.attributes.slug}
          title={
            era.attributes.title.length > 0
              ? era.attributes.title[0].title
              : prettySlug(era.attributes.slug)
          }
          subtitle={
            era.attributes.starting_year + " → " + era.attributes.ending_year
          }
          border
        />
      ))}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      {chronologyItemYearGroups.map((era, eraIndex) => (
        <>
          <InsetBox
            id={chronologyEras.data[eraIndex].attributes.slug}
            className="grid text-center my-8 gap-4"
          >
            <h2 className="text-2xl">
              {chronologyEras.data[eraIndex].attributes.title.length > 0
                ? chronologyEras.data[eraIndex].attributes.title[0].title
                : prettySlug(chronologyEras.data[eraIndex].attributes.slug)}
            </h2>
            <p className="whitespace-pre-line ">
              {chronologyEras.data[eraIndex].attributes.title.length > 0
                ? chronologyEras.data[eraIndex].attributes.title[0].description
                : ""}
            </p>
          </InsetBox>
          {era.map((items, index) => (
            <ChronologyYearComponent
              key={`${eraIndex}-${index}`}
              year={items[0].attributes.year}
              items={items}
            />
          ))}
        </>
      ))}
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle="Chronology"
      langui={langui}
      contentPanel={contentPanel}
      subPanel={subPanel}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: DataChronologyProps = {
      chronologyItems: await getChronologyItems({
        language_code: context.locale,
      }),
      chronologyEras: await getEras({ language_code: context.locale }),
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  }
  return { props: {} };
};
