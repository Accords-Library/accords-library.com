import { isDefined } from "helpers/others";
import { LibraryItemUserStatus, RequiredNonNullable } from "helpers/types";
import { useDarkMode } from "hooks/useDarkMode";
import { useStateWithLocalStorage } from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext, useState } from "react";

export interface AppLayoutState {
  subPanelOpen: boolean | undefined;
  toggleSubPanelOpen: () => void;
  setSubPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["subPanelOpen"]>
  >;
  configPanelOpen: boolean | undefined;
  toggleConfigPanelOpen: () => void;
  setConfigPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["configPanelOpen"]>
  >;
  searchPanelOpen: boolean | undefined;
  toggleSearchPanelOpen: () => void;
  setSearchPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["searchPanelOpen"]>
  >;
  mainPanelReduced: boolean | undefined;
  toggleMainPanelReduced: () => void;
  setMainPanelReduced: React.Dispatch<
    React.SetStateAction<AppLayoutState["mainPanelReduced"]>
  >;
  mainPanelOpen: boolean | undefined;
  toggleMainPanelOpen: () => void;
  setMainPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["mainPanelOpen"]>
  >;
  darkMode: boolean | undefined;
  toggleDarkMode: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<AppLayoutState["darkMode"]>>;
  selectedThemeMode: boolean | undefined;
  toggleSelectedThemeMode: () => void;
  setSelectedThemeMode: React.Dispatch<
    React.SetStateAction<AppLayoutState["selectedThemeMode"]>
  >;
  fontSize: number | undefined;
  setFontSize: React.Dispatch<React.SetStateAction<AppLayoutState["fontSize"]>>;
  dyslexic: boolean | undefined;
  toggleDyslexic: () => void;
  setDyslexic: React.Dispatch<React.SetStateAction<AppLayoutState["dyslexic"]>>;
  currency: string | undefined;
  setCurrency: React.Dispatch<React.SetStateAction<AppLayoutState["currency"]>>;
  playerName: string | undefined;
  setPlayerName: React.Dispatch<
    React.SetStateAction<AppLayoutState["playerName"]>
  >;
  preferredLanguages: string[] | undefined;
  setPreferredLanguages: React.Dispatch<
    React.SetStateAction<AppLayoutState["preferredLanguages"]>
  >;
  menuGestures: boolean;
  toggleMenuGestures: () => void;
  setMenuGestures: React.Dispatch<
    React.SetStateAction<AppLayoutState["menuGestures"]>
  >;
  libraryItemUserStatus: Record<string, LibraryItemUserStatus> | undefined;
  setLibraryItemUserStatus: React.Dispatch<
    React.SetStateAction<AppLayoutState["libraryItemUserStatus"]>
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
};

const AppContext = React.createContext<AppLayoutState>(initialState);

export const useAppLayout = (): AppLayoutState => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = (props: Props): JSX.Element => {
  const [subPanelOpen, setSubPanelOpen] = useStateWithLocalStorage(
    "subPanelOpen",
    initialState.subPanelOpen
  );

  const [configPanelOpen, setConfigPanelOpen] = useStateWithLocalStorage(
    "configPanelOpen",
    initialState.configPanelOpen
  );

  const [mainPanelReduced, setMainPanelReduced] = useStateWithLocalStorage(
    "mainPanelReduced",
    initialState.mainPanelReduced
  );

  const [mainPanelOpen, setMainPanelOpen] = useStateWithLocalStorage(
    "mainPanelOpen",
    initialState.mainPanelOpen
  );

  const [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode] =
    useDarkMode("darkMode", initialState.darkMode);

  const [fontSize, setFontSize] = useStateWithLocalStorage(
    "fontSize",
    initialState.fontSize
  );

  const [dyslexic, setDyslexic] = useStateWithLocalStorage(
    "dyslexic",
    initialState.dyslexic
  );

  const [currency, setCurrency] = useStateWithLocalStorage(
    "currency",
    initialState.currency
  );

  const [playerName, setPlayerName] = useStateWithLocalStorage(
    "playerName",
    initialState.playerName
  );

  const [preferredLanguages, setPreferredLanguages] = useStateWithLocalStorage(
    "preferredLanguages",
    initialState.preferredLanguages
  );

  const [menuGestures, setMenuGestures] = useState(false);

  const [searchPanelOpen, setSearchPanelOpen] = useStateWithLocalStorage(
    "searchPanelOpen",
    initialState.searchPanelOpen
  );

  const [libraryItemUserStatus, setLibraryItemUserStatus] =
    useStateWithLocalStorage(
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
