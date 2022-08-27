import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import UAParser from "ua-parser-js";
import { useBoolean, useIsClient } from "usehooks-ts";
import Script from "next/script";
import { layout } from "../../design.config";
import { Ico, Icon } from "./Ico";
import { ButtonGroup } from "./Inputs/ButtonGroup";
import { OrderableList } from "./Inputs/OrderableList";
import { Select } from "./Inputs/Select";
import { TextInput } from "./Inputs/TextInput";
import { MainPanel } from "./Panels/MainPanel";
import { Popup } from "./Popup";
import { AnchorIds } from "hooks/useScrollTopOnChange";
import { filterHasAttributes, isDefined, isUndefined } from "helpers/others";
import { prettyLanguage } from "helpers/formatters";
import { cIf, cJoin } from "helpers/className";
import { useAppLayout } from "contexts/AppLayoutContext";
import { Button } from "components/Inputs/Button";
import { OpenGraph, TITLE_PREFIX, TITLE_SEPARATOR } from "helpers/openGraph";
import {
  useIs1ColumnLayout,
  useIsScreenAtLeast,
} from "hooks/useContainerQuery";
import { useOnResize } from "hooks/useOnResize";

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

interface Props extends AppLayoutRequired {
  subPanel?: React.ReactNode;
  subPanelIcon?: Icon;
  contentPanel?: React.ReactNode;
  contentPanelScroolbar?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const AppLayout = ({
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
    setScreenWidth,
    setContentPanelWidth,
    setSubPanelWidth,
    langui,
    currencies,
    languages,
  } = useAppLayout();

  const router = useRouter();
  const is1ColumnLayout = useIs1ColumnLayout();
  const isScreenAtLeastXs = useIsScreenAtLeast("xs");

  useOnResize(AnchorIds.Body, (width) => setScreenWidth(width));
  useOnResize(AnchorIds.ContentPanel, (width) => setContentPanelWidth(width));
  useOnResize(AnchorIds.SubPanel, (width) => setSubPanelWidth(width));

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (mainPanelOpen) {
          setMainPanelOpen(false);
        } else if (isDefined(subPanel) && isDefined(contentPanel)) {
          setSubPanelOpen(true);
        }
      }
    },
    onSwipedRight: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (subPanelOpen) {
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

  const isClient = useIsClient();
  const { value: hasDisgardSafariWarning, setTrue: disgardSafariWarning } =
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
        id={AnchorIds.Body}
        className={cJoin(
          `fixed inset-0 m-0 grid touch-pan-y bg-light p-0 text-black
        [grid-template-areas:'main_sub_content']`,
          cIf(
            is1ColumnLayout,
            "grid-rows-[1fr_5rem] [grid-template-areas:'content''navbar']"
          )
        )}
        style={{
          gridTemplateColumns: is1ColumnLayout
            ? "1fr"
            : `${
                mainPanelReduced ? layout.mainMenuReduced : layout.mainMenu
              }rem ${isDefined(subPanel) ? layout.subMenu : 0}rem 1fr`,
        }}
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
        </Head>

        <Script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
        />

        {/* Background when navbar is opened */}
        <div
          className={cJoin(
            `absolute inset-0 transition-[backdrop-filter] duration-500
            [grid-area:content]`,
            cIf(
              (mainPanelOpen || subPanelOpen) && is1ColumnLayout,
              "z-10 [backdrop-filter:blur(2px)]",
              "pointer-events-none touch-none"
            )
          )}
        >
          <div
            className={cJoin(
              "absolute inset-0 bg-shade transition-opacity duration-500",
              cIf(
                (mainPanelOpen || subPanelOpen) && is1ColumnLayout,
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
            id={AnchorIds.SubPanel}
            className={cJoin(
              `texture-paper-dots overflow-y-scroll border-r-[1px] border-dark/50 bg-light
              transition-transform duration-300 [scrollbar-width:none]
              webkit-scrollbar:w-0`,
              cIf(
                is1ColumnLayout,
                `z-10 justify-self-end border-r-0
                [grid-area:content]`,
                "[grid-area:sub]"
              ),
              cIf(
                is1ColumnLayout && isScreenAtLeastXs,
                "w-[min(30rem,90%)] border-l-[1px]"
              ),
              cIf(
                is1ColumnLayout && !subPanelOpen && !turnSubIntoContent,
                "translate-x-[100vw]"
              ),
              cIf(is1ColumnLayout && turnSubIntoContent, "w-full border-l-0")
            )}
          >
            {subPanel}
          </div>
        )}

        {/* Main panel */}
        <div
          className={cJoin(
            `texture-paper-dots overflow-y-scroll border-r-[1px] border-dark/50 bg-light
            transition-transform duration-300 [scrollbar-width:none] webkit-scrollbar:w-0`,
            cIf(
              is1ColumnLayout,
              "z-10 justify-self-start [grid-area:content]",
              "[grid-area:main]"
            ),
            cIf(is1ColumnLayout && isScreenAtLeastXs, "w-[min(30rem,90%)]"),
            cIf(!mainPanelOpen && is1ColumnLayout, "-translate-x-full")
          )}
        >
          <MainPanel />
        </div>

        {/* Navbar */}
        <div
          className={cJoin(
            `texture-paper-dots grid grid-cols-[5rem_1fr_5rem] place-items-center
          border-t-[1px] border-dotted border-black bg-light [grid-area:navbar]`,
            cIf(!is1ColumnLayout, "hidden")
          )}
        >
          <Ico
            icon={mainPanelOpen ? Icon.Close : Icon.Menu}
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
            {openGraph.title.substring(
              TITLE_PREFIX.length + TITLE_SEPARATOR.length
            )
              ? openGraph.title.substring(
                  TITLE_PREFIX.length + TITLE_SEPARATOR.length
                )
              : "Accord’s Library"}
          </p>
          {isDefined(subPanel) && !turnSubIntoContent && (
            <Ico
              icon={subPanelOpen ? Icon.Close : subPanelIcon}
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
          state={configPanelOpen}
          onClose={() => setConfigPanelOpen(false)}
        >
          <h2 className="text-2xl">{langui.settings}</h2>

          <div
            className={cJoin(
              `mt-4 grid justify-items-center gap-16 text-center`,
              cIf(!is1ColumnLayout, "grid-cols-[auto_auto]")
            )}
          >
            {router.locales && (
              <div>
                <h3 className="text-xl">{langui.languages}</h3>
                {preferredLanguages.length > 0 && (
                  <OrderableList
                    items={preferredLanguages.map((locale) => ({
                      code: locale,
                      name: prettyLanguage(locale, languages),
                    }))}
                    insertLabels={[
                      {
                        insertAt: 0,
                        name: langui.primary_language ?? "Primary language",
                      },
                      {
                        insertAt: 1,
                        name:
                          langui.secondary_language ?? "Secondary languages",
                      },
                    ]}
                    onChange={(items) => {
                      const newPreferredLanguages = items.map(
                        (item) => item.code
                      );
                      setPreferredLanguages(newPreferredLanguages);
                    }}
                  />
                )}
              </div>
            )}
            <div
              className={cJoin(
                "grid place-items-center gap-8 text-center",
                cIf(!is1ColumnLayout, "grid-cols-2")
              )}
            >
              <div>
                <h3 className="text-xl">{langui.theme}</h3>
                <ButtonGroup
                  buttonsProps={[
                    {
                      onClick: () => {
                        setDarkMode(false);
                        setSelectedThemeMode(true);
                      },
                      active: selectedThemeMode && !darkMode,
                      text: langui.light,
                    },
                    {
                      onClick: () => {
                        setSelectedThemeMode(false);
                      },
                      active: !selectedThemeMode,
                      text: langui.auto,
                    },
                    {
                      onClick: () => {
                        setDarkMode(true);
                        setSelectedThemeMode(true);
                      },
                      active: selectedThemeMode && darkMode,
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
                      onClick: () => setFontSize(fontSize / 1.05),
                      icon: Icon.TextDecrease,
                    },
                    {
                      onClick: () => setFontSize(1),
                      text: `${(fontSize * 100).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}%`,
                    },
                    {
                      onClick: () => setFontSize(fontSize * 1.05),
                      icon: Icon.TextIncrease,
                    },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-xl">{langui.font}</h3>
                <div className="grid gap-2">
                  <Button
                    active={!dyslexic}
                    onClick={() => setDyslexic(false)}
                    className="font-zenMaruGothic"
                    text="Zen Maru Gothic"
                  />
                  <Button
                    active={dyslexic}
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
                  value={playerName}
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

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ContentPlaceholderProps {
  message: string;
  icon?: Icon;
}

const ContentPlaceholder = ({
  message,
  icon,
}: ContentPlaceholderProps): JSX.Element => (
  <div className="grid h-full place-content-center">
    <div
      className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40"
    >
      {isDefined(icon) && <Ico icon={icon} className="!text-[300%]" />}
      <p
        className={cJoin("w-64 text-2xl", cIf(!isDefined(icon), "text-center"))}
      >
        {message}
      </p>
    </div>
  </div>
);
