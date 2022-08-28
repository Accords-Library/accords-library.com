import { Fragment, useCallback, useMemo } from "react";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { InsetBox } from "components/InsetBox";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { NavOption } from "components/PanelComponents/NavOption";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { PreviewCard } from "components/PreviewCard";
import { useAppLayout } from "contexts/AppLayoutContext";
import {
  Enum_Componentmetadatabooks_Binding_Type,
  Enum_Componentmetadatabooks_Page_Order,
  GetLibraryItemQuery,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  prettyDate,
  prettyInlineTitle,
  prettyItemSubType,
  prettyItemType,
  prettyPrice,
  prettySlug,
  prettyURL,
} from "helpers/formatters";
import { getAssetURL, ImageQuality } from "helpers/img";
import { convertMmToInch } from "helpers/numbers";
import {
  filterDefined,
  filterHasAttributes,
  isDefined,
  isDefinedAndNotEmpty,
  sortRangedContent,
} from "helpers/others";
import { useLightBox } from "hooks/useLightBox";
import { AnchorIds, useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";
import { Ico, Icon } from "components/Ico";
import { cJoin, cIf } from "helpers/className";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { getOpenGraph } from "helpers/openGraph";
import { getDescription } from "helpers/description";
import { useIntersectionList } from "hooks/useIntersectionList";
import { HorizontalLine } from "components/HorizontalLine";
import { useIsContentPanelNoMoreThan } from "hooks/useContainerQuery";
import { useCurrencies } from "hooks/useLocalData";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const intersectionIds = [
  "summary",
  "gallery",
  "details",
  "subitems",
  "contents",
];

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  item: NonNullable<
    NonNullable<
      GetLibraryItemQuery["libraryItems"]
    >["data"][number]["attributes"]
  >;
  itemId: NonNullable<
    GetLibraryItemQuery["libraryItems"]
  >["data"][number]["id"];
}

const LibrarySlug = ({ item, itemId, ...otherProps }: Props): JSX.Element => {
  const { currency } = useAppLayout();
  const { langui } = useAppLayout();
  const currencies = useCurrencies();
  const isContentPanelNoMoreThan3xl = useIsContentPanelNoMoreThan("3xl");
  const isContentPanelNoMoreThanSm = useIsContentPanelNoMoreThan("sm");
  const hoverable = useDeviceSupportsHover();
  const router = useRouter();
  const [openLightBox, LightBox] = useLightBox();
  const { value: keepInfoVisible, toggle: toggleKeepInfoVisible } =
    useBoolean(false);

  useScrollTopOnChange(AnchorIds.ContentPanel, [item]);
  const currentIntersection = useIntersectionList(intersectionIds);

  const isVariantSet = useMemo(
    () =>
      item.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
      item.metadata[0].subtype?.data?.attributes?.slug === "variant-set",
    [item.metadata]
  );

  const displayOpenScans = useMemo(
    () =>
      item.contents?.data.some(
        (content) =>
          content.attributes?.scan_set && content.attributes.scan_set.length > 0
      ),
    [item.contents?.data]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href="/library/"
          title={langui.library}
          displayOnlyOn="3ColumnsLayout"
        />

        <HorizontalLine />

        <div className="grid gap-4">
          <NavOption
            title={langui.summary}
            url={`#${intersectionIds[0]}`}
            border
            active={currentIntersection === 0}
          />

          {item.gallery && item.gallery.data.length > 0 && (
            <NavOption
              title={langui.gallery}
              url={`#${intersectionIds[1]}`}
              border
              active={currentIntersection === 1}
            />
          )}

          <NavOption
            title={langui.details}
            url={`#${intersectionIds[2]}`}
            border
            active={currentIntersection === 2}
          />

          {item.subitems && item.subitems.data.length > 0 && (
            <NavOption
              title={isVariantSet ? langui.variants : langui.subitems}
              url={`#${intersectionIds[3]}`}
              border
              active={currentIntersection === 3}
            />
          )}

          {item.contents && item.contents.data.length > 0 && (
            <NavOption
              title={langui.contents}
              url={`#${intersectionIds[4]}`}
              border
              active={currentIntersection === 4}
            />
          )}
        </div>
      </SubPanel>
    ),
    [
      currentIntersection,
      isVariantSet,
      item.contents,
      item.gallery,
      item.subitems,
      langui,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <LightBox />

        <ReturnButton
          href="/library/"
          title={langui.library}
          displayOnlyOn="1ColumnLayout"
          className="mb-10"
        />
        <div className="grid place-items-center gap-12">
          <div
            className={cJoin(
              "relative h-[50vh] w-full cursor-pointer drop-shadow-shade-xl",
              cIf(isContentPanelNoMoreThan3xl, "h-[60vh]", "mb-16")
            )}
            onClick={() => {
              if (item.thumbnail?.data?.attributes) {
                openLightBox([
                  getAssetURL(
                    item.thumbnail.data.attributes.url,
                    ImageQuality.Large
                  ),
                ]);
              }
            }}
          >
            {item.thumbnail?.data?.attributes ? (
              <Img
                src={item.thumbnail.data.attributes}
                quality={ImageQuality.Large}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="aspect-[21/29.7] w-full rounded-xl bg-light"></div>
            )}
          </div>

          <InsetBox id={intersectionIds[0]} className="grid place-items-center">
            <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-8">
              {item.subitem_of?.data[0]?.attributes && (
                <div className="grid place-items-center">
                  <p>{langui.subitem_of}</p>
                  <Button
                    href={`/library/${item.subitem_of.data[0].attributes.slug}`}
                    text={prettyInlineTitle(
                      "",
                      item.subitem_of.data[0].attributes.title,
                      item.subitem_of.data[0].attributes.subtitle
                    )}
                  />
                </div>
              )}
              <div className="grid place-items-center text-center">
                <h1 className="text-3xl">{item.title}</h1>
                {isDefinedAndNotEmpty(item.subtitle) && (
                  <h2 className="text-2xl">{item.subtitle}</h2>
                )}
              </div>

              {!isUntangibleGroupItem(item.metadata?.[0]) &&
                isDefinedAndNotEmpty(itemId) && (
                  <PreviewCardCTAs id={itemId} expand />
                )}

              {item.descriptions?.[0] && (
                <p className="text-justify">
                  {item.descriptions[0].description}
                </p>
              )}
              {!(
                item.metadata &&
                item.metadata[0]?.__typename === "ComponentMetadataGroup" &&
                (item.metadata[0].subtype?.data?.attributes?.slug ===
                  "variant-set" ||
                  item.metadata[0].subtype?.data?.attributes?.slug ===
                    "relation-set")
              ) && (
                <>
                  {item.urls?.length ? (
                    <div className="flex flex-row place-items-center gap-3">
                      <p>{langui.available_at}</p>
                      {filterHasAttributes(item.urls, ["url"] as const).map(
                        (url, index) => (
                          <Fragment key={index}>
                            <Button
                              href={url.url}
                              text={prettyURL(url.url)}
                              alwaysNewTab
                            />
                          </Fragment>
                        )
                      )}
                    </div>
                  ) : (
                    <p>{langui.item_not_available}</p>
                  )}
                </>
              )}
            </div>
          </InsetBox>

          {item.gallery && item.gallery.data.length > 0 && (
            <div
              id={intersectionIds[1]}
              className="grid w-full place-items-center  gap-8"
            >
              <h2 className="text-2xl">{langui.gallery}</h2>
              <div
                className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-end
              gap-8"
              >
                {filterHasAttributes(item.gallery.data, [
                  "id",
                  "attributes",
                ] as const).map((galleryItem, index) => (
                  <Fragment key={galleryItem.id}>
                    <div
                      className="relative aspect-square cursor-pointer
                      transition-transform hover:scale-[1.02]"
                      onClick={() => {
                        const images: string[] = filterHasAttributes(
                          item.gallery?.data,
                          ["attributes"] as const
                        ).map((image) =>
                          getAssetURL(image.attributes.url, ImageQuality.Large)
                        );
                        openLightBox(images, index);
                      }}
                    >
                      <Img
                        className="h-full w-full rounded-lg
                        bg-light object-cover drop-shadow-shade-md"
                        src={galleryItem.attributes}
                      />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          )}

          <InsetBox id={intersectionIds[2]} className="grid place-items-center">
            <div className="place-items grid w-[clamp(0px,100%,42rem)] gap-10">
              <h2 className="text-center text-2xl">{langui.details}</h2>
              <div
                className={cJoin(
                  "grid place-items-center gap-y-8",
                  cIf(
                    !isContentPanelNoMoreThan3xl,
                    "grid-flow-col place-content-between"
                  )
                )}
              >
                {item.metadata?.[0] && (
                  <div className="grid place-content-start place-items-center">
                    <h3 className="text-xl">{langui.type}</h3>
                    <div className="grid grid-flow-col gap-1">
                      <Chip text={prettyItemType(item.metadata[0], langui)} />
                      {"›"}
                      <Chip text={prettyItemSubType(item.metadata[0])} />
                    </div>
                  </div>
                )}

                {item.release_date && (
                  <div className="grid place-content-start place-items-center">
                    <h3 className="text-xl">{langui.release_date}</h3>
                    <p>{prettyDate(item.release_date, router.locale)}</p>
                  </div>
                )}

                {item.price && (
                  <div className="grid place-content-start place-items-center text-center">
                    <h3 className="text-xl">{langui.price}</h3>
                    <p>
                      {prettyPrice(
                        item.price,
                        currencies,
                        item.price.currency?.data?.attributes?.code
                      )}
                    </p>
                    {item.price.currency?.data?.attributes?.code !==
                      currency && (
                      <p>
                        {prettyPrice(item.price, currencies, currency)} <br />(
                        {langui.calculated?.toLowerCase()})
                      </p>
                    )}
                  </div>
                )}
              </div>

              {item.categories && item.categories.data.length > 0 && (
                <div className="flex flex-col place-items-center gap-2">
                  <h3 className="text-xl">{langui.categories}</h3>
                  <div className="flex flex-row flex-wrap place-content-center gap-2">
                    {filterHasAttributes(item.categories.data, [
                      "attributes",
                    ] as const).map((category) => (
                      <Chip key={category.id} text={category.attributes.name} />
                    ))}
                  </div>
                </div>
              )}

              {item.size && (
                <div
                  className={cJoin(
                    "grid gap-4",
                    cIf(isContentPanelNoMoreThan3xl, "place-items-center")
                  )}
                >
                  <h3 className="text-xl">{langui.size}</h3>
                  <div
                    className={cJoin(
                      "grid w-full",
                      cIf(
                        isContentPanelNoMoreThanSm,
                        "grid-flow-row place-content-center gap-8",
                        "grid-flow-col place-content-between"
                      )
                    )}
                  >
                    <div
                      className={cJoin(
                        "grid gap-x-4",
                        cIf(
                          isContentPanelNoMoreThan3xl,
                          "place-items-center",
                          "grid-flow-col place-items-start"
                        )
                      )}
                    >
                      <p className="font-bold">{langui.width}:</p>
                      <div>
                        <p>{item.size.width} mm</p>
                        <p>{convertMmToInch(item.size.width)} in</p>
                      </div>
                    </div>
                    <div
                      className={cJoin(
                        "grid gap-x-4",
                        cIf(
                          isContentPanelNoMoreThan3xl,
                          "place-items-center",
                          "grid-flow-col place-items-start"
                        )
                      )}
                    >
                      <p className="font-bold">{langui.height}:</p>
                      <div>
                        <p>{item.size.height} mm</p>
                        <p>{convertMmToInch(item.size.height)} in</p>
                      </div>
                    </div>
                    {isDefined(item.size.thickness) && (
                      <div
                        className={cJoin(
                          "grid gap-x-4",
                          cIf(
                            isContentPanelNoMoreThan3xl,
                            "place-items-center",
                            "grid-flow-col place-items-start"
                          )
                        )}
                      >
                        <p className="font-bold">{langui.thickness}:</p>
                        <div>
                          <p>{item.size.thickness} mm</p>
                          <p>{convertMmToInch(item.size.thickness)} in</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {item.metadata?.[0]?.__typename !== "ComponentMetadataGroup" &&
                item.metadata?.[0]?.__typename !== "ComponentMetadataOther" && (
                  <div
                    className={cJoin(
                      "grid gap-4",
                      cIf(isContentPanelNoMoreThan3xl, "place-items-center")
                    )}
                  >
                    <h3 className="text-xl">{langui.type_information}</h3>
                    <div className="flex flex-wrap place-content-between gap-x-8">
                      {item.metadata?.[0]?.__typename ===
                        "ComponentMetadataBooks" && (
                        <>
                          <div className="flex flex-row place-content-start gap-4">
                            <p className="font-bold">{langui.pages}:</p>
                            <p>{item.metadata[0].page_count}</p>
                          </div>

                          <div className="flex flex-row place-content-start gap-4">
                            <p className="font-bold">{langui.binding}:</p>
                            <p>
                              {item.metadata[0].binding_type ===
                              Enum_Componentmetadatabooks_Binding_Type.Paperback
                                ? langui.paperback
                                : item.metadata[0].binding_type ===
                                  Enum_Componentmetadatabooks_Binding_Type.Hardcover
                                ? langui.hardcover
                                : ""}
                            </p>
                          </div>

                          <div className="flex flex-row place-content-start gap-4">
                            <p className="font-bold">{langui.page_order}:</p>
                            <p>
                              {item.metadata[0].page_order ===
                              Enum_Componentmetadatabooks_Page_Order.LeftToRight
                                ? langui.left_to_right
                                : langui.right_to_left}
                            </p>
                          </div>

                          <div className="flex flex-row place-content-start gap-4">
                            <p className="font-bold">{langui.languages}:</p>
                            {item.metadata[0]?.languages?.data.map((lang) => (
                              <p key={lang.attributes?.code}>
                                {lang.attributes?.name}
                              </p>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </InsetBox>

          {item.subitems && item.subitems.data.length > 0 && (
            <div
              id={intersectionIds[3]}
              className="grid w-full place-items-center gap-8"
            >
              <h2 className="text-2xl">
                {isVariantSet ? langui.variants : langui.subitems}
              </h2>

              {hoverable && (
                <WithLabel label={langui.always_show_info}>
                  <Switch
                    onClick={toggleKeepInfoVisible}
                    value={keepInfoVisible}
                  />
                </WithLabel>
              )}

              <div
                className="grid w-full grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]
              items-end gap-8"
              >
                {filterHasAttributes(item.subitems.data, [
                  "id",
                  "attributes",
                ] as const).map((subitem) => (
                  <Fragment key={subitem.id}>
                    <PreviewCard
                      href={`/library/${subitem.attributes.slug}`}
                      title={subitem.attributes.title}
                      subtitle={subitem.attributes.subtitle}
                      thumbnail={subitem.attributes.thumbnail?.data?.attributes}
                      thumbnailAspectRatio="21/29.7"
                      thumbnailRounded={false}
                      keepInfoVisible={keepInfoVisible}
                      topChips={
                        subitem.attributes.metadata &&
                        subitem.attributes.metadata.length > 0 &&
                        subitem.attributes.metadata[0]
                          ? [prettyItemSubType(subitem.attributes.metadata[0])]
                          : []
                      }
                      bottomChips={subitem.attributes.categories?.data.map(
                        (category) => category.attributes?.short ?? ""
                      )}
                      metadata={{
                        releaseDate: subitem.attributes.release_date,
                        price: subitem.attributes.price,
                        position: "Bottom",
                      }}
                      infoAppend={
                        !isUntangibleGroupItem(
                          subitem.attributes.metadata?.[0]
                        ) && <PreviewCardCTAs id={subitem.id} />
                      }
                    />
                  </Fragment>
                ))}
              </div>
            </div>
          )}

          {item.contents && item.contents.data.length > 0 && (
            <div
              id={intersectionIds[4]}
              className="grid w-full place-items-center gap-8"
            >
              <h2 className="-mb-6 text-2xl">{langui.contents}</h2>
              {displayOpenScans && (
                <Button
                  href={`/library/${item.slug}/scans`}
                  text={langui.view_scans}
                />
              )}
              <div className="max-w- grid w-full gap-4">
                {filterHasAttributes(item.contents.data, [
                  "attributes",
                ] as const).map((rangedContent) => (
                  <ContentLine
                    content={
                      rangedContent.attributes.content?.data?.attributes
                        ? {
                            translations: filterDefined(
                              rangedContent.attributes.content.data.attributes
                                .translations
                            ).map((translation) => ({
                              pre_title: translation.pre_title,
                              title: translation.title,
                              subtitle: translation.subtitle,
                              language:
                                translation.language?.data?.attributes?.code,
                            })),
                            categories: filterHasAttributes(
                              rangedContent.attributes.content.data.attributes
                                .categories?.data,
                              ["attributes"]
                            ).map((category) => category.attributes.short),
                            type:
                              rangedContent.attributes.content.data.attributes
                                .type?.data?.attributes?.titles?.[0]?.title ??
                              prettySlug(
                                rangedContent.attributes.content.data.attributes
                                  .type?.data?.attributes?.slug
                              ),
                            slug: rangedContent.attributes.content.data
                              .attributes.slug,
                          }
                        : undefined
                    }
                    rangeStart={
                      rangedContent.attributes.range[0]?.__typename ===
                      "ComponentRangePageRange"
                        ? `${rangedContent.attributes.range[0].starting_page}`
                        : ""
                    }
                    slug={rangedContent.attributes.slug}
                    parentSlug={item.slug}
                    key={rangedContent.id}
                    hasScanSet={
                      isDefined(rangedContent.attributes.scan_set) &&
                      rangedContent.attributes.scan_set.length > 0
                    }
                    condensed={isContentPanelNoMoreThan3xl}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ContentPanel>
    ),
    [
      LightBox,
      langui,
      isContentPanelNoMoreThan3xl,
      item.thumbnail?.data?.attributes,
      item.subitem_of?.data,
      item.title,
      item.subtitle,
      item.metadata,
      item.descriptions,
      item.urls,
      item.gallery,
      item.release_date,
      item.price,
      item.categories,
      item.size,
      item.subitems,
      item.contents,
      item.slug,
      itemId,
      router.locale,
      currencies,
      currency,
      isContentPanelNoMoreThanSm,
      isVariantSet,
      hoverable,
      toggleKeepInfoVisible,
      keepInfoVisible,
      displayOpenScans,
      openLightBox,
    ]
  );

  return (
    <AppLayout
      contentPanel={contentPanel}
      subPanel={subPanel}
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
  const langui = getLangui(context.locale);
  const item = await sdk.getLibraryItem({
    slug:
      context.params && isDefined(context.params.slug)
        ? context.params.slug.toString()
        : "",
    language_code: context.locale ?? "en",
  });
  if (!item.libraryItems?.data[0]?.attributes) return { notFound: true };
  sortRangedContent(item.libraryItems.data[0].attributes.contents);

  const { title, thumbnail } = item.libraryItems.data[0].attributes;

  const description = getDescription(
    item.libraryItems.data[0].attributes.descriptions?.[0]?.description,
    {
      [langui.categories ?? "Categories"]: filterHasAttributes(
        item.libraryItems.data[0].attributes.categories?.data,
        ["attributes.short"]
      ).map((category) => category.attributes.short),
      [langui.type ?? "Type"]: item.libraryItems.data[0].attributes
        .metadata?.[0]
        ? [prettyItemSubType(item.libraryItems.data[0].attributes.metadata[0])]
        : [],
      [langui.release_date ?? "Release date"]: [
        item.libraryItems.data[0].attributes.release_date
          ? prettyDate(
              item.libraryItems.data[0].attributes.release_date,
              context.locale
            )
          : undefined,
      ],
    }
  );

  const props: Props = {
    item: item.libraryItems.data[0].attributes,
    itemId: item.libraryItems.data[0].id,
    openGraph: getOpenGraph(
      langui,
      title,
      description,
      thumbnail?.data?.attributes
    ),
  };
  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const libraryItems = await sdk.getLibraryItemsSlugs();
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

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface ContentLineProps {
  content?: {
    translations: {
      pre_title: string | null | undefined;
      title: string;
      subtitle: string | null | undefined;
      language: string | undefined;
    }[];
    categories?: string[];
    type?: string;
    slug: string;
  };
  rangeStart: string;
  parentSlug: string;
  slug: string;

  hasScanSet: boolean;
  condensed: boolean;
}

const ContentLine = ({
  rangeStart,
  content,
  hasScanSet,
  slug,
  parentSlug,
  condensed,
}: ContentLineProps): JSX.Element => {
  const { langui } = useAppLayout();
  const { value: isOpened, toggle: toggleOpened } = useBoolean(false);
  const [selectedTranslation] = useSmartLanguage({
    items: content?.translations ?? [],
    languageExtractor: useCallback(
      (
        item: NonNullable<ContentLineProps["content"]>["translations"][number]
      ) => item.language,
      []
    ),
  });

  if (condensed) {
    return (
      <div className="my-4 grid gap-2">
        <div className="flex gap-2">
          {content?.type && <Chip text={content.type} />}
          <p className="h-4 w-full border-b-2 border-dotted border-black opacity-30"></p>
          <p>{rangeStart}</p>
        </div>

        <h3 className="flex flex-wrap place-items-center gap-2">
          {selectedTranslation
            ? prettyInlineTitle(
                selectedTranslation.pre_title,
                selectedTranslation.title,
                selectedTranslation.subtitle
              )
            : content
            ? prettySlug(content.slug, parentSlug)
            : prettySlug(slug, parentSlug)}
        </h3>
        <div className="flex flex-row flex-wrap gap-1">
          {content?.categories?.map((category, index) => (
            <Chip key={index} text={category} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {hasScanSet || isDefined(content) ? (
            <>
              {hasScanSet && (
                <Button
                  href={`/library/${parentSlug}/scans#${slug}`}
                  text={langui.view_scans}
                />
              )}
              {isDefined(content) && (
                <Button
                  href={`/contents/${content.slug}`}
                  text={langui.open_content}
                />
              )}
            </>
          ) : (
            /* TODO: Add to langui */
            "The content is not available"
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cJoin(
        "grid gap-2 rounded-lg px-4",
        cIf(isOpened, "my-2 h-auto bg-mid py-3 shadow-inner-sm shadow-shade")
      )}
    >
      <div className="grid grid-cols-[auto_auto_1fr_auto_12ch] place-items-center gap-4">
        <a>
          <h3 className="cursor-pointer" onClick={toggleOpened}>
            {selectedTranslation
              ? prettyInlineTitle(
                  selectedTranslation.pre_title,
                  selectedTranslation.title,
                  selectedTranslation.subtitle
                )
              : content
              ? prettySlug(content.slug, parentSlug)
              : prettySlug(slug, parentSlug)}
          </h3>
        </a>
        <div className="flex flex-row flex-wrap gap-1">
          {content?.categories?.map((category, index) => (
            <Chip key={index} text={category} />
          ))}
        </div>
        <p className="h-4 w-full border-b-2 border-dotted border-black opacity-30"></p>
        <p>{rangeStart}</p>
        {content?.type && (
          <Chip className="justify-self-end" text={content.type} />
        )}
      </div>
      <div
        className={`grid-flow-col place-content-start place-items-center gap-2 ${
          isOpened ? "grid" : "hidden"
        }`}
      >
        <Ico icon={Icon.SubdirectoryArrowRight} className="text-dark" />

        {hasScanSet || isDefined(content) ? (
          <>
            {hasScanSet && (
              <Button
                href={`/library/${parentSlug}/scans#${slug}`}
                text={langui.view_scans}
              />
            )}
            {isDefined(content) && (
              <Button
                href={`/contents/${content.slug}`}
                text={langui.open_content}
              />
            )}
          </>
        ) : (
          /* TODO: Add to langui */
          "The content is not available"
        )}
      </div>
    </div>
  );
};
