import Link from "next/link";
import { MouseEventHandler } from "react";

type ButtonProps = {
  id?: string;
  className?: string;
  href?: string;
  children: React.ReactNode;
  active?: boolean;
  locale?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Button(props: ButtonProps): JSX.Element {
  const button = (
    <div
      id={props.id}
      onClick={props.onClick}
      className={`grid place-content-center place-items-center border-[1px] border-dark text-dark rounded-full px-4 pt-[0.4rem] pb-[0.5rem] transition-all  ${
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

  const result = props.href ? (
    <Link href={props.href} locale={props.locale} passHref>
      {button}
    </Link>
  ) : (
    button
  );
  return result;
}
