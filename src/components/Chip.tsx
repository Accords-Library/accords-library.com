type ChipProps = {
  className?: string;
  children: React.ReactChild | React.ReactChild[];
};

export default function Chip(props: ChipProps): JSX.Element {
  return (
    <div
      className={`grid place-content-center place-items-center text-xs pb-[0.14rem] px-1.5 border-[1px] rounded-full opacity-70 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
