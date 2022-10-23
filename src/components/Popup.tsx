import { useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useAppLayout } from "contexts/AppLayoutContext";
import { cIf, cJoin } from "helpers/className";

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
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Popup = ({
  onCloseRequest,
  isVisible,
  children,
  fillViewport,
  hideBackground = false,
  padding = true,
}: Props): JSX.Element => {
  const { setMenuGestures } = useAppLayout();

  useHotkeys("escape", () => onCloseRequest?.(), {}, [onCloseRequest]);

  useEffect(() => {
    setMenuGestures(!isVisible);
  }, [setMenuGestures, isVisible]);

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
          cIf(fillViewport, "absolute inset-10", "relative max-h-[80vh] overflow-y-auto"),
          cIf(!hideBackground, "rounded-lg bg-light shadow-2xl shadow-shade")
        )}>
        {children}
      </div>
    </div>
  );
};
