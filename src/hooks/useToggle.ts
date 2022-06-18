import { Dispatch, SetStateAction, useCallback } from "react";

export function useToggle(setState: Dispatch<SetStateAction<boolean>>) {
  return useCallback(() => {
    setState((current) => !current);
  }, []);
}
