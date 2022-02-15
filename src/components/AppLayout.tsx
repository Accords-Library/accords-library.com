import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import { useState } from "react";
import Head from "next/head";

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

  const mainPanelClass =
    "fixed desktop:left-0 desktop:top-0 desktop:bottom-0 desktop:w-[20rem]";
  const subPanelClass =
    "fixed desktop:left-[20rem] desktop:top-0 desktop:bottom-0 desktop:w-[20rem]";
  let contentPanelClass = "";
  if (props.subPanel && props.contentPanel) {
    contentPanelClass =
      "fixed desktop:left-[40rem] desktop:top-0 desktop:bottom-0 desktop:right-0";
  } else if (props.contentPanel) {
    contentPanelClass =
      "fixed desktop:left-[20rem] desktop:top-0 desktop:bottom-0 desktop:right-0";
  }

  return (
    <>
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
          {props.subPanel
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
        ""
      )}

      {/* Background when navbar is opened */}
      <div
        className={`fixed bg-dark inset-0 transition-opacity duration-500 ${
          mainPanelOpen || subPanelOpen
            ? " opacity-50"
            : "opacity-0 translate-x-full"
        }`}
        onClick={() => {
          setMainPanelOpen(false);
          setsubPanelOpen(false);
        }}
      ></div>

      {/* Main panel */}
      <div
        className={`${mainPanelClass} border-r-[1px] border-black top-0 bottom-0 left-0 right-12 bg-light overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-500
        ${mainPanelOpen ? "" : "mobile:-translate-x-full"}`}
      >
        <MainPanel langui={props.langui} />
      </div>

      {/* Sub panel */}
      {props.subPanel ? (
        <div
          className={`${subPanelClass} border-r-[1px] mobile:border-r-0 mobile:border-l-[1px] border-black top-0 bottom-0 right-0 left-12 bg-light overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-500
        ${subPanelOpen ? "" : "mobile:translate-x-full"}`}
        >
          {props.subPanel}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
