import { useRouter } from "next/router";
import { useEffect } from "react";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomPairing, useAtomGetter, useAtomPair } from "helpers/atoms";
import { getDefaultPreferredLanguages } from "helpers/locales";
import { isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { usePrefersDarkMode } from "hooks/useMediaQuery";
import { userAgent } from "contexts/userAgent";

export enum ThemeMode {
  Dark = "dark",
  Auto = "auto",
  Light = "light",
}

export enum PerfMode {
  On = "on",
  Auto = "auto",
  Off = "off",
}

const preferredLanguagesAtom = atomPairing(atomWithStorage<string[]>("preferredLanguages", []));
const themeModeAtom = atomPairing(atomWithStorage("themeMode", ThemeMode.Auto));
const darkModeAtom = atomPairing(atom(false));
const fontSizeAtom = atomPairing(atomWithStorage("fontSize", 1));
const dyslexicAtom = atomPairing(atomWithStorage("isDyslexic", false));
const currencyAtom = atomPairing(atomWithStorage("currency", "USD"));
const playerNameAtom = atomPairing(atomWithStorage("playerName", ""));
const perfModeAtom = atomPairing(atomWithStorage("perfMode", PerfMode.Auto));

const isPerfModeEnabledAtom = atom((get) => {
  const os = get(userAgent.os);
  const engine = get(userAgent.engine);
  const perfMode = get(perfModeAtom[0]);

  if (os === "iOS") return true;
  if (engine === "WebKit") return true;
  if (perfMode === "auto") {
    if (engine === "Blink") return false;
    if (os === "Linux") return true;
    if (os === "Android") return true;
  }
  return perfMode === PerfMode.On;
});

const isPerfModeToggleableAtom = atom((get) => {
  const engine = get(userAgent.engine);
  const os = get(userAgent.os);
  if (os === "iOS") return false;
  if (engine === "WebKit") return false;
  return true;
});

export const settings = {
  preferredLanguages: preferredLanguagesAtom,
  themeMode: themeModeAtom,
  darkMode: darkModeAtom,
  fontSize: fontSizeAtom,
  dyslexic: dyslexicAtom,
  currency: currencyAtom,
  playerName: playerNameAtom,
  perfMode: perfModeAtom,
  isPerfModeEnabled: isPerfModeEnabledAtom,
  isPerfModeToggleable: isPerfModeToggleableAtom,
};

export const useSettings = (): void => {
  const router = useRouter();
  const [preferredLanguages, setPreferredLanguages] = useAtomPair(preferredLanguagesAtom);
  const fontSize = useAtomGetter(fontSizeAtom);
  const isDyslexic = useAtomGetter(dyslexicAtom);
  const [isDarkMode, setDarkMode] = useAtomPair(darkModeAtom);
  const themeMode = useAtomGetter(themeModeAtom);

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (isDefined(html)) {
      html.style.fontSize = `${fontSize * 100}%`;
    }
  }, [fontSize]);

  useEffect(() => {
    const next = document.getElementById("__next");
    if (isDefined(next)) {
      if (isDyslexic) {
        next.classList.add("set-theme-font-dyslexic");
        next.classList.remove("set-theme-font-standard");
      } else {
        next.classList.add("set-theme-font-standard");
        next.classList.remove("set-theme-font-dyslexic");
      }
    }
  }, [isDyslexic]);

  /* DARK MODE */
  const prefersDarkMode = usePrefersDarkMode();

  useEffect(() => {
    setDarkMode(themeMode === ThemeMode.Auto ? prefersDarkMode : themeMode === ThemeMode.Dark);
  }, [prefersDarkMode, setDarkMode, themeMode]);

  useEffect(() => {
    const next = document.getElementById("__next");
    if (isDefined(next)) {
      if (isDarkMode) {
        next.classList.add("set-theme-dark");
        next.classList.remove("set-theme-light");
      } else {
        next.classList.add("set-theme-light");
        next.classList.remove("set-theme-dark");
      }
    }
  }, [isDarkMode]);

  /* PREFERRED LANGUAGES */

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
  }, [preferredLanguages, router, setPreferredLanguages]);
};
