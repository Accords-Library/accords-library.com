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
      className={`h-6 w-12 rounded-full border-2 border-mid grid
      transition-colors relative ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className} ${state ? "bg-mid" : "bg-light"}`}
      onClick={() => {
        if (!disabled) setState(!state);
      }}
    >
      <div
        className={`bg-dark aspect-square rounded-full absolute
        top-0 bottom-0 left-0 transition-transform ${
          state && "translate-x-[115%]"
        }`}
      ></div>
    </div>
  );
}
