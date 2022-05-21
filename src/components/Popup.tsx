import { useAppLayout } from "contexts/AppLayoutContext";
import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import Hotkeys from "react-hot-keys";

interface Props {
  setState:
    | Dispatch<SetStateAction<boolean | undefined>>
    | Dispatch<SetStateAction<boolean>>;
  state?: boolean;
  children: React.ReactNode;
  fillViewport?: boolean;
  hideBackground?: boolean;
  padding?: boolean;
}

export function Popup(props: Immutable<Props>): JSX.Element {
  const {
    setState,
    state,
    children,
    fillViewport,
    hideBackground,
    padding = true,
  } = props;

  const appLayout = useAppLayout();

  useEffect(() => {
    appLayout.setMenuGestures(!state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Hotkeys
      keyName="escape"
      allowRepeat
      onKeyDown={() => {
        setState(false);
      }}
    >
      <div
        className={`fixed inset-0 z-50 grid place-content-center
      transition-[backdrop-filter] duration-500 ${
        state ? "[backdrop-filter:blur(2px)]" : "pointer-events-none touch-none"
      }`}
      >
        <div
          className={`fixed inset-0 bg-shade transition-all duration-500 ${
            state ? "bg-opacity-50" : "bg-opacity-0"
          }`}
          onClick={() => {
            setState(false);
          }}
        />

        <div
          className={`${
            padding && "p-10 mobile:p-6"
          } grid place-items-center gap-4 transition-transform ${
            state ? "scale-100" : "scale-0"
          } ${
            fillViewport
              ? "absolute inset-10"
              : "relative max-h-[80vh] overflow-y-auto mobile:w-[85vw]"
          } ${
            hideBackground ? "" : "rounded-lg bg-light shadow-2xl shadow-shade"
          }`}
        >
          {children}
        </div>
      </div>
    </Hotkeys>
  );
}
