import { Immutable } from "helpers/types";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Chip(props: Immutable<Props>): JSX.Element {
  return (
    <div
      className={`grid place-content-center place-items-center text-xs pb-[0.14rem] whitespace-nowrap px-1.5 border-[1px] rounded-full opacity-70 transition-[color,_opacity,_border-color] hover:opacity-100 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
