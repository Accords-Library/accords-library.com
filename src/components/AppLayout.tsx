import { Button } from "components/Inputs/Button";
import { useAppLayout } from "contexts/AppLayoutContext";
import { UploadImageFragment } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cIf, cJoin } from "helpers/className";
import { prettyLanguage, prettySlug } from "helpers/formatters";
import { getOgImage, ImageQuality, OgImage } from "helpers/img";
// import { getClient, Indexes, search, SearchResult } from "helpers/search";
import { Immutable } from "helpers/types";
import { useMediaMobile } from "hooks/useMediaQuery";
import { AnchorIds } from "hooks/useScrollTopOnChange";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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

export function AppLayout(props: Immutable<Props>): JSX.Element {
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
  const router = useRouter();
  const isMobile = useMediaMobile();
  const appLayout = useAppLayout();

  /*
   * const [searchQuery, setSearchQuery] = useState("");
   * const [searchResult, setSearchResult] = useState<SearchResult>();
   */

  const sensibilitySwipe = 1.1;

  useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    router.events?.on("routeChangeStart", () => {
      appLayout.setConfigPanelOpen(false);
      appLayout.setMainPanelOpen(false);
      appLayout.setSubPanelOpen(false);
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    router.events?.on("hashChangeStart", () => {
      appLayout.setSubPanelOpen(false);
    });
  }, [appLayout, router.events]);

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

  const metaTitle = `${titlePrefix} - ${ogTitle}`;

  const metaDescription = description
    ? description
    : langui.default_description ?? "";

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
      className={cJoin(
        cIf(appLayout.darkMode, "set-theme-dark", "set-theme-light"),
        cIf(
          appLayout.dyslexic,
          "set-theme-font-dyslexic",
          "set-theme-font-standard"
        )
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
              (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile,
              "[backdrop-filter:blur(2px)]",
              "pointer-events-none touch-none"
            )
          )}
        >
          <div
            className={cJoin(
              "absolute inset-0 bg-shade transition-opacity duration-500",
              cIf(
                (appLayout.mainPanelOpen || appLayout.subPanelOpen) && isMobile,
                "opacity-60",
                "opacity-0"
              )
            )}
            onClick={() => {
              appLayout.setMainPanelOpen(false);
              appLayout.setSubPanelOpen(false);
            }}
          ></div>
        </div>

        {/* Content panel */}
        <div
          id={AnchorIds.ContentPanel}
          className={`texture-paper-dots overflow-y-scroll bg-light [grid-area:content]`}
        >
          {contentPanel ? (
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
        {subPanel && (
          <div
            className={cJoin(
              `texture-paper-dots overflow-y-scroll border-r-[1px] border-dotted
              border-black bg-light transition-transform duration-300 [grid-area:sub]
              [scrollbar-width:none] webkit-scrollbar:w-0 mobile:z-10 mobile:w-[90%]
              mobile:justify-self-end mobile:border-r-0 mobile:border-l-[1px]
              mobile:[grid-area:content]`,
              turnSubIntoContent
                ? "mobile:w-full mobile:border-l-0"
                : appLayout.subPanelOpen
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
            cIf(!appLayout.mainPanelOpen, "mobile:-translate-x-full")
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
            icon={appLayout.mainPanelOpen ? Icon.Close : Icon.Menu}
            className="mt-[.1em] cursor-pointer !text-2xl"
            onClick={() => {
              appLayout.setMainPanelOpen(!appLayout.mainPanelOpen);
              appLayout.setSubPanelOpen(false);
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
          {subPanel && !turnSubIntoContent && (
            <Ico
              icon={appLayout.subPanelOpen ? Icon.Close : subPanelIcon}
              className="mt-[.1em] cursor-pointer !text-2xl"
              onClick={() => {
                appLayout.setSubPanelOpen(!appLayout.subPanelOpen);
                appLayout.setMainPanelOpen(false);
              }}
            />
          )}
        </div>

        <Popup
          state={appLayout.configPanelOpen}
          setState={appLayout.setConfigPanelOpen}
        >
          <h2 className="text-2xl">{langui.settings}</h2>

          <div
            className="mt-4 grid justify-items-center gap-16
            text-center desktop:grid-cols-[auto_auto]"
          >
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
                    insertLabels={
                      new Map([
                        [0, langui.primary_language],
                        [1, langui.secondary_language],
                      ])
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
            <div className="grid place-items-center gap-8 text-center desktop:grid-cols-2">
              <div>
                <h3 className="text-xl">{langui.theme}</h3>
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      appLayout.setDarkMode(false);
                      appLayout.setSelectedThemeMode(true);
                    }}
                    active={
                      appLayout.selectedThemeMode === true &&
                      appLayout.darkMode === false
                    }
                    text={langui.light}
                  />
                  <Button
                    onClick={() => {
                      appLayout.setSelectedThemeMode(false);
                    }}
                    active={appLayout.selectedThemeMode === false}
                    text={langui.auto}
                  />
                  <Button
                    onClick={() => {
                      appLayout.setDarkMode(true);
                      appLayout.setSelectedThemeMode(true);
                    }}
                    active={
                      appLayout.selectedThemeMode === true &&
                      appLayout.darkMode === true
                    }
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
                    onClick={() =>
                      appLayout.setFontSize(
                        appLayout.fontSize
                          ? appLayout.fontSize / 1.05
                          : 1 / 1.05
                      )
                    }
                    icon={Icon.TextDecrease}
                  />
                  <Button
                    onClick={() => appLayout.setFontSize(1)}
                    text={`${((appLayout.fontSize ?? 1) * 100).toLocaleString(
                      undefined,
                      {
                        maximumFractionDigits: 0,
                      }
                    )}%`}
                  />
                  <Button
                    onClick={() =>
                      appLayout.setFontSize(
                        appLayout.fontSize
                          ? appLayout.fontSize * 1.05
                          : 1 * 1.05
                      )
                    }
                    icon={Icon.TextIncrease}
                  />
                </ButtonGroup>
              </div>

              <div>
                <h3 className="text-xl">{langui.font}</h3>
                <div className="grid gap-2">
                  <Button
                    active={appLayout.dyslexic === false}
                    onClick={() => appLayout.setDyslexic(false)}
                    className="font-zenMaruGothic"
                    text="Zen Maru Gothic"
                  />
                  <Button
                    active={appLayout.dyslexic === true}
                    onClick={() => appLayout.setDyslexic(true)}
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
                  state={appLayout.playerName}
                  setState={appLayout.setPlayerName}
                />
              </div>
            </div>
          </div>
        </Popup>

        {/* <Popup
          state={appLayout.searchPanelOpen}
          setState={appLayout.setSearchPanelOpen}
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
