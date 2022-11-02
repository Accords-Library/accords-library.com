import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { localData } from "contexts/LocalDataProvider";
import { containerQueries } from "contexts/ContainerQueriesProvider";
import { atomPairing } from "helpers/atoms";
import { UploadImageFragment } from "graphql/generated";
import { ThemeMode } from "contexts/SettingsProvider";

/* [ LAYOUT ATOMS ] */

const mainPanelReduced = atomPairing(atomWithStorage("isMainPanelReduced", false));
const settingsOpened = atomPairing(atomWithStorage("isSettingsOpened", false));
const subPanelOpened = atomPairing(atomWithStorage("isSubPanelOpened", false));
const mainPanelOpened = atomPairing(atomWithStorage("isMainPanelOpened", false));
const menuGesturesEnabled = atomPairing(atomWithStorage("isMenuGesturesEnabled", false));
const terminalMode = atom((get) => get(settings.playerName[0]) === "root");

const layout = {
  mainPanelReduced,
  settingsOpened,
  subPanelOpened,
  mainPanelOpened,
  menuGesturesEnabled,
  terminalMode,
};

/* [ SETTINGS ATOMS ] */

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

/* [ LIGHTBOX ATOMS ] */

export const lightBox = atomPairing(
  atom<{
    showLightBox: (
      images: (UploadImageFragment | string | null | undefined)[],
      index?: number
    ) => void;
  }>({ showLightBox: () => null })
);

/* [ TERMINAL ATOMS ] */

const previousLines = atomPairing(atom<string[]>([]));
const previousCommands = atomPairing(atom<string[]>([]));

export const terminal = {
  previousLines,
  previousCommands,
};

export const atoms = {
  layout,
  terminal,
  localData,
  lightBox: lightBox[0],
  containerQueries,
  settings,
};
