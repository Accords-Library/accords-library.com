import type { Placement } from "tippy.js";
import { Button } from "./Button";
import { ToolTip } from "components/ToolTip";
import { cIf, cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefined } from "helpers/asserts";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

type ButtonProps = Parameters<typeof Button>[0];

export interface ButtonGroupProps {
  className?: string;
  vertical?: boolean;
  size?: ButtonProps["size"];
  buttonsProps: (Omit<ButtonProps, "size"> & {
    visible?: boolean;
    tooltip?: React.ReactNode | null | undefined;
    tooltipPlacement?: Placement;
  })[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ButtonGroup = ({
  buttonsProps,
  className,
  vertical,
  size,
}: ButtonGroupProps): JSX.Element => (
  <FilteredButtonGroup
    buttonsProps={buttonsProps.filter((button) => button.visible !== false)}
    className={className}
    vertical={vertical}
    size={size}
  />
);

const FilteredButtonGroup = ({
  buttonsProps,
  className,
  vertical = false,
  size = "normal",
}: ButtonGroupProps) => {
  const firstClassName = cIf(
    vertical,
    cJoin("rounded-b-none border-b-0", cIf(size === "normal", "rounded-t-3xl", "rounded-t-xl")),
    "rounded-r-none border-r-0"
  );

  const lastClassName = cIf(
    vertical,
    cJoin("rounded-t-none border-t-0", cIf(size === "normal", "rounded-b-3xl", "rounded-b-xl")),
    "rounded-l-none border-l-0"
  );

  const middleClassName = cIf(vertical, "rounded-none border-y-0", "rounded-none border-x-0");

  return (
    <div className={cJoin("grid", cIf(!vertical, "grid-flow-col"), className)}>
      {buttonsProps.map((buttonProps, index) => (
        <ConditionalWrapper
          key={index}
          isWrapping={isDefined(buttonProps.tooltip)}
          wrapper={ToolTipWrapper}
          wrapperProps={{
            text: buttonProps.tooltip ?? "",
            placement: buttonProps.tooltipPlacement,
          }}>
          <Button
            {...buttonProps}
            size={size}
            className={cJoin(
              "relative",
              cIf(
                vertical && buttonProps.active && index < buttonsProps.length - 1,
                "shadow-black/60"
              ),
              cIf(buttonProps.active, "z-10", "z-0"),
              index === 0
                ? firstClassName
                : index === buttonsProps.length - 1
                ? lastClassName
                : middleClassName
            )}
          />
        </ConditionalWrapper>
      ))}
    </div>
  );
};

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
