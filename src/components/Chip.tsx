import { cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  text: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Chip = ({ className, text }: Props): JSX.Element => (
  <div
    className={cJoin(
      `grid place-content-center place-items-center whitespace-nowrap rounded-full border
      border-black/70 text-black/70 px-1.5 pb-[0.14rem] text-xs`,
      className
    )}>
    {text}
  </div>
);
