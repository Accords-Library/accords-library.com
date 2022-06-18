import { cJoin } from "helpers/className";

interface Props {
  className?: string;
}

export function HorizontalLine(props: Props): JSX.Element {
  const { className } = props;
  return (
    <div
      className={cJoin(
        "my-8 h-0 w-full border-t-[3px] border-dotted border-black",
        className
      )}
    ></div>
  );
}
