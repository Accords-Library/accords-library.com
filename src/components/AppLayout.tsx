import Button from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { UploadImageFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettyLanguage, prettySlug } from "helpers/formatters";
import { getOgImage, ImageQuality, OgImage } from "helpers/img";
import { Immutable } from "helpers/types";
import { useMediaMobile } from "hooks/useMediaQuery";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import OrderableList from "./Inputs/OrderableList";
import Select from "./Inputs/Select";
import MainPanel from "./Panels/MainPanel";
import Popup from "./Popup";

interface Props extends AppStaticProps {
  subPanel?: React.ReactNode;
  subPanelIcon?: string;
  contentPanel?: React.ReactNode;
  title?: string;
  navTitle: string | null | undefined;
  thumbnail?: UploadImageFragment;
  description?: string;
}

export default function AppLayout(props: Immutable<Props>): JSX.Element {
  const {
    langui,
    currencies,
    languages,
    subPanel,
    contentPanel,
    thumbnail,
    title,
    navTitle,
    description,
    subPanelIcon,
  } = props;
  const router = useRouter();
  const isMobile = useMediaMobile();
  const appLayout = useAppLayout();

  const sensibilitySwipe = 1.1;

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (appLayout.menuGestures) {
        if (SwipeEventData.velocity < sensibilitySwipe) return;
        if (appLayout.mainPanelOpen) {
          appLayout.setMainPanelOpen(false);
        } else if (subPanel && contentPanel) {
          appLayout.setSubPanelOpen(true);
        }
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (appLayout.menuGestures) {
        if (SwipeEventData.velocity < sensibilitySwipe) return;
        if (appLayout.subPanelOpen) {
          appLayout.setSubPanelOpen(false);
        } else {
          appLayout.setMainPanelOpen(true);
        }
      }
    },
  });

  const turnSubIntoContent = subPanel && !contentPanel;

  const titlePrefix = "Accord’s Library";
  const metaImage: OgImage = thumbnail
    ? getOgImage(ImageQuality.Og, thumbnail)
    : {
        image: "/default_og.jpg",
        width: 1200,
        height: 630,
        alt: "Accord's Library Logo",
      };
  const ogTitle =
    title ?? navTitle ?? prettySlug(router.asPath.split("/").pop());

  const metaDescription = description ?? langui.default_description ?? "";

  useEffect(() => {
    document.getElementsByTagName("html")[0].style.fontSize = `${
      (appLayout.fontSize ?? 1) * 100
    }%`;
  }, [appLayout.fontSize]);

  const currencyOptions: string[] = [];
  currencies.map((currency) => {
    if (currency.attributes?.code)
      currencyOptions.push(currency.attributes.code);
  });
  const [currencySelect, setCurrencySelect] = useState<number>(-1);

  let defaultPreferredLanguages: string[] = [];

  if (router.locale && router.locales) {
    if (router.locale === "en") {
      defaultPreferredLanguages = [router.locale];
      router.locales.map((locale) => {
        if (locale !== router.locale) defaultPreferredLanguages.push(locale);
      });
    } else {
      defaultPreferredLanguages = [router.locale, "en"];
      router.locales.map((locale) => {
        if (locale !== router.locale && locale !== "en")
          defaultPreferredLanguages.push(locale);
      });
    }
  }

  useEffect(() => {
    if (appLayout.currency)
      setCurrencySelect(currencyOptions.indexOf(appLayout.currency));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLayout.currency]);

  useEffect(() => {
    if (currencySelect >= 0)
      appLayout.setCurrency(currencyOptions[currencySelect]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencySelect]);

  let gridCol = "";
  if (subPanel) {
    if (appLayout.mainPanelReduced) {
      gridCol = "grid-cols-[6rem_20rem_1fr]";
    } else {
      gridCol = "grid-cols-[20rem_20rem_1fr]";
    }
  } else if (appLayout.mainPanelReduced) {
    gridCol = "grid-cols-[6rem_0px_1fr]";
  } else {
    gridCol = "grid-cols-[20rem_0px_1fr]";
  }

  return (
    <div
      id="MyAppLayout"
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
        className={`fixed inset-0 touch-pan-y p-0 m-0 bg-light text-black grid [grid-template-areas:'main_sub_content'] ${gridCol} mobile:grid-cols-[1fr] mobile:grid-rows-[1fr_5rem] mobile:[grid-template-areas:'content''navbar']`}
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

        {/* Background when navbar is opened */}
        <div
          className={`[grid-area:content] mobile:z-10 absolute inset-0 transition-[backdrop-filter] duration-500 ${
            (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile
              ? "[backdrop-filter:blur(2px)]"
              : "pointer-events-none touch-none "
          }`}
        >
          <div
            className={`absolute bg-shade inset-0 transition-opacity duration-500 
        ${turnSubIntoContent ? "" : ""}
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

        {/* Content panel */}
        <div
          className={`[grid-area:content] overflow-y-scroll bg-light texture-paper-dots`}
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

        {/* Sub panel */}
        {subPanel && (
          <div
            className={`[grid-area:sub] mobile:[grid-area:content] mobile:z-10 mobile:w-[90%] mobile:justify-self-end border-r-[1px] mobile:border-r-0 mobile:border-l-[1px] border-black border-dotted overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 bg-light texture-paper-dots
          ${
            turnSubIntoContent
              ? "mobile:border-l-0 mobile:w-full"
              : !appLayout.subPanelOpen && "mobile:translate-x-[100vw]"
          }`}
          >
            {subPanel}
          </div>
        )}

        {/* Main panel */}
        <div
          className={`[grid-area:main] mobile:[grid-area:content] mobile:z-10 mobile:w-[90%] mobile:justify-self-start border-r-[1px] border-black border-dotted overflow-y-scroll webkit-scrollbar:w-0 [scrollbar-width:none] transition-transform duration-300 bg-light texture-paper-dots
        ${appLayout.mainPanelOpen ? "" : "mobile:-translate-x-full"}`}
        >
          <MainPanel langui={langui} />
        </div>

        {/* Navbar */}
        <div className="[grid-area:navbar] border-t-[1px] border-black border-dotted grid grid-cols-[5rem_1fr_5rem] place-items-center desktop:hidden bg-light texture-paper-dots">
          <span
            className="material-icons mt-[.1em] cursor-pointer"
            onClick={() => {
              appLayout.setMainPanelOpen(!appLayout.mainPanelOpen);
              appLayout.setSubPanelOpen(false);
            }}
          >
            {appLayout.mainPanelOpen ? "close" : "menu"}
          </span>
          <p
            className={`font-black font-headers text-center overflow-hidden ${
              ogTitle && ogTitle.length > 30
                ? "text-xl max-h-14"
                : "text-2xl max-h-16"
            }`}
          >
            {ogTitle}
          </p>
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
                : subPanelIcon
                ? subPanelIcon
                : "tune"
              : ""}
          </span>
        </div>

        <Popup
          state={appLayout.configPanelOpen}
          setState={appLayout.setConfigPanelOpen}
        >
          <h2 className="text-2xl">{langui.settings}</h2>

          <div className="mt-4 grid gap-16 justify-items-center text-center desktop:grid-cols-[auto_auto]">
            {router.locales && (
              <div>
                <h3 className="text-xl">{langui.languages}</h3>
                {appLayout.preferredLanguages && (
                  <OrderableList
                    items={
                      appLayout.preferredLanguages.length > 0
                        ? new Map(
                            appLayout.preferredLanguages.map((locale) => [
                              locale,
                              prettyLanguage(locale, languages),
                            ])
                          )
                        : new Map(
                            defaultPreferredLanguages.map((locale) => [
                              locale,
                              prettyLanguage(locale, languages),
                            ])
                          )
                    }
                    onChange={(items) => {
                      const preferredLanguages = [...items].map(
                        ([code]) => code
                      );
                      appLayout.setPreferredLanguages(preferredLanguages);
                      if (router.locale !== preferredLanguages[0]) {
                        router.push(router.asPath, router.asPath, {
                          locale: preferredLanguages[0],
                        });
                      }
                    }}
                  />
                )}
              </div>
            )}
            <div className="grid gap-8 place-items-center text-center desktop:grid-cols-2">
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
                        appLayout.fontSize
                          ? appLayout.fontSize / 1.05
                          : 1 / 1.05
                      )
                    }
                  >
                    <span className="material-icons">text_decrease</span>
                  </Button>
                  <Button
                    className="rounded-l-none rounded-r-none border-x-0"
                    onClick={() => appLayout.setFontSize(1)}
                  >
                    {((appLayout.fontSize ?? 1) * 100).toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                    %
                  </Button>
                  <Button
                    className="rounded-l-none"
                    onClick={() =>
                      appLayout.setFontSize(
                        appLayout.fontSize
                          ? appLayout.fontSize * 1.05
                          : 1 * 1.05
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
                  onInput={(event) =>
                    appLayout.setPlayerName(
                      (event.target as HTMLInputElement).value
                    )
                  }
                  value={appLayout.playerName}
                />
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
