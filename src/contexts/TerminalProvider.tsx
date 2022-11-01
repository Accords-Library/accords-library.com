import { atom } from "jotai";
import { atomPairing } from "helpers/atoms";

const previousLines = atomPairing(atom<string[]>([]));
const previousCommands = atomPairing(atom<string[]>([]));

export const terminal = {
  previousLines,
  previousCommands,
};
