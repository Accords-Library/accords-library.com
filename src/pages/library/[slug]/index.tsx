import { Fragment, useCallback, useMemo } from "react";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useBoolean } from "usehooks-ts";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { InsetBox } from "components/Containers/InsetBox";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { NavOption } from "components/PanelComponents/NavOption";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import { PreviewCard } from "components/PreviewCard";
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
  prettyPrice,
  prettySlug,
  prettyURL,
} from "helpers/formatters";
import { ImageQuality } from "helpers/img";
import { convertMmToInch } from "helpers/numbers";
import { sortRangedContent } from "helpers/others";
import {
  filterDefined,
  filterHasAttributes,
  isDefined,
  isDefinedAndNotEmpty,
} from "helpers/asserts";
import { useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { getScanArchiveURL, isUntangibleGroupItem } from "helpers/libraryItem";
import { useDeviceSupportsHover } from "hooks/useMediaQuery";
import { WithLabel } from "components/Inputs/WithLabel";
import { cJoin, cIf } from "helpers/className";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { getOpenGraph } from "helpers/openGraph";
import { getDescription } from "helpers/description";
import { useIntersectionList } from "hooks/useIntersectionList";
import { Ids } from "types/ids";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { ElementsSeparator } from "helpers/component";
import { ToolTip } from "components/ToolTip";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const intersectionIds = ["summary", "gallery", "details", "subitems", "contents"];

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  item: NonNullable<NonNullable<GetLibraryItemQuery["libraryItems"]>["data"][number]["attributes"]>;
  itemId: NonNullable<GetLibraryItemQuery["libraryItems"]>["data"][number]["id"];
}

const LibrarySlug = ({ item, itemId, ...otherProps }: Props): JSX.Element => {
  const currency = useAtomGetter(atoms.settings.currency);
  const isPerfModeEnabled = useAtomGetter(atoms.settings.isPerfModeEnabled);
  const { format, formatLibraryItemType } = useFormat();
  const currencies = useAtomGetter(atoms.localData.currencies);

  const isContentPanelAtLeast3xl = useAtomGetter(atoms.containerQueries.isContentPanelAtLeast3xl);
  const isContentPanelAtLeastSm = useAtomGetter(atoms.containerQueries.isContentPanelAtLeastSm);

  const hoverable = useDeviceSupportsHover();
  const router = useRouter();
  const { value: keepInfoVisible, toggle: toggleKeepInfoVisible } = useBoolean(false);

  const { showLightBox } = useAtomGetter(atoms.lightBox);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const closeSubPanel = useCallback(() => setSubPanelOpened(false), [setSubPanelOpened]);

  useScrollTopOnChange(Ids.ContentPanel, [itemId]);
  const currentIntersection = useIntersectionList(intersectionIds);

  const isVariantSet =
    item.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
    item.metadata[0].subtype?.data?.attributes?.slug === "variant-set";

  const hasContentScans = item.contents?.data.some(
    (content) => content.attributes?.scan_set && content.attributes.scan_set.length > 0
  );

  const hasContentSection =
    (item.contents && item.contents.data.length > 0) || item.download_available;

  const is3ColumnsLayout = useAtomGetter(atoms.containerQueries.is3ColumnsLayout);

  const subPanel = (
    <SubPanel>
      <ElementsSeparator>
        {[
          is3ColumnsLayout && (
            <ReturnButton
              key="ReturnButton"
              href="/library/"
              title={format("library")}
              displayOnlyOn="3ColumnsLayout"
            />
          ),
          <div className="grid gap-4" key="NavOption">
            <NavOption
              title={format("summary")}
              url={`#${intersectionIds[0]}`}
              border
              active={currentIntersection === 0}
              onClick={closeSubPanel}
            />

            {item.gallery && item.gallery.data.length > 0 && (
              <NavOption
                title={format("gallery")}
                url={`#${intersectionIds[1]}`}
                border
                active={currentIntersection === 1}
                onClick={closeSubPanel}
              />
            )}

            <NavOption
              title={format("details")}
              url={`#${intersectionIds[2]}`}
              border
              active={currentIntersection === 2}
              onClick={closeSubPanel}
            />

            {item.subitems && item.subitems.data.length > 0 && (
              <NavOption
                title={
                  isVariantSet
                    ? format("variant", { count: Infinity })
                    : format("subitem", { count: Infinity })
                }
                url={`#${intersectionIds[3]}`}
                border
                active={currentIntersection === 3}
                onClick={closeSubPanel}
              />
            )}

            {item.contents && item.contents.data.length > 0 && (
              <NavOption
                title={format("contents")}
                url={`#${intersectionIds[4]}`}
                border
                active={currentIntersection === 4}
                onClick={closeSubPanel}
              />
            )}
          </div>,
        ]}
      </ElementsSeparator>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <ReturnButton
        href="/library/"
        title={format("library")}
        displayOnlyOn="1ColumnLayout"
        className="mb-10"
      />
      <div className="grid place-items-center gap-12">
        <div
          className={cJoin(
            "relative h-[50vh] w-full cursor-pointer",
            cIf(!isPerfModeEnabled, "drop-shadow-xl shadow-shade"),
            cIf(isContentPanelAtLeast3xl, "mb-16", "h-[60vh]")
          )}>
          {item.thumbnail?.data?.attributes ? (
            <Img
              src={item.thumbnail.data.attributes}
              quality={ImageQuality.Large}
              className="h-full w-full object-contain"
              onClick={() => {
                showLightBox([item.thumbnail?.data?.attributes]);
              }}
            />
          ) : (
            <div className="aspect-[21/29.7] w-full rounded-xl bg-light" />
          )}
        </div>

        <InsetBox id={intersectionIds[0]} className="grid place-items-center">
          <div className="grid w-[clamp(0px,100%,42rem)] place-items-center gap-8">
            {item.subitem_of?.data[0]?.attributes && (
              <div className="grid place-items-center">
                <p>{format("subitem_of_x", { x: "" })}</p>
                <Button
                  href={`/library/${item.subitem_of.data[0].attributes.slug}`}
                  text={prettyInlineTitle(
                    "",
                    item.subitem_of.data[0].attributes.title,
                    item.subitem_of.data[0].attributes.subtitle
                  )}
                  size="small"
                />
              </div>
            )}
            <div className="grid place-items-center text-center">
              <h1 className="text-4xl">{item.title}</h1>
              {isDefinedAndNotEmpty(item.subtitle) && <h2 className="text-2xl">{item.subtitle}</h2>}
            </div>

            {!isUntangibleGroupItem(item.metadata?.[0]) && isDefinedAndNotEmpty(itemId) && (
              <PreviewCardCTAs id={itemId} expand />
            )}

            {item.descriptions?.[0] && (
              <p className="text-justify">{item.descriptions[0].description}</p>
            )}
            {!(
              item.metadata &&
              item.metadata[0]?.__typename === "ComponentMetadataGroup" &&
              (item.metadata[0].subtype?.data?.attributes?.slug === "variant-set" ||
                item.metadata[0].subtype?.data?.attributes?.slug === "relation-set")
            ) && (
              <>
                {item.urls?.length ? (
                  <div className="flex flex-row place-items-center gap-3">
                    <p>{format("available_at")}</p>
                    {filterHasAttributes(item.urls, ["url"]).map((url, index) => (
                      <Fragment key={index}>
                        <Button href={url.url} text={prettyURL(url.url)} alwaysNewTab />
                      </Fragment>
                    ))}
                  </div>
                ) : (
                  <p>{format("item_not_available")}</p>
                )}
              </>
            )}
          </div>
        </InsetBox>

        {item.gallery && item.gallery.data.length > 0 && (
          <div id={intersectionIds[1]} className="grid w-full place-items-center  gap-8">
            <h2 className="text-2xl">{format("gallery")}</h2>
            <div
              className="grid w-full grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] items-end
              gap-8">
              {filterHasAttributes(item.gallery.data, ["id", "attributes"]).map(
                (galleryItem, index) => (
                  <Fragment key={galleryItem.id}>
                    <div
                      className="relative aspect-square cursor-pointer
                      transition-transform hover:scale-102"
                      onClick={() => {
                        showLightBox(
                          filterHasAttributes(item.gallery?.data, ["attributes"]).map(
                            (image) => image.attributes
                          ),
                          index
                        );
                      }}>
                      <Img
                        className="h-full w-full rounded-lg bg-light object-cover shadow-md
                           shadow-shade/30 transition-shadow hover:shadow-lg hover:shadow-shade/50"
                        src={galleryItem.attributes}
                      />
                    </div>
                  </Fragment>
                )
              )}
            </div>
          </div>
        )}

        <InsetBox id={intersectionIds[2]} className="grid place-items-center">
          <div className="place-items grid w-[clamp(0px,100%,42rem)] gap-10">
            <h2 className="text-center text-2xl">{format("details")}</h2>
            <div
              className={cJoin(
                "grid place-items-center gap-y-8",
                cIf(isContentPanelAtLeast3xl, "grid-flow-col place-content-between")
              )}>
              {item.metadata?.[0] && (
                <div className="grid place-content-start place-items-center">
                  <h3 className="text-xl">{format("type", { count: 1 })}</h3>
                  <div className="grid grid-flow-col gap-1">
                    <Chip text={formatLibraryItemType(item.metadata[0])} />
                    {"›"}
                    <Chip text={prettyItemSubType(item.metadata[0])} />
                  </div>
                </div>
              )}

              {item.release_date && (
                <div className="grid place-content-start place-items-center">
                  <h3 className="text-xl">{format("release_date")}</h3>
                  <p>{prettyDate(item.release_date, router.locale)}</p>
                </div>
              )}

              {item.price && (
                <div className="grid place-content-start place-items-center text-center">
                  <h3 className="text-xl">{format("price")}</h3>
                  <p>
                    {prettyPrice(
                      item.price,
                      currencies,
                      item.price.currency?.data?.attributes?.code
                    )}
                  </p>
                  {item.price.currency?.data?.attributes?.code !== currency && (
                    <p>
                      {prettyPrice(item.price, currencies, currency)} <br />(
                      {format("calculated").toLowerCase()})
                    </p>
                  )}
                </div>
              )}
            </div>

            {item.categories && item.categories.data.length > 0 && (
              <div className="flex flex-col place-items-center gap-2">
                <h3 className="text-xl">
                  {format("category", { count: item.categories.data.length })}
                </h3>
                <div className="flex flex-row flex-wrap place-content-center gap-2">
                  {filterHasAttributes(item.categories.data, ["attributes"]).map((category) => (
                    <Chip key={category.id} text={category.attributes.name} />
                  ))}
                </div>
              </div>
            )}

            {item.size && (
              <div
                className={cJoin(
                  "grid gap-4",
                  cIf(!isContentPanelAtLeast3xl, "place-items-center")
                )}>
                <h3 className="text-xl">{format("size")}</h3>
                <div
                  className={cJoin(
                    "grid w-full",
                    cIf(
                      isContentPanelAtLeastSm,
                      "grid-flow-col place-content-between",
                      "grid-flow-row place-content-center gap-8"
                    )
                  )}>
                  <div
                    className={cJoin(
                      "grid gap-x-4",
                      cIf(
                        isContentPanelAtLeast3xl,
                        "grid-flow-col place-items-start",
                        "place-items-center"
                      )
                    )}>
                    <p className="font-bold">{format("width")}:</p>
                    <div>
                      <p>{item.size.width} mm</p>
                      <p>{convertMmToInch(item.size.width)} in</p>
                    </div>
                  </div>
                  <div
                    className={cJoin(
                      "grid gap-x-4",
                      cIf(
                        isContentPanelAtLeast3xl,
                        "grid-flow-col place-items-start",
                        "place-items-center"
                      )
                    )}>
                    <p className="font-bold">{format("height")}:</p>
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
                          isContentPanelAtLeast3xl,
                          "grid-flow-col place-items-start",
                          "place-items-center"
                        )
                      )}>
                      <p className="font-bold">{format("thickness")}:</p>
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
                    cIf(!isContentPanelAtLeast3xl, "place-items-center")
                  )}>
                  <h3 className="text-xl">{format("type_information")}</h3>
                  <div className="flex flex-wrap place-content-between gap-x-8">
                    {item.metadata?.[0]?.__typename === "ComponentMetadataBooks" && (
                      <>
                        {isDefined(item.metadata[0].page_count) && (
                          <div className="flex flex-row place-content-start gap-4">
                            <p className="font-bold">{format("page", { count: Infinity })}:</p>
                            <p>{item.metadata[0].page_count}</p>
                          </div>
                        )}

                        <div className="flex flex-row place-content-start gap-4">
                          <p className="font-bold">{format("binding")}:</p>
                          <p>
                            {item.metadata[0].binding_type ===
                            Enum_Componentmetadatabooks_Binding_Type.Paperback
                              ? format("paperback")
                              : item.metadata[0].binding_type ===
                                Enum_Componentmetadatabooks_Binding_Type.Hardcover
                              ? format("hardcover")
                              : ""}
                          </p>
                        </div>

                        <div className="flex flex-row place-content-start gap-4">
                          <p className="font-bold">{format("page_order")}:</p>
                          <p>
                            {item.metadata[0].page_order ===
                            Enum_Componentmetadatabooks_Page_Order.LeftToRight
                              ? format("left_to_right")
                              : format("right_to_left")}
                          </p>
                        </div>

                        {isDefined(item.metadata[0].languages) && (
                          <div className="flex flex-row place-content-start gap-4">
                            <p className="font-bold">
                              {format("language", {
                                count: item.metadata[0].languages.data.length,
                              })}
                              :
                            </p>
                            {item.metadata[0].languages.data.map((lang) => (
                              <p key={lang.attributes?.code}>{lang.attributes?.name}</p>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
          </div>
        </InsetBox>

        {item.subitems && item.subitems.data.length > 0 && (
          <div id={intersectionIds[3]} className="grid w-full place-items-center gap-8">
            <h2 className="text-2xl">
              {format(isVariantSet ? "variant" : "subitem", { count: Infinity })}
            </h2>

            {hoverable && (
              <WithLabel label={format("always_show_info")}>
                <Switch onClick={toggleKeepInfoVisible} value={keepInfoVisible} />
              </WithLabel>
            )}

            <div
              className="grid w-full grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]
              items-end gap-8">
              {filterHasAttributes(item.subitems.data, ["id", "attributes"]).map((subitem) => (
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
                      !isUntangibleGroupItem(subitem.attributes.metadata?.[0]) && (
                        <PreviewCardCTAs id={subitem.id} />
                      )
                    }
                  />
                </Fragment>
              ))}
            </div>
          </div>
        )}

        {hasContentSection && (
          <div id={intersectionIds[4]} className="grid w-full place-items-center gap-8">
            <h2 className="-mb-6 text-2xl">{format("contents")}</h2>
            <div className="grid grid-flow-col gap-4">
              {hasContentScans && (
                <Button
                  href={`/library/${item.slug}/reader`}
                  icon="auto_stories"
                  text={format("view_scans")}
                />
              )}
              {item.download_available && (
                <Button
                  href={getScanArchiveURL(item.slug)}
                  icon="download"
                  text={format("download_scans")}
                />
              )}
            </div>
            <div className="grid w-full gap-4">
              <div
                className={cJoin(
                  "grid items-center",
                  cIf(isContentPanelAtLeast3xl, "grid-cols-[1fr_auto_auto_auto] gap-4", "gap-4")
                )}>
                {filterHasAttributes(item.contents?.data, ["attributes"]).map((rangedContent) => (
                  <ContentItem
                    content={
                      rangedContent.attributes.content?.data?.attributes
                        ? {
                            translations: filterDefined(
                              rangedContent.attributes.content.data.attributes.translations
                            ).map((translation) => ({
                              pre_title: translation.pre_title,
                              title: translation.title,
                              subtitle: translation.subtitle,
                              language: translation.language?.data?.attributes?.code,
                            })),
                            categories: filterHasAttributes(
                              rangedContent.attributes.content.data.attributes.categories?.data,
                              ["attributes"]
                            ).map((category) => category.attributes.short),
                            type:
                              rangedContent.attributes.content.data.attributes.type?.data
                                ?.attributes?.titles?.[0]?.title ??
                              prettySlug(
                                rangedContent.attributes.content.data.attributes.type?.data
                                  ?.attributes?.slug
                              ),
                            slug: rangedContent.attributes.content.data.attributes.slug,
                          }
                        : undefined
                    }
                    rangeStart={
                      rangedContent.attributes.range[0]?.__typename === "ComponentRangePageRange"
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
                    displayType={isContentPanelAtLeast3xl ? "row" : "card"}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} subPanel={subPanel} {...otherProps} />;
};
export default LibrarySlug;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);
  const item = await sdk.getLibraryItem({
    slug: context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "",
    language_code: context.locale ?? "en",
  });
  if (!item.libraryItems?.data[0]?.attributes) return { notFound: true };
  sortRangedContent(item.libraryItems.data[0].attributes.contents);

  const { title, thumbnail } = item.libraryItems.data[0].attributes;

  const description = getDescription(
    item.libraryItems.data[0].attributes.descriptions?.[0]?.description,
    {
      [format("category", { count: Infinity })]: filterHasAttributes(
        item.libraryItems.data[0].attributes.categories?.data,
        ["attributes.short"]
      ).map((category) => category.attributes.short),
      [format("type", { count: Infinity })]: item.libraryItems.data[0].attributes.metadata?.[0]
        ? [prettyItemSubType(item.libraryItems.data[0].attributes.metadata[0])]
        : [],
      [format("release_date")]: [
        item.libraryItems.data[0].attributes.release_date
          ? prettyDate(item.libraryItems.data[0].attributes.release_date, context.locale)
          : undefined,
      ],
    }
  );

  const props: Props = {
    item: item.libraryItems.data[0].attributes,
    itemId: item.libraryItems.data[0].id,
    openGraph: getOpenGraph(format, title, description, thumbnail?.data?.attributes),
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
  filterHasAttributes(libraryItems.libraryItems?.data, ["attributes"]).map((item) => {
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

interface ContentItemProps {
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
  displayType: "card" | "row";
}

const ContentItem = ({
  rangeStart,
  content,
  hasScanSet,
  slug,
  parentSlug,
  displayType,
}: ContentItemProps): JSX.Element => {
  const { format } = useFormat();
  const [selectedTranslation] = useSmartLanguage({
    items: content?.translations ?? [],
    languageExtractor: useCallback(
      (item: NonNullable<ContentItemProps["content"]>["translations"][number]) => item.language,
      []
    ),
  });

  const title = useMemo(() => {
    if (selectedTranslation) {
      return prettyInlineTitle(
        selectedTranslation.pre_title,
        selectedTranslation.title,
        selectedTranslation.subtitle
      );
    }
    if (isDefined(content)) {
      return prettySlug(content.slug, parentSlug);
    }
    if (slug.endsWith("front-matter")) {
      return format("front_matter");
    }
    if (slug.endsWith("back-matter")) {
      return format("back_matter");
    }
    return prettySlug(slug, parentSlug);
  }, [content, format, parentSlug, selectedTranslation, slug]);

  if (displayType === "card") {
    return (
      <div className="grid w-full gap-3 rounded-xl bg-highlight p-4 shadow-sm shadow-shade">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <h3 className="text-lg">{title}</h3>
          <p className="h-4 w-full border-b-2 border-dotted border-mid" />
          <p className="text-right">{rangeStart}</p>
        </div>

        {content && (
          <div>
            {content.categories && (
              <div className="flex items-center gap-2">
                <p>{format("category", { count: content.categories.length })}</p>
                <div className="flex flex-row flex-wrap gap-1">
                  {content.categories.map((category, index) => (
                    <Chip key={index} text={category} />
                  ))}
                </div>
              </div>
            )}

            {content.type && (
              <div className="flex items-center gap-2">
                <p>{format("type", { count: 1 })}</p>
                <Chip className="justify-self-end" text={content.type} />
              </div>
            )}
          </div>
        )}

        {(hasScanSet || content) && (
          <div className="flex flex-wrap gap-3">
            {hasScanSet && (
              <Button
                href={`/library/${parentSlug}/reader?page=${rangeStart}`}
                icon="auto_stories"
                text={format("view_scans")}
              />
            )}
            {isDefined(content) && (
              <Button
                href={`/contents/${content.slug}`}
                icon="subject"
                text={format("open_content")}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-3">
        <h3>{title}</h3>
        <div className="flex flex-wrap place-content-center gap-1">
          {content?.categories?.map((category, index) => (
            <Chip key={index} text={category} />
          ))}
        </div>
        <p className="h-4 w-full border-b-2 border-dotted border-mid" />
        {content?.type && <Chip className="justify-self-end" text={content.type} />}
      </div>
      <p className="text-right">{rangeStart}</p>
      <div>
        {hasScanSet && (
          <ToolTip content={format("view_scans")}>
            <Button
              href={`/library/${parentSlug}/reader?page=${rangeStart}`}
              icon="auto_stories"
              size="small"
            />
          </ToolTip>
        )}
      </div>
      <div>
        {isDefined(content) && (
          <ToolTip content={format("open_content")}>
            <Button href={`/contents/${content.slug}`} icon="subject" size="small" />
          </ToolTip>
        )}
      </div>
    </>
  );
};
