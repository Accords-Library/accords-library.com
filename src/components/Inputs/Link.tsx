import router from "next/router";
import { PointerEventHandler, useState } from "react";
import { isDefined } from "helpers/others";

interface Props {
  href: string;
  className?: string;
  allowNewTab?: boolean;
  alwaysNewTab?: boolean;
  children: React.ReactNode;
  onClick?: PointerEventHandler<HTMLDivElement>;
  onFocusChanged?: (isFocused: boolean) => void;
  disabled?: boolean;
}

export const Link = ({
  href,
  allowNewTab = true,
  alwaysNewTab = false,
  disabled = false,
  children,
  className,
  onClick,
  onFocusChanged,
}: Props): JSX.Element => {
  const [isValidClick, setIsValidClick] = useState(false);

  return (
    <div
      className={className}
      onPointerLeave={() => {
        setIsValidClick(false);
        onFocusChanged?.(false);
      }}
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => {
        if (!disabled) {
          event.preventDefault();
          onFocusChanged?.(true);
          setIsValidClick(true);
        }
      }}
      onPointerUp={(event) => {
        onFocusChanged?.(false);
        if (!disabled) {
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
        }
      }}>
      {children}
    </div>
  );
};

enum MouseButton {
  Left = 0,
  Middle = 1,
  Right = 2,
}
