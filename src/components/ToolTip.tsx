import { useEffect, useState } from "react";

type ToolTipProps = {
  hovered: boolean;
  children: React.ReactNode;
  direction: "right" | "bottom" | "top" | "left";
  offset: string;
  delayShow?: number;
  maxWidth?: "max-w-[10rem]" | "max-w-xs" | "max-w-sm" | "max-w-md";
};

export default function ToolTip(props: ToolTipProps): JSX.Element {
  const { children, hovered, direction, offset } = props;
  let { delayShow, maxWidth } = props;
  if (delayShow === undefined) delayShow = 300;
  if (maxWidth === undefined) maxWidth = "max-w-sm";

  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {});
    if (hovered) {
      timeout = setTimeout(() => hovered && setShow(true), delayShow);
    } else {
      setShow(false);
    }
    return () => clearTimeout(timeout);
  }, [delayShow, hovered]);

  let tooltipCSS = "";
  let transformCSS = "";
  let arrowParentCSS = "";
  let arrowCSS = "";

  switch (direction) {
    case "left":
      tooltipCSS = "[justify-self:end] [align-self:center]";
      transformCSS = `translateX(-${offset})`;
      arrowParentCSS = "w-4 -right-4 top-0 bottom-0";
      arrowCSS = "border-l-light";
      break;

    case "right":
      tooltipCSS = "[justify-self:start] [align-self:center]";
      transformCSS = `translateX(${offset})`;
      arrowParentCSS = "w-4 -left-4 top-0 bottom-0";
      arrowCSS = "border-r-light";
      break;

    case "top":
      tooltipCSS = "[align-self:end]";
      transformCSS = `translateY(-${offset})`;
      arrowParentCSS = "h-4 -bottom-4 left-0 right-0";
      arrowCSS = "border-t-light";
      break;

    case "bottom":
      tooltipCSS = "[align-self:start]";
      transformCSS = `translateY(${offset})`;
      arrowParentCSS = "h-4 -top-4 left-0 right-0";
      arrowCSS = "border-b-light";
      break;
  }

  return (
    <div
      className={`fixed z-[100] drop-shadow-shade-xl transition-opacity ${maxWidth} ${
        show
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } ${tooltipCSS}`}
      style={{ transform: transformCSS }}
    >
      <div className={`absolute grid ${arrowParentCSS}`}>
        <div
          className={`w-0 h-0 border-8 border-[transparent] place-self-center ${arrowCSS}`}
        />
      </div>
      <div className="p-4 px-6 bg-light rounded-md">{children}</div>
    </div>
  );
}
