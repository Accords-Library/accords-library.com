import { Immutable } from "helpers/types";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Chip(props: Immutable<Props>): JSX.Element {
  return (
    <div
      className={`grid place-content-center place-items-center whitespace-nowrap rounded-full
      border-[1px] px-1.5 pb-[0.14rem] text-xs opacity-70
      transition-[color,_opacity,_border-color] hover:opacity-100 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
