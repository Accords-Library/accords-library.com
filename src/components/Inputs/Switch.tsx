import { cIf, cJoin } from "helpers/className";
import { Immutable } from "helpers/types";
import { useToggle } from "hooks/useToggle";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
  className?: string;
  disabled?: boolean;
}

export function Switch(props: Immutable<Props>): JSX.Element {
  const { state, setState, className, disabled } = props;
  const toggleState = useToggle(setState);
  return (
    <div
      className={cJoin(
        "relative grid h-6 w-12 rounded-full border-2 border-mid transition-colors",
        cIf(disabled, "cursor-not-allowed", "cursor-pointer"),
        cIf(
          state,
          "border-none bg-mid shadow-inner-sm shadow-shade",
          "bg-light"
        ),
        className
      )}
      onClick={() => {
        if (disabled === false) toggleState();
      }}
    >
      <div
        className={cJoin(
          "absolute aspect-square rounded-full bg-dark transition-transform",
          cIf(
            state,
            "top-[2px] bottom-[2px] left-[2px] translate-x-[120%]",
            "top-0 bottom-0 left-0"
          )
        )}
      ></div>
    </div>
  );
}
