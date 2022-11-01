import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { useRouter } from "next/router";
import { useLayoutEffect, useEffect } from "react";
import { atoms } from "./atoms";
import { atomPairing, useAtomGetter, useAtomPair } from "helpers/atoms";
import { getDefaultPreferredLanguages } from "helpers/locales";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { usePrefersDarkMode } from "hooks/useMediaQuery";
import { SettingsPopup } from "components/Panels/SettingsPopup";

export enum ThemeMode {
  Dark = "dark",
  Auto = "auto",
  Light = "light",
}

const preferredLanguagesAtom = atomPairing(atomWithStorage<string[]>("preferredLanguages", []));
const themeModeAtom = atomPairing(atomWithStorage<ThemeMode>("themeMode", ThemeMode.Auto));
const darkModeAtom = atomPairing(atom(false));
const fontSizeAtom = atomPairing(atomWithStorage("fontSize", 1));
const dyslexicAtom = atomPairing(atomWithStorage("isDyslexic", false));
const currencyAtom = atomPairing(atomWithStorage("currency", "USD"));
const playerNameAtom = atomPairing(atomWithStorage("playerName", ""));

export const settings = {
  preferredLanguages: preferredLanguagesAtom,
  themeMode: themeModeAtom,
  darkMode: darkModeAtom,
  fontSize: fontSizeAtom,
  dyslexic: dyslexicAtom,
  currency: currencyAtom,
  playerName: playerNameAtom,
};

export const UserSettingsProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const router = useRouter();
  const [preferredLanguages, setPreferredLanguages] = useAtomPair(
    atoms.settings.preferredLanguages
  );
  const fontSize = useAtomGetter(atoms.settings.fontSize);
  const isDyslexic = useAtomGetter(atoms.settings.dyslexic);
  const [isDarkMode, setDarkMode] = useAtomPair(atoms.settings.darkMode);
  const themeMode = useAtomGetter(atoms.settings.themeMode);

  useLayoutEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (isDefined(html)) {
      html.style.fontSize = `${fontSize * 100}%`;
    }
  }, [fontSize]);

  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
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

  return (
    <>
      <SettingsPopup />
      {children}
    </>
  );
};
