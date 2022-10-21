import React, { ReactNode, useContext, useState } from "react";
import { RequiredNonNullable } from "types/types";

interface ContainerQueriesState {
  screenWidth: number;
  setScreenWidth: React.Dispatch<React.SetStateAction<ContainerQueriesState["screenWidth"]>>;

  contentPanelWidth: number;
  setContentPanelWidth: React.Dispatch<
    React.SetStateAction<ContainerQueriesState["contentPanelWidth"]>
  >;

  subPanelWidth: number;
  setSubPanelWidth: React.Dispatch<React.SetStateAction<ContainerQueriesState["subPanelWidth"]>>;
}

const initialState: RequiredNonNullable<ContainerQueriesState> = {
  screenWidth: 0,
  setScreenWidth: () => null,

  contentPanelWidth: 0,
  setContentPanelWidth: () => null,

  subPanelWidth: 0,
  setSubPanelWidth: () => null,
};

const ContainerQueriesContext = React.createContext<ContainerQueriesState>(initialState);

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
