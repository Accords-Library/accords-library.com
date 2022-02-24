import {
  GetWebsiteInterfaceQuery,
  StrapiImage,
} from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Button from "components/Button";
import { getOgImage, prettyLanguage } from "queries/helpers";
import { useMediaCoarse, useMediaMobile } from "hooks/useMediaQuery";
import ReactTooltip from "react-tooltip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { ImageQuality } from "./Img";

type AppLayoutProps = {
  subPanel?: React.ReactNode;
  subPanelIcon?: string;
  contentPanel?: React.ReactNode;
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"];
  title?: string;
  navTitle: string;
  thumbnail?: StrapiImage;
  description?: string;
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

  const ogImage = getOgImage(ImageQuality.Og, props.thumbnail);
  const ogTitle = props.title ? props.title : props.navTitle;

  return (
    <div className={appLayout.darkMode ? "set-theme-dark" : "set-theme-light"}>
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

          {props.description && (
            <>
              <meta name="description" content={props.description} />
              <meta
                name="twitter:description"
                content={props.description}
              ></meta>
            </>
          )}

          {ogImage && (
            <>
              <meta property="og:image" content={ogImage.image}></meta>
              <meta
                property="og:image:secure_url"
                content={ogImage.image}
              ></meta>
              <meta
                property="og:image:width"
                content={ogImage.width.toString()}
              ></meta>
              <meta
                property="og:image:height"
                content={ogImage.height.toString()}
              ></meta>
              <meta property="og:image:alt" content={ogImage.alt}></meta>
              <meta property="og:image:type" content="image/jpeg"></meta>
              <meta name="twitter:card" content="summary_large_image"></meta>

              <meta name="twitter:image" content={ogImage.image}></meta>
            </>
          )}
        </Head>

        {/* Navbar */}
        <div className="fixed inset-0 top-auto h-20 border-t-[1px] border-black border-dotted grid grid-cols-[5rem_1fr_5rem] place-items-center desktop:hidden bg-light texture-paper-dots">
          <span
            className="material-icons mt-[.1em] cursor-pointer"
            onClick={() => appLayout.setMainPanelOpen(true)}
          >
            menu
          </span>
          <p className="text-2xl font-black font-headers">{props.navTitle}</p>
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
          className={`top-0 left-0 right-0 bottom-20 overflow-y-scroll bg-light texture-paper-dots ${contentPanelClass}`}
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
            className={`${subPanelClass} border-r-[1px] mobile:border-r-0 mobile:border-l-[1px] border-black border-dotted top-0 bottom-0 right-0 left-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 bg-light texture-paper-dots
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
          className={`${mainPanelClass} border-r-[1px] border-black border-dotted top-0 bottom-0 left-0 right-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 z-20 bg-light texture-paper-dots
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

        {/* Language selection background */}
        <div
          className={`fixed bg-shade inset-0 transition-all duration-500 z-20 grid place-content-center ${
            appLayout.languagePanelOpen
              ? "bg-opacity-60"
              : "bg-opacity-0 pointer-events-none touch-none"
          }`}
          onClick={() => {
            appLayout.setLanguagePanelOpen(false);
          }}
        >
          <div
            className={`p-10 bg-light rounded-lg shadow-2xl shadow-shade grid gap-4 place-items-center transition-transform ${
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
          className="drop-shadow-shade-xl !opacity-100 !bg-light !rounded-lg after:!border-r-light text-left !text-black"
        />
      </div>
    </div>
  );
}
