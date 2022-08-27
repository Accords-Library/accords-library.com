import { useEffect } from "react";
import { usePrefersDarkMode } from "./useMediaQuery";
import { useStateWithLocalStorage } from "./useStateWithLocalStorage";

export const useDarkMode = (
  key: string,
  initialValue: boolean
): [
  boolean,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [darkMode, setDarkMode] = useStateWithLocalStorage(key, initialValue);
  const prefersDarkMode = usePrefersDarkMode();
  const [selectedThemeMode, setSelectedThemeMode] = useStateWithLocalStorage(
    "selectedThemeMode",
    false
  );

  useEffect(() => {
    if (!selectedThemeMode) setDarkMode(prefersDarkMode);
  }, [selectedThemeMode, prefersDarkMode, setDarkMode]);

  return [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode];
};
