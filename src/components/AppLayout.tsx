import Head from "next/head";
import { useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import { layout } from "../../design.config";
import { Ico, Icon } from "./Ico";
import { MainPanel } from "./Panels/MainPanel";
import { SafariPopup } from "./Panels/SafariPopup";
import { isDefined, isUndefined } from "helpers/others";
import { cIf, cJoin } from "helpers/className";
import { useAppLayout } from "contexts/AppLayoutContext";
import { OpenGraph, TITLE_PREFIX, TITLE_SEPARATOR } from "helpers/openGraph";
import { Ids } from "types/ids";
import { useLocalData } from "contexts/LocalDataContext";
import { useContainerQueries } from "contexts/ContainerQueriesContext";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const SENSIBILITY_SWIPE = 1.1;

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export interface AppLayoutRequired {
  openGraph: OpenGraph;
}

interface Props extends AppLayoutRequired {
  subPanel?: React.ReactNode;
  subPanelIcon?: Icon;
  contentPanel?: React.ReactNode;
  contentPanelScroolbar?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AppLayout = ({
  subPanel,
  contentPanel,
  openGraph,
  subPanelIcon = Icon.Tune,
  contentPanelScroolbar = true,
}: Props): JSX.Element => {
  const {
    mainPanelOpen,
    mainPanelReduced,
    menuGestures,
    subPanelOpen,
    setMainPanelOpen,
    setSubPanelOpen,
    toggleMainPanelOpen,
    toggleSubPanelOpen,
  } = useAppLayout();

  const { langui } = useLocalData();

  const { is1ColumnLayout, isScreenAtLeastXs } = useContainerQueries();

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (mainPanelOpen) {
          setMainPanelOpen(false);
        } else if (isDefined(subPanel) && isDefined(contentPanel)) {
          setSubPanelOpen(true);
        }
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (subPanelOpen) {
          setSubPanelOpen(false);
        } else {
          setMainPanelOpen(true);
        }
      }
    },
  });

  const turnSubIntoContent = useMemo(
    () => isDefined(subPanel) && isUndefined(contentPanel),
    [contentPanel, subPanel]
  );

  return (
    <div
      {...handlers}
      id={Ids.Body}
      className={cJoin(
        "fixed inset-0 m-0 grid touch-pan-y bg-light p-0 [grid-template-areas:'main_sub_content']",
        cIf(is1ColumnLayout, "grid-rows-[1fr_5rem] [grid-template-areas:'content''navbar']")
      )}
      style={{
        gridTemplateColumns: is1ColumnLayout
          ? "1fr"
          : `${mainPanelReduced ? layout.mainMenuReduced : layout.mainMenu}rem ${
              isDefined(subPanel) ? layout.subMenu : 0
            }rem 1fr`,
      }}>
      <Head>
        <title>{openGraph.title}</title>
        <meta name="description" content={openGraph.description} />

        <meta name="twitter:title" content={openGraph.title} />
        <meta name="twitter:description" content={openGraph.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={openGraph.thumbnail.image} />

        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />
        <meta property="og:image" content={openGraph.thumbnail.image} />
        <meta property="og:image:secure_url" content={openGraph.thumbnail.image} />
        <meta property="og:image:width" content={openGraph.thumbnail.width.toString()} />
        <meta property="og:image:height" content={openGraph.thumbnail.height.toString()} />
        <meta property="og:image:alt" content={openGraph.thumbnail.alt} />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>

      {/* Background when navbar is opened */}
      <div
        className={cJoin(
          `absolute inset-0 transition-filter duration-500
            [grid-area:content]`,
          cIf(
            (mainPanelOpen || subPanelOpen) && is1ColumnLayout,
            "z-10 backdrop-blur",
            "pointer-events-none touch-none"
          )
        )}>
        <div
          className={cJoin(
            "absolute inset-0 bg-shade transition-opacity duration-500",
            cIf((mainPanelOpen || subPanelOpen) && is1ColumnLayout, "opacity-60", "opacity-0")
          )}
          onClick={() => {
            setMainPanelOpen(false);
            setSubPanelOpen(false);
          }}
        />
      </div>

      {/* Content panel */}
      <div
        id={Ids.ContentPanel}
        className={cJoin(
          "texture-paper-dots bg-light [grid-area:content]",
          cIf(contentPanelScroolbar, "overflow-y-scroll")
        )}>
        {isDefined(contentPanel) ? (
          contentPanel
        ) : (
          <ContentPlaceholder
            message={langui.select_option_sidebar ?? ""}
            icon={Icon.ChevronLeft}
          />
        )}
      </div>

      {/* Sub panel */}
      {isDefined(subPanel) && (
        <div
          id={Ids.SubPanel}
          className={cJoin(
            `texture-paper-dots z-20 overflow-y-scroll border-r border-dark/50
              bg-light transition-transform duration-300 scrollbar-none`,
            cIf(
              is1ColumnLayout,
              "justify-self-end border-r-0 [grid-area:content]",
              "[grid-area:sub]"
            ),
            cIf(is1ColumnLayout && isScreenAtLeastXs, "w-[min(30rem,90%)] border-l"),
            cIf(is1ColumnLayout && !subPanelOpen && !turnSubIntoContent, "translate-x-[100vw]"),
            cIf(is1ColumnLayout && turnSubIntoContent, "w-full border-l-0")
          )}>
          {subPanel}
        </div>
      )}

      {/* Main panel */}
      <div
        className={cJoin(
          `texture-paper-dots z-30 overflow-y-scroll border-r border-dark/50
            bg-light transition-transform duration-300 scrollbar-none`,
          cIf(is1ColumnLayout, "justify-self-start [grid-area:content]", "[grid-area:main]"),
          cIf(is1ColumnLayout && isScreenAtLeastXs, "w-[min(30rem,90%)]"),
          cIf(!mainPanelOpen && is1ColumnLayout, "-translate-x-full")
        )}>
        <MainPanel />
      </div>

      {/* Navbar */}
      <div
        className={cJoin(
          `texture-paper-dots z-10 grid grid-cols-[5rem_1fr_5rem] place-items-center
            border-t border-dotted border-black bg-light [grid-area:navbar]`,
          cIf(!is1ColumnLayout, "hidden")
        )}>
        <Ico
          icon={mainPanelOpen ? Icon.Close : Icon.Menu}
          className="cursor-pointer !text-2xl"
          onClick={() => {
            toggleMainPanelOpen();
            setSubPanelOpen(false);
          }}
        />
        <p
          className={cJoin(
            "overflow-hidden text-center font-headers font-black",
            cIf(openGraph.title.length > 30, "max-h-14 text-xl", "max-h-16 text-2xl")
          )}>
          {openGraph.title.substring(TITLE_PREFIX.length + TITLE_SEPARATOR.length)
            ? openGraph.title.substring(TITLE_PREFIX.length + TITLE_SEPARATOR.length)
            : "Accord’s Library"}
        </p>
        {isDefined(subPanel) && !turnSubIntoContent && (
          <Ico
            icon={subPanelOpen ? Icon.Close : subPanelIcon}
            className="cursor-pointer !text-2xl"
            onClick={() => {
              toggleSubPanelOpen();
              setMainPanelOpen(false);
            }}
          />
        )}
      </div>
      <SafariPopup />
    </div>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ContentPlaceholderProps {
  message: string;
  icon?: Icon;
}

const ContentPlaceholder = ({ message, icon }: ContentPlaceholderProps): JSX.Element => (
  <div className="grid h-full place-content-center">
    <div
      className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40">
      {isDefined(icon) && <Ico icon={icon} className="!text-[300%]" />}
      <p className={cJoin("w-64 text-2xl", cIf(!isDefined(icon), "text-center"))}>{message}</p>
    </div>
  </div>
);
