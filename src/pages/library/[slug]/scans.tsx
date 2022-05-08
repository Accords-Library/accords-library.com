import AppLayout from "components/AppLayout";
import ScanSet from "components/Library/ScanSet";
import ScanSetCover from "components/Library/ScanSetCover";
import LightBox from "components/LightBox";
import NavOption from "components/PanelComponents/NavOption";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetLibraryItemScansQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { sortContent } from "helpers/others";
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { useState } from "react";
import { Immutable } from "helpers/types";

interface Props extends AppStaticProps {
  item: Exclude<
    GetLibraryItemScansQuery["libraryItems"],
    null | undefined
  >["data"][number]["attributes"];
  itemId: Exclude<
    GetLibraryItemScansQuery["libraryItems"],
    null | undefined
  >["data"][number]["id"];
}

export default function LibrarySlug(props: Immutable<Props>): JSX.Element {
  const { item, langui, languages } = props;
  const appLayout = useAppLayout();

  sortContent(item?.contents);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([""]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
              ? `${content.attributes.range[0].starting_page} → ${content.attributes.range[0].ending_page}`
              : undefined
          }
          onClick={() => appLayout.setSubPanelOpen(false)}
          border
        />
      ))}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <LightBox
        state={lightboxOpen}
        setState={setLightboxOpen}
        images={lightboxImages}
        index={lightboxIndex}
        setIndex={setLightboxIndex}
      />

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
          setLightboxImages={setLightboxImages}
          setLightboxIndex={setLightboxIndex}
          setLightboxOpen={setLightboxOpen}
          languages={languages}
          langui={langui}
        />
      )}

      {item?.contents?.data.map((content) => (
        <>
          {content.attributes?.scan_set?.[0] && (
            <ScanSet
              key={content.id}
              scanSet={content.attributes.scan_set}
              setLightboxImages={setLightboxImages}
              setLightboxIndex={setLightboxIndex}
              setLightboxOpen={setLightboxOpen}
              slug={content.attributes.slug}
              title={prettySlug(content.attributes.slug, item.slug)}
              languages={languages}
              langui={langui}
              content={content.attributes.content}
            />
          )}
        </>
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
