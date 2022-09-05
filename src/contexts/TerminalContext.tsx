import React, { ReactNode, useContext, useState } from "react";
import { RequiredNonNullable } from "types/types";

interface TerminalState {
  previousLines: string[];
  previousCommands: string[];
  setPreviousLines: React.Dispatch<React.SetStateAction<TerminalState["previousLines"]>>;
  setPreviousCommands: React.Dispatch<React.SetStateAction<TerminalState["previousCommands"]>>;
}

const initialState: RequiredNonNullable<TerminalState> = {
  previousLines: [],
  previousCommands: [],
  setPreviousLines: () => null,
  setPreviousCommands: () => null,
};

const TerminalContext = React.createContext<TerminalState>(initialState);

export const useTerminalContext = (): TerminalState => useContext(TerminalContext);

interface Props {
  children: ReactNode;
}

export const TerminalContextProvider = ({ children }: Props): JSX.Element => {
  const [previousLines, setPreviousLines] = useState(initialState.previousLines);
  const [previousCommands, setPreviousCommands] = useState(initialState.previousCommands);
  return (
    <TerminalContext.Provider
      value={{ previousCommands, previousLines, setPreviousCommands, setPreviousLines }}>
      {children}
    </TerminalContext.Provider>
  );
};
