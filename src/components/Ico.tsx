import { MouseEventHandler } from "react";
import { MaterialSymbol } from "material-symbols";
import { cJoin } from "helpers/className";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement> | undefined;
  icon: MaterialSymbol;
  isFilled?: boolean;
  weight?: number;
  opticalSize?: number;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Ico = ({
  onClick,
  icon,
  className,
  isFilled = true,
  weight = 500,
  opticalSize = 24,
}: Props): JSX.Element => {
  const isDarkMode = useAtomGetter(atoms.settings.darkMode);
  return (
    <span
      onClick={onClick}
      className={cJoin(
        `material-symbols-rounded select-none
        [font-size:inherit] [line-height:inherit]`,
        className
      )}
      style={{
        fontVariationSettings: `'FILL' ${isFilled ? "1" : "0"}, 'wght' ${weight}, 'GRAD' ${
          isDarkMode ? "-25" : "0"
        }, 'opsz' ${opticalSize}`,
      }}>
      {icon}
    </span>
  );
};
