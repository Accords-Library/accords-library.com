import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
  className?: string;
  disabled?: boolean;
}

export function Switch(props: Immutable<Props>): JSX.Element {
  const { state, setState, className, disabled } = props;
  return (
    <div
      className={`relative grid h-6 w-12 rounded-full border-2
      border-mid transition-colors ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className} ${
        state ? "border-none bg-mid shadow-inner-sm shadow-shade" : "bg-light"
      }`}
      onClick={() => {
        if (!disabled) setState(!state);
      }}
    >
      <div
        className={`absolute ${
          state ? "top-[2px] bottom-[2px] left-[2px]" : "top-0 bottom-0 left-0"
        }
        aspect-square rounded-full bg-dark transition-transform ${
          state && "translate-x-[120%]"
        }`}
      ></div>
    </div>
  );
}
