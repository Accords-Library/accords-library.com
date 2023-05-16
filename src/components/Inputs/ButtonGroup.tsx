import type { Placement } from "tippy.js";
import { Button } from "./Button";
import { ToolTip } from "components/ToolTip";
import { cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefined } from "helpers/asserts";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export interface ButtonGroupProps {
  className?: string;
  buttonsProps: (Parameters<typeof Button>[0] & {
    visible?: boolean;
    tooltip?: React.ReactNode | null | undefined;
    tooltipPlacement?: Placement;
  })[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ButtonGroup = ({ buttonsProps, className }: ButtonGroupProps): JSX.Element => (
  <FilteredButtonGroup
    buttonsProps={buttonsProps.filter((button) => button.visible !== false)}
    className={className}
  />
);

const FilteredButtonGroup = ({ buttonsProps, className }: ButtonGroupProps) => (
  <div className={cJoin("grid grid-flow-col", className)}>
    {buttonsProps.map((buttonProps, index) => (
      <ConditionalWrapper
        key={index}
        isWrapping={isDefined(buttonProps.tooltip)}
        wrapper={ToolTipWrapper}
        wrapperProps={{ text: buttonProps.tooltip ?? "", placement: buttonProps.tooltipPlacement }}>
        <Button
          {...buttonProps}
          className={
            index === 0
              ? "rounded-r-none border-r-0"
              : index === buttonsProps.length - 1
              ? "rounded-l-none"
              : "rounded-none border-r-0"
          }
        />
      </ConditionalWrapper>
    ))}
  </div>
);

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface ToolTipWrapperProps {
  text: React.ReactNode;
  placement?: Placement;
}

const ToolTipWrapper = ({ text, children, placement }: ToolTipWrapperProps & Wrapper) => (
  <ToolTip content={text} placement={placement}>
    <>{children}</>
  </ToolTip>
);
