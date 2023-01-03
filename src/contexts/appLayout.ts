import { useRouter } from "next/router";
import { useEffect } from "react";
import { useScrollIntoView } from "hooks/useScrollIntoView";
import { useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

export const useAppLayout = (): void => {
  const router = useRouter();

  const setSearchOpened = useAtomSetter(atoms.layout.searchOpened);
  const setSettingsOpened = useAtomSetter(atoms.layout.settingsOpened);
  const setMainPanelOpened = useAtomSetter(atoms.layout.mainPanelOpened);
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      console.log("[Router Events] on routeChangeStart");
      setSearchOpened(false);
      setSettingsOpened(false);
      setMainPanelOpened(false);
      setSubPanelOpened(false);
    });

    router.events.on("hashChangeStart", () => {
      console.log("[Router Events] on hashChangeStart");
      setSubPanelOpened(false);
    });
  }, [router, setSettingsOpened, setMainPanelOpened, setSubPanelOpened, setSearchOpened]);

  useScrollIntoView();
};
