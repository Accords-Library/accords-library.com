import { ToolTip } from "components/ToolTip";
import { cJoin } from "helpers/className";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefinedAndNotEmpty } from "helpers/others";
import { Button } from "./Button";

interface Props {
  className?: string;
  buttonsProps: (Parameters<typeof Button>[0] & {
    tooltip?: string | null | undefined;
  })[];
}

export function ButtonGroup(props: Props): JSX.Element {
  const { buttonsProps, className } = props;

  return (
    <div className={cJoin("grid grid-flow-col", className)}>
      {buttonsProps.map((buttonProps, index) => (
        <ConditionalWrapper
          key={index}
          isWrapping={isDefinedAndNotEmpty(buttonProps.tooltip)}
          wrapper={ToolTipWrapper}
          wrapperProps={{ text: buttonProps.tooltip ?? "" }}
        >
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
}

interface ToolTipWrapperProps {
  text: string;
}

function ToolTipWrapper(props: ToolTipWrapperProps & Wrapper) {
  const { text, children } = props;
  return (
    <ToolTip content={text}>
      <>{children}</>
    </ToolTip>
  );
}
