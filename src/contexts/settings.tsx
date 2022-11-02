import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { useRouter } from "next/router";
import { useLayoutEffect, useEffect } from "react";
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