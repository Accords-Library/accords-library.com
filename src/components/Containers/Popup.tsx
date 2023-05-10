import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { cIf, cJoin } from "helpers/className";
import { atoms } from "contexts/atoms";
import { useAtomSetter } from "helpers/atoms";
import { Button } from "components/Inputs/Button";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  onOpen?: () => void;
  onCloseRequest?: () => void;
  isVisible: boolean;
  children: React.ReactNode;
  fillViewport?: boolean;
  hideBackground?: boolean;
  padding?: boolean;
  withCloseButton?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Popup = ({
  onOpen,
  onCloseRequest,
  isVisible,
  children,
  fillViewport,
  hideBackground = false,
  padding = true,
  withCloseButton = true,
}: Props): JSX.Element => {
  const setMenuGesturesEnabled = useAtomSetter(atoms.layout.menuGesturesEnabled);
  const [isHidden, setHidden] = useState(!isVisible);
  const [isActuallyVisible, setActuallyVisible] = useState(isVisible && !isHidden);

  useHotkeys("escape", () => onCloseRequest?.(), { enabled: isVisible }, [onCloseRequest]);

  useEffect(() => {
    setMenuGesturesEnabled(!isVisible);
  }, [isVisible, setMenuGesturesEnabled]);

  // Used to unload the component if not visible
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    if (isVisible) {
      setHidden(false);
      // We delay the visiblity of the element so that the opening animation is played
      timeouts.push(
        setTimeout(() => {
          setActuallyVisible(true);
          onOpen?.();
        }, 100)
      );
    } else {
      setActuallyVisible(false);
      timeouts.push(setTimeout(() => setHidden(true), 600));
    }
    return () => timeouts.forEach(clearTimeout);
  }, [isVisible, onOpen]);

  return isHidden ? (
    <></>
  ) : (
    <div
      className={cJoin(
        "fixed inset-0 z-50 grid place-content-center transition-filter duration-500",
        cIf(isActuallyVisible, "backdrop-blur", "pointer-events-none touch-none")
      )}>
      <div
        className={cJoin(
          "fixed inset-0 transition-colors duration-500",
          cIf(isActuallyVisible, "bg-shade/50", "bg-shade/0")
        )}
        onClick={onCloseRequest}
      />

      <div
        className={cJoin(
          "grid place-items-center gap-4 transition-transform",
          cIf(padding, "p-10"),
          cIf(isActuallyVisible, "scale-100", "scale-0"),
          cIf(
            fillViewport,
            "absolute inset-10 content-start overflow-scroll",
            "relative max-h-[80vh] overflow-y-auto"
          ),
          cIf(!hideBackground, "rounded-lg bg-light shadow-2xl shadow-shade")
        )}>
        {withCloseButton && (
          <div className="absolute right-6 top-6">
            <Button icon="close" onClick={onCloseRequest} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
