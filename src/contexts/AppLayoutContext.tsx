import React, { ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { isDefined } from "helpers/others";
import { LibraryItemUserStatus, RequiredNonNullable } from "helpers/types";
import { useDarkMode } from "hooks/useDarkMode";

interface AppLayoutState {
  subPanelOpen: boolean;
  toggleSubPanelOpen: () => void;
  setSubPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["subPanelOpen"]>
  >;

  configPanelOpen: boolean;
  toggleConfigPanelOpen: () => void;
  setConfigPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["configPanelOpen"]>
  >;

  searchPanelOpen: boolean;
  toggleSearchPanelOpen: () => void;
  setSearchPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["searchPanelOpen"]>
  >;

  mainPanelReduced: boolean;
  toggleMainPanelReduced: () => void;
  setMainPanelReduced: React.Dispatch<
    React.SetStateAction<AppLayoutState["mainPanelReduced"]>
  >;

  mainPanelOpen: boolean;
  toggleMainPanelOpen: () => void;
  setMainPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["mainPanelOpen"]>
  >;

  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<AppLayoutState["darkMode"]>>;

  selectedThemeMode: boolean;
  toggleSelectedThemeMode: () => void;
  setSelectedThemeMode: React.Dispatch<
    React.SetStateAction<AppLayoutState["selectedThemeMode"]>
  >;

  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<AppLayoutState["fontSize"]>>;

  dyslexic: boolean;
  toggleDyslexic: () => void;
  setDyslexic: React.Dispatch<React.SetStateAction<AppLayoutState["dyslexic"]>>;

  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<AppLayoutState["currency"]>>;

  playerName: string;
  setPlayerName: React.Dispatch<
    React.SetStateAction<AppLayoutState["playerName"]>
  >;

  preferredLanguages: string[];
  setPreferredLanguages: React.Dispatch<
    React.SetStateAction<AppLayoutState["preferredLanguages"]>
  >;

  menuGestures: boolean;
  toggleMenuGestures: () => void;
  setMenuGestures: React.Dispatch<
    React.SetStateAction<AppLayoutState["menuGestures"]>
  >;

  libraryItemUserStatus: Record<string, LibraryItemUserStatus>;
  setLibraryItemUserStatus: React.Dispatch<
    React.SetStateAction<AppLayoutState["libraryItemUserStatus"]>
  >;

  screenWidth: number;
  setScreenWidth: React.Dispatch<
    React.SetStateAction<AppLayoutState["screenWidth"]>
  >;

  contentPanelWidth: number;
  setContentPanelWidth: React.Dispatch<
    React.SetStateAction<AppLayoutState["contentPanelWidth"]>
  >;

  subPanelWidth: number;
  setSubPanelWidth: React.Dispatch<
    React.SetStateAction<AppLayoutState["subPanelWidth"]>
  >;
}

const initialState: RequiredNonNullable<AppLayoutState> = {
  subPanelOpen: false,
  toggleSubPanelOpen: () => null,
  setSubPanelOpen: () => null,

  configPanelOpen: false,
  setConfigPanelOpen: () => null,
  toggleConfigPanelOpen: () => null,

  searchPanelOpen: false,
  setSearchPanelOpen: () => null,
  toggleSearchPanelOpen: () => null,

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
};

const AppContext = React.createContext<AppLayoutState>(initialState);

export const useAppLayout = (): AppLayoutState => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = (props: Props): JSX.Element => {
  const [subPanelOpen, setSubPanelOpen] = useLocalStorage(
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

  const [mainPanelOpen, setMainPanelOpen] = useLocalStorage(
    "mainPanelOpen",
    initialState.mainPanelOpen
  );

  const [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode] =
    useDarkMode("darkMode", initialState.darkMode);

  const [fontSize, setFontSize] = useLocalStorage(
    "fontSize",
    initialState.fontSize
  );

  const [dyslexic, setDyslexic] = useLocalStorage(
    "dyslexic",
    initialState.dyslexic
  );

  const [currency, setCurrency] = useLocalStorage(
    "currency",
    initialState.currency
  );

  const [playerName, setPlayerName] = useLocalStorage(
    "playerName",
    initialState.playerName
  );

  const [preferredLanguages, setPreferredLanguages] = useLocalStorage(
    "preferredLanguages",
    initialState.preferredLanguages
  );

  const [menuGestures, setMenuGestures] = useState(false);

  const [searchPanelOpen, setSearchPanelOpen] = useLocalStorage(
    "searchPanelOpen",
    initialState.searchPanelOpen
  );

  const [libraryItemUserStatus, setLibraryItemUserStatus] = useLocalStorage(
    "libraryItemUserStatus",
    initialState.libraryItemUserStatus
  );

  const toggleSubPanelOpen = () => {
    setSubPanelOpen((current) => (isDefined(current) ? !current : current));
  };

  const toggleConfigPanelOpen = () => {
    setConfigPanelOpen((current) => (isDefined(current) ? !current : current));
  };

  const toggleSearchPanelOpen = () => {
    setSearchPanelOpen((current) => (isDefined(current) ? !current : current));
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
    setSelectedThemeMode((current) =>
      isDefined(current) ? !current : current
    );
  };

  const toggleDyslexic = () => {
    setDyslexic((current) => (isDefined(current) ? !current : current));
  };

  const [screenWidth, setScreenWidth] = useState(0);
  const [contentPanelWidth, setContentPanelWidth] = useState(0);
  const [subPanelWidth, setSubPanelWidth] = useState(0);

  return (
    <AppContext.Provider
      value={{
        subPanelOpen,
        configPanelOpen,
        searchPanelOpen,
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
        setSubPanelOpen,
        setConfigPanelOpen,
        setSearchPanelOpen,
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
        toggleSearchPanelOpen,
        toggleMainPanelReduced,
        toggleMainPanelOpen,
        toggleDarkMode,
        toggleMenuGestures,
        toggleSelectedThemeMode,
        toggleDyslexic,
        setContentPanelWidth,
        setScreenWidth,
        setSubPanelWidth,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
