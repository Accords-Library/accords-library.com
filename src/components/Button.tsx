import Link from "next/link";

type ButtonProps = {
  className?: string;
  href?: string;
  children: React.ReactChild | React.ReactChild[];
};

export default function Button(props: ButtonProps): JSX.Element {
  const button = (
    <div
      className={`grid place-content-center place-items-center border-[1px] border-dark text-dark rounded-full cursor-pointer px-4 pt-[0.4rem] pb-[0.5rem] transition-all hover:text-light hover:bg-dark hover:drop-shadow-dark-lg active:bg-black active:drop-shadow-black-lg active:border-black ${props.className}`}
    >
      {props.children}
    </div>
  );

  const result = props.href ? (
    <Link href={props.href} passHref>
      {button}
    </Link>
  ) : (
    button
  );
  return result;
}
