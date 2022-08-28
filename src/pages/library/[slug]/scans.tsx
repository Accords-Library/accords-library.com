import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import {
  GetLibraryItemScansQuery,
  UploadImageFragment,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import {
  prettyInlineTitle,
  prettySlug,
  prettyItemSubType,
} from "helpers/formatters";
import {
  filterHasAttributes,
  getStatusDescription,
  isDefined,
  isDefinedAndNotEmpty,
  sortRangedContent,
} from "helpers/others";
import { useLightBox } from "hooks/useLightBox";
import { isUntangibleGroupItem } from "helpers/libraryItem";
import { PreviewCardCTAs } from "components/Library/PreviewCardCTAs";
import { PreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { getOpenGraph } from "helpers/openGraph";
import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { Button } from "components/Inputs/Button";
import { RecorderChip } from "components/RecorderChip";
import { ToolTip } from "components/ToolTip";
import { getAssetFilename, getAssetURL, ImageQuality } from "helpers/img";
import { isInteger } from "helpers/numbers";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { TranslatedProps } from "types/TranslatedProps";
import { TranslatedNavOption } from "components/PanelComponents/NavOption";
import { useIntersectionList } from "hooks/useIntersectionList";
import {
  useIs1ColumnLayout,
  useIsContentPanelNoMoreThan,
} from "hooks/useContainerQuery";
import { cIf, cJoin } from "helpers/className";
import { useAppLayout } from "contexts/AppLayoutContext";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  item: NonNullable<
    NonNullable<
      GetLibraryItemScansQuery["libraryItems"]
    >["data"][number]["attributes"]
  >;
  itemId: NonNullable<
    NonNullable<GetLibraryItemScansQuery["libraryItems"]>["data"][number]["id"]
  >;
}

const LibrarySlug = ({ item, itemId, ...otherProps }: Props): JSX.Element => {
  const [openLightBox, LightBox] = useLightBox();
  const is1ColumnLayout = useIs1ColumnLayout();
  const { langui } = useAppLayout();

  const ids = useMemo(
    () =>
      filterHasAttributes(item.contents?.data, [
        "attributes.slug",
      ] as const).map((content) => content.attributes.slug),
    [item.contents?.data]
  );
  const currentIntersection = useIntersectionList(ids);

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href={`/library/${item.slug}`}
          title={langui.item}
          className="mb-4"
          displayOnlyOn="3ColumnsLayout"
        />

        <div className="grid place-items-center">
          <div className={cIf(is1ColumnLayout, "w-3/4")}>
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
                releaseDate: item.release_date,
                price: item.price,
                position: "Bottom",
              }}
              infoAppend={
                !isUntangibleGroupItem(item.metadata?.[0]) && (
                  <PreviewCardCTAs id={itemId} />
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
          (content, index) => (
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
                    active={index === currentIntersection}
                  />
                )}
            </>
          )
        )}
      </SubPanel>
    ),
    [
      currentIntersection,
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
      is1ColumnLayout,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <LightBox />

        <ReturnButton
          href={`/library/${item.slug}`}
          title={langui.item}
          displayOnlyOn="1ColumnLayout"
          className="mb-10"
        />

        {item.images && (
          <ScanSetCover images={item.images} openLightBox={openLightBox} />
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
      langui,
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
    item: item.libraryItems.data[0].attributes,
    itemId: item.libraryItems.data[0].id,
    openGraph: getOpenGraph(
      langui,
      item.libraryItems.data[0].attributes.title,
      undefined,
      item.libraryItems.data[0].attributes.thumbnail?.data?.attributes
    ),
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

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface ScanSetProps {
  openLightBox: (images: string[], index?: number) => void;
  scanSet: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            GetLibraryItemScansQuery["libraryItems"]
          >["data"][number]["attributes"]
        >["contents"]
      >["data"][number]["attributes"]
    >["scan_set"]
  >;
  id: string;
  title: string;

  content: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          GetLibraryItemScansQuery["libraryItems"]
        >["data"][number]["attributes"]
      >["contents"]
    >["data"][number]["attributes"]
  >["content"];
}

const ScanSet = ({
  openLightBox,
  scanSet,
  id,
  title,
  content,
}: ScanSetProps): JSX.Element => {
  const is1ColumnLayout = useIsContentPanelNoMoreThan("2xl");
  const { langui } = useAppLayout();
  const [selectedScan, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: scanSet,
      languageExtractor: useCallback(
        (item: NonNullable<ScanSetProps["scanSet"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
      transform: useCallback(
        (item: NonNullable<ScanSetProps["scanSet"][number]>) => {
          item.pages?.data.sort((a, b) => {
            if (
              a.attributes &&
              b.attributes &&
              isDefinedAndNotEmpty(a.attributes.url) &&
              isDefinedAndNotEmpty(b.attributes.url)
            ) {
              let aName = getAssetFilename(a.attributes.url);
              let bName = getAssetFilename(b.attributes.url);

              /*
               * If the number is a succession of 0s, make the number
               * incrementally smaller than 0 (i.e: 00 becomes -1)
               */
              if (aName.replaceAll("0", "").length === 0) {
                aName = (1 - aName.length).toString(10);
              }
              if (bName.replaceAll("0", "").length === 0) {
                bName = (1 - bName.length).toString(10);
              }

              if (isInteger(aName) && isInteger(bName)) {
                return parseInt(aName, 10) - parseInt(bName, 10);
              }
              return a.attributes.url.localeCompare(b.attributes.url);
            }
            return 0;
          });
          return item;
        },
        []
      ),
    });

  const pages = useMemo(
    () => filterHasAttributes(selectedScan?.pages?.data, ["attributes"]),
    [selectedScan]
  );

  return (
    <>
      {selectedScan && isDefined(pages) && (
        <div>
          <div
            className="flex flex-row flex-wrap place-items-center
          gap-6 pt-10 text-base first-of-type:pt-0"
          >
            <h2 id={id} className="text-2xl">
              {title}
            </h2>

            <Chip
              text={
                selectedScan.language?.data?.attributes?.code ===
                selectedScan.source_language?.data?.attributes?.code
                  ? langui.scan ?? "Scan"
                  : langui.scanlation ?? "Scanlation"
              }
            />
          </div>

          <div className="flex flex-row flex-wrap place-items-center gap-4 pb-6">
            {content?.data?.attributes &&
              isDefinedAndNotEmpty(content.data.attributes.slug) && (
                <Button
                  href={`/contents/${content.data.attributes.slug}`}
                  text={langui.open_content}
                />
              )}

            {languageSwitcherProps.locales.size > 1 && (
              <LanguageSwitcher {...languageSwitcherProps} />
            )}

            <div className="grid place-content-center place-items-center">
              <p className="font-headers font-bold">{langui.status}:</p>
              <ToolTip
                content={getStatusDescription(selectedScan.status, langui)}
                maxWidth={"20rem"}
              >
                <Chip text={selectedScan.status} />
              </ToolTip>
            </div>

            {selectedScan.scanners && selectedScan.scanners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{langui.scanners}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.scanners.data, [
                    "id",
                    "attributes",
                  ] as const).map((scanner) => (
                    <Fragment key={scanner.id}>
                      <RecorderChip recorder={scanner.attributes} />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedScan.cleaners && selectedScan.cleaners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{langui.cleaners}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.cleaners.data, [
                    "id",
                    "attributes",
                  ] as const).map((cleaner) => (
                    <Fragment key={cleaner.id}>
                      <RecorderChip recorder={cleaner.attributes} />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedScan.typesetters &&
              selectedScan.typesetters.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">
                    {langui.typesetters}:
                  </p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(selectedScan.typesetters.data, [
                      "id",
                      "attributes",
                    ] as const).map((typesetter) => (
                      <Fragment key={typesetter.id}>
                        <RecorderChip recorder={typesetter.attributes} />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

            {isDefinedAndNotEmpty(selectedScan.notes) && (
              <ToolTip content={selectedScan.notes}>
                <Chip text={langui.notes ?? "Notes"} />
              </ToolTip>
            )}
          </div>

          <div
            className={cJoin(
              `grid items-end gap-8 border-b-[3px] border-dotted pb-12
            last-of-type:border-0`,
              cIf(
                is1ColumnLayout,
                "grid-cols-2 gap-[4vmin]",
                "grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]"
              )
            )}
          >
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="cursor-pointer transition-transform
                drop-shadow-shade-lg hover:scale-[1.02]"
                onClick={() => {
                  const images = pages.map((image) =>
                    getAssetURL(image.attributes.url, ImageQuality.Large)
                  );
                  openLightBox(images, index);
                }}
              >
                <Img src={page.attributes} quality={ImageQuality.Small} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const TranslatedScanSet = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<ScanSetProps, "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback(
      (item: { language: string }): string => item.language,
      []
    ),
  });

  return (
    <ScanSet
      title={selectedTranslation?.title ?? fallback.title}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ScanSetCoverProps {
  openLightBox: (images: string[], index?: number) => void;
  images: NonNullable<
    NonNullable<
      NonNullable<
        GetLibraryItemScansQuery["libraryItems"]
      >["data"][number]["attributes"]
    >["images"]
  >;
}

const ScanSetCover = ({
  openLightBox,
  images,
}: ScanSetCoverProps): JSX.Element => {
  const is1ColumnLayout = useIsContentPanelNoMoreThan("4xl");
  const { langui } = useAppLayout();
  const [selectedScan, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: images,
      languageExtractor: useCallback(
        (item: NonNullable<ScanSetCoverProps["images"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
    });

  const coverImages = useMemo(() => {
    const memo: UploadImageFragment[] = [];
    if (selectedScan?.obi_belt?.full?.data?.attributes)
      memo.push(selectedScan.obi_belt.full.data.attributes);
    if (selectedScan?.obi_belt?.inside_full?.data?.attributes)
      memo.push(selectedScan.obi_belt.inside_full.data.attributes);
    if (selectedScan?.dust_jacket?.full?.data?.attributes)
      memo.push(selectedScan.dust_jacket.full.data.attributes);
    if (selectedScan?.dust_jacket?.inside_full?.data?.attributes)
      memo.push(selectedScan.dust_jacket.inside_full.data.attributes);
    if (selectedScan?.cover?.full?.data?.attributes)
      memo.push(selectedScan.cover.full.data.attributes);
    if (selectedScan?.cover?.inside_full?.data?.attributes)
      memo.push(selectedScan.cover.inside_full.data.attributes);
    return memo;
  }, [selectedScan]);

  return (
    <>
      {coverImages.length > 0 && selectedScan && (
        <div>
          <div
            className="flex flex-row flex-wrap place-items-center
          gap-6 pt-10 text-base first-of-type:pt-0"
          >
            <h2 id={"cover"} className="text-2xl">
              {langui.cover}
            </h2>

            <Chip
              text={
                selectedScan.language?.data?.attributes?.code ===
                selectedScan.source_language?.data?.attributes?.code
                  ? langui.scan ?? "Scan"
                  : langui.scanlation ?? "Scanlation"
              }
            />
          </div>

          <div className="flex flex-row flex-wrap place-items-center gap-4 pb-6">
            <LanguageSwitcher {...languageSwitcherProps} />

            <div className="grid place-content-center place-items-center">
              <p className="font-headers font-bold">{langui.status}:</p>
              <ToolTip
                content={getStatusDescription(selectedScan.status, langui)}
                maxWidth={"20rem"}
              >
                <Chip text={selectedScan.status} />
              </ToolTip>
            </div>

            {selectedScan.scanners && selectedScan.scanners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{langui.scanners}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.scanners.data, [
                    "id",
                    "attributes",
                  ] as const).map((scanner) => (
                    <Fragment key={scanner.id}>
                      <RecorderChip recorder={scanner.attributes} />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedScan.cleaners && selectedScan.cleaners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{langui.cleaners}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.cleaners.data, [
                    "id",
                    "attributes",
                  ] as const).map((cleaner) => (
                    <Fragment key={cleaner.id}>
                      <RecorderChip recorder={cleaner.attributes} />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedScan.typesetters &&
              selectedScan.typesetters.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">
                    {langui.typesetters}:
                  </p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(selectedScan.typesetters.data, [
                      "id",
                      "attributes",
                    ] as const).map((typesetter) => (
                      <Fragment key={typesetter.id}>
                        <RecorderChip recorder={typesetter.attributes} />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div
            className={cJoin(
              `grid items-end gap-8 border-b-[3px] border-dotted pb-12
            last-of-type:border-0`,
              cIf(
                is1ColumnLayout,
                "grid-cols-2 gap-[4vmin]",
                "grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]"
              )
            )}
          >
            {coverImages.map((image, index) => (
              <div
                key={image.url}
                className="cursor-pointer transition-transform
                  drop-shadow-shade-lg hover:scale-[1.02]"
                onClick={() => {
                  const imgs = coverImages.map((img) =>
                    getAssetURL(img.url, ImageQuality.Large)
                  );

                  openLightBox(imgs, index);
                }}
              >
                <Img src={image} quality={ImageQuality.Small} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
