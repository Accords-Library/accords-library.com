import AppLayout from "components/AppLayout";
import Img, { getAssetURL, ImageQuality } from "components/Img";
import LanguageSwitcher from "components/LanguageSwitcher";
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
import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettyinlineTitle, prettySlug, sortContent } from "queries/helpers";
import { useState } from "react";

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

export default function LibrarySlug(props: Props): JSX.Element {
  const { item, langui } = props;
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
      {item?.contents?.data.map((content) => (
        <>
          <h2
            id={content.attributes?.slug}
            key={`h2${content.id}`}
            className="text-2xl pb-2 pt-10 first-of-type:pt-0 flex flex-row place-items-center gap-2"
          >
            {prettySlug(content.attributes?.slug, item.slug)}
          </h2>

          {content.attributes?.scan_set?.[0] ? (
            <div
              key={`items${content.id}`}
              className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0"
            >
              {content.attributes.scan_set[0].pages?.data.map((page, index) => (
                <div
                  key={page.id}
                  className="drop-shadow-shade-lg hover:scale-[1.02] cursor-pointer transition-transform"
                  onClick={() => {
                    setLightboxOpen(true);
                    if (content.attributes?.scan_set?.[0]?.pages) {
                      const images: string[] = [];
                      content.attributes.scan_set[0].pages.data.map((image) => {
                        if (image.attributes?.url)
                          images.push(
                            getAssetURL(
                              image.attributes.url,
                              ImageQuality.Large
                            )
                          );
                      });
                      setLightboxImages(images);
                    }

                    setLightboxIndex(index);
                  }}
                >
                  {page.attributes && (
                    <Img image={page.attributes} quality={ImageQuality.Small} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="pb-12 border-b-[3px] border-dotted last-of-type:border-0">
              {content.attributes?.scan_set_languages && (
                <LanguageSwitcher
                  locales={content.attributes.scan_set_languages.map(
                    (language) => language?.language?.data?.attributes?.code
                  )}
                  languages={props.languages}
                  langui={props.langui}
                  href={`#${content.attributes.slug}`}
                />
              )}
            </div>
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
    slug: context.params?.slug?.toString() ?? "",
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
