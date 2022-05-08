import Tippy, { TippyProps } from "@tippyjs/react";
import "tippy.js/animations/scale-subtle.css";

interface Props extends TippyProps {}

export default function ToolTip(props: Props): JSX.Element {
  const newProps: Props = {
    delay: [150, 0],
    interactive: true,
    animation: "scale-subtle",
    ...props,
  };

  return (
    <Tippy className={`text-[80%] ${newProps.className}`} {...newProps}>
      <div>{props.children}</div>
    </Tippy>
  );
}
