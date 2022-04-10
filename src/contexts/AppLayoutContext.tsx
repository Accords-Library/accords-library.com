import useDarkMode from "hooks/useDarkMode";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext } from "react";

interface AppLayoutState {
  subPanelOpen: boolean | undefined;
  configPanelOpen: boolean | undefined;
  mainPanelReduced: boolean | undefined;
  mainPanelOpen: boolean | undefined;
  darkMode: boolean | undefined;
  selectedThemeMode: boolean | undefined;
  fontSize: number | undefined;
  dyslexic: boolean | undefined;
  currency: string | undefined;
  playerName: string | undefined;
  preferredLanguages: string[] | undefined;
  setSubPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setConfigPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
}

/* eslint-disable @typescript-eslint/no-empty-function */
const initialState: AppLayoutState = {
  subPanelOpen: false,
  configPanelOpen: false,
  mainPanelReduced: false,
  mainPanelOpen: false,
  darkMode: false,
  selectedThemeMode: false,
  fontSize: 1,
  dyslexic: false,
  currency: "USD",
  playerName: "",
  preferredLanguages: [],
  setSubPanelOpen: () => {},
  setMainPanelReduced: () => {},
  setMainPanelOpen: () => {},
  setDarkMode: () => {},
  setSelectedThemeMode: () => {},
  setConfigPanelOpen: () => {},
  setFontSize: () => {},
  setDyslexic: () => {},
  setCurrency: () => {},
  setPlayerName: () => {},
  setPreferredLanguages: () => {},
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

export function AppContextProvider(props: Props): JSX.Element {
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
