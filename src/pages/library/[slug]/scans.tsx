import { AppLayout } from "components/AppLayout";
import { ScanSet } from "components/Library/ScanSet";
import { ScanSetCover } from "components/Library/ScanSetCover";
import { NavOption } from "components/PanelComponents/NavOption";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { GetLibraryItemScansQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";
import { filterHasAttributes, isDefined, sortContent } from "helpers/others";

import { useLightBox } from "hooks/useLightBox";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useMemo } from "react";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {
  item: NonNullable<
    NonNullable<
      GetLibraryItemScansQuery["libraryItems"]
    >["data"][number]["attributes"]
  >;
  itemId: NonNullable<
    NonNullable<GetLibraryItemScansQuery["libraryItems"]>["data"][number]["id"]
  >;
}

const LibrarySlug = ({
  item,
  langui,
  languages,
  ...otherProps
}: Props): JSX.Element => {
  const [openLightBox, LightBox] = useLightBox();
  sortContent(item.contents);

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href={`/library/${item.slug}`}
          title={langui.item}
          langui={langui}
          displayOn={ReturnButtonType.Desktop}
          horizontalLine
        />

        {item.contents?.data.map((content) => (
          <NavOption
            key={content.id}
            url={`#${content.attributes?.slug}`}
            title={prettySlug(content.attributes?.slug, item.slug)}
            subtitle={
              content.attributes?.range[0]?.__typename ===
              "ComponentRangePageRange"
                ? `${content.attributes.range[0].starting_page}` +
                  `→` +
                  `${content.attributes.range[0].ending_page}`
                : undefined
            }
            border
          />
        ))}
      </SubPanel>
    ),
    [item.contents?.data, item.slug, langui]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <LightBox />

        <ReturnButton
          href={`/library/${item.slug}`}
          title={langui.item}
          langui={langui}
          displayOn={ReturnButtonType.Mobile}
          className="mb-10"
        />

        {item.images && (
          <ScanSetCover
            images={item.images}
            openLightBox={openLightBox}
            languages={languages}
            langui={langui}
          />
        )}

        {item.contents?.data.map((content) => (
          <Fragment key={content.id}>
            {content.attributes?.scan_set?.[0] && (
              <ScanSet
                scanSet={content.attributes.scan_set}
                openLightBox={openLightBox}
                slug={content.attributes.slug}
                title={prettySlug(content.attributes.slug, item.slug)}
                languages={languages}
                langui={langui}
                content={content.attributes.content}
              />
            )}
          </Fragment>
        ))}
      </ContentPanel>
    ),
    [
      LightBox,
      openLightBox,
      item.contents?.data,
      item.images,
      item.slug,
      languages,
      langui,
    ]
  );

  return (
    <AppLayout
      navTitle={prettyinlineTitle("", item.title, item.subtitle)}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={item.thumbnail?.data?.attributes ?? undefined}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default LibrarySlug;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const item = await sdk.getLibraryItemScans({
    slug:
      context.params && isDefined(context.params.slug)
        ? context.params.slug.toString()
        : "",
    language_code: context.locale ?? "en",
  });
  if (!item.libraryItems?.data[0]?.attributes || !item.libraryItems.data[0]?.id)
    return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    item: item.libraryItems.data[0].attributes,
    itemId: item.libraryItems.data[0].id,
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const libraryItems = await sdk.getLibraryItemsSlugs({});
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(libraryItems.libraryItems?.data).map((item) => {
    context.locales?.map((local) =>
      paths.push({ params: { slug: item.attributes.slug }, locale: local })
    );
  });

  return {
    paths,
    fallback: "blocking",
  };
};
