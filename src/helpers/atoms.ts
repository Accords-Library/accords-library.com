import { atom, PrimitiveAtom, Atom, WritableAtom, useAtom } from "jotai";
import { Dispatch, SetStateAction } from "react";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
type AtomPair<T> = [Atom<T>, WritableAtom<null, [newText: T], void>];

export const atomPairing = <T>(anAtom: PrimitiveAtom<T>): AtomPair<T> => {
  const getter = atom((get) => get(anAtom));
  const setter = atom(null, (_get, set, newText: T) => set(anAtom, newText));
  return [getter, setter];
};

export const useAtomSetter = <T>(atomPair: AtomPair<T>): Dispatch<SetStateAction<T>> => {
  const [, setter] = useAtom(atomPair[1]);
  return setter as Dispatch<SetStateAction<T>>;
};

export const useAtomGetter = <T>(atomPair: Atom<T> | AtomPair<T>): T => {
  const atomGet = Array.isArray(atomPair) ? atomPair[0] : atomPair;
  const [getter] = useAtom(atomGet);
  return getter;
};

export const useAtomPair = <T>(atomPair: AtomPair<T>): [T, Dispatch<SetStateAction<T>>] => [
  useAtomGetter(atomPair),
  useAtomSetter(atomPair),
];
