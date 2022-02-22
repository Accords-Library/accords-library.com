type HorizontalLineProps = {
  className?: string;
};

export default function HorizontalLine(
  props: HorizontalLineProps
): JSX.Element {
  return (
    <div
      className={`h-0 w-full my-8 border-t-[3px] border-dotted border-black dark:border-dark-black ${props.className}`}
    ></div>
  );
}
