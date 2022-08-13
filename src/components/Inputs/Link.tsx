import router from "next/router";
import { MouseEventHandler, useState } from "react";
import { isDefined } from "helpers/others";

interface Props {
  href: string;
  className?: string;
  allowNewTab?: boolean;
  alwaysNewTab?: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Link = ({
  href,
  allowNewTab = true,
  alwaysNewTab = false,
  children,
  className,
  onClick,
}: Props): JSX.Element => {
  const [isValidClick, setIsValidClick] = useState(false);

  return (
    <div
      className={className}
      onMouseLeave={() => setIsValidClick(false)}
      onContextMenu={(event) => event.preventDefault()}
      onMouseDown={(event) => {
        event.preventDefault();
        setIsValidClick(true);
      }}
      onMouseUp={(event) => {
        if (isDefined(onClick)) {
          onClick(event);
        } else if (isValidClick && href) {
          if (event.button !== MouseButton.Right) {
            if (alwaysNewTab) {
              window.open(href, "_blank", "noopener");
            } else if (event.button === MouseButton.Left) {
              if (href.startsWith("#")) {
                router.replace(href);
              } else {
                router.push(href);
              }
            } else if (allowNewTab) {
              window.open(href, "_blank");
            }
          }
        }
      }}
    >
      {children}
    </div>
  );
};

enum MouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}