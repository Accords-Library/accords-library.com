import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Button from "components/Button";
import { prettyLanguage } from "queries/helpers";
import { useMediaMobile } from "hooks/useMediaQuery";

import { useSelector, useDispatch } from "react-redux";
import {
  setMainPanelOpen,
  setLanguagePanelOpen,
  setSubPanelOpen,
  setMainPanelReduced,
} from "redux/AppLayoutSlice";
import { RootState } from "redux/store";

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

  const languagePanelOpen = useSelector(
    (state: RootState) => state.appLayout.languagePanelOpen
  );
  const mainPanelOpen = useSelector(
    (state: RootState) => state.appLayout.mainPanelOpen
  );
  const mainPanelReduced = useSelector(
    (state: RootState) => state.appLayout.mainPanelReduced
  );
  const subPanelOpen = useSelector(
    (state: RootState) => state.appLayout.subPanelOpen
  );

  const dispatch = useDispatch();

  const isMobile = useMediaMobile();
  const sensibilitySwipe = 1.1;

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      if (mainPanelOpen) {
        dispatch(setMainPanelOpen(false));
      } else if (props.subPanel && props.contentPanel) {
        dispatch(setSubPanelOpen(true));
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      if (subPanelOpen) {
        dispatch(setSubPanelOpen(false));
      } else {
        dispatch(setMainPanelOpen(true));
      }
    },
  });

  const mainPanelClass = `fixed desktop:left-0 desktop:top-0 desktop:bottom-0 ${
    mainPanelReduced ? "desktop:w-[8rem]" : "desktop:w-[20rem]"
  }`;
  const subPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:w-[20rem] ${
    mainPanelReduced ? " desktop:left-[8rem]" : "desktop:left-[20rem]"
  }`;
  let contentPanelClass = "";
  if (props.subPanel) {
    contentPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:right-0 ${
      mainPanelReduced ? "desktop:left-[28rem]" : "desktop:left-[40rem]"
    }`;
  } else if (props.contentPanel) {
    contentPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:right-0 ${
      mainPanelReduced ? "desktop:left-[8rem]" : "desktop:left-[20rem]"
    }`;
  }

  const turnSubIntoContent = props.subPanel && !props.contentPanel;

  return (
    <div {...handlers} className="touch-pan-y">
      <Head>
        <title>
          {props.title ? `${titlePrefix} - ${props.title}` : titlePrefix}
        </title>
      </Head>

      {/* Navbar */}
      <div className="fixed bottom-0 left-0 right-0 h-20 border-t-[1px] border-black border-dotted grid grid-cols-[5rem_1fr_5rem] place-items-center desktop:hidden bg-light bg-paper bg-blend-multiply bg-local bg-[length:10cm]">
        <span
          id="navbar-main-button"
          className="material-icons mt-[.1em] cursor-pointer"
          onClick={() => dispatch(setMainPanelOpen(true))}
        >
          menu
        </span>
        <p className="text-2xl font-black font-headers">{props.title}</p>
        <span
          className="material-icons mt-[.1em] cursor-pointer"
          onClick={() => dispatch(setSubPanelOpen(true))}
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
        className={`top-0 left-0 right-0 bottom-20 overflow-y-scroll bg-light bg-paper bg-blend-multiply bg-local bg-[length:10cm] ${contentPanelClass}`}
      >
        {props.contentPanel ? (
          props.contentPanel
        ) : (
          <div className="grid place-content-center h-full">
            <div className="text-dark border-dark border-2 border-dotted rounded-2xl p-8 grid grid-flow-col place-items-center gap-9 opacity-40">
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
        className={`fixed bg-dark inset-0 transition-opacity duration-500 
        ${turnSubIntoContent ? "z-10" : ""}
        ${
          (mainPanelOpen || subPanelOpen) && isMobile
            ? "opacity-50"
            : "opacity-0 pointer-events-none touch-none"
        }`}
        onClick={() => {
          dispatch(setMainPanelOpen(false));
          dispatch(setSubPanelOpen(false));
        }}
      ></div>

      {/* Sub panel */}
      {props.subPanel ? (
        <div
          className={`${subPanelClass} border-r-[1px] mobile:border-r-0 mobile:border-l-[1px] border-black border-dotted top-0 bottom-0 right-0 left-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 bg-light bg-paper bg-blend-multiply bg-local bg-[length:10cm]
          ${
            turnSubIntoContent
              ? "mobile:translate-x-0 mobile:bottom-20 mobile:left-0 mobile:border-l-0"
              : !subPanelOpen
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
        className={`${mainPanelClass} border-r-[1px] border-black border-dotted top-0 bottom-0 left-0 right-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 z-20 bg-light bg-paper bg-blend-multiply bg-local bg-[length:10cm]
        ${mainPanelOpen ? "" : "mobile:-translate-x-full"}`}
      >
        <MainPanel langui={props.langui} />
      </div>

      {/* Main panel minimize button*/}
      <div
        className={`mobile:hidden translate-x-0 fixed top-1/2 z-20 ${
          mainPanelReduced ? "left-[6.65rem]" : "left-[18.65rem]"
        }`}
        onClick={() => dispatch(setMainPanelReduced(!mainPanelReduced))}
      >
        <Button className="material-icons bg-light !px-2">
          {mainPanelReduced ? "chevron_right" : "chevron_left"}
        </Button>
      </div>

      {/* Language selection background */}
      <div
        className={`fixed bg-dark inset-0 transition-all duration-500 z-20 grid place-content-center ${
          languagePanelOpen
            ? "bg-opacity-50"
            : "bg-opacity-0 pointer-events-none touch-none"
        }`}
        onClick={() => {
          dispatch(setLanguagePanelOpen(false));
        }}
      >
        <div
          className={`p-10 bg-light rounded-lg shadow-2xl shadow-dark grid gap-4 place-items-center transition-transform ${
            languagePanelOpen ? "scale-100" : "scale-0"
          }`}
        >
          <h2 className="text-2xl">Select a language</h2>
          <div className="flex flex-wrap flex-row gap-2">
            {router.locales?.sort().map((locale) => (
              <>
                {locale !== "xx" ? (
                  <Button
                    key={locale}
                    active={locale === router.locale}
                    href={router.asPath}
                    locale={locale}
                  >
                    {prettyLanguage(locale)}
                  </Button>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
