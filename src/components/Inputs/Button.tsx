import { MouseEventHandler, useCallback } from "react";
import { MaterialSymbol } from "material-symbols";
import { Link } from "./Link";
import { Ico } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  id?: string;
  className?: string;
  href?: string;
  active?: boolean;
  icon?: MaterialSymbol;
  text?: string | null | undefined;
  alwaysNewTab?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  draggable?: boolean;
  badgeNumber?: number;
  disabled?: boolean;
  size?: "normal" | "small";
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Button = ({
  draggable,
  id,
  onClick,
  onMouseUp,
  active = false,
  className,
  icon,
  text,
  href,
  alwaysNewTab = false,
  badgeNumber,
  disabled,
  size = "normal",
}: Props): JSX.Element => (
  <Link href={href} alwaysNewTab={alwaysNewTab} disabled={disabled}>
    <div className="relative">
      <div
        draggable={draggable}
        id={id}
        onClick={(event) => !disabled && onClick?.(event)}
        onMouseUp={onMouseUp}
        onFocus={(event) => event.target.blur()}
        className={cJoin(
          `group grid cursor-pointer select-none grid-flow-col place-content-center 
          place-items-center gap-2 rounded-full border border-dark 
          leading-none text-dark transition-all`,
          cIf(size === "small", "px-3 py-1 text-xs", "py-3 px-4"),
          cIf(active, "!border-black bg-black !text-light drop-shadow-lg shadow-black"),
          cIf(
            disabled,
            "cursor-not-allowed opacity-50 grayscale",
            cIf(
              !active,
              `shadow-shade hover:bg-dark hover:text-light hover:drop-shadow-lg
               active:hover:!border-black active:hover:bg-black active:hover:!text-light
               active:hover:drop-shadow-lg active:hover:shadow-black`
            )
          ),
          className
        )}>
        {isDefined(badgeNumber) && (
          <div
            className={cJoin(
              `absolute grid place-items-center rounded-full bg-dark
              font-bold text-light transition-opacity group-hover:opacity-0`,
              cIf(size === "small", "-top-2 -right-2 h-5 w-5", "-top-3 -right-2 h-8 w-8")
            )}>
            <p className="-translate-y-[0.05em]">{badgeNumber}</p>
          </div>
        )}
        {isDefinedAndNotEmpty(icon) && (
          <Ico
            className="![font-size:150%] ![line-height:0.66]"
            icon={icon}
            isFilled={active}
            opticalSize={size === "normal" ? 24 : 20}
            weight={size === "normal" ? 500 : 800}
          />
        )}
        {isDefinedAndNotEmpty(text) && <p className="-translate-y-[0.05em] text-center">{text}</p>}
      </div>
    </div>
  </Link>
);

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedButton = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "text">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });

  return <Button text={selectedTranslation?.text ?? fallback.text} {...otherProps} />;
};
