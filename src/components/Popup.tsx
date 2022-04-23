import { Dispatch, SetStateAction } from "react";

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
      className={`fixed inset-0 z-50 grid place-content-center
      transition-[backdrop-filter] duration-500 ${
        props.state
          ? "[backdrop-filter:blur(2px)]"
          : "pointer-events-none touch-none"
      }`}
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
        } ${
          props.fillViewport
            ? "absolute inset-10 top-20"
            : "relative max-h-[80vh] overflow-y-auto mobile:w-[85vw]"
        } ${
          props.hideBackground
            ? ""
            : "bg-light rounded-lg shadow-2xl shadow-shade"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}
