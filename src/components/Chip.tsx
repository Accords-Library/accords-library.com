import { cJoin } from "helpers/className";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  children: React.ReactNode;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Chip = ({ className, children }: Props): JSX.Element => (
  <div
    className={cJoin(
      `grid place-content-center place-items-center whitespace-nowrap rounded-full
        border-[1px] px-1.5 pb-[0.14rem] text-xs opacity-70
        transition-[color,_opacity,_border-color] hover:opacity-100`,
      className
    )}
  >
    {children}
  </div>
);
