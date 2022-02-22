import Link from "next/link";
import { MouseEventHandler } from "react";

type ButtonProps = {
  id?: string;
  className?: string;
  href?: string;
  children: React.ReactChild | React.ReactChild[];
  active?: boolean;
  locale?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function Button(props: ButtonProps): JSX.Element {
  const button = (
    <div
      id={props.id}
      onClick={props.onClick}
      className={`grid place-content-center place-items-center border-[1px] border-dark text-dark dark:text-dark-dark rounded-full px-4 pt-[0.4rem] pb-[0.5rem] transition-all  ${
        props.className
      } ${
        props.active
          ? "text-light dark:text-dark-light bg-black dark:bg-dark-black drop-shadow-black-lg dark:drop-shadow-dark-black-lg !border-black dark:!border-dark-black cursor-not-allowed"
          : "cursor-pointer hover:text-light dark:hover:text-dark-light hover:bg-dark dark:hover:bg-dark-dark hover:drop-shadow-shade-lg dark:hover:drop-shadow-dark-shade-lg active:bg-black dark:active:bg-dark-black active:drop-shadow-black-lg dark:active:drop-shadow-dark-black-lg active:border-black dark:active:border-dark-black"
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
