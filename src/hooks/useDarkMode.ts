import { useEffect } from "react";
import { usePrefersDarkMode } from "./useMediaQuery";
import { useStateWithLocalStorage } from "./useStateWithLocalStorage";

export function useDarkMode(
  key: string,
  initialValue: boolean | undefined
): [
  boolean | undefined,
  boolean | undefined,
  React.Dispatch<React.SetStateAction<boolean | undefined>>,
  React.Dispatch<React.SetStateAction<boolean | undefined>>
] {
  const [darkMode, setDarkMode] = useStateWithLocalStorage(key, initialValue);

  const prefersDarkMode = usePrefersDarkMode();

  const [selectedThemeMode, setSelectedThemeMode] = useStateWithLocalStorage(
    "selectedThemeMode",
    false
  );

  useEffect(() => {
    if (selectedThemeMode === false) setDarkMode(prefersDarkMode);
  }, [selectedThemeMode, prefersDarkMode, setDarkMode]);

  return [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode];
}
