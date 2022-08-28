import React, { MouseEventHandler, useCallback } from "react";
import { Link } from "./Link";
import { Ico, Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
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
  icon?: Icon;
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
  active,
  className,
  icon,
  text,
  href,
  alwaysNewTab = false,
  badgeNumber,
  disabled,
  size = "normal",
}: Props): JSX.Element => (
  <ConditionalWrapper
    isWrapping={isDefinedAndNotEmpty(href)}
    wrapperProps={{ href: href ?? "", alwaysNewTab }}
    wrapper={LinkWrapper}>
    <div className="relative">
      <div
        draggable={draggable}
        id={id}
        onClick={onClick}
        onMouseUp={onMouseUp}
        onFocus={(event) => event.target.blur()}
        className={cJoin(
          `group grid cursor-pointer select-none grid-flow-col place-content-center 
          place-items-center gap-2 rounded-full border-[1px] border-dark py-3 px-4
          leading-none text-dark transition-all`,
          cIf(
            active,
            "!border-black bg-black !text-light drop-shadow-black-lg",
            `hover:bg-dark hover:text-light hover:drop-shadow-shade-lg active:hover:!border-black
            active:hover:bg-black active:hover:!text-light active:hover:drop-shadow-black-lg`
          ),
          cIf(size === "small", "px-3 py-1 text-xs"),
          cIf(disabled, "cursor-not-allowed"),
          className
        )}>
        {isDefined(badgeNumber) && (
          <div
            className={cJoin(
              `absolute -top-3 -right-2 grid h-8 w-8 place-items-center rounded-full bg-dark
              font-bold text-light transition-opacity group-hover:opacity-0`,
              cIf(size === "small", "-top-2 -right-2 h-5 w-5")
            )}>
            <p className="-translate-y-[0.05em]">{badgeNumber}</p>
          </div>
        )}
        {isDefinedAndNotEmpty(icon) && (
          <Ico className="[font-size:150%] [line-height:0.66]" icon={icon} />
        )}
        {isDefinedAndNotEmpty(text) && <p className="-translate-y-[0.05em] text-center">{text}</p>}
      </div>
    </div>
  </ConditionalWrapper>
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

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface LinkWrapperProps {
  href: string;
  alwaysNewTab: boolean;
}

const LinkWrapper = ({ children, alwaysNewTab, href }: LinkWrapperProps & Wrapper) => (
  <Link href={href} alwaysNewTab={alwaysNewTab}>
    {children}
  </Link>
);
