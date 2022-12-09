import { Button } from "./Button";
import { ToolTip } from "components/ToolTip";
import { cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefinedAndNotEmpty } from "helpers/asserts";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  buttonsProps: (Parameters<typeof Button>[0] & {
    tooltip?: string | null | undefined;
  })[];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ButtonGroup = ({ buttonsProps, className }: Props): JSX.Element => (
  <div className={cJoin("grid grid-flow-col", className)}>
    {buttonsProps.map((buttonProps, index) => (
      <ConditionalWrapper
        key={index}
        isWrapping={isDefinedAndNotEmpty(buttonProps.tooltip)}
        wrapper={ToolTipWrapper}
        wrapperProps={{ text: buttonProps.tooltip ?? "" }}>
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
  text: string;
}

const ToolTipWrapper = ({ text, children }: ToolTipWrapperProps & Wrapper) => (
  <ToolTip content={text}>
    <>{children}</>
  </ToolTip>
);
