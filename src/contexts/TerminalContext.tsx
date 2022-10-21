import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { RequiredNonNullable } from "types/types";

interface TerminalState {
  previousLines: string[];
  previousCommands: string[];
  setPreviousLines: Dispatch<SetStateAction<TerminalState["previousLines"]>>;
  setPreviousCommands: Dispatch<SetStateAction<TerminalState["previousCommands"]>>;
}

const initialState: RequiredNonNullable<TerminalState> = {
  previousLines: [],
  previousCommands: [],
  setPreviousLines: () => null,
  setPreviousCommands: () => null,
};

const TerminalContext = createContext<TerminalState>(initialState);

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
