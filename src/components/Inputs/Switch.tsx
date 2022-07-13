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

export const Switch = ({
  value,
  onClick,
  className,
  disabled = false,
}: Props): JSX.Element => (
  <div
    className={cJoin(
      "relative grid h-6 w-12 rounded-full border-2 border-mid transition-colors",
      cIf(disabled, "cursor-not-allowed", "cursor-pointer"),
      cIf(value, "border-none bg-mid shadow-inner-sm shadow-shade", "bg-light"),
      className
    )}
    onClick={() => {
      if (!disabled) onClick();
    }}
  >
    <div
      className={cJoin(
        "absolute aspect-square rounded-full bg-dark transition-transform",
        cIf(
          value,
          "top-[2px] bottom-[2px] left-[2px] translate-x-[120%]",
          "top-0 bottom-0 left-0"
        )
      )}
    ></div>
  </div>
);
