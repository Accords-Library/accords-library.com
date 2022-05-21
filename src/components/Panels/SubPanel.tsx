import { Immutable } from "helpers/types";

interface Props {
  children: React.ReactNode;
}

export function SubPanel(props: Immutable<Props>): JSX.Element {
  return (
    <div className="grid gap-y-2 px-6 pt-10 pb-20 text-center desktop:py-8 desktop:px-10">
      {props.children}
    </div>
  );
}
