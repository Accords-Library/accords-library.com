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
import {
  prettySlug,
  prettyTestError,
  prettyTestWarning,
} from "queries/helpers";
import InsetBox from "components/InsetBox";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";

interface DataChronologyProps {
  chronologyItems: GetChronologyItemsQuery;
  chronologyEras: GetErasQuery;
  langui: GetWebsiteInterfaceQuery;
}

export default function DataChronology(
  props: DataChronologyProps
): JSX.Element {
  useTesting(props);
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const chronologyItems = props.chronologyItems.chronologyItems;
  const chronologyEras = props.chronologyEras.chronologyEras;

  // Group by year the Chronology items
  let chronologyItemYearGroups: GetChronologyItemsQuery["chronologyItems"]["data"][number][][][] =
    [];

  chronologyEras.data.map(() => {
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

      <ReactTooltip
        id="ChronologyTooltip"
        place="top"
        type="light"
        effect="solid"
        delayShow={50}
        clickable={true}
        className="drop-shadow-shade-xl !opacity-100 mobile:after:!border-r-light !bg-light !rounded-lg desktop:after:!border-t-light text-left !text-black max-w-xs"
      />
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

function useTesting({ chronologyItems, chronologyEras }: DataChronologyProps) {
  const router = useRouter();
  chronologyEras.chronologyEras.data.map((era) => {
    const chronologyErasURL =
      "/admin/content-manager/collectionType/api::chronology-era.chronology-era/" +
      chronologyItems.chronologyItems.data[0].id;

    if (era.attributes.title.length === 0) {
      prettyTestError(
        router,
        "Missing translation for title and description, using slug instead",
        ["chronologyEras", era.attributes.slug],
        chronologyErasURL
      );
    } else if (era.attributes.title.length > 1) {
      prettyTestError(
        router,
        "More than one title and description",
        ["chronologyEras", era.attributes.slug],
        chronologyErasURL
      );
    } else {
      if (!era.attributes.title[0].title)
        prettyTestError(
          router,
          "Missing title, using slug instead",
          ["chronologyEras", era.attributes.slug],
          chronologyErasURL
        );
      if (!era.attributes.title[0].description)
        prettyTestError(
          router,
          "Missing description",
          ["chronologyEras", era.attributes.slug],
          chronologyErasURL
        );
    }
  });

  chronologyItems.chronologyItems.data.map((item) => {
    const chronologyItemsURL =
      "/admin/content-manager/collectionType/api::chronology-item.chronology-item/" +
      chronologyItems.chronologyItems.data[0].id;

    const date = `${item.attributes.year}/${item.attributes.month}/${item.attributes.day}`;

    if (!(item.attributes.events.length > 0)) {
      prettyTestError(
        router,
        "No events for this date",
        ["chronologyItems", date],
        chronologyItemsURL
      );
    } else {
      item.attributes.events.map((event) => {
        if (!event.source.data) {
          prettyTestError(
            router,
            "No source for this event",
            ["chronologyItems", date, event.id],
            chronologyItemsURL
          );
        }
        if (!(event.translations.length > 0)) {
          prettyTestWarning(
            router,
            "No translation for this event",
            ["chronologyItems", date, event.id],
            chronologyItemsURL
          );
        }
      });
    }
  });
}
