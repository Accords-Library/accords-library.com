import AppLayout from "components/AppLayout";
import ChronologyYearComponent from "components/Chronology/ChronologyYearComponent";
import InsetBox from "components/InsetBox";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetChronologyItemsQuery, GetErasQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import {
  prettySlug,
  prettyTestError,
  prettyTestWarning,
} from "queries/helpers";

interface Props extends AppStaticProps {
  chronologyItems: Exclude<
    GetChronologyItemsQuery["chronologyItems"],
    null | undefined
  >["data"];
  chronologyEras: Exclude<
    GetErasQuery["chronologyEras"],
    null | undefined
  >["data"];
}

export default function Chronology(props: Props): JSX.Element {
  useTesting(props);
  const { chronologyItems, chronologyEras, langui } = props;
  const appLayout = useAppLayout();

  // Group by year the Chronology items
  const chronologyItemYearGroups: Props["chronologyItems"][number][][][] = [];

  chronologyEras.map(() => {
    chronologyItemYearGroups.push([]);
  });

  let currentChronologyEraIndex = 0;
  chronologyItems.map((item) => {
    if (item.attributes) {
      if (
        item.attributes.year >
        (chronologyEras[currentChronologyEraIndex].attributes?.ending_year ??
          999999)
      ) {
        currentChronologyEraIndex += 1;
      }
      if (
        Object.prototype.hasOwnProperty.call(
          chronologyItemYearGroups[currentChronologyEraIndex],
          item.attributes.year
        )
      ) {
        chronologyItemYearGroups[currentChronologyEraIndex][
          item.attributes.year
        ].push(item);
      } else {
        chronologyItemYearGroups[currentChronologyEraIndex][
          item.attributes.year
        ] = [item];
      }
    }
  });

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/wiki"
        title={langui.wiki}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />

      {chronologyEras.map((era) => (
        <>
          {era.attributes && (
            <NavOption
              key={era.id}
              url={`#${era.attributes.slug}`}
              title={
                era.attributes.title &&
                era.attributes.title.length > 0 &&
                era.attributes.title[0]
                  ? era.attributes.title[0].title
                  : prettySlug(era.attributes.slug)
              }
              subtitle={`${era.attributes.starting_year} → ${era.attributes.ending_year}`}
              border
              onClick={() => appLayout.setSubPanelOpen(false)}
            />
          )}
        </>
      ))}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/wiki"
        title={langui.wiki}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />

      {chronologyItemYearGroups.map((era, eraIndex) => (
        <>
          <InsetBox
            id={chronologyEras[eraIndex].attributes?.slug}
            className="grid text-center my-8 gap-4"
          >
            <h2 className="text-2xl">
              {chronologyEras[eraIndex].attributes?.title?.[0]
                ? chronologyEras[eraIndex].attributes?.title?.[0]?.title
                : prettySlug(chronologyEras[eraIndex].attributes?.slug)}
            </h2>
            <p className="whitespace-pre-line ">
              {chronologyEras[eraIndex].attributes?.title?.[0]
                ? chronologyEras[eraIndex].attributes?.title?.[0]?.description
                : ""}
            </p>
          </InsetBox>
          {era.map((items, index) => (
            <>
              {items[0].attributes?.year && (
                <ChronologyYearComponent
                  key={`${eraIndex}-${index}`}
                  year={items[0].attributes.year}
                  items={items}
                  langui={langui}
                />
              )}
            </>
          ))}
        </>
      ))}
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={langui.chronology}
      contentPanel={contentPanel}
      subPanel={subPanel}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const chronologyItems = await sdk.getChronologyItems({
    language_code: context.locale ?? "en",
  });
  const chronologyEras = await sdk.getEras({
    language_code: context.locale ?? "en",
  });
  if (!chronologyItems.chronologyItems || !chronologyEras.chronologyEras)
    return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    chronologyItems: chronologyItems.chronologyItems.data,
    chronologyEras: chronologyEras.chronologyEras.data,
  };
  return {
    props: props,
  };
}

function useTesting(props: Props) {
  const router = useRouter();
  const { chronologyItems, chronologyEras } = props;
  chronologyEras.map((era) => {
    const chronologyErasURL = `/admin/content-manager/collectionType/api::chronology-era.chronology-era/${chronologyItems[0].id}`;

    if (era.attributes?.title?.length === 0) {
      prettyTestError(
        router,
        "Missing translation for title and description, using slug instead",
        ["chronologyEras", era.attributes.slug],
        chronologyErasURL
      );
    } else if (era.attributes?.title && era.attributes.title.length > 1) {
      prettyTestError(
        router,
        "More than one title and description",
        ["chronologyEras", era.attributes.slug],
        chronologyErasURL
      );
    } else {
      if (!era.attributes?.title?.[0]?.title)
        prettyTestError(
          router,
          "Missing title, using slug instead",
          ["chronologyEras", era.attributes?.slug ?? ""],
          chronologyErasURL
        );
      if (!era.attributes?.title?.[0]?.description)
        prettyTestError(
          router,
          "Missing description",
          ["chronologyEras", era.attributes?.slug ?? ""],
          chronologyErasURL
        );
    }
  });

  chronologyItems.map((item) => {
    const chronologyItemsURL = `/admin/content-manager/collectionType/api::chronology-item.chronology-item/${chronologyItems[0].id}`;

    const date = `${item.attributes?.year}/${item.attributes?.month}/${item.attributes?.day}`;

    if (item.attributes?.events && item.attributes.events.length > 0) {
      item.attributes.events.map((event) => {
        if (!event?.source?.data) {
          prettyTestError(
            router,
            "No source for this event",
            ["chronologyItems", date, event?.id ?? ""],
            chronologyItemsURL
          );
        }
        if (!(event?.translations && event.translations.length > 0)) {
          prettyTestWarning(
            router,
            "No translation for this event",
            ["chronologyItems", date, event?.id ?? ""],
            chronologyItemsURL
          );
        }
      });
    } else {
      prettyTestError(
        router,
        "No events for this date",
        ["chronologyItems", date],
        chronologyItemsURL
      );
    }
  });
}
