import { cJoin } from "helpers/className";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

interface Props {
  src: string;
  className?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ColoredSvg = ({ src, className }: Props): JSX.Element => (
  <div
    className={cJoin(
      `transition-colors ![mask-size:contain] ![mask-repeat:no-repeat] ![mask-position:center]`,
      className
    )}
    style={{ mask: `url('${src}')`, WebkitMask: `url('${src}')` }}
  />
);
