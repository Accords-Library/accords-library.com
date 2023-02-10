import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { containerQueries } from "contexts/containerQueries";
import { atomPairing } from "helpers/atoms";
import { settings } from "contexts/settings";
import { UploadImageFragment } from "graphql/generated";
import { Languages, Currencies, Langui } from "helpers/localData";

/* [ LOCAL DATA ATOMS ] */

const languages = atomPairing(atom<Languages>([]));
const currencies = atomPairing(atom<Currencies>([]));
const langui = atomPairing(atom<Langui>({}));
const fallbackLangui = atomPairing(atom<Langui>({}));

const localData = {
  languages: languages[0],
  currencies: currencies[0],
  langui: langui[0],
  fallbackLangui: fallbackLangui[0],
};

/* [ LIGHTBOX ATOMS ] */

const lightBoxAtom = atomPairing(
  atom<{
    showLightBox: (
      images: (UploadImageFragment | string | null | undefined)[],
      index?: number
    ) => void;
  }>({ showLightBox: () => null })
);

const lightBox = lightBoxAtom[0];

/* [ APPLAYOUT ATOMS ] */

const mainPanelReduced = atomPairing(atomWithStorage("isMainPanelReduced", false));
const searchOpened = atomPairing(atom(false));
const settingsOpened = atomPairing(atom(false));
const subPanelOpened = atomPairing(atom(false));
const mainPanelOpened = atomPairing(atom(false));
const menuGesturesEnabled = atomPairing(atomWithStorage("isMenuGesturesEnabled", false));
const terminalMode = atom((get) => get(settings.playerName[0]) === "root");

const layout = {
  searchOpened,
  mainPanelReduced,
  settingsOpened,
  subPanelOpened,
  mainPanelOpened,
  menuGesturesEnabled,
  terminalMode,
};

/* [ TERMINAL ATOMS ] */

const previousLines = atomPairing(atom<string[]>([]));
const previousCommands = atomPairing(atom<string[]>([]));

const terminal = {
  previousLines,
  previousCommands,
};

export const atoms = {
  settings,
  layout,
  terminal,
  localData,
  lightBox,
  containerQueries,
};

// Do not import outside of the "contexts" folder
export const internalAtoms = {
  lightBox: lightBoxAtom,
  localData: { languages, currencies, langui, fallbackLangui },
};
