import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Button from "components/Button";
import { prettyLanguage } from "queries/helpers";
import { useMediaCoarse, useMediaMobile } from "hooks/useMediaQuery";
import ReactTooltip from "react-tooltip";
import { useAppLayout } from "contexts/AppLayoutContext";

type AppLayoutProps = {
  subPanel?: React.ReactNode;
  subPanelIcon?: string;
  contentPanel?: React.ReactNode;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  title: string;
};

export default function AppLayout(props: AppLayoutProps): JSX.Element {
  const titlePrefix = "Accord’s Library";
  const router = useRouter();
  const isMobile = useMediaMobile();
  const isCoarse = useMediaCoarse();
  const appLayout = useAppLayout();

  const sensibilitySwipe = 1.1;

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      if (appLayout.mainPanelOpen) {
        appLayout.setMainPanelOpen(false);
      } else if (props.subPanel && props.contentPanel) {
        appLayout.setSubPanelOpen(true);
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      if (appLayout.subPanelOpen) {
        appLayout.setSubPanelOpen(false);
      } else {
        appLayout.setMainPanelOpen(true);
      }
    },
  });

  const mainPanelClass = `fixed desktop:left-0 desktop:top-0 desktop:bottom-0 ${
    appLayout.mainPanelReduced ? "desktop:w-[6rem]" : "desktop:w-[20rem]"
  }`;
  const subPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:w-[20rem] ${
    appLayout.mainPanelReduced ? " desktop:left-[6rem]" : "desktop:left-[20rem]"
  }`;
  let contentPanelClass = "";
  if (props.subPanel) {
    contentPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:right-0 ${
      appLayout.mainPanelReduced
        ? "desktop:left-[26rem]"
        : "desktop:left-[40rem]"
    }`;
  } else if (props.contentPanel) {
    contentPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:right-0 ${
      appLayout.mainPanelReduced
        ? "desktop:left-[6rem]"
        : "desktop:left-[20rem]"
    }`;
  }

  const turnSubIntoContent = props.subPanel && !props.contentPanel;

  return (
    <div className={appLayout.darkMode ? "dark" : ""}>
      <div
        {...handlers}
        className="fixed inset-0 touch-pan-y p-0 m-0 bg-light dark:bg-dark-light text-black dark:text-dark-black"
      >
        <Head>
          <title>
            {props.title ? `${titlePrefix} - ${props.title}` : titlePrefix}
          </title>
        </Head>

        {/* Navbar */}
        <div className="fixed inset-0 top-auto h-20 border-t-[1px] border-black dark:border-dark-black border-dotted grid grid-cols-[5rem_1fr_5rem] place-items-center desktop:hidden bg-light dark:bg-dark-light texture-paper-dots">
          <span
            className="material-icons mt-[.1em] cursor-pointer"
            onClick={() => appLayout.setMainPanelOpen(true)}
          >
            menu
          </span>
          <p className="text-2xl font-black font-headers">{props.title}</p>
          <span
            className="material-icons mt-[.1em] cursor-pointer"
            onClick={() => appLayout.setSubPanelOpen(true)}
          >
            {props.subPanel && !turnSubIntoContent
              ? props.subPanelIcon
                ? props.subPanelIcon
                : "tune"
              : ""}
          </span>
        </div>

        {/* Content panel */}
        <div
          className={`top-0 left-0 right-0 bottom-20 overflow-y-scroll bg-light dark:bg-dark-light texture-paper-dots ${contentPanelClass}`}
        >
          {props.contentPanel ? (
            props.contentPanel
          ) : (
            <div className="grid place-content-center h-full">
              <div className="text-dark dark:text-dark-dark border-dark border-2 border-dotted rounded-2xl p-8 grid grid-flow-col place-items-center gap-9 opacity-40">
                <p className="text-4xl">❮</p>
                <p className="text-2xl w-64">
                  Select one of the options in the sidebar
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Background when navbar is opened */}
        <div
          className={`fixed bg-shade dark:bg-dark-shade inset-0 transition-opacity duration-500 
        ${turnSubIntoContent ? "z-10" : ""}
        ${
          (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile
            ? "opacity-60 dark:opacity-60"
            : "opacity-0 dark:opacity-0 pointer-events-none touch-none"
        }`}
          onClick={() => {
            appLayout.setMainPanelOpen(false);
            appLayout.setSubPanelOpen(false);
          }}
        ></div>

        {/* Sub panel */}
        {props.subPanel ? (
          <div
            className={`${subPanelClass} border-r-[1px] mobile:border-r-0 mobile:border-l-[1px] border-black dark:border-dark-black border-dotted top-0 bottom-0 right-0 left-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 bg-light dark:bg-dark-light texture-paper-dots
          ${
            turnSubIntoContent
              ? "mobile:translate-x-0 mobile:bottom-20 mobile:left-0 mobile:border-l-0"
              : !appLayout.subPanelOpen
              ? "mobile:translate-x-full"
              : ""
          }`}
          >
            {props.subPanel}
          </div>
        ) : (
          ""
        )}

        {/* Main panel */}
        <div
          className={`${mainPanelClass} border-r-[1px] border-black dark:border-dark-black border-dotted top-0 bottom-0 left-0 right-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 z-20 bg-light dark:bg-dark-light texture-paper-dots
        ${appLayout.mainPanelOpen ? "" : "mobile:-translate-x-full"}`}
        >
          <MainPanel langui={props.langui} />
        </div>

        {/* Main panel minimize button*/}
        <div
          className={`mobile:hidden translate-x-0 fixed top-1/2 z-20 ${
            appLayout.mainPanelReduced ? "left-[4.65rem]" : "left-[18.65rem]"
          }`}
          onClick={() =>
            appLayout.setMainPanelReduced(!appLayout.mainPanelReduced)
          }
        >
          <Button className="material-icons bg-light dark:bg-dark-light !px-2">
            {appLayout.mainPanelReduced ? "chevron_right" : "chevron_left"}
          </Button>
        </div>

        {/* Language selection background */}
        <div
          className={`fixed bg-shade dark:bg-dark-shade inset-0 transition-all duration-500 z-20 grid place-content-center ${
            appLayout.languagePanelOpen
              ? "bg-opacity-60 dark:bg-opacity-60"
              : "bg-opacity-0 dark:bg-opacity-0 pointer-events-none touch-none"
          }`}
          onClick={() => {
            appLayout.setLanguagePanelOpen(false);
          }}
        >
          <div
            className={`p-10 bg-light dark:bg-dark-light rounded-lg shadow-2xl shadow-shade dark:shadow-dark-shade grid gap-4 place-items-center transition-transform ${
              appLayout.languagePanelOpen ? "scale-100" : "scale-0"
            }`}
          >
            <h2 className="text-2xl">Select a language</h2>
            <div className="flex flex-wrap flex-row gap-2">
              {router.locales?.sort().map((locale) => (
                <Button
                  key={locale}
                  active={locale === router.locale}
                  href={router.asPath}
                  locale={locale}
                >
                  {prettyLanguage(locale)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <ReactTooltip
          id="MainPanelTooltip"
          place="right"
          type="light"
          effect="solid"
          delayShow={300}
          delayHide={100}
          disable={!appLayout.mainPanelReduced || isMobile || isCoarse}
          className="drop-shadow-shade-xl dark:drop-shadow-dark-shade-xl !opacity-100 !bg-light dark:!bg-dark-light !rounded-lg after:!border-r-light text-left !text-black dark:!text-dark-black"
        />
      </div>
    </div>
  );
}
