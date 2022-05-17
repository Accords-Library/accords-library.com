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
import { sortContent } from "helpers/others";
import { Immutable } from "helpers/types";
import { useLightBox } from "hooks/useLightBox";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { Fragment } from "react";

interface Props extends AppStaticProps {
  item: NonNullable<
    GetLibraryItemScansQuery["libraryItems"]
  >["data"][number]["attributes"];
  itemId: NonNullable<
    GetLibraryItemScansQuery["libraryItems"]
  >["data"][number]["id"];
}

export default function LibrarySlug(props: Immutable<Props>): JSX.Element {
  const { item, langui, languages } = props;
  const [openLightBox, LightBox] = useLightBox();
  sortContent(item?.contents);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href={`/library/${item?.slug}`}
        title={langui.item}
        langui={langui}
        displayOn={ReturnButtonType.desktop}
        horizontalLine
      />

      {item?.contents?.data.map((content) => (
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
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <LightBox />

      <ReturnButton
        href={`/library/${item?.slug}`}
        title={langui.item}
        langui={langui}
        displayOn={ReturnButtonType.mobile}
        className="mb-10"
      />

      {item?.images && (
        <ScanSetCover
          images={item.images}
          openLightBox={openLightBox}
          languages={languages}
          langui={langui}
        />
      )}

      {item?.contents?.data.map((content) => (
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
  );

  return (
    <AppLayout
      navTitle={prettyinlineTitle("", item?.title, item?.subtitle)}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={item?.thumbnail?.data?.attributes ?? undefined}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const item = await sdk.getLibraryItemScans({
    slug: context.params?.slug ? context.params.slug.toString() : "",
    language_code: context.locale ?? "en",
  });
  if (!item.libraryItems) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    item: item.libraryItems.data[0].attributes,
    itemId: item.libraryItems.data[0].id,
  };
  return {
    props: props,
  };
}

export async function getStaticPaths(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
  const sdk = getReadySdk();
  const libraryItems = await sdk.getLibraryItemsSlugs({});
  const paths: GetStaticPathsResult["paths"] = [];
  if (libraryItems.libraryItems) {
    libraryItems.libraryItems.data.map((item) => {
      context.locales?.map((local) => {
        if (item.attributes)
          paths.push({ params: { slug: item.attributes.slug }, locale: local });
      });
    });
  }
  return {
    paths,
    fallback: "blocking",
  };
}
