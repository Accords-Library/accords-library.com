import useStateWithLocalStorage from "hooks/useStateWithLocalStorage";
import React, { ReactNode, useContext, useEffect, useState } from "react";

export interface AppLayoutState {
  subPanelOpen: boolean;
  languagePanelOpen: boolean;
  mainPanelReduced: boolean;
  mainPanelOpen: boolean;
  darkMode: boolean;
  setSubPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLanguagePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMainPanelReduced: React.Dispatch<React.SetStateAction<boolean>>;
  setMainPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [subPanelOpen, setSubPanelOpen] = useStateWithLocalStorage<boolean>(
    "subPanelOpen",
    initialState.subPanelOpen
  );

  const [languagePanelOpen, setLanguagePanelOpen] =
    useStateWithLocalStorage<boolean>(
      "languagePanelOpen",
      initialState.languagePanelOpen
    );

  const [mainPanelReduced, setMainPanelReduced] =
    useStateWithLocalStorage<boolean>(
      "mainPanelReduced",
      initialState.mainPanelReduced
    );

  const [mainPanelOpen, setMainPanelOpen] = useStateWithLocalStorage<boolean>(
    "mainPanelOpen",
    initialState.mainPanelOpen
  );

  const [darkMode, setDarkMode] = useStateWithLocalStorage<boolean>(
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
