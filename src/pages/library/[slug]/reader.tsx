import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Slider from "rc-slider";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { z } from "zod";
import { atom } from "jotai";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import {
  Enum_Componentmetadatabooks_Page_Order as PageOrder,
  GetLibraryItemScansQuery,
  UploadImageFragment,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { sortRangedContent } from "helpers/others";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getOpenGraph } from "helpers/openGraph";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { Img } from "components/Img";
import { getAssetFilename, ImageQuality } from "helpers/img";
import { cIf, cJoin } from "helpers/className";
import { clamp, isInteger } from "helpers/numbers";
import { SubPanel } from "components/Containers/SubPanel";
import { Button } from "components/Inputs/Button";
import { Ids } from "types/ids";
import { Switch } from "components/Inputs/Switch";
import { WithLabel } from "components/Inputs/WithLabel";
import { sendAnalytics } from "helpers/analytics";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { Chip } from "components/Chip";
import { RecorderChip } from "components/RecorderChip";
import { ToolTip } from "components/ToolTip";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { TranslatedProps } from "types/TranslatedProps";
import { prettyInlineTitle, prettySlug } from "helpers/formatters";
import { useFullscreen } from "hooks/useFullscreen";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { FilterSettings, useReaderSettings } from "hooks/useReaderSettings";
import { useTypedRouter } from "hooks/useTypedRouter";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { getScanArchiveURL } from "helpers/libraryItem";

type BookType = "book" | "manga";
type DisplayMode = "double" | "single";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const CUSTOM_DARK_DROPSHADOW = `
  drop-shadow(0 0    0.5em rgb(var(--theme-color-shade) / 30%))
  drop-shadow(0 1em    1em rgb(var(--theme-color-shade) / 40%))
  drop-shadow(0 2em    2em rgb(var(--theme-color-shade) / 60%))
  drop-shadow(0 12em  12em rgb(var(--theme-color-shade) / 80%))`;

const CUSTOM_LIGHT_DROPSHADOW = `
  drop-shadow(0 0.3em 0.5em rgb(var(--theme-color-shade) / 70%))
  drop-shadow(0   1em   1em rgb(var(--theme-color-shade) / 30%))
  drop-shadow(0   2em   2em rgb(var(--theme-color-shade) / 30%))
  drop-shadow(0  12em  12em rgb(var(--theme-color-shade) / 60%))`;

const SIDEPAGES_PAGE_COUNT_ON_TEXTURE = 200;
const SIDEPAGES_PAGE_WIDTH = 0.02;

const queryParamSchema = z.object({
  query: z.coerce.string().optional(),
  page: z.coerce.number().optional(),
});

const isWebKitAtom = atom((get) => get(atoms.userAgent.engine) === "WebKit");

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  item: NonNullable<
    NonNullable<GetLibraryItemScansQuery["libraryItems"]>["data"][number]["attributes"]
  >;
  pages: UploadImageFragment[];
  pageOrder: PageOrder;
  bookType: BookType;
  pageWidth: number;
  pageRatio: string;
  itemSlug: string;
}

const LibrarySlug = ({
  pages,
  bookType,
  pageOrder,
  pageWidth,
  itemSlug,
  item,
  ...otherProps
}: Props): JSX.Element => {
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const { format } = useFormat();
  const isDarkMode = useAtomGetter(atoms.settings.darkMode);
  const {
    filterSettings,
    isSidePagesEnabled,
    pageQuality,
    toggleBookFold,
    toggleLighting,
    togglePaperTexture,
    toggleDropShadow,
    toggleIsSidePagesEnabled,
    setPageQuality,
    setTeint,
    resetReaderSettings,
  } = useReaderSettings();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [isGalleryMode, setIsGalleryMode] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    is1ColumnLayout ? "single" : "double"
  );
  const router = useTypedRouter(queryParamSchema);
  const isWebKit = useAtomGetter(isWebKitAtom);

  const { isFullscreen, toggleFullscreen, requestFullscreen } = useFullscreen(Ids.ContentPanel);

  const effectiveDisplayMode =
    currentPageIndex === 0 || currentPageIndex === pages.length - 1 ? "single" : displayMode;

  const ajustedSidepagesTotalWidth = pages.length * SIDEPAGES_PAGE_WIDTH * (120 / pageWidth);

  const changeCurrentPageIndex = useCallback(
    (callbackFn: (current: number) => number) => {
      setCurrentPageIndex((current) => clamp(callbackFn(current), 0, pages.length - 1));
    },
    [pages.length]
  );

  useEffect(() => setDisplayMode(is1ColumnLayout ? "single" : "double"), [is1ColumnLayout]);

  useEffect(() => {
    if (router.isReady)
      router.updateQuery({
        page: currentPageIndex - 1,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageIndex, router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      if (isDefined(router.query.page)) setCurrentPageIndex(router.query.page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const changeDisplayMode = useCallback(
    (newDisplayMode: DisplayMode) => {
      setDisplayMode(newDisplayMode);
      changeCurrentPageIndex((current) => current);
    },
    [changeCurrentPageIndex]
  );

  const handlePageNavigation = useCallback(
    (navigateTo: "left" | "next" | "previous" | "right") => {
      if (
        (navigateTo === "right" && pageOrder === PageOrder.LeftToRight) ||
        (navigateTo === "left" && pageOrder === PageOrder.RightToLeft) ||
        navigateTo === "next"
      ) {
        changeCurrentPageIndex((current) => current + (effectiveDisplayMode === "single" ? 1 : 2));
      } else {
        changeCurrentPageIndex((current) => current - (effectiveDisplayMode === "single" ? 1 : 2));
      }
    },
    [changeCurrentPageIndex, effectiveDisplayMode, pageOrder]
  );

  useHotkeys("left", () => handlePageNavigation("left"), { enabled: !isGalleryMode }, [
    handlePageNavigation,
  ]);

  useHotkeys("up", () => setIsGalleryMode(true), { enabled: !isGalleryMode }, [setIsGalleryMode]);
  useHotkeys("down", () => setIsGalleryMode(false), { enabled: isGalleryMode }, [setIsGalleryMode]);

  useHotkeys("f", () => requestFullscreen(), { enabled: !isFullscreen }, [requestFullscreen]);

  useHotkeys("right", () => handlePageNavigation("right"), { enabled: !isGalleryMode }, [
    handlePageNavigation,
  ]);

  const firstPage =
    pages[
      effectiveDisplayMode === "double" && currentPageIndex % 2 === 0
        ? currentPageIndex - 1
        : currentPageIndex
    ];

  const secondPage =
    pages[
      effectiveDisplayMode === "double" && currentPageIndex % 2 === 0
        ? currentPageIndex
        : currentPageIndex + 1
    ];

  const leftSidePagesCount =
    pageOrder === PageOrder.LeftToRight ? currentPageIndex : pages.length - 1 - currentPageIndex;

  const rightSidePagesCount =
    pageOrder === PageOrder.LeftToRight ? pages.length - 1 - currentPageIndex : currentPageIndex;

  const leftSidePagesWidth = `${
    pageOrder === PageOrder.LeftToRight
      ? (currentPageIndex / pages.length) * ajustedSidepagesTotalWidth
      : ajustedSidepagesTotalWidth - (currentPageIndex / pages.length) * ajustedSidepagesTotalWidth
  }vmin`;

  const rightSidePagesWidth = `${
    pageOrder === PageOrder.LeftToRight
      ? ajustedSidepagesTotalWidth - (currentPageIndex / pages.length) * ajustedSidepagesTotalWidth
      : (currentPageIndex / pages.length) * ajustedSidepagesTotalWidth
  }vmin`;

  const leftSideClipPath = `polygon(
    ${
      isSidePagesEnabled
        ? `
          ${leftSidePagesWidth} 100%,
          0% calc(100% - ${leftSidePagesWidth} / 3),
          0% calc(${leftSidePagesWidth} / 3),
          ${leftSidePagesWidth} 0%,`
        : "0% 100%, 0% 0%,"
    }
     70%     0%,
     ${
       filterSettings.bookFold
         ? `90%   .25%,
            95%    .5%,
            98%    .8%,
            99%     1%,
            101%     2%,
            101%    98%,
            99%    99%,
            98%  99.2%,          
            95%  99.5%,
            90% 99.75%,`
         : "101% 0%, 101% 100%,"
     }
     70%   100%
    )`;

  const rightSideClipPath = `polygon(
      ${
        isSidePagesEnabled
          ? `calc(100% - ${rightSidePagesWidth}) 0%,
            100% calc(${rightSidePagesWidth} / 3),
            100% calc(100% - ${rightSidePagesWidth} / 3),
            calc(100% - ${rightSidePagesWidth}) 100%,`
          : "100% 0%, 100% 100%,"
      }
      30%   100%,
      ${
        filterSettings.bookFold
          ? `10% 99.75%,
              5%  99.5%,
              2%  99.2%,
              1%    99%,
             -1%    98%,
             -1%     2%,
              1%     1%,
              2%    .8%,
              5%    .5%,
             10%   .25%,`
          : "-1% 100%, -1% 0%,"
      }
      30%     0%
      )`;

  const pageHeight = `calc(100vh - ${is1ColumnLayout ? 5 : 4}rem - 3rem)`;

  const subPanel = (
    <SubPanel>
      <ReturnButton title={format("item", { count: 1 })} href={`/library/${itemSlug}`} />

      <div className="mt-4 grid gap-2">
        <WithLabel label={format("paper_texture")}>
          <Switch value={filterSettings.paperTexture} onClick={togglePaperTexture} />
        </WithLabel>

        <WithLabel label={format("book_fold")}>
          <Switch value={filterSettings.bookFold} onClick={toggleBookFold} />
        </WithLabel>

        <WithLabel label={format("lighting")}>
          <Switch value={filterSettings.lighting} onClick={toggleLighting} />
        </WithLabel>

        <WithLabel label={format("side_pages")}>
          <Switch value={isSidePagesEnabled} onClick={toggleIsSidePagesEnabled} />
        </WithLabel>

        {!isWebKit && (
          <WithLabel label={format("shadow")}>
            <Switch value={filterSettings.dropShadow} onClick={toggleDropShadow} />
          </WithLabel>
        )}
      </div>

      <div className="mt-4 grid">
        <p>{format("night_reader")}:</p>
        <Slider
          min={0}
          max={10}
          value={filterSettings.teint * 10}
          onChange={(event) => {
            const value = (Array.isArray(event) ? event[0] : event) ?? 0;
            setTeint(value / 10);
          }}
        />
      </div>

      <div className="mt-8 grid gap-2">
        <p>{format("reading_layout")}:</p>
        <ButtonGroup
          buttonsProps={[
            {
              icon: "description",
              tooltip: format("single_page_view"),
              active: displayMode === "single",
              onClick: () => changeDisplayMode("single"),
            },
            {
              icon: "auto_stories",
              tooltip: format("double_page_view"),
              active: displayMode === "double",
              onClick: () => changeDisplayMode("double"),
            },
          ]}
        />
      </div>

      <div className="mt-4 grid gap-2">
        <p>{format("quality")}:</p>
        <ButtonGroup
          buttonsProps={[
            {
              text: "SD",
              active: pageQuality === ImageQuality.Medium,
              onClick: () => setPageQuality(ImageQuality.Medium),
            },
            {
              text: "HD",
              active: pageQuality === ImageQuality.Large,
              onClick: () => setPageQuality(ImageQuality.Large),
            },
          ]}
        />
      </div>

      <Button
        className="mt-8"
        text={format("reset_all_options")}
        icon="settings_backup_restore"
        onClick={() => {
          resetReaderSettings();
          setDisplayMode(is1ColumnLayout ? "single" : "double");
          sendAnalytics("Reader", "Reset all options");
        }}
      />

      {item.download_available && (
        <Button
          href={getScanArchiveURL(item.slug)}
          icon="download"
          text={format("download_archive")}
        />
      )}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full} className="grid place-content-center !p-0">
      <div className={cJoin("mb-12 grid", cIf(is1ColumnLayout, "!p-0", "!p-8"))}>
        <TransformWrapper
          onZoom={(zoom) => setCurrentZoom(zoom.state.scale)}
          panning={{ disabled: currentZoom <= 1, velocityDisabled: false }}
          doubleClick={{ disabled: true, mode: "reset" }}
          velocityAnimation={{ animationTime: 0, equalToMove: true }}>
          <TransformComponent
            wrapperStyle={{ overflow: "visible", placeSelf: "center" }}
            contentStyle={{
              height: "100%",
              gridAutoFlow: "column",
              display: "grid",
              placeContent: "center",
              filter:
                !filterSettings.dropShadow || isWebKit
                  ? undefined
                  : isDarkMode
                  ? CUSTOM_DARK_DROPSHADOW
                  : CUSTOM_LIGHT_DROPSHADOW,
            }}>
            {effectiveDisplayMode === "single" && isDefined(firstPage) ? (
              <div
                className={cJoin(
                  "relative grid grid-flow-col",
                  cIf(currentZoom <= 1, "cursor-pointer", "cursor-move")
                )}>
                <Img
                  style={{ maxHeight: pageHeight, width: "auto" }}
                  src={firstPage}
                  quality={pageQuality}
                />
                <PageFilters page="single" bookType={bookType} options={filterSettings} />
                <div
                  className="absolute bottom-0 left-0 top-0 w-1/2"
                  onClick={() => currentZoom <= 1 && handlePageNavigation("left")}
                />
                <div
                  className="absolute bottom-0 right-0 top-0 w-1/2"
                  onClick={() => currentZoom <= 1 && handlePageNavigation("right")}
                />
              </div>
            ) : (
              isDefined(firstPage) &&
              isDefined(secondPage) && (
                <>
                  <div
                    className={cJoin(
                      "relative grid grid-flow-col",
                      cIf(currentZoom <= 1, "cursor-pointer", "cursor-move")
                    )}
                    onClick={() => currentZoom <= 1 && handlePageNavigation("left")}
                    style={{
                      clipPath: leftSideClipPath,
                    }}>
                    {isSidePagesEnabled && (
                      <div
                        style={{
                          width: leftSidePagesWidth,
                          backgroundImage: `url(/reader/sidepages-${bookType}.webp)`,
                          backgroundSize: `${
                            (SIDEPAGES_PAGE_COUNT_ON_TEXTURE / leftSidePagesCount) * 100
                          }% 100%`,
                        }}
                      />
                    )}

                    <Img
                      style={{ maxHeight: pageHeight, width: "auto" }}
                      src={pageOrder === PageOrder.LeftToRight ? firstPage : secondPage}
                      quality={pageQuality}
                    />
                    <PageFilters page="left" bookType={bookType} options={filterSettings} />
                  </div>
                  <div
                    className={cJoin(
                      "relative grid grid-flow-col",
                      cIf(currentZoom <= 1, "cursor-pointer", "cursor-move")
                    )}
                    onClick={() => currentZoom <= 1 && handlePageNavigation("right")}
                    style={{
                      clipPath: rightSideClipPath,
                    }}>
                    <Img
                      style={{ maxHeight: pageHeight, width: "auto" }}
                      className={cIf(
                        is1ColumnLayout,
                        `max-h-[calc(100vh-5rem)]`,
                        "max-h-[calc(100vh-4rem)]"
                      )}
                      src={pageOrder === PageOrder.LeftToRight ? secondPage : firstPage}
                      quality={pageQuality}
                    />
                    {isSidePagesEnabled && (
                      <div
                        style={{
                          width: rightSidePagesWidth,
                          backgroundImage: `url(/reader/sidepages-${bookType}.webp)`,
                          backgroundPositionX: "right",
                          backgroundSize: `${
                            (SIDEPAGES_PAGE_COUNT_ON_TEXTURE / rightSidePagesCount) * 100
                          }% 100%`,
                        }}
                      />
                    )}

                    <PageFilters page="right" bookType={bookType} options={filterSettings} />
                  </div>
                </>
              )
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div
        className={cJoin(
          `absolute inset-0 bg-light
            transition-transform duration-500`,
          cIf(isGalleryMode, "translate-y-0", "translate-y-[calc(100%-3rem)]")
        )}>
        <div
          className="mb-4 mt-3 grid grid-flow-col grid-cols-[auto,1fr,auto]
            place-content-center place-items-center gap-4 px-4">
          <p className="text-dark">
            {currentPageIndex - 1} / {pages.length - 2}
          </p>
          <Slider
            reverse={pageOrder === PageOrder.RightToLeft}
            min={0}
            max={pages.length - 1}
            value={currentPageIndex - 1}
            onChange={(event) => {
              const value = (Array.isArray(event) ? event[0] : event) ?? 0;
              changeCurrentPageIndex(() => value);
            }}
          />
          <div className="flex gap-2">
            <Button
              icon={isGalleryMode ? "expand_more" : "expand_less"}
              active={isGalleryMode}
              onClick={() => setIsGalleryMode((current) => !current)}
              size="small"
            />
            <Button
              icon={isFullscreen ? "fullscreen_exit" : "fullscreen"}
              active={isFullscreen}
              onClick={toggleFullscreen}
              size="small"
            />
          </div>
        </div>
        <div className="h-[calc(100vh-4rem)] overflow-y-scroll px-8">
          {item.contents?.data.map((content) => (
            <Fragment key={content.id}>
              {content.attributes?.scan_set?.[0] && (
                <TranslatedScanSet
                  scanSet={content.attributes.scan_set}
                  onClickOnImage={(index) => {
                    const range = content.attributes?.range[0];
                    let newPageIndex = index + 1;
                    if (range?.__typename === "ComponentRangePageRange") {
                      newPageIndex += range.starting_page;
                    }
                    changeCurrentPageIndex(() => newPageIndex);
                    setIsGalleryMode(false);
                  }}
                  id={content.attributes.slug}
                  translations={filterHasAttributes(
                    content.attributes.content?.data?.attributes?.translations,
                    ["language.data.attributes"]
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
        </div>
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      contentPanel={contentPanel}
      subPanel={subPanel}
      {...otherProps}
      contentPanelScroolbar={false}
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
  const { format } = getFormat(context.locale);
  const item = await sdk.getLibraryItemScans({
    slug: context.params && isDefined(context.params.slug) ? context.params.slug.toString() : "",
  });
  if (!item.libraryItems?.data[0]?.attributes || !item.libraryItems.data[0]?.id)
    return { notFound: true };
  sortRangedContent(item.libraryItems.data[0].attributes.contents);

  const pages: UploadImageFragment[] = [];

  const cover = item.libraryItems.data[0].attributes.images?.[0]?.cover;
  if (cover) {
    if (cover.front?.data?.attributes) pages.push(cover.front.data.attributes);
    if (cover.inside_front?.data?.attributes) pages.push(cover.inside_front.data.attributes);
  }

  filterHasAttributes(item.libraryItems.data[0].attributes.contents?.data, [
    "attributes.scan_set",
  ]).forEach((content) =>
    filterHasAttributes(content.attributes.scan_set, ["pages.data"]).forEach((scanSet) =>
      filterHasAttributes(scanSet.pages.data, ["attributes"])
        .sort((a, b) => {
          if (isDefinedAndNotEmpty(a.attributes.url) && isDefinedAndNotEmpty(b.attributes.url)) {
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
        })
        .forEach((page) => pages.push(page.attributes))
    )
  );

  if (cover) {
    if (cover.inside_back?.data?.attributes) pages.push(cover.inside_back.data.attributes);
    if (cover.back?.data?.attributes) pages.push(cover.back.data.attributes);
  }

  const pageOrder: Props["pageOrder"] = (() => {
    const { metadata } = item.libraryItems.data[0].attributes;
    if (metadata?.[0]?.__typename === "ComponentMetadataBooks") {
      return metadata[0].page_order;
    }
    return PageOrder.LeftToRight;
  })();

  const bookType =
    item.libraryItems.data[0].attributes.metadata?.[0]?.__typename === "ComponentMetadataBooks" &&
    item.libraryItems.data[0].attributes.metadata[0].subtype?.data?.attributes?.slug === "manga"
      ? "manga"
      : "book";

  const pageWidth = item.libraryItems.data[0].attributes.size?.width ?? 120;

  if (pages.length === 0) return { notFound: true };

  const props: Props = {
    item: item.libraryItems.data[0].attributes,
    pages,
    pageOrder,
    bookType,
    pageWidth,
    itemSlug: item.libraryItems.data[0].attributes.slug,
    pageRatio: `${pages[0]?.width ?? 21} / ${pages[0]?.height ?? 29.7}`,
    openGraph: getOpenGraph(
      format,
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

interface PageFiltersProps {
  page: "left" | "right" | "single";
  bookType: BookType;
  options: FilterSettings;
}

const PageFilters = ({ page, bookType, options }: PageFiltersProps) => {
  const commonCss = cJoin(
    "absolute inset-0 dark:opacity-100",
    cIf(page === "right", "[background-position-x:-100%]")
  );

  return (
    <>
      {options.paperTexture && (
        <div
          className={cJoin(
            commonCss,
            `mix-blend-exclusion [background-image:url(/reader/paper.webp)]
            [background-size:20vmin_20vmin]`,
            cIf(bookType === "book", "opacity-60 dark:opacity-60")
          )}
        />
      )}

      {options.bookFold && (
        <div
          className={cJoin(
            commonCss,
            `opacity-50 mix-blend-multiply
            [background-image:url(/reader/book-fold.webp)] [background-size:200%_100%]`
          )}
        />
      )}

      {options.lighting && (
        <>
          <div
            className={cJoin(
              commonCss,
              "opacity-50 mix-blend-multiply [background-size:200%_100%]",
              cIf(
                page === "single",
                "[background-image:url(/reader/lighting-single-page.webp)]",
                "[background-image:url(/reader/lighting-double-page.webp)]"
              )
            )}
          />
          <div
            className={cJoin(
              commonCss,
              `bg-[#FFF]/30 bg-blend-lighten mix-blend-soft-light [background-size:200%_100%]
               dark:bg-[#000]`,
              cIf(
                page === "single",
                "[background-image:url(/reader/specular-single-page.webp)]",
                "[background-image:url(/reader/specular-double-page.webp)]"
              )
            )}
          />
        </>
      )}

      <div
        className={cJoin(commonCss, "bg-[#ffbf7f] mix-blend-multiply")}
        style={{ opacity: options.teint }}
      />
    </>
  );
};

interface ScanSetProps {
  onClickOnImage: (index: number) => void;
  scanSet: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<GetLibraryItemScansQuery["libraryItems"]>["data"][number]["attributes"]
        >["contents"]
      >["data"][number]["attributes"]
    >["scan_set"]
  >;
  id: string;
  title: string;

  content: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<GetLibraryItemScansQuery["libraryItems"]>["data"][number]["attributes"]
      >["contents"]
    >["data"][number]["attributes"]
  >["content"];
}

const ScanSet = ({ onClickOnImage, scanSet, id, title, content }: ScanSetProps): JSX.Element => {
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const { format, formatStatusDescription } = useFormat();
  const [selectedScan, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: scanSet,
    languageExtractor: useCallback(
      (item: NonNullable<ScanSetProps["scanSet"][number]>) => item.language?.data?.attributes?.code,
      []
    ),
    transform: useCallback((item: NonNullable<ScanSetProps["scanSet"][number]>) => {
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
    }, []),
  });

  const pages = filterHasAttributes(selectedScan?.pages?.data, ["attributes"]);

  return (
    <>
      {selectedScan && isDefined(pages) && (
        <div>
          <div
            className="flex flex-row flex-wrap place-items-center
          gap-6 pt-10 text-base first-of-type:pt-0">
            <h2 id={id} className="text-2xl">
              {title}
            </h2>

            <Chip
              text={
                selectedScan.language?.data?.attributes?.code ===
                selectedScan.source_language?.data?.attributes?.code
                  ? format("scan")
                  : format("scanlation")
              }
            />
          </div>

          <div className="flex flex-row flex-wrap place-items-center gap-4 pb-6">
            {content?.data?.attributes && isDefinedAndNotEmpty(content.data.attributes.slug) && (
              <Button
                href={`/contents/${content.data.attributes.slug}`}
                icon="subject"
                text={format("open_content")}
              />
            )}

            {languageSwitcherProps.locales.size > 1 && (
              <LanguageSwitcher {...languageSwitcherProps} />
            )}

            <div className="grid place-content-center place-items-center">
              <p className="font-headers font-bold">{format("status")}:</p>
              <ToolTip content={formatStatusDescription(selectedScan.status)} maxWidth={"20rem"}>
                <Chip text={selectedScan.status} />
              </ToolTip>
            </div>

            {selectedScan.scanners && selectedScan.scanners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{format("scanners")}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.scanners.data, ["id", "attributes"]).map(
                    (scanner) => (
                      <Fragment key={scanner.id}>
                        <RecorderChip username={scanner.attributes.username} />
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            )}

            {selectedScan.cleaners && selectedScan.cleaners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{format("cleaners")}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.cleaners.data, ["id", "attributes"]).map(
                    (cleaner) => (
                      <Fragment key={cleaner.id}>
                        <RecorderChip username={cleaner.attributes.username} />
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            )}

            {selectedScan.typesetters && selectedScan.typesetters.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{format("typesetters")}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.typesetters.data, ["id", "attributes"]).map(
                    (typesetter) => (
                      <Fragment key={typesetter.id}>
                        <RecorderChip username={typesetter.attributes.username} />
                      </Fragment>
                    )
                  )}
                </div>
              </div>
            )}

            {isDefinedAndNotEmpty(selectedScan.notes) && (
              <ToolTip content={selectedScan.notes}>
                <Chip text={format("notes")} />
              </ToolTip>
            )}
          </div>

          <div
            className={cJoin(
              `grid items-end gap-8 border-b-2 border-dotted pb-12
               last-of-type:border-0`,
              cIf(
                is1ColumnLayout,
                "grid-cols-3 gap-[4vmin]",
                "grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]"
              )
            )}>
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="cursor-pointer drop-shadow-lg
                transition-transform shadow-shade hover:scale-102"
                onClick={() => {
                  onClickOnImage(index);
                }}>
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

export const TranslatedScanSet = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<ScanSetProps, "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });

  return <ScanSet title={selectedTranslation?.title ?? fallback.title} {...otherProps} />;
};
