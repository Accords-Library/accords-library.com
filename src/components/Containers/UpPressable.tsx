import { MouseEventHandler, useState } from "react";
import { Link } from "components/Inputs/Link";
import { cIf, cJoin } from "helpers/className";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  noBackground?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const UpPressable = ({
  children,
  href,
  className,
  disabled = false,
  noBackground = false,
  onClick,
}: Props): JSX.Element => {
  const [isFocused, setFocused] = useState(false);
  const isPerfModeEnabled = useAtomGetter(atoms.settings.isPerfModeEnabled);

  return (
    <Link
      href={href}
      onFocusChanged={setFocused}
      onClick={onClick}
      className={cJoin(
        "transition-all duration-300 !shadow-shade",
        cIf(isPerfModeEnabled, "shadow-lg", "drop-shadow-lg"),
        cIf(!noBackground, "overflow-hidden rounded-md bg-highlight"),
        cIf(
          disabled,
          "cursor-not-allowed opacity-50 grayscale",
          cJoin(
            "cursor-pointer hover:scale-102",
            cIf(isPerfModeEnabled, "hover:shadow-xl", "hover:drop-shadow-xl"),
            cIf(isFocused, "hover:scale-105 hover:duration-100")
          )
        ),
        className
      )}
      disabled={disabled}>
      {children}
    </Link>
  );
};
