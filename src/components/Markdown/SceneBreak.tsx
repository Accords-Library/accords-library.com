type ScenBreakProps = {
  className?: string;
};

export default function SceneBreak(props: ScenBreakProps): JSX.Element {
  return <div className={"h-0 text-center text-3xl text-dark mt-16 mb-20" + " " + props.className}>* * *</div>;
}
