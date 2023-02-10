import React, { MouseEventHandler } from "react";
import NextLink from "next/link";
import { ConditionalWrapper, Wrapper } from "helpers/component";
import { isDefinedAndNotEmpty } from "helpers/asserts";
import { cIf, cJoin } from "helpers/className";

interface Props {
  href: string | null | undefined;
  className?: string;
  alwaysNewTab?: boolean;
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  onFocusChanged?: (isFocused: boolean) => void;
  disabled?: boolean;
  linkStyled?: boolean;
}

export const Link = ({
  href,
  children,
  className,
  alwaysNewTab,
  disabled,
  linkStyled = false,
  onClick,
  onFocusChanged,
}: Props): JSX.Element => (
  <ConditionalWrapper
    isWrapping={isDefinedAndNotEmpty(href) && !disabled}
    wrapperProps={{
      href: href ?? "",
      alwaysNewTab,
      onClick,
      onFocusChanged,
      className: cJoin(
        cIf(
          linkStyled,
          `underline decoration-dark decoration-dotted underline-offset-2 transition-colors
          hover:text-dark`
        ),
        className
      ),
    }}
    wrapper={LinkWrapper}
    wrapperFalse={DisabledWrapper}
    wrapperFalseProps={{ className }}>
    {children}
  </ConditionalWrapper>
);

interface LinkWrapperProps {
  href: string;
  className?: string;
  alwaysNewTab?: boolean;
  onFocusChanged?: (isFocused: boolean) => void;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const LinkWrapper = ({
  children,
  className,
  onFocusChanged,
  onClick,
  alwaysNewTab = false,
  href,
}: LinkWrapperProps & Wrapper) => (
  <NextLink
    href={href}
    className={className}
    target={alwaysNewTab ? "_blank" : "_self"}
    replace={href.startsWith("#")}
    onClick={onClick}
    onMouseLeave={() => onFocusChanged?.(false)}
    onMouseDown={() => onFocusChanged?.(true)}
    onMouseUp={() => onFocusChanged?.(false)}>
    {children}
  </NextLink>
);

interface DisabledWrapperProps {
  className?: string;
}

const DisabledWrapper = ({ children, className }: DisabledWrapperProps & Wrapper) => (
  <div className={className}>{children}</div>
);
