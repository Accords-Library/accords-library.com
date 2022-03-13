import { MouseEventHandler } from "react";

type ChipProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Chip(props: ChipProps): JSX.Element {
  return (
    <div
      className={`grid relative place-content-center place-items-center text-xs pb-[0.14rem] px-1.5 border-[1px] rounded-full opacity-70 transition-[color,_opacity,_border-color] hover:opacity-100 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
