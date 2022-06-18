import { cJoin } from "helpers/className";

interface Props {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

export function InsetBox(props: Props): JSX.Element {
  return (
    <div
      id={props.id}
      className={cJoin(
        "w-full rounded-xl bg-mid p-8 shadow-inner-sm shadow-shade",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
