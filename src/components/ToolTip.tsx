import Tippy from "@tippyjs/react";
import type { TippyProps } from "@tippyjs/react";
import { cJoin } from "helpers/className";
import "tippy.js/animations/scale-subtle.css";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props extends TippyProps {}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ToolTip = ({
  className,
  delay = [150, 0],
  interactive = true,
  animation = "scale-subtle",
  children,
  ...otherProps
}: Props): JSX.Element => (
  <Tippy
    className={cJoin("text-sm", className)}
    delay={delay}
    interactive={interactive}
    animation={animation}
    {...otherProps}>
    <div>{children}</div>
  </Tippy>
);
