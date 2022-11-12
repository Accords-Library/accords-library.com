import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { localData } from "contexts/localData";
import { containerQueries } from "contexts/containerQueries";
import { atomPairing } from "helpers/atoms";
import { settings } from "contexts/settings";
import { UploadImageFragment } from "graphql/generated";

/*
 * I'm getting a weird error if I put those atoms in appLayout.ts
 * So I'm putting the atoms here. Sucks, I know.
 */

/* [ LIGHTBOX ] */

export const lightBox = atomPairing(
  atom<{
    showLightBox: (
      images: (UploadImageFragment | string | null | undefined)[],
      index?: number
    ) => void;
  }>({ showLightBox: () => null })
);

/* [ APPLAYOUT ATOMS ] */

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
  lightBox: lightBox[0],
  containerQueries,
};
