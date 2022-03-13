import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

export type PopupProps = {
  setState: Dispatch<SetStateAction<boolean | undefined>>;
  state?: boolean;
  children: React.ReactNode;
};

export default function Popup(props: PopupProps): JSX.Element {
  return (
    <div
      className={`fixed inset-0 z-50 grid place-content-center transition-[backdrop-filter] duration-500 ${
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
        className={`relative p-10 bg-light rounded-lg shadow-2xl shadow-shade grid gap-4 place-items-center transition-transform ${
          props.state ? "scale-100" : "scale-0"
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
