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

export default function Button(props: Immutable<Props>): JSX.Element {
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
      className={`grid place-content-center place-items-center border-[1px]
      border-dark text-dark rounded-full px-4 pt-[0.4rem] pb-[0.5rem]
      transition-all select-none hover:[--opacityBadge:0] --opacityBadge:100 ${className} ${
        active
          ? "text-light bg-black drop-shadow-black-lg !border-black cursor-not-allowed"
          : `cursor-pointer hover:text-light hover:bg-dark hover:drop-shadow-shade-lg
          active:bg-black active:text-light active:drop-shadow-black-lg active:border-black`
      }`}
    >
      {badgeNumber && (
        <div
          className="opacity-[var(--opacityBadge)] transition-opacity grid place-items-center
          absolute -top-3 -right-2 bg-dark w-8 h-8 text-light font-bold rounded-full"
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
