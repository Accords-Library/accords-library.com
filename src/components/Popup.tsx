import { useEffect } from "react";
import Hotkeys from "react-hot-keys";
import { useAppLayout } from "contexts/AppLayoutContext";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  onClose: () => void;
  state: boolean;
  children: React.ReactNode;
  fillViewport?: boolean;
  hideBackground?: boolean;
  padding?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Popup = ({
  onClose,
  state,
  children,
  fillViewport,
  hideBackground = false,
  padding = true,
}: Props): JSX.Element => {
  const { setMenuGestures } = useAppLayout();

  useEffect(() => {
    setMenuGestures(!state);
  }, [setMenuGestures, state]);

  return (
    <Hotkeys keyName="escape" allowRepeat onKeyDown={onClose}>
      <div
        className={cJoin(
          "fixed inset-0 z-50 grid place-content-center transition-[backdrop-filter] duration-500",
          cIf(
            state,
            "[backdrop-filter:blur(2px)]",
            "pointer-events-none touch-none"
          )
        )}
      >
        <div
          className={cJoin(
            "fixed inset-0 bg-shade transition-all duration-500",
            cIf(state, "bg-opacity-50", "bg-opacity-0")
          )}
          onClick={onClose}
        />

        <div
          className={cJoin(
            "grid place-items-center gap-4 transition-transform",
            cIf(padding, "p-10"),
            cIf(state, "scale-100", "scale-0"),
            cIf(
              fillViewport,
              "absolute inset-10",
              "relative max-h-[80vh] overflow-y-auto"
            ),
            cIf(!hideBackground, "rounded-lg bg-light shadow-2xl shadow-shade")
          )}
        >
          {children}
        </div>
      </div>
    </Hotkeys>
  );
};
