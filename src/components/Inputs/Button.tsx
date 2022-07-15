import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { Ico, Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";

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
  locale?: string;
  target?: "_blank";
  onClick?: MouseEventHandler<HTMLDivElement>;
  draggable?: boolean;
  badgeNumber?: number;
  size?: "normal" | "small";
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const Button = ({
  draggable,
  id,
  onClick,
  active,
  className,
  icon,
  text,
  target,
  href,
  locale,
  badgeNumber,
  size = "normal",
}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <ConditionalWrapper
      isWrapping={isDefined(target)}
      wrapperProps={{ href: href }}
      wrapper={LinkWrapper}
    >
      <div
        className="relative"
        onClick={() => {
          if (!isDefined(target) && (isDefined(href) || isDefined(locale))) {
            router.push(href ?? router.asPath, href, {
              locale: locale,
            });
          }
        }}
      >
        <div
          draggable={draggable}
          id={id}
          onClick={onClick}
          className={cJoin(
            `group grid cursor-pointer select-none grid-flow-col
            place-content-center place-items-center gap-2 rounded-full border-[1px] border-dark py-3 px-4
            leading-none text-dark transition-all`,
            cIf(
              active,
              "!border-black bg-black !text-light drop-shadow-black-lg",
              "hover:bg-dark hover:text-light hover:drop-shadow-shade-lg"
            ),
            cIf(size === "small", "px-3 py-1 text-xs"),
            className
          )}
        >
          {isDefined(badgeNumber) && (
            <div
              className={cJoin(
                `absolute -top-3 -right-2 grid h-8 w-8 place-items-center
              rounded-full bg-dark font-bold text-light transition-opacity group-hover:opacity-0`,
                cIf(size === "small", "-top-2 -right-2 h-5 w-5")
              )}
            >
              <p className="-translate-y-[0.05em]">{badgeNumber}</p>
            </div>
          )}
          {isDefinedAndNotEmpty(icon) && (
            <Ico className="[font-size:150%] [line-height:0.66]" icon={icon} />
          )}
          {isDefinedAndNotEmpty(text) && (
            <p className="-translate-y-[0.05em] text-center">{text}</p>
          )}
        </div>
      </div>
    </ConditionalWrapper>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface LinkWrapperProps {
  href?: string;
}

const LinkWrapper = ({ children, href }: LinkWrapperProps & Wrapper) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);
