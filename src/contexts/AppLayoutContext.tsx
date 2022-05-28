import { Immutable, LibraryItemUserStatus } from "helpers/types";
import { useDarkMode } from "hooks/useDarkMode";
import { useStateWithLocalStorage } from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext, useState } from "react";

export interface AppLayoutState {
  subPanelOpen: boolean | undefined;
  setSubPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["subPanelOpen"]>
  >;
  configPanelOpen: boolean | undefined;
  setConfigPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["configPanelOpen"]>
  >;
  searchPanelOpen: boolean | undefined;
  setSearchPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["searchPanelOpen"]>
  >;
  mainPanelReduced: boolean | undefined;
  setMainPanelReduced: React.Dispatch<
    React.SetStateAction<AppLayoutState["mainPanelReduced"]>
  >;
  mainPanelOpen: boolean | undefined;
  setMainPanelOpen: React.Dispatch<
    React.SetStateAction<AppLayoutState["mainPanelOpen"]>
  >;
  darkMode: boolean | undefined;
  setDarkMode: React.Dispatch<React.SetStateAction<AppLayoutState["darkMode"]>>;
  selectedThemeMode: boolean | undefined;
  setSelectedThemeMode: React.Dispatch<
    React.SetStateAction<AppLayoutState["selectedThemeMode"]>
  >;
  fontSize: number | undefined;
  setFontSize: React.Dispatch<React.SetStateAction<AppLayoutState["fontSize"]>>;
  dyslexic: boolean | undefined;
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
  setMenuGestures: React.Dispatch<
    React.SetStateAction<AppLayoutState["menuGestures"]>
  >;
  libraryItemUserStatus: Record<string, LibraryItemUserStatus> | undefined;
  setLibraryItemUserStatus: React.Dispatch<
    React.SetStateAction<AppLayoutState["libraryItemUserStatus"]>
  >;
}

/* eslint-disable @typescript-eslint/no-empty-function */
const initialState: AppLayoutState = {
  subPanelOpen: false,
  configPanelOpen: false,
  searchPanelOpen: false,
  mainPanelReduced: false,
  mainPanelOpen: false,
  darkMode: false,
  selectedThemeMode: false,
  fontSize: 1,
  dyslexic: false,
  currency: "USD",
  playerName: "",
  preferredLanguages: [],
  menuGestures: true,
  libraryItemUserStatus: {},
  setSubPanelOpen: () => {},
  setMainPanelReduced: () => {},
  setMainPanelOpen: () => {},
  setDarkMode: () => {},
  setSelectedThemeMode: () => {},
  setConfigPanelOpen: () => {},
  setSearchPanelOpen: () => {},
  setFontSize: () => {},
  setDyslexic: () => {},
  setCurrency: () => {},
  setPlayerName: () => {},
  setPreferredLanguages: () => {},
  setMenuGestures: () => {},
  setLibraryItemUserStatus: () => {},
};
/* eslint-enable @typescript-eslint/no-empty-function */

const AppContext = React.createContext<AppLayoutState>(initialState);

export default AppContext;

export function useAppLayout(): AppLayoutState {
  return useContext(AppContext);
}

interface Props {
  children: ReactNode;
}

export function AppContextProvider(props: Immutable<Props>): JSX.Element {
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
