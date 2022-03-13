import Tippy, { TippyProps } from "@tippyjs/react";

interface ToolTipProps extends TippyProps {}

export default function ToolTip(props: ToolTipProps): JSX.Element {
  let newProps = { ...props };

  // Set defaults
  if (newProps.delay === undefined) newProps.delay = [150, 0];
  if (newProps.interactive === undefined) newProps.interactive = true;

  return (
    <Tippy {...newProps}>
      <div>{props.children}</div>
    </Tippy>
  );
}
