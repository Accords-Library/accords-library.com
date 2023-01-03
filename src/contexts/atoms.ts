import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { localData } from "contexts/localData";
import { containerQueries } from "contexts/containerQueries";
import { atomPairing } from "helpers/atoms";
import { settings } from "contexts/settings";
import { lightBox } from "contexts/LightBoxProvider";

/*
 * I'm getting a weird error if I put those atoms in appLayout.ts
 * So I'm putting the atoms here. Sucks, I know.
 */

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
