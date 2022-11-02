import { useRouter } from "next/router";
import { useEffect } from "react";
import { useScrollIntoView } from "hooks/useScrollIntoView";
import { useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

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
