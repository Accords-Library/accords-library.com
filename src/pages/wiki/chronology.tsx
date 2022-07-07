import { GetStaticProps } from "next";
import { Fragment, useMemo } from "react";
import { AppLayout } from "components/AppLayout";
import { InsetBox } from "components/InsetBox";
import { NavOption } from "components/PanelComponents/NavOption";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { ChronologyYearComponent } from "components/Wiki/Chronology/ChronologyYearComponent";
import { GetChronologyItemsQuery, GetErasQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettySlug } from "helpers/formatters";
import { filterHasAttributes, isDefined } from "helpers/others";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {
  chronologyItems: NonNullable<
    GetChronologyItemsQuery["chronologyItems"]
  >["data"];
  chronologyEras: NonNullable<GetErasQuery["chronologyEras"]>["data"];
}

const Chronology = ({
  chronologyItems,
  chronologyEras,
  langui,
  ...otherProps
}: Props): JSX.Element => {
  // Group by year the Chronology items
  const chronologyItemYearGroups = useMemo(() => {
    const memo: Props["chronologyItems"][number][][][] = [];
    chronologyEras.map(() => {
      memo.push([]);
    });

    let currentChronologyEraIndex = 0;
    chronologyItems.map((item) => {
      if (item.attributes) {
        if (
          item.attributes.year >
          (chronologyEras[currentChronologyEraIndex].attributes?.ending_year ??
            999999)
        ) {
          currentChronologyEraIndex++;
        }
        if (
          Object.hasOwn(memo[currentChronologyEraIndex], item.attributes.year)
        ) {
          memo[currentChronologyEraIndex][item.attributes.year].push(item);
        } else {
          memo[currentChronologyEraIndex][item.attributes.year] = [item];
        }
      }
    });
    return memo;
  }, [chronologyEras, chronologyItems]);

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href="/wiki"
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Desktop}
          horizontalLine
        />

        {filterHasAttributes(chronologyEras).map((era) => (
          <Fragment key={era.id}>
            <NavOption
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
            />
          </Fragment>
        ))}
      </SubPanel>
    ),
    [chronologyEras, langui]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel>
        <ReturnButton
          href="/wiki"
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Mobile}
          className="mb-10"
        />

        {chronologyItemYearGroups.map((era, eraIndex) => (
          <Fragment key={eraIndex}>
            <InsetBox
              id={chronologyEras[eraIndex].attributes?.slug}
              className="my-8 grid gap-4 text-center"
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
              <Fragment key={index}>
                {items[0].attributes && isDefined(items[0].attributes.year) && (
                  <ChronologyYearComponent
                    year={items[0].attributes.year}
                    items={items}
                    langui={langui}
                  />
                )}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </ContentPanel>
    ),
    [chronologyEras, chronologyItemYearGroups, langui]
  );

  return (
    <AppLayout
      navTitle={langui.chronology}
      contentPanel={contentPanel}
      subPanel={subPanel}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Chronology;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
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
};
