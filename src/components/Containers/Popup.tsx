import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { cIf, cJoin } from "helpers/className";
import { atoms } from "contexts/atoms";
import { useAtomSetter } from "helpers/atoms";
import { Button } from "components/Inputs/Button";
import { Icon } from "components/Ico";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
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
  onCloseRequest,
  isVisible,
  children,
  fillViewport,
  hideBackground = false,
  padding = true,
  withCloseButton = true,
}: Props): JSX.Element => {
  const setMenuGesturesEnabled = useAtomSetter(atoms.layout.menuGesturesEnabled);

  useHotkeys("escape", () => onCloseRequest?.(), { enabled: isVisible }, [onCloseRequest]);

  useEffect(() => {
    setMenuGesturesEnabled(!isVisible);
  }, [isVisible, setMenuGesturesEnabled]);

  return (
    <div
      className={cJoin(
        "fixed inset-0 z-50 grid place-content-center transition-filter duration-500",
        cIf(isVisible, "backdrop-blur", "pointer-events-none touch-none")
      )}>
      <div
        className={cJoin(
          "fixed inset-0 bg-shade transition-all duration-500",
          cIf(isVisible, "bg-opacity-50", "bg-opacity-0")
        )}
        onClick={onCloseRequest}
      />

      <div
        className={cJoin(
          "grid place-items-center gap-4 transition-transform",
          cIf(padding, "p-10"),
          cIf(isVisible, "scale-100", "scale-0"),
          cIf(
            fillViewport,
            "absolute inset-10 content-start overflow-scroll",
            "relative max-h-[80vh] overflow-y-auto"
          ),
          cIf(!hideBackground, "rounded-lg bg-light shadow-2xl shadow-shade")
        )}>
        {withCloseButton && (
          <div className="absolute right-6 top-6">
            <Button icon={Icon.Close} onClick={onCloseRequest} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
