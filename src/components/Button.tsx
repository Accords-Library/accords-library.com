type ButtonProps = {
  className?: string;
  children: React.ReactChild | React.ReactChild[];
};

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <div
      className={
        "grid place-content-center place-items-center border-[1px] border-dark text-dark rounded-full cursor-pointer px-4 py-2 transition-colors hover:text-light hover:bg-dark" +
        " " +
        props.className
      }
    >
      {props.children}
    </div>
  );
}
