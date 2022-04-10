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
}

export default function Button(props: Props): JSX.Element {
  const router = useRouter();

  const button = (
    <div
      draggable={props.draggable}
      id={props.id}
      onClick={props.onClick}
      className={`grid place-content-center place-items-center border-[1px] border-dark text-dark rounded-full px-4 pt-[0.4rem] pb-[0.5rem] transition-all select-none ${
        props.className
      } ${
        props.active
          ? "text-light bg-black drop-shadow-black-lg !border-black cursor-not-allowed"
          : "cursor-pointer hover:text-light hover:bg-dark hover:drop-shadow-shade-lg active:bg-black active:text-light active:drop-shadow-black-lg active:border-black"
      }`}
    >
      {props.children}
    </div>
  );

  if (props.target) {
    return (
      <a href={props.href} target={props.target} rel="noreferrer">
        <div>{button}</div>
      </a>
    );
  }

  return (
    <div
      onClick={() => {
        if (props.href || props.locale)
          router.push(props.href ?? router.asPath, props.href, {
            locale: props.locale,
          });
      }}
    >
      {button}
    </div>
  );
}
