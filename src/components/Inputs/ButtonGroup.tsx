import { cJoin } from "helpers/className";
import { Immutable } from "helpers/types";
import { useLayoutEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ButtonGroup(props: Immutable<Props>): JSX.Element {
  const { children, className } = props;
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      const buttons = ref.current.querySelectorAll(".component-button");
      buttons.forEach((button, index) => {
        button.classList.remove("rounded-full");
        button.classList.remove("border-[1px]");
        if (index === 0) {
          button.classList.add("rounded-l-full");
          button.classList.add("border-l-[1px]");
        } else if (index === buttons.length - 1) {
          button.classList.add("rounded-r-full");
          button.classList.add("border-r-[1px]");
        } else {
          button.classList.add("rounded-none");
        }
        button.classList.add("border-y-[1px]");
      });
    }
  }, [children]);

  return (
    <div ref={ref} className={cJoin("grid grid-flow-col", className)}>
      {children}
    </div>
  );
}
