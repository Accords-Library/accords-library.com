import { Button } from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { UploadImageFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cIf, cJoin } from "helpers/className";
import { prettyLanguage, prettySlug } from "helpers/formatters";
import { getOgImage, ImageQuality } from "helpers/img";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
// import { getClient, Indexes, search, SearchResult } from "helpers/search";

import { useMediaMobile } from "hooks/useMediaQuery";
import { AnchorIds } from "hooks/useScrollTopOnChange";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Ico, Icon } from "./Ico";
import { ButtonGroup } from "./Inputs/ButtonGroup";
import { OrderableList } from "./Inputs/OrderableList";
import { Select } from "./Inputs/Select";
import { TextInput } from "./Inputs/TextInput";
import { MainPanel } from "./Panels/MainPanel";
import { Popup } from "./Popup";

interface Props extends AppStaticProps {
  subPanel?: React.ReactNode;
  subPanelIcon?: Icon;
  contentPanel?: React.ReactNode;
  title?: string;
  navTitle: string | null | undefined;
  thumbnail?: UploadImageFragment;
  description?: string;
}

const SENSIBILITY_SWIPE = 1.1;
const TITLE_PREFIX = "Accord’s Library";

export function AppLayout(props: Props): JSX.Element {
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
    subPanelIcon = Icon.Tune,
  } = props;

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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    router.events?.on("routeChangeStart", () => {
      setConfigPanelOpen(false);
      setMainPanelOpen(false);
      setSubPanelOpen(false);
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    router.events?.on("hashChangeStart", () => {
      setSubPanelOpen(false);
    });
  }, [router.events, setConfigPanelOpen, setMainPanelOpen, setSubPanelOpen]);

  const handlers = useSwipeable({
    onSwipedLeft: (SwipeEventData) => {
      if (menuGestures) {
        if (SwipeEventData.velocity < SENSIBILITY_SWIPE) return;
        if (mainPanelOpen === true) {
          setMainPanelOpen(false);
        } else if (subPanel === true && contentPanel === true) {
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
    () => isDefined(subPanel) && isDefined(contentPanel),
    [contentPanel, subPanel]
  );

  const metaImage = useMemo(
    () =>
      thumbnail
        ? getOgImage(ImageQuality.Og, thumbnail)
        : {
            image: "/default_og.jpg",
            width: 1200,
            height: 630,
            alt: "Accord's Library Logo",
          },
    [thumbnail]
  );

  const { ogTitle, metaTitle } = useMemo(() => {
    const resultTitle =
      title ?? navTitle ?? prettySlug(router.asPath.split("/").pop());
    return {
      ogTitle: resultTitle,
      metaTitle: `${TITLE_PREFIX} - ${resultTitle}`,
    };
  }, [navTitle, router.asPath, title]);

  const metaDescription = useMemo(
    () => description ?? langui.default_description ?? "",
    [description, langui.default_description]
  );

  useLayoutEffect(() => {
    document.getElementsByTagName("html")[0].style.fontSize = `${
      (fontSize ?? 1) * 100
    }%`;
  }, [fontSize]);

  const defaultPreferredLanguages = useMemo(() => {
    let list: string[] = [];
    if (isDefinedAndNotEmpty(router.locale) && router.locales) {
      if (router.locale === "en") {
        list = [router.locale];
        router.locales.map((locale) => {
          if (locale !== router.locale) list.push(locale);
        });
      } else {
        list = [router.locale, "en"];
        router.locales.map((locale) => {
          if (locale !== router.locale && locale !== "en") list.push(locale);
        });
      }
    }
    return list;
  }, [router.locale, router.locales]);

  const currencyOptions = useMemo(() => {
    const list: string[] = [];
    currencies.map((currentCurrency) => {
      if (
        currentCurrency.attributes &&
        isDefinedAndNotEmpty(currentCurrency.attributes.code)
      )
        list.push(currentCurrency.attributes.code);
    });
    return list;
  }, [currencies]);

  const [currencySelect, setCurrencySelect] = useState<number>(-1);

  useEffect(() => {
    if (isDefined(currency))
      setCurrencySelect(currencyOptions.indexOf(currency));
  }, [currency, currencyOptions]);

  useEffect(() => {
    if (currencySelect >= 0) setCurrency(currencyOptions[currencySelect]);
  }, [currencyOptions, currencySelect, setCurrency]);

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
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />

          <meta name="twitter:title" content={metaTitle}></meta>
          <meta name="twitter:description" content={metaDescription}></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:image" content={metaImage.image}></meta>

          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
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
          className={`texture-paper-dots overflow-y-scroll bg-light [grid-area:content]`}
        >
          {isDefined(contentPanel) ? (
            contentPanel
          ) : (
            <div className="grid h-full place-content-center">
              <div
                className="grid grid-flow-col place-items-center gap-9 rounded-2xl
                border-2 border-dotted border-dark p-8 text-dark opacity-40"
              >
                <p className="text-4xl">❮</p>
                <p className="w-64 text-2xl">{langui.select_option_sidebar}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sub panel */}
        {isDefined(subPanel) && (
          <div
            className={cJoin(
              `texture-paper-dots overflow-y-scroll border-r-[1px] border-dotted
              border-black bg-light transition-transform duration-300 [grid-area:sub]
              [scrollbar-width:none] webkit-scrollbar:w-0 mobile:z-10 mobile:w-[90%]
              mobile:justify-self-end mobile:border-r-0 mobile:border-l-[1px]
              mobile:[grid-area:content]`,
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
            `texture-paper-dots overflow-y-scroll border-r-[1px] border-dotted
            border-black bg-light transition-transform duration-300 [grid-area:main]
            [scrollbar-width:none] webkit-scrollbar:w-0 mobile:z-10 mobile:w-[90%]
            mobile:justify-self-start mobile:[grid-area:content]`,
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
                ogTitle && ogTitle.length > 30,
                "max-h-14 text-xl",
                "max-h-16 text-2xl"
              )
            )}
          >
            {ogTitle}
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

        <Popup state={configPanelOpen ?? false} setState={setConfigPanelOpen}>
          <h2 className="text-2xl">{langui.settings}</h2>

          <div
            className="mt-4 grid justify-items-center gap-16
            text-center desktop:grid-cols-[auto_auto]"
          >
            {router.locales && (
              <div>
                <h3 className="text-xl">{langui.languages}</h3>
                {preferredLanguages && (
                  <OrderableList
                    items={
                      preferredLanguages.length > 0
                        ? new Map(
                            preferredLanguages.map((locale) => [
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
                    insertLabels={
                      new Map([
                        [0, langui.primary_language],
                        [1, langui.secondary_language],
                      ])
                    }
                    onChange={(items) => {
                      const newPreferredLanguages = [...items].map(
                        ([code]) => code
                      );
                      setPreferredLanguages(newPreferredLanguages);
                      if (router.locale !== newPreferredLanguages[0]) {
                        router.push(router.asPath, router.asPath, {
                          locale: newPreferredLanguages[0],
                        });
                      }
                    }}
                  />
                )}
              </div>
            )}
            <div className="grid place-items-center gap-8 text-center desktop:grid-cols-2">
              <div>
                <h3 className="text-xl">{langui.theme}</h3>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      setDarkMode(false);
                      setSelectedThemeMode(true);
                    }}
                    active={selectedThemeMode === true && darkMode === false}
                    text={langui.light}
                  />
                  <Button
                    onClick={() => {
                      setSelectedThemeMode(false);
                    }}
                    active={selectedThemeMode === false}
                    text={langui.auto}
                  />
                  <Button
                    onClick={() => {
                      setDarkMode(true);
                      setSelectedThemeMode(true);
                    }}
                    active={selectedThemeMode === true && darkMode === true}
                    text={langui.dark}
                  />
                </ButtonGroup>
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
                <ButtonGroup>
                  <Button
                    onClick={() => setFontSize((fontSize ?? 1) / 1.05)}
                    icon={Icon.TextDecrease}
                  />
                  <Button
                    onClick={() => setFontSize(1)}
                    text={`${((fontSize ?? 1) * 100).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}%`}
                  />
                  <Button
                    onClick={() => setFontSize((fontSize ?? 1) * 1.05)}
                    icon={Icon.TextIncrease}
                  />
                </ButtonGroup>
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
                  state={playerName}
                  setState={setPlayerName}
                />
              </div>
            </div>
          </div>
        </Popup>

        {/* <Popup
          state={searchPanelOpen}
          setState={setSearchPanelOpen}
        >
          <div className="grid place-items-center gap-2">
            TODO: add to langui
            <h2 className="text-2xl">{"Search"}</h2>
            <TextInput
              className="mb-6 w-full"
              placeholder={"Search query..."}
              state={searchQuery}
              setState={setSearchQuery}
            />
          </div>
          TODO: add to langui
          <div className="grid gap-4">
            <p className="font-headers text-xl">In news:</p>
            <div
              className="grid grid-cols-2 items-end gap-8
                desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] mobile:gap-4"
            >
              {searchResult?.hits.map((hit) => (
                <PreviewCard
                  key={hit.id}
                  href={hit.href}
                  title={hit.title}
                  thumbnailAspectRatio={"3/2"}
                  thumbnail={hit.thumbnail}
                  keepInfoVisible
                />
              ))}
            </div>
          </div>
        </Popup> */}
      </div>
    </div>
  );
}

/*
 * const [searchQuery, setSearchQuery] = useState("");
 * const [searchResult, setSearchResult] = useState<SearchResult>();
 */

/*
 * const client = getClient();
 * useEffect(() => {
 *   if (searchQuery.length > 1) {
 *     search(client, Indexes.Post, searchQuery).then((result) => {
 *       setSearchResult(result);
 *     });
 *   } else {
 *     setSearchResult(undefined);
 *   }
 *   // eslint-disable-next-line react-hooks/exhaustive-deps
 * }, [searchQuery]);
 */
