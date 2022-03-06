import useDarkMode from "hooks/useDarkMode";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext } from "react";

export interface AppLayoutState {
  subPanelOpen: boolean | undefined;
  languagePanelOpen: boolean | undefined;
  configPanelOpen: boolean | undefined;
  mainPanelReduced: boolean | undefined;
  mainPanelOpen: boolean | undefined;
  darkMode: boolean | undefined;
  selectedThemeMode: boolean | undefined;
  fontSize: number | undefined;
  dyslexic: boolean | undefined;
  currency: string | undefined;
  setSubPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setLanguagePanelOpen: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
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
}

const initialState: AppLayoutState = {
  subPanelOpen: false,
  languagePanelOpen: false,
  configPanelOpen: false,
  mainPanelReduced: false,
  mainPanelOpen: false,
  darkMode: false,
  selectedThemeMode: false,
  fontSize: 1,
  dyslexic: false,
  currency: "USD",
  setSubPanelOpen: () => {},
  setLanguagePanelOpen: () => {},
  setMainPanelReduced: () => {},
  setMainPanelOpen: () => {},
  setDarkMode: () => {},
  setSelectedThemeMode: () => {},
  setConfigPanelOpen: () => {},
  setFontSize: () => {},
  setDyslexic: () => {},
  setCurrency: () => {},
};

const AppContext = React.createContext<AppLayoutState>(initialState);

export default AppContext;

export function useAppLayout() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
};

export const AppContextProvider = (props: Props) => {
  const [subPanelOpen, setSubPanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("subPanelOpen", initialState.subPanelOpen);

  const [languagePanelOpen, setLanguagePanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("languagePanelOpen", initialState.languagePanelOpen);

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

  return (
    <AppContext.Provider
      value={{
        subPanelOpen,
        languagePanelOpen,
        configPanelOpen,
        mainPanelReduced,
        mainPanelOpen,
        darkMode,
        selectedThemeMode,
        fontSize,
        dyslexic,
        currency,
        setSubPanelOpen,
        setLanguagePanelOpen,
        setConfigPanelOpen,
        setMainPanelReduced,
        setMainPanelOpen,
        setDarkMode,
        setSelectedThemeMode,
        setFontSize,
        setDyslexic,
        setCurrency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
