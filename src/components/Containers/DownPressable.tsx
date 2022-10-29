import { MouseEventHandler, useState } from "react";
import { cJoin, cIf } from "helpers/className";
import { Link } from "components/Inputs/Link";
/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  border?: boolean;
  active?: boolean;
  disabled?: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
  onFocusChanged?: (isFocused: boolean) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const DownPressable = ({
  href,
  border = false,
  active = false,
  disabled = false,
  children,
  className,
  onFocusChanged,
  onClick,
}: Props): JSX.Element => {
  const [isFocused, setFocused] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onFocusChanged={(focus) => {
        setFocused(focus);
        onFocusChanged?.(focus);
      }}
      className={cJoin(
        `rounded-2xl p-4 transition-all`,
        cIf(border, "outline outline-2 -outline-offset-2 outline-mid"),
        cIf(active, "!bg-mid shadow-inner-sm outline-transparent shadow-shade"),
        cIf(
          disabled,
          "cursor-not-allowed select-none opacity-50 grayscale",
          cJoin(
            "cursor-pointer hover:bg-mid hover:shadow-inner-sm hover:shadow-shade",
            cIf(isFocused, "!shadow-inner !shadow-shade"),
            cIf(border, "hover:outline-transparent")
          )
        ),
        className
      )}
      disabled={disabled}>
      {children}
    </Link>
  );
};
