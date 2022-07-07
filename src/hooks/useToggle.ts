import { Dispatch, SetStateAction, useCallback } from "react";

export const useToggle = (
  setState: Dispatch<SetStateAction<boolean>>
): (() => void) =>
  useCallback(() => {
    setState((current) => !current);
  }, [setState]);
