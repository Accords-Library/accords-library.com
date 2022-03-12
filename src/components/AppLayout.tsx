import {
  GetWebsiteInterfaceQuery,
  StrapiImage,
} from "graphql/operations-types";
import MainPanel from "./Panels/MainPanel";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Button from "components/Button";
import { getOgImage, OgImage } from "queries/helpers";
import { useMediaCoarse, useMediaMobile } from "hooks/useMediaQuery";
import { useAppLayout } from "contexts/AppLayoutContext";
import { ImageQuality } from "./Img";
import Popup from "./Popup";
import { useEffect, useState } from "react";
import Select from "./Select";
import { AppStaticProps } from "queries/getAppStaticProps";

interface AppLayoutProps extends AppStaticProps {
  subPanel?: React.ReactNode;
  subPanelIcon?: string;
  contentPanel?: React.ReactNode;
  title?: string;
  navTitle: string;
  thumbnail?: StrapiImage;
  description?: string;
}

export default function AppLayout(props: AppLayoutProps): JSX.Element {
  const { langui, currencies, languages, subPanel, contentPanel } = props;
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
      } else if (subPanel && contentPanel) {
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
  if (subPanel) {
    contentPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:right-0 ${
      appLayout.mainPanelReduced
        ? "desktop:left-[26rem]"
        : "desktop:left-[40rem]"
    }`;
  } else if (contentPanel) {
    contentPanelClass = `fixed desktop:top-0 desktop:bottom-0 desktop:right-0 ${
      appLayout.mainPanelReduced
        ? "desktop:left-[6rem]"
        : "desktop:left-[20rem]"
    }`;
  }

  const turnSubIntoContent = subPanel && !contentPanel;

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
    : langui.default_description;

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.fontSize = `${
      (appLayout.fontSize || 1) * 100
    }%`;
  }, [appLayout.fontSize]);

  const currencyOptions = currencies.map((currency) => {
    return currency.attributes.code;
  });
  const [currencySelect, setCurrencySelect] = useState<number>(-1);

  useEffect(() => {
    appLayout.currency &&
      setCurrencySelect(currencyOptions.indexOf(appLayout.currency));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLayout.currency]);

  useEffect(() => {
    currencySelect >= 0 &&
      appLayout.setCurrency(currencyOptions[currencySelect]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencySelect]);

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
          {contentPanel ? (
            contentPanel
          ) : (
            <div className="grid place-content-center h-full">
              <div className="text-dark border-dark border-2 border-dotted rounded-2xl p-8 grid grid-flow-col place-items-center gap-9 opacity-40">
                <p className="text-4xl">❮</p>
                <p className="text-2xl w-64">{langui.select_option_sidebar}</p>
              </div>
            </div>
          )}
        </div>

        {/* Background when navbar is opened */}
        <div
          className={`fixed inset-0 transition-[backdrop-filter] duration-500 ${
            (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile
              ? "[backdrop-filter:blur(2px)]"
              : "pointer-events-none touch-none "
          }`}
        >
          <div
            className={`fixed bg-shade inset-0 transition-opacity duration-500 
        ${turnSubIntoContent ? "z-10" : ""}
        ${
          (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile
            ? "opacity-60"
            : "opacity-0"
        }`}
            onClick={() => {
              appLayout.setMainPanelOpen(false);
              appLayout.setSubPanelOpen(false);
            }}
          ></div>
        </div>

        {/* Sub panel */}
        {subPanel && (
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
            {subPanel}
          </div>
        )}

        {/* Main panel */}
        <div
          className={`${mainPanelClass} border-r-[1px] mobile:bottom-20 border-black border-dotted top-0 bottom-0 left-0 right-12 overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 z-20 bg-light texture-paper-dots
        ${appLayout.mainPanelOpen ? "" : "mobile:-translate-x-full"}`}
        >
          <MainPanel langui={langui} />
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
            {subPanel && !turnSubIntoContent
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
          <h2 className="text-2xl">{langui.select_language}</h2>
          <div className="flex flex-wrap flex-row gap-2 mobile:flex-col">
            {languages.map((language) => (
              <Button
                key={language.id}
                active={language.attributes.code === router.locale}
                href={router.asPath}
                locale={language.attributes.code}
                onClick={() => appLayout.setLanguagePanelOpen(false)}
              >
                {language.attributes.localized_name}
              </Button>
            ))}
          </div>
        </Popup>

        <Popup
          state={appLayout.configPanelOpen}
          setState={appLayout.setConfigPanelOpen}
        >
          <h2 className="text-2xl">{langui.settings}</h2>

          <div className="mt-4 grid gap-8 place-items-center text-center desktop:grid-cols-2">
            <div>
              <h3 className="text-xl">{langui.theme}</h3>
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
                  {langui.light}
                </Button>
                <Button
                  onClick={() => {
                    appLayout.setSelectedThemeMode(false);
                  }}
                  active={appLayout.selectedThemeMode === false}
                  className="rounded-l-none rounded-r-none border-x-0"
                >
                  {langui.auto}
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
                  {langui.dark}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl">{langui.currency}</h3>
              <div>
                <Select
                  options={currencyOptions}
                  state={currencySelect}
                  setState={setCurrencySelect}
                  className="w-28"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl">{langui.font_size}</h3>
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
            </div>

            <div>
              <h3 className="text-xl">{langui.font}</h3>
              <div className="grid gap-2">
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
              </div>
            </div>

            <div>
              <h3 className="text-xl">{langui.player_name}</h3>
              <input
                type="text"
                placeholder="<player>"
                className="w-48"
                onInput={(e) =>
                  appLayout.setPlayerName((e.target as HTMLInputElement).value)
                }
              />
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
