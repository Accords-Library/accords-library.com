import Tippy, { TippyProps } from "@tippyjs/react";
import { cJoin } from "helpers/className";
import "tippy.js/animations/scale-subtle.css";

interface Props extends TippyProps {}

export function ToolTip(props: Props): JSX.Element {
  const newProps: Props = {
    className: cJoin("text-[80%]", props.className),
    delay: [150, 0],
    interactive: true,
    animation: "scale-subtle",
    ...props,
  };

  return (
    <Tippy {...newProps}>
      <div>{props.children}</div>
    </Tippy>
  );
}
