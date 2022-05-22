import { Immutable } from "helpers/types";
import { useDarkMode } from "hooks/useDarkMode";
import { useStateWithLocalStorage } from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext, useState } from "react";

interface AppLayoutState {
  subPanelOpen: boolean | undefined;
  configPanelOpen: boolean | undefined;
  searchPanelOpen: boolean | undefined;
  mainPanelReduced: boolean | undefined;
  mainPanelOpen: boolean | undefined;
  darkMode: boolean | undefined;
  selectedThemeMode: boolean | undefined;
  fontSize: number | undefined;
  dyslexic: boolean | undefined;
  currency: string | undefined;
  playerName: string | undefined;
  preferredLanguages: string[] | undefined;
  menuGestures: boolean;
  setSubPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setConfigPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSearchPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setMainPanelReduced: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setMainPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSelectedThemeMode: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setFontSize: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDyslexic: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPlayerName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setPreferredLanguages: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
  setMenuGestures: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [subPanelOpen, setSubPanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("subPanelOpen", initialState.subPanelOpen);

  const [configPanelOpen, setConfigPanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("configPanelOpen", initialState.configPanelOpen);

  const [mainPanelReduced, setMainPanelReduced] = useStateWithLocalStorage<
    boolean | undefined
  >("mainPanelReduced", initialState.mainPanelReduced);

  const [mainPanelOpen, setMainPanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("mainPanelOpen", initialState.mainPanelOpen);

  const [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode] =
    useDarkMode("darkMode", initialState.darkMode);

  const [fontSize, setFontSize] = useStateWithLocalStorage<number | undefined>(
    "fontSize",
    initialState.fontSize
  );

  const [dyslexic, setDyslexic] = useStateWithLocalStorage<boolean | undefined>(
    "dyslexic",
    initialState.dyslexic
  );

  const [currency, setCurrency] = useStateWithLocalStorage<string | undefined>(
    "currency",
    initialState.currency
  );

  const [playerName, setPlayerName] = useStateWithLocalStorage<
    string | undefined
  >("playerName", initialState.playerName);

  const [preferredLanguages, setPreferredLanguages] = useStateWithLocalStorage<
    string[] | undefined
  >("preferredLanguages", initialState.preferredLanguages);

  const [menuGestures, setMenuGestures] = useState(false);

  const [searchPanelOpen, setSearchPanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("mainPanelOpen", initialState.mainPanelOpen);

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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
