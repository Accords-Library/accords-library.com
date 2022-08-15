import { useMemo } from "react";
import { usePrefersDarkMode } from "./useMediaQuery";
import { useStateWithLocalStorage } from "./useStateWithLocalStorage";

export enum TernaryDarkMode {
  Dark = "dark",
  Auto = "auto",
  Light = "light",
}

export const useTernaryDarkMode = (
  key: string,
  initialValue: TernaryDarkMode
): {
  isDarkMode: boolean;
  ternaryDarkMode: TernaryDarkMode | undefined;
  setTernaryDarkMode: React.Dispatch<
    React.SetStateAction<TernaryDarkMode | undefined>
  >;
} => {
  const [ternaryDarkMode, setTernaryDarkMode] = useStateWithLocalStorage(
    key,
    initialValue
  );
  const prefersDarkMode = usePrefersDarkMode();
  const isDarkMode = useMemo(() => {
    switch (ternaryDarkMode) {
      case TernaryDarkMode.Light:
        return false;
      case TernaryDarkMode.Dark:
        return true;
      default:
        return prefersDarkMode;
    }
  }, [prefersDarkMode, ternaryDarkMode]);

  return { isDarkMode, ternaryDarkMode, setTernaryDarkMode };
};
