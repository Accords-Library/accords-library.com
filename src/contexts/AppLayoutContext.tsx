import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "usehooks-ts";
import { isDefined } from "helpers/others";
import { RequiredNonNullable } from "types/types";
import { useStateWithLocalStorage } from "hooks/useStateWithLocalStorage";
import { useScrollIntoView } from "hooks/useScrollIntoView";

interface AppLayoutState {
  subPanelOpen: boolean;
  toggleSubPanelOpen: () => void;
  setSubPanelOpen: Dispatch<SetStateAction<AppLayoutState["subPanelOpen"]>>;

  configPanelOpen: boolean;
  toggleConfigPanelOpen: () => void;
  setConfigPanelOpen: Dispatch<SetStateAction<AppLayoutState["configPanelOpen"]>>;

  mainPanelReduced: boolean;
  toggleMainPanelReduced: () => void;
  setMainPanelReduced: Dispatch<SetStateAction<AppLayoutState["mainPanelReduced"]>>;

  mainPanelOpen: boolean;
  toggleMainPanelOpen: () => void;
  setMainPanelOpen: Dispatch<SetStateAction<AppLayoutState["mainPanelOpen"]>>;

  menuGestures: boolean;
  toggleMenuGestures: () => void;
  setMenuGestures: Dispatch<SetStateAction<AppLayoutState["menuGestures"]>>;
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

  menuGestures: true,
  toggleMenuGestures: () => null,
  setMenuGestures: () => null,
};

const AppLayoutContext = createContext<AppLayoutState>(initialState);

export const useAppLayout = (): AppLayoutState => useContext(AppLayoutContext);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props): JSX.Element => {
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

  const [menuGestures, setMenuGestures] = useState(false);

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

  const toggleMenuGestures = () => {
    setMenuGestures((current) => !current);
  };

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

  useScrollIntoView();

  return (
    <AppLayoutContext.Provider
      value={{
        subPanelOpen,
        configPanelOpen,
        mainPanelReduced,
        mainPanelOpen,
        menuGestures,
        setSubPanelOpen,
        setConfigPanelOpen,
        setMainPanelReduced,
        setMainPanelOpen,
        setMenuGestures,
        toggleSubPanelOpen,
        toggleConfigPanelOpen,
        toggleMainPanelReduced,
        toggleMainPanelOpen,
        toggleMenuGestures,
      }}>
      {children}
    </AppLayoutContext.Provider>
  );
};
