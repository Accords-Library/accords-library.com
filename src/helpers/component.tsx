export interface Wrapper {
  children: React.ReactNode;
}

interface Props<T> {
  isWrapping: boolean;
  children: React.ReactNode;
  wrapper: (wrapperProps: T & Wrapper) => JSX.Element;
  wrapperProps: T;
}

export const ConditionalWrapper = <T,>({
  isWrapping,
  children,
  wrapper: Wrapper,
  wrapperProps,
}: Props<T>): JSX.Element =>
  isWrapping ? (
    <Wrapper {...wrapperProps}>{children}</Wrapper>
  ) : (
    <>{children}</>
  );
