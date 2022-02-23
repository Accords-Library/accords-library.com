type InsetBoxProps = {
  className?: string;
  children: React.ReactChild | React.ReactChild[];
  id?: string;
};

export default function InsetBox(props: InsetBoxProps): JSX.Element {
  return (
    <div
      id={props.id}
      className={`w-full shadow-inner-sm shadow-shade dark:shadow-dark-shade bg-mid dark:bg-dark-mid rounded-xl p-8 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
