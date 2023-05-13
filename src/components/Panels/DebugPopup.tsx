import { Popup } from "components/Containers/Popup";
import { Ico } from "components/Ico";
import { atoms } from "contexts/atoms";
import { sendAnalytics } from "helpers/analytics";
import { useAtomGetter, useAtomPair } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export const DebugPopup = (): JSX.Element => {
  const [isDebugMenuOpened, setDebugMenuOpened] = useAtomPair(atoms.layout.debugMenuOpened);

  const os = useAtomGetter(atoms.userAgent.os);
  const browser = useAtomGetter(atoms.userAgent.browser);
  const engine = useAtomGetter(atoms.userAgent.engine);
  const deviceType = useAtomGetter(atoms.userAgent.deviceType);

  const isPerfModeEnabled = useAtomGetter(atoms.settings.isPerfModeEnabled);
  const isPerfModeToggleable = useAtomGetter(atoms.settings.isPerfModeToggleable);
  const perfMode = useAtomGetter(atoms.settings.perfMode);

  return (
    <Popup
      isVisible={isDebugMenuOpened}
      onCloseRequest={() => {
        setDebugMenuOpened(false);
        sendAnalytics("Debug", "Close debug menu");
      }}>
      <h2 className="inline-flex place-items-center gap-2 text-2xl">
        <Ico icon="bug_report" isFilled />
        Debug Menu
      </h2>

      <h3>User Agent</h3>
      <div>
        <p>OS: {os}</p>
        <p>Device type: {deviceType ?? "undefined"}</p>
        <p>Browser: {browser}</p>
        <p>Engine: {engine}</p>
      </div>

      <h3>Settings</h3>
      <div>
        <p>Raw perf mode: {perfMode}</p>
        <p>Perf mode: {isPerfModeEnabled ? "true" : "false"}</p>
        <p>Perf mode toggleable: {isPerfModeToggleable ? "true" : "false"}</p>
      </div>
    </Popup>
  );
};
