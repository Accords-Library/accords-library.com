type ChipProps = {
  className?: string;
  children: React.ReactChild | React.ReactChild[];
  "data-tip"?: string;
  "data-for"?: string;
  "data-html"?: boolean;
  "data-multiline"?: boolean;
};

export default function Chip(props: ChipProps): JSX.Element {
  return (
    <div
      className={`grid place-content-center place-items-center text-xs pb-[0.14rem] px-1.5 border-[1px] rounded-full opacity-70 transition-[color,_opacity,border-color] ${
        props.className
      } ${
        props["data-tip"] &&
        "hover:text-dark hover:border-dark hover:opacity-100"
      }`}
      data-tip={props["data-tip"]}
      data-for={props["data-for"]}
      data-html={props["data-html"]}
      data-multiline={props["data-multiline"]}
    >
      {props.children}
    </div>
  );
}
