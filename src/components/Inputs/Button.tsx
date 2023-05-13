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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
  draggable?: boolean;
  badgeNumber?: number;
  disabled?: boolean;
  size?: "normal" | "small";
  type?: "button" | "reset" | "submit";
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
  type,
  size = "normal",
}: Props): JSX.Element => (
  <Link href={href} alwaysNewTab={alwaysNewTab} disabled={disabled}>
    <div className="relative">
      <button
        type={type}
        draggable={draggable}
        id={id}
        disabled={disabled}
        onClick={(event) => onClick?.(event)}
        onMouseUp={onMouseUp}
        onFocus={(event) => event.target.blur()}
        className={cJoin(
          `group grid w-full grid-flow-col place-content-center
          place-items-center gap-2 rounded-full border border-dark 
          leading-none text-dark transition-all disabled:cursor-not-allowed
          disabled:opacity-50 disabled:grayscale`,
          cIf(size === "small", "px-3 py-1 text-xs", "px-4 py-3"),
          cIf(active, "!border-black bg-black !text-light shadow-lg shadow-black"),
          cIf(
            !disabled && !active,
            `shadow-shade hover:bg-dark hover:text-light hover:shadow-lg hover:shadow-shade
             active:hover:!border-black active:hover:bg-black active:hover:!text-light
             active:hover:shadow-lg active:hover:shadow-black`
          ),
          className
        )}>
        {isDefined(badgeNumber) && (
          <div
            className={cJoin(
              `absolute grid place-items-center rounded-full bg-dark
              font-bold text-light transition-opacity group-hover:opacity-0`,
              cIf(size === "small", "-right-2 -top-2 h-5 w-5", "-right-2 -top-3 h-8 w-8")
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
      </button>
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
