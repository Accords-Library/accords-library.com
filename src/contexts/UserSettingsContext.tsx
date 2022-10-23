import { useLocalStorage } from "usehooks-ts";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { RequiredNonNullable } from "types/types";
import { getDefaultPreferredLanguages } from "helpers/locales";
import { useDarkMode } from "hooks/useDarkMode";
import { SettingsPopup } from "components/Panels/SettingsPopup";

interface UserSettingsState {
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<UserSettingsState["fontSize"]>>;

  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: Dispatch<SetStateAction<UserSettingsState["darkMode"]>>;

  selectedThemeMode: boolean;
  toggleSelectedThemeMode: () => void;
  setSelectedThemeMode: Dispatch<SetStateAction<UserSettingsState["selectedThemeMode"]>>;

  dyslexic: boolean;
  toggleDyslexic: () => void;
  setDyslexic: Dispatch<SetStateAction<UserSettingsState["dyslexic"]>>;

  currency: string;
  setCurrency: Dispatch<SetStateAction<UserSettingsState["currency"]>>;

  playerName: string;
  setPlayerName: Dispatch<SetStateAction<UserSettingsState["playerName"]>>;

  preferredLanguages: string[];
  setPreferredLanguages: Dispatch<SetStateAction<UserSettingsState["preferredLanguages"]>>;
}

const initialState: RequiredNonNullable<UserSettingsState> = {
  fontSize: 1,
  setFontSize: () => null,

  darkMode: false,
  toggleDarkMode: () => null,
  setDarkMode: () => null,

  selectedThemeMode: false,
  toggleSelectedThemeMode: () => null,
  setSelectedThemeMode: () => null,

  dyslexic: false,
  toggleDyslexic: () => null,
  setDyslexic: () => null,

  currency: "USD",
  setCurrency: () => null,

  playerName: "",
  setPlayerName: () => null,

  preferredLanguages: [],
  setPreferredLanguages: () => null,
};

const UserSettingsContext = createContext<UserSettingsState>(initialState);

export const useUserSettings = (): UserSettingsState => useContext(UserSettingsContext);

interface Props {
  children: ReactNode;
}

export const UserSettingsProvider = ({ children }: Props): JSX.Element => {
  const router = useRouter();

  const [fontSize, setFontSize] = useLocalStorage("fontSize", initialState.fontSize);

  const [darkMode, selectedThemeMode, setDarkMode, setSelectedThemeMode] = useDarkMode(
    "darkMode",
    initialState.darkMode
  );

  const [dyslexic, setDyslexic] = useLocalStorage("dyslexic", initialState.dyslexic);

  const [currency, setCurrency] = useLocalStorage("currency", initialState.currency);

  const [playerName, setPlayerName] = useLocalStorage("playerName", initialState.playerName);

  const [preferredLanguages, setPreferredLanguages] = useLocalStorage(
    "preferredLanguages",
    initialState.preferredLanguages
  );

  const toggleDarkMode = () => {
    setDarkMode((current) => (isDefined(current) ? !current : current));
  };

  const toggleSelectedThemeMode = () => {
    setSelectedThemeMode((current) => (isDefined(current) ? !current : current));
  };

  const toggleDyslexic = () => {
    setDyslexic((current) => (isDefined(current) ? !current : current));
  };

  useEffect(() => {
    if (preferredLanguages.length === 0) {
      if (isDefinedAndNotEmpty(router.locale) && router.locales) {
        setPreferredLanguages(getDefaultPreferredLanguages(router.locale, router.locales));
      }
    } else if (router.locale !== preferredLanguages[0]) {
      /*
       * Using a timeout to the code getting stuck into a loop when reaching the website with a
       * different preferredLanguages[0] from router.locale
       */
      setTimeout(
        async () =>
          router.replace(router.asPath, router.asPath, {
            locale: preferredLanguages[0],
          }),
        250
      );
    }
  }, [preferredLanguages, router, router.locale, router.locales, setPreferredLanguages]);

  useLayoutEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (isDefined(html)) {
      html.style.fontSize = `${fontSize * 100}%`;
    }
  }, [fontSize]);

  useLayoutEffect(() => {
    const next = document.getElementById("__next");
    if (isDefined(next)) {
      if (darkMode) {
        next.classList.add("set-theme-dark");
        next.classList.remove("set-theme-light");
      } else {
        next.classList.add("set-theme-light");
        next.classList.remove("set-theme-dark");
      }
    }
  }, [darkMode]);

  useLayoutEffect(() => {
    const next = document.getElementById("__next");
    if (isDefined(next)) {
      if (dyslexic) {
        next.classList.add("set-theme-font-dyslexic");
        next.classList.remove("set-theme-font-standard");
      } else {
        next.classList.add("set-theme-font-standard");
        next.classList.remove("set-theme-font-dyslexic");
      }
    }
  }, [dyslexic]);

  return (
    <UserSettingsContext.Provider
      value={{
        fontSize,
        darkMode,
        selectedThemeMode,
        dyslexic,
        currency,
        playerName,
        preferredLanguages,
        setFontSize,
        setDarkMode,
        setSelectedThemeMode,
        setDyslexic,
        setCurrency,
        setPlayerName,
        setPreferredLanguages,
        toggleDarkMode,
        toggleSelectedThemeMode,
        toggleDyslexic,
      }}>
      <SettingsPopup />
      {children}
    </UserSettingsContext.Provider>
  );
};
