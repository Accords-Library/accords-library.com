import { Dispatch, SetStateAction, useCallback, useState } from "react";

export const useBoolean = (
  initialState: boolean
): {
  state: boolean;
  toggleState: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setState: Dispatch<SetStateAction<boolean>>;
} => {
  const [state, setState] = useState(initialState);
  const toggleState = useCallback(
    () => setState((currentState) => !currentState),
    []
  );
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  return { state, toggleState, setTrue, setFalse, setState };
};
