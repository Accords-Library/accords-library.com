import { Immutable } from "helpers/types";

interface Props {
  label: string | null | undefined;
  input: JSX.Element;
  disabled?: boolean;
}

export function WithLabel(props: Immutable<Props>): JSX.Element {
  const { label, input, disabled } = props;
  return (
    <div
      className={`flex flex-row place-content-between place-items-center gap-2 ${
        disabled ? "text-dark brightness-150 contrast-75 grayscale" : ""
      }`}
    >
      {label && (
        <p className={`text-left ${label.length < 10 ? "flex-shrink-0" : ""}`}>
          {label}:
        </p>
      )}
      {input}
    </div>
  );
}
