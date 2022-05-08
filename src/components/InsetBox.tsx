import { Immutable } from "helpers/types";

interface Props {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export default function InsetBox(props: Immutable<Props>): JSX.Element {
  return (
    <div
      id={props.id}
      className={`w-full shadow-inner-sm shadow-shade bg-mid rounded-xl p-8 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
