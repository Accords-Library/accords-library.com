import useDarkMode from "hooks/useDarkMode";
import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext, useEffect } from "react";

export interface AppLayoutState {
  subPanelOpen: boolean | undefined;
  languagePanelOpen: boolean | undefined;
  mainPanelReduced: boolean | undefined;
  mainPanelOpen: boolean | undefined;
  darkMode: boolean | undefined;
  setSubPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setLanguagePanelOpen: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setMainPanelReduced: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  setMainPanelOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSelectedThemeMode: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}

const initialState: AppLayoutState = {
  subPanelOpen: false,
  languagePanelOpen: false,
  mainPanelReduced: false,
  mainPanelOpen: false,
  darkMode: false,
  setSubPanelOpen: () => {},
  setLanguagePanelOpen: () => {},
  setMainPanelReduced: () => {},
  setMainPanelOpen: () => {},
  setDarkMode: () => {},
  setSelectedThemeMode: () => {},
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

  const [mainPanelReduced, setMainPanelReduced] = useStateWithLocalStorage<
    boolean | undefined
  >("mainPanelReduced", initialState.mainPanelReduced);

  const [mainPanelOpen, setMainPanelOpen] = useStateWithLocalStorage<
    boolean | undefined
  >("mainPanelOpen", initialState.mainPanelOpen);

  const [darkMode, setDarkMode, setSelectedThemeMode] = useDarkMode(
    "darkMode",
    initialState.darkMode
  );

  return (
    <AppContext.Provider
      value={{
        subPanelOpen,
        languagePanelOpen,
        mainPanelReduced,
        mainPanelOpen,
        darkMode,
        setSubPanelOpen,
        setLanguagePanelOpen,
        setMainPanelReduced,
        setMainPanelOpen,
        setDarkMode,
        setSelectedThemeMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
