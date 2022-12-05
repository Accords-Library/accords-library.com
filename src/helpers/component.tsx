import { isDefined } from "./others";

export interface Wrapper {
  children: React.ReactNode;
}

interface ConditionalWrapperProps<T, U> {
  isWrapping: boolean;
  children: React.ReactNode;
  wrapper: (wrapperProps: T & Wrapper) => JSX.Element;
  wrapperProps: T;
  wrapperFalse?: (wrapperProps: U & Wrapper) => JSX.Element;
  wrapperFalseProps?: U;
}

export const ConditionalWrapper = <T, U>({
  isWrapping,
  children,
  wrapper: Wrapper,
  wrapperFalse: WrapperFalse,
  wrapperProps,
  wrapperFalseProps,
}: ConditionalWrapperProps<T, U>): JSX.Element =>
  isWrapping ? (
    <Wrapper {...wrapperProps}>{children}</Wrapper>
  ) : isDefined(WrapperFalse) && isDefined(wrapperFalseProps) ? (
    <WrapperFalse {...wrapperFalseProps}>{children}</WrapperFalse>
  ) : (
    <>{children}</>
  );
