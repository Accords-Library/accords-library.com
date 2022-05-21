import { Immutable } from "helpers/types";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface Props {
  id?: string;
  className?: string;
  href?: string;
  children: React.ReactNode;
  active?: boolean;
  locale?: string;
  target?: "_blank";
  onClick?: MouseEventHandler<HTMLDivElement>;
  draggable?: boolean;
  badgeNumber?: number;
}

export function Button(props: Immutable<Props>): JSX.Element {
  const {
    draggable,
    id,
    onClick,
    active,
    className,
    children,
    target,
    href,
    locale,
    badgeNumber,
  } = props;
  const router = useRouter();

  const button = (
    <div
      draggable={draggable}
      id={id}
      onClick={onClick}
      className={`--opacityBadge:100 grid select-none place-content-center
      place-items-center rounded-full border-[1px] border-dark px-4 pt-[0.4rem]
      pb-[0.5rem] text-dark transition-all hover:[--opacityBadge:0] ${className} ${
        active
          ? "cursor-not-allowed !border-black bg-black text-light drop-shadow-black-lg"
          : `cursor-pointer hover:bg-dark hover:text-light hover:drop-shadow-shade-lg
          active:border-black active:bg-black active:text-light active:drop-shadow-black-lg`
      }`}
    >
      {badgeNumber && (
        <div
          className="absolute -top-3 -right-2 grid h-8 w-8 place-items-center rounded-full bg-dark
          font-bold text-light opacity-[var(--opacityBadge)] transition-opacity"
        >
          {badgeNumber}
        </div>
      )}
      {children}
    </div>
  );

  if (target) {
    return (
      <a href={href} target={target} rel="noreferrer">
        <div className="relative">{button}</div>
      </a>
    );
  }

  return (
    <div
      className="relative"
      onClick={() => {
        if (href || locale)
          router.push(href ?? router.asPath, href, {
            locale: locale,
          });
      }}
    >
      {button}
    </div>
  );
}
