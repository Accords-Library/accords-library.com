import { useRouter } from "next/router";
import { useEffect } from "react";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { atoms } from "contexts/atoms";
import { settings } from "contexts/UserSettingsProvider";
import { atomPairing, useAtomSetter } from "helpers/atoms";
import { useScrollIntoView } from "hooks/useScrollIntoView";

const mainPanelReduced = atomPairing(atomWithStorage("isMainPanelReduced", false));
const settingsOpened = atomPairing(atomWithStorage("isSettingsOpened", false));
const subPanelOpened = atomPairing(atomWithStorage("isSubPanelOpened", false));
const mainPanelOpened = atomPairing(atomWithStorage("isMainPanelOpened", false));
const menuGesturesEnabled = atomPairing(atomWithStorage("isMenuGesturesEnabled", false));
const terminalMode = atom((get) => get(settings.playerName[0]) === "root");

export const layout = {
  mainPanelReduced,
  settingsOpened,
  subPanelOpened,
  mainPanelOpened,
  menuGesturesEnabled,
  terminalMode,
};

export const AppLayoutProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const router = useRouter();

  const setSettingsOpened = useAtomSetter(atoms.layout.settingsOpened);
  const setMainPanelOpened = useAtomSetter(atoms.layout.mainPanelOpened);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      console.log("[Router Events] on routeChangeStart");
      setSettingsOpened(false);
      setMainPanelOpened(false);
      setSubPanelOpened(false);
    });

    router.events.on("hashChangeStart", () => {
      console.log("[Router Events] on hashChangeStart");
      setSubPanelOpened(false);
    });
  }, [router, setSettingsOpened, setMainPanelOpened, setSubPanelOpened]);

  useScrollIntoView();

  return <>{children}</>;
};
