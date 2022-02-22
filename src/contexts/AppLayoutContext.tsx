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
  function useLocalStorage(
    value: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    name: string
  ): void {
    useEffect(() => {
      const data = localStorage.getItem(name);
      if (data) setter(JSON.parse(data));
    }, [setter, name]);

    useEffect(() => {
      localStorage.setItem(name, JSON.stringify(value));
    }, [value, name]);
  }

  const [subPanelOpen, setSubPanelOpen] = useState<boolean>(
    initialState.subPanelOpen
  );

  const [languagePanelOpen, setLanguagePanelOpen] = useState<boolean>(
    initialState.languagePanelOpen
  );

  const [mainPanelReduced, setMainPanelReduced] = useState<boolean>(
    initialState.mainPanelReduced
  );

  const [mainPanelOpen, setMainPanelOpen] = useState<boolean>(
    initialState.mainPanelOpen
  );

  const [darkMode, setDarkMode] = useState<boolean>(initialState.darkMode);

  useLocalStorage(subPanelOpen, setSubPanelOpen, "subPanelOpen");
  useLocalStorage(languagePanelOpen, setLanguagePanelOpen, "languagePanelOpen");
  useLocalStorage(mainPanelReduced, setMainPanelReduced, "mainPanelReduced");
  useLocalStorage(mainPanelOpen, setMainPanelOpen, "mainPanelOpen");
  useLocalStorage(darkMode, setDarkMode, "darkMode");

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
