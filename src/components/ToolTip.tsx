import Tippy, { TippyProps } from "@tippyjs/react";
import "tippy.js/animations/scale-subtle.css";

interface Props extends TippyProps {}

export default function ToolTip(props: Props): JSX.Element {
  const newProps = { ...props };

  // Set defaults
  if (newProps.delay === undefined) newProps.delay = [150, 0];
  if (newProps.interactive === undefined) newProps.interactive = true;
  if (newProps.animation === undefined) newProps.animation = "scale-subtle";

  return (
    <Tippy className={`text-[80%] ${newProps.className}`} {...newProps}>
      <div>{props.children}</div>
    </Tippy>
  );
}
