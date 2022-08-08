import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import UAParser from "ua-parser-js";
import { Ico, Icon } from "./Ico";
import { ButtonGroup } from "./Inputs/ButtonGroup";
import { OrderableList } from "./Inputs/OrderableList";
import { Select } from "./Inputs/Select";
import { TextInput } from "./Inputs/TextInput";
import { ContentPlaceholder } from "./PanelComponents/ContentPlaceholder";
import { MainPanel } from "./Panels/MainPanel";
import { Popup } from "./Popup";
import { AnchorIds } from "hooks/useScrollTopOnChange";
import { useMediaMobile } from "hooks/useMediaQuery";
import {
  filterHasAttributes,
  isDefined,
  isDefinedAndNotEmpty,
  isUndefined,
  iterateMap,
} from "helpers/others";
import { prettyLanguage } from "helpers/formatters";
import { cIf, cJoin } from "helpers/className";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { useAppLayout } from "contexts/AppLayoutContext";
import { Button } from "components/Inputs/Button";
import { OpenGraph } from "helpers/openGraph";
import { getDefaultPreferredLanguages } from "helpers/locales";
import useIsClient from "hooks/useIsClient";
import { useBoolean } from "hooks/useBoolean";

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

interface Props extends AppStaticProps, AppLayoutRequired {
  subPanel?: React.ReactNode;
  subPanelIcon?: Icon;
  contentPanel?: React.ReactNode;
  contentPanelScroolbar?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AppLayout = ({
  langui,
  currencies,
  languages,
  subPanel,
  contentPanel,
  openGraph,
  subPanelIcon = Icon.Tune,
  contentPanelScroolbar = true,
}: Props): JSX.Element => {
  const {
    configPanelOpen,
    currency,
    darkMode,
    dyslexic,
    fontSize,
    mainPanelOpen,
    mainPanelReduced,
    menuGestures,
    playerName,
    preferredLanguages,
    selectedThemeMode,
    subPanelOpen,
    setConfigPanelOpen,
    setCurrency,
    setDarkMode,
    setDyslexic,
    setFontSize,
    setMainPanelOpen,
    setPlayerName,
    setPreferredLanguages,
    setSelectedThemeMode,
    setSubPanelOpen,
    toggleMainPanelOpen,
    toggleSubPanelOpen,
  } = useAppLayout();

  const router = useRouter();
  const isMobile = useMediaMobile();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setConfigPanelOpen(false);
      setMainPanelOpen(false);
      setSubPanelOpen(false);
    });

    router.events.on("hashChangeStart", () => {
      setSubPanelOpen(false);
    });
  }, [router.events, setConfigPanelOpen, setMainPanelOpen, setSubPanelOpen]);

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (mainPanelOpen === true) {
          setMainPanelOpen(false);
        } else if (isDefined(subPanel) && isDefined(contentPanel)) {
          setSubPanelOpen(true);
        }
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (subPanelOpen === true) {
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

  useLayoutEffect(() => {
    document.getElementsByTagName("html")[0].style.fontSize = `${
      (fontSize ?? 1) * 100
    }%`;
  }, [fontSize]);

  const currencyOptions = useMemo(
    () =>
      filterHasAttributes(currencies, ["attributes"] as const).map(
        (currentCurrency) => currentCurrency.attributes.code
      ),
    [currencies]
  );

  const [currencySelect, setCurrencySelect] = useState<number>(-1);

  useEffect(() => {
    if (isDefined(currency))
      setCurrencySelect(currencyOptions.indexOf(currency));
  }, [currency, currencyOptions]);

  useEffect(() => {
    if (currencySelect >= 0) setCurrency(currencyOptions[currencySelect]);
  }, [currencyOptions, currencySelect, setCurrency]);

  useEffect(() => {
    if (preferredLanguages) {
      if (preferredLanguages.length === 0) {
        if (isDefinedAndNotEmpty(router.locale) && router.locales) {
          setPreferredLanguages(
            getDefaultPreferredLanguages(router.locale, router.locales)
          );
        }
      } else if (router.locale !== preferredLanguages[0]) {
        router.replace(router.asPath, router.asPath, {
          locale: preferredLanguages[0],
        });
      }
    }
  }, [
    preferredLanguages,
    router,
    router.locale,
    router.locales,
    setPreferredLanguages,
  ]);

  const gridCol = useMemo(() => {
    if (isDefined(subPanel)) {
      if (mainPanelReduced === true) {
        return "grid-cols-[6rem_20rem_1fr]";
      }
      return "grid-cols-[20rem_20rem_1fr]";
    } else if (mainPanelReduced === true) {
      return "grid-cols-[6rem_0px_1fr]";
    }
    return "grid-cols-[20rem_0px_1fr]";
  }, [mainPanelReduced, subPanel]);

  const isClient = useIsClient();
  const { state: hasDisgardSafariWarning, setTrue: disgardSafariWarning } =
    useBoolean(false);
  const isSafari = useMemo<boolean>(() => {
    if (isClient) {
      const parser = new UAParser();
      return (
        parser.getBrowser().name === "Safari" || parser.getOS().name === "iOS"
      );
    }
    return false;
  }, [isClient]);

  return (
    <div
      className={cJoin(
        cIf(darkMode, "set-theme-dark", "set-theme-light"),
        cIf(dyslexic, "set-theme-font-dyslexic", "set-theme-font-standard")
      )}
    >
      <div
        {...handlers}
        className={cJoin(
          `fixed inset-0 m-0 grid touch-pan-y bg-light p-0 text-black
          [grid-template-areas:'main_sub_content'] mobile:grid-cols-[1fr]
          mobile:grid-rows-[1fr_5rem] mobile:[grid-template-areas:'content''navbar']`,
          gridCol
        )}
      >
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
          <meta
            property="og:image:secure_url"
            content={openGraph.thumbnail.image}
          />
          <meta
            property="og:image:width"
            content={openGraph.thumbnail.width.toString()}
          />
          <meta
            property="og:image:height"
            content={openGraph.thumbnail.height.toString()}
          />
          <meta property="og:image:alt" content={openGraph.thumbnail.alt} />
          <meta property="og:image:type" content="image/jpeg" />

          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
          />
        </Head>

        {/* Background when navbar is opened */}
        <div
          className={cJoin(
            `absolute inset-0 transition-[backdrop-filter] duration-500 [grid-area:content]
            mobile:z-10`,
            cIf(
              (mainPanelOpen === true || subPanelOpen === true) && isMobile,
              "[backdrop-filter:blur(2px)]",
              "pointer-events-none touch-none"
            )
          )}
        >
          <div
            className={cJoin(
              "absolute inset-0 bg-shade transition-opacity duration-500",
              cIf(
                (mainPanelOpen === true || subPanelOpen === true) && isMobile,
                "opacity-60",
                "opacity-0"
              )
            )}
            onClick={() => {
              setMainPanelOpen(false);
              setSubPanelOpen(false);
            }}
          ></div>
        </div>

        {/* Content panel */}
        <div
          id={AnchorIds.ContentPanel}
          className={cJoin(
            "texture-paper-dots bg-light [grid-area:content]",
            cIf(contentPanelScroolbar, "overflow-y-scroll")
          )}
        >
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
            className={cJoin(
              `texture-paper-dots overflow-y-scroll border-r-[1px] border-dark/50 bg-light
              transition-transform duration-300 [grid-area:sub] [scrollbar-width:none]
              webkit-scrollbar:w-0 mobile:z-10 mobile:w-[90%] mobile:justify-self-end
              mobile:border-r-0 mobile:border-l-[1px] mobile:[grid-area:content]`,
              turnSubIntoContent
                ? "mobile:w-full mobile:border-l-0"
                : subPanelOpen === true
                ? ""
                : "mobile:translate-x-[100vw]"
            )}
          >
            {subPanel}
          </div>
        )}

        {/* Main panel */}
        <div
          className={cJoin(
            `texture-paper-dots overflow-y-scroll border-r-[1px] border-dark/50 bg-light
            transition-transform duration-300 [grid-area:main] [scrollbar-width:none]
            webkit-scrollbar:w-0 mobile:z-10 mobile:w-[90%] mobile:justify-self-start
            mobile:[grid-area:content]`,
            cIf(mainPanelOpen === false, "mobile:-translate-x-full")
          )}
        >
          <MainPanel langui={langui} />
        </div>

        {/* Navbar */}
        <div
          className="texture-paper-dots grid grid-cols-[5rem_1fr_5rem] place-items-center
          border-t-[1px] border-dotted border-black bg-light [grid-area:navbar] desktop:hidden"
        >
          <Ico
            icon={mainPanelOpen === true ? Icon.Close : Icon.Menu}
            className="mt-[.1em] cursor-pointer !text-2xl"
            onClick={() => {
              toggleMainPanelOpen();
              setSubPanelOpen(false);
            }}
          />
          <p
            className={cJoin(
              "overflow-hidden text-center font-headers font-black",
              cIf(
                openGraph.title.length > 30,
                "max-h-14 text-xl",
                "max-h-16 text-2xl"
              )
            )}
          >
            {openGraph.title}
          </p>
          {isDefined(subPanel) && !turnSubIntoContent && (
            <Ico
              icon={subPanelOpen === true ? Icon.Close : subPanelIcon}
              className="mt-[.1em] cursor-pointer !text-2xl"
              onClick={() => {
                toggleSubPanelOpen();
                setMainPanelOpen(false);
              }}
            />
          )}
        </div>

        <Popup
          state={isSafari && !hasDisgardSafariWarning}
          onClose={() => null}
        >
          <h1 className="text-2xl">Hi, you are using Safari!</h1>
          <p className="max-w-lg text-center">
            In most cases this wouldn&rsquo;t be a problem but our website
            is—for some obscure reason—performing terribly on Safari (WebKit).
            Because of that, we have decided to display this message instead of
            letting you have a slow and painful experience. We are looking into
            the problem, and are hoping to fix this soon.
          </p>
          <p>
            In the meanwhile, if you are using an iPhone/iPad, please try using
            another device.
          </p>
          <p>
            If you are on macOS, please use another browser such as Firefox or
            Chrome.
          </p>

          <Button
            text="Let me in regardless"
            className="mt-8"
            onClick={disgardSafariWarning}
          />
        </Popup>

        <Popup
          state={configPanelOpen ?? false}
          onClose={() => setConfigPanelOpen(false)}
        >
          <h2 className="text-2xl">{langui.settings}</h2>

          <div
            className="mt-4 grid justify-items-center gap-16
            text-center desktop:grid-cols-[auto_auto]"
          >
            {router.locales && (
              <div>
                <h3 className="text-xl">{langui.languages}</h3>
                {preferredLanguages && preferredLanguages.length > 0 && (
                  <OrderableList
                    items={
                      new Map(
                        preferredLanguages.map((locale) => [
                          locale,
                          prettyLanguage(locale, languages),
                        ])
                      )
                    }
                    insertLabels={
                      new Map([
                        [0, langui.primary_language],
                        [1, langui.secondary_language],
                      ])
                    }
                    onChange={(items) => {
                      const newPreferredLanguages = iterateMap(
                        items,
                        (code) => code
                      );
                      setPreferredLanguages(newPreferredLanguages);
                    }}
                  />
                )}
              </div>
            )}
            <div className="grid place-items-center gap-8 text-center desktop:grid-cols-2">
              <div>
                <h3 className="text-xl">{langui.theme}</h3>
                <ButtonGroup
                  buttonsProps={[
                    {
                      onClick: () => {
                        setDarkMode(false);
                        setSelectedThemeMode(true);
                      },
                      active: selectedThemeMode === true && darkMode === false,
                      text: langui.light,
                    },
                    {
                      onClick: () => {
                        setSelectedThemeMode(false);
                      },
                      active: selectedThemeMode === false,
                      text: langui.auto,
                    },
                    {
                      onClick: () => {
                        setDarkMode(true);
                        setSelectedThemeMode(true);
                      },
                      active: selectedThemeMode === true && darkMode === true,
                      text: langui.dark,
                    },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-xl">{langui.currency}</h3>
                <div>
                  <Select
                    options={currencyOptions}
                    value={currencySelect}
                    onChange={setCurrencySelect}
                    className="w-28"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl">{langui.font_size}</h3>
                <ButtonGroup
                  buttonsProps={[
                    {
                      onClick: () => setFontSize((fontSize ?? 1) / 1.05),
                      icon: Icon.TextDecrease,
                    },
                    {
                      onClick: () => setFontSize(1),
                      text: `${((fontSize ?? 1) * 100).toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 0,
                        }
                      )}%`,
                    },
                    {
                      onClick: () => setFontSize((fontSize ?? 1) * 1.05),
                      icon: Icon.TextIncrease,
                    },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-xl">{langui.font}</h3>
                <div className="grid gap-2">
                  <Button
                    active={dyslexic === false}
                    onClick={() => setDyslexic(false)}
                    className="font-zenMaruGothic"
                    text="Zen Maru Gothic"
                  />
                  <Button
                    active={dyslexic === true}
                    onClick={() => setDyslexic(true)}
                    className="font-openDyslexic"
                    text="OpenDyslexic"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl">{langui.player_name}</h3>
                <TextInput
                  placeholder="<player>"
                  className="w-48"
                  value={playerName ?? ""}
                  onChange={setPlayerName}
                />
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
};
