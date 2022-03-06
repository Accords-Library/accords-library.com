import { Dispatch, SetStateAction } from "react";

export type PopupProps = {
  setState: Dispatch<SetStateAction<boolean | undefined>>;
  state?: boolean;
  children: React.ReactNode;
};

export default function Popup(props: PopupProps): JSX.Element {
  return (
    <div
      className={`fixed inset-0 z-20 grid place-content-center ${
        props.state ? "" : "pointer-events-none touch-none"
      }`}
    >
      <div
        className={`fixed bg-shade inset-0 transition-all duration-500 ${
          props.state ? "bg-opacity-60" : "bg-opacity-0"
        }`}
        onClick={() => {
          props.setState(false);
        }}
      />
      <div
        className={`p-10 bg-light rounded-lg shadow-2xl shadow-shade grid gap-4 place-items-center transition-transform ${
          props.state ? "scale-100" : "scale-0"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}
