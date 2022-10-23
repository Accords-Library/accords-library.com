import { useState } from "react";
import { cIf, cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  onClick: () => void;
  value: boolean;
  className?: string;
  disabled?: boolean;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Switch = ({ value, onClick, className, disabled = false }: Props): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={cJoin(
        `relative grid h-6 w-12 content-center rounded-full border-mid outline
        outline-1 -outline-offset-1 outline-mid transition-colors`,
        cIf(disabled, "cursor-not-allowed", "cursor-pointer"),
        cIf(
          value,
          "border-none bg-mid shadow-inner-sm shadow-shade outline-transparent",
          "bg-light"
        ),
        className
      )}
      onClick={() => {
        if (!disabled) onClick();
      }}
      onPointerDown={() => setIsFocused(true)}
      onPointerOut={() => setIsFocused(false)}
      onPointerLeave={() => setIsFocused(false)}
      onPointerUp={() => setIsFocused(false)}>
      <div
        className={cJoin(
          "ml-1 h-4 w-4 rounded-full bg-dark transition-transform",
          cIf(value, "translate-x-6"),
          cIf(isFocused, cIf(value, "translate-x-5", "translate-x-1"))
        )}
      />
    </div>
  );
};
