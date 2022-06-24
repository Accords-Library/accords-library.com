import { Ico, Icon } from "components/Ico";
import { cIf, cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";

import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";

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
}

export function Button(props: Props): JSX.Element {
  const {
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
  } = props;

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
          if (isDefined(href) || isDefined(locale)) {
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
            `group grid select-none grid-flow-col place-content-center
            place-items-center gap-2 rounded-full border-[1px] border-dark py-3 px-4 leading-none
            text-dark transition-all`,
            cIf(
              active,
              "!border-black bg-black !text-light drop-shadow-black-lg",
              "cursor-pointer hover:bg-dark hover:text-light hover:drop-shadow-shade-lg"
            ),
            className
          )}
        >
          {isDefined(badgeNumber) && (
            <div
              className="absolute -top-3 -right-2 grid h-8 w-8 place-items-center rounded-full
              bg-dark font-bold text-light transition-opacity group-hover:opacity-0"
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
}

interface LinkWrapperProps {
  href?: string;
}

function LinkWrapper(props: LinkWrapperProps & Wrapper) {
  const { children, href } = props;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
