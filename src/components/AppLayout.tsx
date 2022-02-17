import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import { useState } from "react";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";

type AppLayoutProps = {
  subPanel?: React.ReactNode;
  subPanelIcon?: string;
  contentPanel?: React.ReactNode;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  title: string;
};

export default function AppLayout(props: AppLayoutProps): JSX.Element {
  const titlePrefix = "Accord’s Library";

  const [mainPanelOpen, setMainPanelOpen] = useState(false);
  const [subPanelOpen, setsubPanelOpen] = useState(false);
  const sensibilitySwipe = 1.1;

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      if (mainPanelOpen) {
        setMainPanelOpen(false);
      } else if (props.subPanel && props.contentPanel) {
        setsubPanelOpen(true);
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (SwipeEventData.velocity < sensibilitySwipe) return;
      if (subPanelOpen) {
        setsubPanelOpen(false);
      } else {
        setMainPanelOpen(true);
      }
    },
  });

  const mainPanelClass =
    "fixed desktop:left-0 desktop:top-0 desktop:bottom-0 desktop:w-[20rem]";
  const subPanelClass =
    "fixed desktop:left-[20rem] desktop:top-0 desktop:bottom-0 desktop:w-[20rem]";
  let contentPanelClass = "";
  let turnSubIntoContent = false;
  if (props.subPanel && props.contentPanel) {
    contentPanelClass =
      "fixed desktop:left-[40rem] desktop:top-0 desktop:bottom-0 desktop:right-0";
  } else if (props.contentPanel) {
    contentPanelClass =
      "fixed desktop:left-[20rem] desktop:top-0 desktop:bottom-0 desktop:right-0";
  } else if (props.subPanel) {
    turnSubIntoContent = true;
  }

  return (
    <div {...handlers} className="touch-pan-y">
      <Head>
        <title>
          {props.title ? `${titlePrefix} - ${props.title}` : titlePrefix}
        </title>
      </Head>

      {/* Navbar */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-light border-t-[1px] border-dark grid grid-cols-[5rem_1fr_5rem] place-items-center desktop:hidden">
        <span
          id="navbar-main-button"
          className="material-icons mt-[.1em] cursor-pointer"
          onClick={() => setMainPanelOpen(true)}
        >
          menu
        </span>
        <p className="text-2xl font-black font-headers">{props.title}</p>
        <span
          className="material-icons mt-[.1em] cursor-pointer"
          onClick={() => setsubPanelOpen(true)}
        >
          {props.subPanel && !turnSubIntoContent
            ? props.subPanelIcon
              ? props.subPanelIcon
              : "tune"
            : ""}
        </span>
      </div>

      {/* Content panel */}
      {props.contentPanel ? (
        <div
          className={`top-0 left-0 right-0 bottom-20 overflow-y-scroll ${contentPanelClass}`}
        >
          {props.contentPanel}
        </div>
      ) : (
        <div className="top-0 left-0 right-0 bottom-20 overflow-y-scroll fixed desktop:left-[40rem] desktop:top-0 desktop:bottom-0 desktop:right-0 opacity-40">
          <div className="grid place-content-center h-full">
            <div className="text-dark border-dark border-2 border-dotted rounded-2xl p-8 grid grid-flow-col place-items-center gap-9">
              <p className="text-4xl">❮</p>
              <p className="text-2xl w-64">
                Select one of the options in the sidebar
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Background when navbar is opened */}
      <div
        className={`fixed bg-dark inset-0 transition-opacity duration-500 
        ${turnSubIntoContent ? "z-10" : ""}
        ${
          mainPanelOpen || subPanelOpen
            ? " opacity-50"
            : "opacity-0 translate-x-full"
        }`}
        onClick={() => {
          setMainPanelOpen(false);
          setsubPanelOpen(false);
        }}
      ></div>

      {/* Sub panel */}
      {props.subPanel ? (
        <div
          className={`${subPanelClass} border-r-[1px] mobile:border-r-0 mobile:border-l-[1px] border-black top-0 bottom-0 right-0 left-12 bg-light overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300
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
        className={`${mainPanelClass} border-r-[1px] border-black top-0 bottom-0 left-0 right-12 bg-light overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 z-20
        ${mainPanelOpen ? "" : "mobile:-translate-x-full"}`}
      >
        <MainPanel langui={props.langui} />
      </div>
    </div>
  );
}
