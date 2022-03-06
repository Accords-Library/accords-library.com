import {
  GetWebsiteInterfaceQuery,
  StrapiImage,
} from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Button from "components/Button";
import { getOgImage, OgImage, prettyLanguage } from "queries/helpers";
import { useMediaCoarse, useMediaMobile } from "hooks/useMediaQuery";
import ReactTooltip from "react-tooltip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { ImageQuality } from "./Img";
import Popup from "./Popup";
import { useEffect } from "react";

type AppLayoutProps = {
  subPanel?: React.ReactNode;
  subPanelIcon?: string;
  contentPanel?: React.ReactNode;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  title?: string;
  navTitle: string;
  thumbnail?: StrapiImage;
  description?: string;
  extra?: React.ReactNode;
};

export default function AppLayout(props: AppLayoutProps): JSX.Element {
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

  const titlePrefix = "Accord’s Library";
  const metaImage: OgImage = props.thumbnail
    ? getOgImage(ImageQuality.Og, props.thumbnail)
    : {
        image: "/default_og.jpg",
        width: 1200,
        height: 630,
        alt: "Accord's Library Logo",
      };
  const ogTitle = props.title ? props.title : props.navTitle;

  const metaDescription = props.description
    ? props.description
    : props.langui.default_description;

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.fontSize = `${
      (appLayout.fontSize || 1) * 100
    }%`;
  });

  return (
    <div
      className={`${
        appLayout.darkMode ? "set-theme-dark" : "set-theme-light"
      } ${
        appLayout.dyslexic
          ? "set-theme-font-dyslexic"
          : "set-theme-font-standard"
      }`}
    >
      <div
        {...handlers}
        className="fixed inset-0 touch-pan-y p-0 m-0 bg-light text-black"
      >
        <Head>
          <title>{`${titlePrefix} - ${ogTitle}`}</title>

          <meta
            name="twitter:title"
            content={`${titlePrefix} - ${ogTitle}`}
          ></meta>

          <meta name="description" content={metaDescription} />
          <meta name="twitter:description" content={metaDescription}></meta>

          <meta property="og:image" content={metaImage.image}></meta>
          <meta property="og:image:secure_url" content={metaImage.image}></meta>
          <meta
            property="og:image:width"
            content={metaImage.width.toString()}
          ></meta>
          <meta
            property="og:image:height"
            content={metaImage.height.toString()}
          ></meta>
          <meta property="og:image:alt" content={metaImage.alt}></meta>
          <meta property="og:image:type" content="image/jpeg"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>

          <meta name="twitter:image" content={metaImage.image}></meta>
        </Head>

        {/* Content panel */}
        <div
          className={`top-0 left-0 right-0 bottom-20 overflow-y-scroll bg-light texture-paper-dots ${contentPanelClass}`}
        >
          {props.contentPanel ? (
            props.contentPanel
          ) : (
            <div className="grid place-content-center h-full">
              <div className="text-dark border-dark border-2 border-dotted rounded-2xl p-8 grid grid-flow-col place-items-center gap-9 opacity-40">
                <p className="text-4xl">❮</p>
                <p className="text-2xl w-64">
                  {props.langui.select_option_sidebar}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Background when navbar is opened */}
        <div
          className={`fixed bg-shade inset-0 transition-opacity duration-500 
        ${turnSubIntoContent ? "z-10" : ""}
        ${
          (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile
            ? "opacity-60"
            : "opacity-0 pointer-events-none touch-none"
        }`}
          onClick={() => {
            appLayout.setMainPanelOpen(false);
            appLayout.setSubPanelOpen(false);
          }}
        ></div>

        {/* Sub panel */}
        {props.subPanel ? (
          <div
            className={`${subPanelClass} border-r-[1px] mobile:bottom-20 mobile:border-r-0 mobile:border-l-[1px] border-black border-dotted top-0 bottom-0 right-0 left-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 bg-light texture-paper-dots
          ${
            turnSubIntoContent
              ? "mobile:translate-x-0 mobile:left-0 mobile:border-l-0"
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
          className={`${mainPanelClass} border-r-[1px] mobile:bottom-20 border-black border-dotted top-0 bottom-0 left-0 right-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 z-20 bg-light texture-paper-dots
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
          <Button className="material-icons bg-light !px-2">
            {appLayout.mainPanelReduced ? "chevron_right" : "chevron_left"}
          </Button>
        </div>

        {/* Navbar */}
        <div className="fixed inset-0 z-30 top-auto h-20 border-t-[1px] border-black border-dotted grid grid-cols-[5rem_1fr_5rem] place-items-center desktop:hidden bg-light texture-paper-dots">
          <span
            className="material-icons mt-[.1em] cursor-pointer"
            onClick={() => {
              appLayout.setMainPanelOpen(!appLayout.mainPanelOpen);
              appLayout.setSubPanelOpen(false);
            }}
          >
            {appLayout.mainPanelOpen ? "close" : "menu"}
          </span>
          <p className="text-2xl font-black font-headers">{props.navTitle}</p>
          <span
            className="material-icons mt-[.1em] cursor-pointer"
            onClick={() => {
              appLayout.setSubPanelOpen(!appLayout.subPanelOpen);
              appLayout.setMainPanelOpen(false);
            }}
          >
            {props.subPanel && !turnSubIntoContent
              ? appLayout.subPanelOpen
                ? "close"
                : props.subPanelIcon
                ? props.subPanelIcon
                : "tune"
              : ""}
          </span>
        </div>

        <Popup
          state={appLayout.languagePanelOpen}
          setState={appLayout.setLanguagePanelOpen}
        >
          <h2 className="text-2xl">{props.langui.select_language}</h2>
          <div className="flex flex-wrap flex-row gap-2">
            {router.locales?.sort().map((locale) => (
              <Button
                key={locale}
                active={locale === router.locale}
                href={router.asPath}
                locale={locale}
                onClick={() => appLayout.setLanguagePanelOpen(false)}
              >
                {prettyLanguage(locale)}
              </Button>
            ))}
          </div>
        </Popup>

        <Popup
          state={appLayout.configPanelOpen}
          setState={appLayout.setConfigPanelOpen}
        >
          <h2 className="text-2xl">Settings</h2>

          <h3 className="text-xl mt-4">Theme</h3>
          <div className="flex flex-row">
            <Button
              onClick={() => {
                appLayout.setDarkMode(false);
                appLayout.setSelectedThemeMode(true);
              }}
              active={
                appLayout.selectedThemeMode === true &&
                appLayout.darkMode === false
              }
              className="rounded-r-none"
            >
              Light
            </Button>
            <Button
              onClick={() => {
                appLayout.setSelectedThemeMode(false);
              }}
              active={appLayout.selectedThemeMode === false}
              className="rounded-l-none rounded-r-none border-x-0"
            >
              Auto
            </Button>
            <Button
              onClick={() => {
                appLayout.setDarkMode(true);
                appLayout.setSelectedThemeMode(true);
              }}
              active={
                appLayout.selectedThemeMode === true &&
                appLayout.darkMode === true
              }
              className="rounded-l-none"
            >
              Dark
            </Button>
          </div>

          <h3 className="text-xl mt-4">Font size</h3>
          <div className="flex flex-row">
            <Button
              className="rounded-r-none"
              onClick={() =>
                appLayout.setFontSize(
                  appLayout.fontSize ? appLayout.fontSize / 1.05 : 1 / 1.05
                )
              }
            >
              <span className="material-icons">text_decrease</span>
            </Button>
            <Button
              className="rounded-l-none rounded-r-none border-x-0"
              onClick={() => appLayout.setFontSize(1)}
            >
              {((appLayout.fontSize || 1) * 100).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              %
            </Button>
            <Button
              className="rounded-l-none"
              onClick={() =>
                appLayout.setFontSize(
                  appLayout.fontSize ? appLayout.fontSize * 1.05 : 1 * 1.05
                )
              }
            >
              <span className="material-icons">text_increase</span>
            </Button>
          </div>

          <h3 className="text-xl mt-4">Font</h3>
          <Button
            active={appLayout.dyslexic === false}
            onClick={() => appLayout.setDyslexic(false)}
            className="font-zenMaruGothic"
          >
            Zen Maru Gothic
          </Button>
          <Button
            active={appLayout.dyslexic === true}
            onClick={() => appLayout.setDyslexic(true)}
            className="font-openDyslexic"
          >
            OpenDyslexic
          </Button>
        </Popup>

        <ReactTooltip
          id="MainPanelTooltip"
          place="right"
          type="light"
          effect="solid"
          delayShow={300}
          delayHide={100}
          disable={!appLayout.mainPanelReduced || isMobile || isCoarse}
          className="drop-shadow-shade-xl !opacity-100 !bg-light !rounded-lg after:!border-r-light text-left !text-black"
        />
      </div>

      {props.extra}
    </div>
  );
}
