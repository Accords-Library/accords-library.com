import { Dispatch, SetStateAction, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { usePrefersDarkMode } from "./useMediaQuery";

export const useDarkMode = (
  key: string,
  initialValue: boolean
): [boolean, boolean, Dispatch<SetStateAction<boolean>>, Dispatch<SetStateAction<boolean>>] => {
  const [darkMode, setDarkMode] = useLocalStorage(key, initialValue);
  const prefersDarkMode = usePrefersDarkMode();
  const [selectedThemeMode, setSelectedThemeMode] = useLocalStorage("selectedThemeMode", false);

  useEffect(() => {
    if (!selectedThemeMode) setDarkMode(prefersDarkMode);
  }, [selectedThemeMode, prefersDarkMode, setDarkMode]);

  return [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode];
};
