import React, { ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { LibraryItemUserStatus, RequiredNonNullable } from "types/types";
import { useDarkMode } from "hooks/useDarkMode";
import { Currencies, Languages, Langui } from "helpers/localData";
import { useCurrencies, useLanguages, useLangui } from "hooks/useLocalData";
import { getDefaultPreferredLanguages } from "helpers/locales";
import { useStateWithLocalStorage } from "hooks/useStateWithLocalStorage";
import { useScrollIntoView } from "hooks/useScrollIntoView";

interface AppLayoutState {
  subPanelOpen: boolean;
  toggleSubPanelOpen: () => void;
  setSubPanelOpen: React.Dispatch<React.SetStateAction<AppLayoutState["subPanelOpen"]>>;

  configPanelOpen: boolean;
  toggleConfigPanelOpen: () => void;
  setConfigPanelOpen: React.Dispatch<React.SetStateAction<AppLayoutState["configPanelOpen"]>>;

  mainPanelReduced: boolean;
  toggleMainPanelReduced: () => void;
  setMainPanelReduced: React.Dispatch<React.SetStateAction<AppLayoutState["mainPanelReduced"]>>;

  mainPanelOpen: boolean;
  toggleMainPanelOpen: () => void;
  setMainPanelOpen: React.Dispatch<React.SetStateAction<AppLayoutState["mainPanelOpen"]>>;

  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<AppLayoutState["darkMode"]>>;

  selectedThemeMode: boolean;
  toggleSelectedThemeMode: () => void;
  setSelectedThemeMode: React.Dispatch<React.SetStateAction<AppLayoutState["selectedThemeMode"]>>;

  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<AppLayoutState["fontSize"]>>;

  dyslexic: boolean;
  toggleDyslexic: () => void;
  setDyslexic: React.Dispatch<React.SetStateAction<AppLayoutState["dyslexic"]>>;

  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<AppLayoutState["currency"]>>;

  playerName: string;
  setPlayerName: React.Dispatch<React.SetStateAction<AppLayoutState["playerName"]>>;

  preferredLanguages: string[];
  setPreferredLanguages: React.Dispatch<React.SetStateAction<AppLayoutState["preferredLanguages"]>>;

  menuGestures: boolean;
  toggleMenuGestures: () => void;
  setMenuGestures: React.Dispatch<React.SetStateAction<AppLayoutState["menuGestures"]>>;

  libraryItemUserStatus: Record<string, LibraryItemUserStatus>;
  setLibraryItemUserStatus: React.Dispatch<
    React.SetStateAction<AppLayoutState["libraryItemUserStatus"]>
  >;

  screenWidth: number;
  setScreenWidth: React.Dispatch<React.SetStateAction<AppLayoutState["screenWidth"]>>;

  contentPanelWidth: number;
  setContentPanelWidth: React.Dispatch<React.SetStateAction<AppLayoutState["contentPanelWidth"]>>;

  subPanelWidth: number;
  setSubPanelWidth: React.Dispatch<React.SetStateAction<AppLayoutState["subPanelWidth"]>>;

  langui: Langui;
  languages: Languages;
  currencies: Currencies;

  hasDisgardedSafariWarning: boolean;
  setHasDisgardedSafariWarning: React.Dispatch<
    React.SetStateAction<AppLayoutState["hasDisgardedSafariWarning"]>
  >;
}

const initialState: RequiredNonNullable<AppLayoutState> = {
  subPanelOpen: false,
  toggleSubPanelOpen: () => null,
  setSubPanelOpen: () => null,

  configPanelOpen: false,
  setConfigPanelOpen: () => null,
  toggleConfigPanelOpen: () => null,

  mainPanelReduced: false,
  setMainPanelReduced: () => null,
  toggleMainPanelReduced: () => null,

  mainPanelOpen: false,
  toggleMainPanelOpen: () => null,
  setMainPanelOpen: () => null,

  darkMode: false,
  toggleDarkMode: () => null,
  setDarkMode: () => null,

  selectedThemeMode: false,
  toggleSelectedThemeMode: () => null,
  setSelectedThemeMode: () => null,

  fontSize: 1,
  setFontSize: () => null,

  dyslexic: false,
  toggleDyslexic: () => null,
  setDyslexic: () => null,

  currency: "USD",
  setCurrency: () => null,

  playerName: "",
  setPlayerName: () => null,

  preferredLanguages: [],
  setPreferredLanguages: () => null,

  menuGestures: true,
  toggleMenuGestures: () => null,
  setMenuGestures: () => null,

  libraryItemUserStatus: {},
  setLibraryItemUserStatus: () => null,

  screenWidth: 0,
  setScreenWidth: () => null,

  contentPanelWidth: 0,
  setContentPanelWidth: () => null,

  subPanelWidth: 0,
  setSubPanelWidth: () => null,

  currencies: [],
  languages: [],
  langui: {},

  hasDisgardedSafariWarning: false,
  setHasDisgardedSafariWarning: () => null,
};

const AppContext = React.createContext<AppLayoutState>(initialState);

export const useAppLayout = (): AppLayoutState => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = (props: Props): JSX.Element => {
  const router = useRouter();

  const [subPanelOpen, setSubPanelOpen] = useStateWithLocalStorage(
    "subPanelOpen",
    initialState.subPanelOpen
  );

  const [configPanelOpen, setConfigPanelOpen] = useLocalStorage(
    "configPanelOpen",
    initialState.configPanelOpen
  );

  const [mainPanelReduced, setMainPanelReduced] = useLocalStorage(
    "mainPanelReduced",
    initialState.mainPanelReduced
  );

  const [mainPanelOpen, setMainPanelOpen] = useStateWithLocalStorage(
    "mainPanelOpen",
    initialState.mainPanelOpen
  );

  const [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode] = useDarkMode(
    "darkMode",
    initialState.darkMode
  );

  const [fontSize, setFontSize] = useLocalStorage("fontSize", initialState.fontSize);

  const [dyslexic, setDyslexic] = useLocalStorage("dyslexic", initialState.dyslexic);

  const [currency, setCurrency] = useLocalStorage("currency", initialState.currency);

  const [playerName, setPlayerName] = useLocalStorage("playerName", initialState.playerName);

  const [preferredLanguages, setPreferredLanguages] = useLocalStorage(
    "preferredLanguages",
    initialState.preferredLanguages
  );

  const [menuGestures, setMenuGestures] = useState(false);

  const [libraryItemUserStatus, setLibraryItemUserStatus] = useLocalStorage(
    "libraryItemUserStatus",
    initialState.libraryItemUserStatus
  );

  const [hasDisgardedSafariWarning, setHasDisgardedSafariWarning] = useSessionStorage(
    "hasDisgardedSafariWarning",
    initialState.hasDisgardedSafariWarning
  );

  const toggleSubPanelOpen = () => {
    setSubPanelOpen((current) => (isDefined(current) ? !current : current));
  };

  const toggleConfigPanelOpen = () => {
    setConfigPanelOpen((current) => (isDefined(current) ? !current : current));
  };

  const toggleMainPanelReduced = () => {
    setMainPanelReduced((current) => (isDefined(current) ? !current : current));
  };

  const toggleMainPanelOpen = () => {
    setMainPanelOpen((current) => (isDefined(current) ? !current : current));
  };

  const toggleDarkMode = () => {
    setDarkMode((current) => (isDefined(current) ? !current : current));
  };

  const toggleMenuGestures = () => {
    setMenuGestures((current) => !current);
  };

  const toggleSelectedThemeMode = () => {
    setSelectedThemeMode((current) => (isDefined(current) ? !current : current));
  };

  const toggleDyslexic = () => {
    setDyslexic((current) => (isDefined(current) ? !current : current));
  };

  const [screenWidth, setScreenWidth] = useState(0);
  const [contentPanelWidth, setContentPanelWidth] = useState(0);
  const [subPanelWidth, setSubPanelWidth] = useState(0);

  const langui = useLangui();
  const languages = useLanguages();
  const currencies = useCurrencies();

  useEffect(() => {
    if (preferredLanguages.length === 0) {
      if (isDefinedAndNotEmpty(router.locale) && router.locales) {
        setPreferredLanguages(getDefaultPreferredLanguages(router.locale, router.locales));
      }
    } else if (router.locale !== preferredLanguages[0]) {
      /*
       * Using a timeout to the code getting stuck into a loop when reaching the website with a
       * different preferredLanguages[0] from router.locale
       */
      setTimeout(
        async () =>
          router.replace(router.asPath, router.asPath, {
            locale: preferredLanguages[0],
          }),
        250
      );
    }
  }, [preferredLanguages, router, router.locale, router.locales, setPreferredLanguages]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      console.log("[Router Events] on routeChangeStart");
      setConfigPanelOpen(false);
      setMainPanelOpen(false);
      setSubPanelOpen(false);
    });

    router.events.on("hashChangeStart", () => {
      console.log("[Router Events] on hashChangeStart");
      setSubPanelOpen(false);
    });
  }, [router.events, setConfigPanelOpen, setMainPanelOpen, setSubPanelOpen]);

  useLayoutEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (isDefined(html)) {
      html.style.fontSize = `${fontSize * 100}%`;
    }
  }, [fontSize]);

  useScrollIntoView();

  return (
    <AppContext.Provider
      value={{
        subPanelOpen,
        configPanelOpen,
        mainPanelReduced,
        mainPanelOpen,
        darkMode,
        selectedThemeMode,
        fontSize,
        dyslexic,
        currency,
        playerName,
        preferredLanguages,
        menuGestures,
        libraryItemUserStatus,
        screenWidth,
        contentPanelWidth,
        subPanelWidth,
        hasDisgardedSafariWarning,
        setSubPanelOpen,
        setConfigPanelOpen,
        setMainPanelReduced,
        setMainPanelOpen,
        setDarkMode,
        setSelectedThemeMode,
        setFontSize,
        setDyslexic,
        setCurrency,
        setPlayerName,
        setPreferredLanguages,
        setMenuGestures,
        setLibraryItemUserStatus,
        toggleSubPanelOpen,
        toggleConfigPanelOpen,
        toggleMainPanelReduced,
        toggleMainPanelOpen,
        toggleDarkMode,
        toggleMenuGestures,
        toggleSelectedThemeMode,
        toggleDyslexic,
        setScreenWidth,
        setContentPanelWidth,
        setSubPanelWidth,
        setHasDisgardedSafariWarning,
        languages,
        langui,
        currencies,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};
