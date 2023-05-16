import { cJoin } from "helpers/className";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  COMPONENT  ╰──────────────────────────────────────────
 */

interface Props {
  src: string;
  className?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ColoredSvg = ({ src, className }: Props): JSX.Element => (
  <div
    className={cJoin(
      `transition-colors ![mask-position:center] ![mask-repeat:no-repeat] ![mask-size:contain]`,
      className
    )}
    style={{ mask: `url('${src}')`, WebkitMask: `url('${src}')` }}
  />
);
