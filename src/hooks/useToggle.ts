import { Dispatch, SetStateAction, useCallback } from "react";

export const useToggle = (setState: Dispatch<SetStateAction<boolean>>) =>
  useCallback(() => {
    setState((current) => !current);
  }, []);
