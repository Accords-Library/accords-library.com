type ChipProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Chip(props: ChipProps): JSX.Element {
  return (
    <div
      className={`grid place-content-center place-items-center text-xs pb-[0.14rem] px-1.5 border-[1px] rounded-full opacity-70 transition-[color,_opacity,border-color] ${props.className} `}
    >
      {props.children}
    </div>
  );
}
