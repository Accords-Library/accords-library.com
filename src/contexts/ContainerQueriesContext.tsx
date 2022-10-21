import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { RequiredNonNullable } from "types/types";

interface ContainerQueriesState {
  screenWidth: number;
  setScreenWidth: Dispatch<SetStateAction<ContainerQueriesState["screenWidth"]>>;

  contentPanelWidth: number;
  setContentPanelWidth: Dispatch<SetStateAction<ContainerQueriesState["contentPanelWidth"]>>;

  subPanelWidth: number;
  setSubPanelWidth: Dispatch<SetStateAction<ContainerQueriesState["subPanelWidth"]>>;
}

const initialState: RequiredNonNullable<ContainerQueriesState> = {
  screenWidth: 0,
  setScreenWidth: () => null,

  contentPanelWidth: 0,
  setContentPanelWidth: () => null,

  subPanelWidth: 0,
  setSubPanelWidth: () => null,
};

const ContainerQueriesContext = createContext<ContainerQueriesState>(initialState);

export const useContainerQueries = (): ContainerQueriesState => useContext(ContainerQueriesContext);

interface Props {
  children: ReactNode;
}

export const ContainerQueriesContextProvider = ({ children }: Props): JSX.Element => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [contentPanelWidth, setContentPanelWidth] = useState(0);
  const [subPanelWidth, setSubPanelWidth] = useState(0);

  return (
    <ContainerQueriesContext.Provider
      value={{
        screenWidth,
        contentPanelWidth,
        subPanelWidth,
        setScreenWidth,
        setContentPanelWidth,
        setSubPanelWidth,
      }}>
      {children}
    </ContainerQueriesContext.Provider>
  );
};
