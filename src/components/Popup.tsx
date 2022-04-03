import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface Props {
  setState:
    | Dispatch<SetStateAction<boolean | undefined>>
    | Dispatch<SetStateAction<boolean>>;
  state?: boolean;
  children: React.ReactNode;
  fillViewport?: boolean;
  hideBackground?: boolean;
}

export default function Popup(props: Props): JSX.Element {
  return (
    <div
      className={`fixed inset-0 z-50 grid place-content-center transition-[backdrop-filter] duration-500 ${
        props.state
          ? "[backdrop-filter:blur(2px)]"
          : "pointer-events-none touch-none"
      }`}
      onKeyUp={(event) => {
        if (event.key.match("Escape")) props.setState(false);
      }}
      tabIndex={0}
    >
      <div
        className={`fixed bg-shade inset-0 transition-all duration-500 ${
          props.state ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={() => {
          props.setState(false);
        }}
      />
      <div
        className={`p-10 grid gap-4 place-items-center transition-transform ${
          props.state ? "scale-100" : "scale-0"
        } ${props.fillViewport ? "absolute inset-10 top-20" : "relative"} ${
          props.hideBackground
            ? ""
            : "bg-light rounded-lg shadow-2xl shadow-shade"
        }`}
      >
        <Button
          className="!p-1 absolute -top-16 bg-light border-light border-4"
          onClick={() => props.setState(false)}
        >
          <span className="material-icons p-1">close</span>
        </Button>
        {props.children}
      </div>
    </div>
  );
}
