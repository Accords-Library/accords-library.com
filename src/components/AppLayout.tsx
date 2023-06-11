import Head from "next/head";
import { useSwipeable } from "react-swipeable";
import { MaterialSymbol } from "material-symbols";
import { atom } from "jotai";
import { useRouter } from "next/router";
import { layout } from "../../design.config";
import { Ico } from "./Ico";
import { MainPanel } from "./Panels/MainPanel";
import { isDefined, isUndefined } from "helpers/asserts";
import { cIf, cJoin } from "helpers/className";
import { OpenGraph, TITLE_PREFIX, TITLE_SEPARATOR } from "helpers/openGraph";
import { Ids } from "types/ids";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomPair } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const SENSIBILITY_SWIPE = 1.1;
const isIOSAtom = atom((get) => get(atoms.userAgent.os) === "iOS");

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export interface AppLayoutRequired {
  openGraph: OpenGraph;
}

interface Props extends AppLayoutRequired {
  subPanel?: React.ReactNode;
  subPanelIcon?: MaterialSymbol;
  contentPanel?: React.ReactNode;
  contentPanelScroolbar?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AppLayout = ({
  subPanel,
  contentPanel,
  openGraph,
  subPanelIcon = "tune",
  contentPanelScroolbar = true,
}: Props): JSX.Element => {
  const isMainPanelReduced = useAtomGetter(atoms.layout.mainPanelReduced);
  const [isSubPanelOpened, setSubPanelOpened] = useAtomPair(atoms.layout.subPanelOpened);
  const [isMainPanelOpened, setMainPanelOpened] = useAtomPair(atoms.layout.mainPanelOpened);
  const isMenuGesturesEnabled = useAtomGetter(atoms.layout.menuGesturesEnabled);
  const isPerfModeEnabled = useAtomGetter(atoms.settings.isPerfModeEnabled);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const isScreenAtLeastXs = useAtomGetter(atoms.containerQueries.isScreenAtLeastXs);
  const isIOS = useAtomGetter(isIOSAtom);
  const router = useRouter();

  const { format } = useFormat();

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (isMenuGesturesEnabled) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (isMainPanelOpened) {
          setMainPanelOpened(false);
        } else if (isDefined(subPanel) && isDefined(contentPanel)) {
          setSubPanelOpened(true);
        }
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (isMenuGesturesEnabled) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (isSubPanelOpened) {
          setSubPanelOpened(false);
        } else {
          setMainPanelOpened(true);
        }
      }
    },
  });

  const turnSubIntoContent = isDefined(subPanel) && isUndefined(contentPanel) && is1ColumnLayout;

  return (
    <div
      {...handlers}
      id={Ids.Body}
      className={cJoin(
        "fixed inset-0 m-0 grid touch-pan-y bg-light p-0",
        cIf(
          is1ColumnLayout,
          "grid-rows-[1fr_5rem] [grid-template-areas:'content''navbar']",
          "[grid-template-areas:'main_sub_content']"
        )
      )}
      style={{
        gridTemplateColumns: is1ColumnLayout
          ? "1fr"
          : `${isMainPanelReduced ? layout.mainMenuReduced : layout.mainMenu}rem ${
              isDefined(subPanel) ? layout.subMenu : 0
            }rem 1fr`,
      }}>
      <Head>
        <title>{openGraph.title}</title>
        <meta name="description" content={openGraph.description} />

        <meta name="twitter:site" content="@AccordsLibrary" />
        <meta name="twitter:title" content={openGraph.title} />
        <meta name="twitter:description" content={openGraph.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={openGraph.thumbnail.image} />

        <meta
          property="og:type"
          content={openGraph.video ? "video.movie" : openGraph.audio ? "music.song" : "website"}
        />
        <meta property="og:locale" content={router.locale} />
        <meta property="og:site_name" content="Accord’s Library" />

        <meta property="og:title" content={openGraph.title} />
        <meta property="og:description" content={openGraph.description} />

        <meta property="og:image" content={openGraph.thumbnail.image} />
        <meta property="og:image:secure_url" content={openGraph.thumbnail.image} />
        <meta property="og:image:width" content={openGraph.thumbnail.width.toString()} />
        <meta property="og:image:height" content={openGraph.thumbnail.height.toString()} />
        <meta property="og:image:alt" content={openGraph.thumbnail.alt} />
        <meta property="og:image:type" content="image/jpeg" />

        {openGraph.audio && (
          <>
            <meta property="og:audio" content={openGraph.audio} />
            <meta property="og:audio:type" content="audio/mpeg" />
          </>
        )}
        {openGraph.video && (
          <>
            <meta property="og:video" content={openGraph.video} />{" "}
            <meta property="og:video:type" content="video/mp4" />
          </>
        )}
      </Head>

      {/* Content panel */}
      <div
        id={Ids.ContentPanel}
        className={cJoin(
          "bg-light [grid-area:content]",
          cIf(!isIOS, "texture-paper-dots"),
          cIf(contentPanelScroolbar, "overflow-y-scroll")
        )}>
        {isDefined(contentPanel) ? (
          contentPanel
        ) : turnSubIntoContent ? (
          subPanel
        ) : (
          <ContentPlaceholder message={format("select_option_sidebar")} icon={"chevron_left"} />
        )}
      </div>

      {/* Background when navbar is opened */}

      <div
        className={cJoin(
          `absolute inset-0 z-40 transition-filter duration-500
            [grid-area:content]`,
          cIf(
            (isMainPanelOpened || isSubPanelOpened) && is1ColumnLayout,
            cIf(!isPerfModeEnabled, "backdrop-blur"),
            "pointer-events-none touch-none"
          )
        )}>
        <div
          className={cJoin(
            "absolute inset-0 bg-shade transition-opacity duration-500",
            cIf(
              (isMainPanelOpened || isSubPanelOpened) && is1ColumnLayout,
              "opacity-60",
              "opacity-0"
            )
          )}
          onClick={() => {
            setMainPanelOpened(false);
            setSubPanelOpened(false);
          }}
        />
      </div>

      {/* Navbar */}
      <div
        className={cJoin(
          `z-40 grid grid-cols-[5rem_1fr_5rem] place-items-center border-t
          border-dotted border-black bg-light [grid-area:navbar]`,
          cIf(!isIOS, "texture-paper-dots"),
          cIf(!is1ColumnLayout, "hidden")
        )}>
        <Ico
          icon={isMainPanelOpened ? "close" : "menu"}
          className="cursor-pointer !text-2xl"
          onClick={() => {
            setMainPanelOpened((current) => !current);
            setSubPanelOpened(false);
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
            icon={isSubPanelOpened ? "close" : subPanelIcon}
            className="cursor-pointer !text-2xl"
            onClick={() => {
              setSubPanelOpened((current) => !current);
              setMainPanelOpened(false);
            }}
          />
        )}
      </div>

      {/* Sub panel */}
      {isDefined(subPanel) && !turnSubIntoContent && (
        <div
          id={Ids.SubPanel}
          className={cJoin(
            `overflow-y-scroll border-r border-dark/50 bg-light
              transition-transform duration-300 scrollbar-none`,
            cIf(!isIOS, "texture-paper-dots"),
            cIf(
              is1ColumnLayout,
              "z-40 justify-self-end border-r-0 [grid-area:content]",
              "[grid-area:sub]"
            ),
            cIf(is1ColumnLayout && isScreenAtLeastXs, "w-[min(30rem,90%)] border-l"),
            cIf(is1ColumnLayout && !isSubPanelOpened, "translate-x-[100vw]")
          )}>
          {subPanel}
        </div>
      )}

      {/* Main panel */}
      <div
        className={cJoin(
          `overflow-y-scroll border-r border-dark/50 bg-light
            transition-transform duration-300 scrollbar-none`,
          cIf(!isIOS, "texture-paper-dots"),
          cIf(is1ColumnLayout, "z-40 justify-self-start [grid-area:content]", "[grid-area:main]"),
          cIf(is1ColumnLayout && isScreenAtLeastXs, "w-[min(30rem,90%)]"),
          cIf(!isMainPanelOpened && is1ColumnLayout, "-translate-x-full")
        )}>
        <MainPanel />
      </div>
    </div>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface ContentPlaceholderProps {
  message: string;
  icon?: MaterialSymbol;
}

const ContentPlaceholder = ({ message, icon }: ContentPlaceholderProps): JSX.Element => (
  <div className="grid h-full place-content-center">
    <div
      className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40">
      {isDefined(icon) && <Ico icon={icon} className="!text-[300%]" />}
      <p className={cJoin("w-64 text-2xl", cIf(isUndefined(icon), "text-center"))}>{message}</p>
    </div>
  </div>
);
