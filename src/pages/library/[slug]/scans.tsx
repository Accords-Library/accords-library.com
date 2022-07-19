import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useMemo } from "react";
import { AppLayout } from "components/AppLayout";
import { ScanSetCover } from "components/Library/ScanSetCover";
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
import {
  prettyInlineTitle,
  prettySlug,
  prettyItemSubType,
} from "helpers/formatters";
import {
  filterHasAttributes,
  isDefined,
  sortRangedContent,
} from "helpers/others";
import { useLightBox } from "hooks/useLightBox";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { PreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { TranslatedNavOption, TranslatedScanSet } from "components/Translated";

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
  itemId,
  langui,
  languages,
  currencies,
  ...otherProps
}: Props): JSX.Element => {
  const [openLightBox, LightBox] = useLightBox();

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href={`/library/${item.slug}`}
          title={langui.item}
          langui={langui}
          className="mb-4"
          displayOn={ReturnButtonType.Desktop}
        />

        <div className="grid place-items-center">
          <div className="mobile:w-[80%]">
            <PreviewCard
              href={`/library/${item.slug}`}
              title={item.title}
              subtitle={item.subtitle}
              thumbnail={item.thumbnail?.data?.attributes}
              thumbnailAspectRatio="21/29.7"
              thumbnailRounded={false}
              topChips={
                item.metadata && item.metadata.length > 0 && item.metadata[0]
                  ? [prettyItemSubType(item.metadata[0])]
                  : []
              }
              bottomChips={filterHasAttributes(item.categories?.data, [
                "attributes",
              ] as const).map((category) => category.attributes.short)}
              metadata={{
                currencies: currencies,
                release_date: item.release_date,
                price: item.price,
                position: "Bottom",
              }}
              infoAppend={
                !isUntangibleGroupItem(item.metadata?.[0]) && (
                  <PreviewCardCTAs id={itemId} langui={langui} />
                )
              }
            />
          </div>
        </div>

        <HorizontalLine />

        <p className="mb-4 font-headers text-2xl font-bold">
          {langui.contents}
        </p>

        {filterHasAttributes(item.contents?.data, ["attributes"] as const).map(
          (content) => (
            <>
              {content.attributes.scan_set &&
                content.attributes.scan_set.length > 0 && (
                  <TranslatedNavOption
                    key={content.id}
                    url={`#${content.attributes.slug}`}
                    translations={filterHasAttributes(
                      content.attributes.content?.data?.attributes
                        ?.translations,
                      ["language.data.attributes"] as const
                    ).map((translation) => ({
                      language: translation.language.data.attributes.code,
                      title: prettyInlineTitle(
                        translation.pre_title,
                        translation.title,
                        translation.subtitle
                      ),
                      subtitle:
                        content.attributes.range[0]?.__typename ===
                        "ComponentRangePageRange"
                          ? `${content.attributes.range[0].starting_page}` +
                            `→` +
                            `${content.attributes.range[0].ending_page}`
                          : undefined,
                    }))}
                    fallback={{
                      title: prettySlug(content.attributes.slug, item.slug),
                      subtitle:
                        content.attributes.range[0]?.__typename ===
                        "ComponentRangePageRange"
                          ? `${content.attributes.range[0].starting_page}` +
                            `→` +
                            `${content.attributes.range[0].ending_page}`
                          : undefined,
                    }}
                    border
                  />
                )}
            </>
          )
        )}
      </SubPanel>
    ),
    [
      currencies,
      item.categories?.data,
      item.contents?.data,
      item.metadata,
      item.price,
      item.release_date,
      item.slug,
      item.subtitle,
      item.thumbnail?.data?.attributes,
      item.title,
      itemId,
      langui,
    ]
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
              <TranslatedScanSet
                scanSet={content.attributes.scan_set}
                openLightBox={openLightBox}
                id={content.attributes.slug}
                translations={filterHasAttributes(
                  content.attributes.content?.data?.attributes?.translations,
                  ["language.data.attributes"] as const
                ).map((translation) => ({
                  language: translation.language.data.attributes.code,
                  title: prettyInlineTitle(
                    translation.pre_title,
                    translation.title,
                    translation.subtitle
                  ),
                }))}
                fallback={{
                  title: prettySlug(content.attributes.slug, item.slug),
                }}
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
      navTitle={prettyInlineTitle("", item.title, item.subtitle)}
      contentPanel={contentPanel}
      subPanel={subPanel}
      thumbnail={item.thumbnail?.data?.attributes ?? undefined}
      languages={languages}
      langui={langui}
      currencies={currencies}
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
  sortRangedContent(item.libraryItems.data[0].attributes.contents);
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
  filterHasAttributes(libraryItems.libraryItems?.data, [
    "attributes",
  ] as const).map((item) => {
    context.locales?.map((local) =>
      paths.push({ params: { slug: item.attributes.slug }, locale: local })
    );
  });

  return {
    paths,
    fallback: "blocking",
  };
};
