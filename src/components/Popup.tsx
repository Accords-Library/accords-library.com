import { useAppLayout } from "contexts/AppLayoutContext";
import { cIf, cJoin } from "helpers/className";
import { Dispatch, SetStateAction, useEffect } from "react";
import Hotkeys from "react-hot-keys";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  setState:
    | Dispatch<SetStateAction<boolean | undefined>>
    | Dispatch<SetStateAction<boolean>>;
  state: boolean;
  children: React.ReactNode;
  fillViewport?: boolean;
  hideBackground?: boolean;
  padding?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Popup = ({
  setState,
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
    <Hotkeys
      keyName="escape"
      allowRepeat
      onKeyDown={() => {
        setState(false);
      }}
    >
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
          onClick={() => {
            setState(false);
          }}
        />

        <div
          className={cJoin(
            "grid place-items-center gap-4 transition-transform",
            cIf(padding, "p-10 mobile:p-6"),
            cIf(state, "scale-100", "scale-0"),
            cIf(
              fillViewport,
              "absolute inset-10",
              "relative max-h-[80vh] overflow-y-auto mobile:w-[85vw]"
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
