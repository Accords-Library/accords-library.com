import AppLayout from "components/AppLayout";
import InsetBox from "components/InsetBox";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ChronologyYearComponent from "components/Wiki/Chronology/ChronologyYearComponent";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetChronologyItemsQuery, GetErasQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettySlug } from "queries/helpers";

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
