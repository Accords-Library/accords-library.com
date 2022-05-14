import { Immutable } from "helpers/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setState: Dispatch<SetStateAction<boolean>>;
  state: boolean;
  className?: string;
}

export function Switch(props: Immutable<Props>): JSX.Element {
  return (
    <div
      className={`h-6 w-12 rounded-full border-2 border-mid grid
      transition-colors relative cursor-pointer ${props.className} ${
        props.state ? "bg-mid" : "bg-light"
      }`}
      onClick={() => {
        props.setState(!props.state);
      }}
    >
      <div
        className={`bg-dark aspect-square rounded-full absolute
        top-0 bottom-0 left-0 transition-transform ${
          props.state && "translate-x-[115%]"
        }`}
      ></div>
    </div>
  );
}
