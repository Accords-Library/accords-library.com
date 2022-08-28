export interface Wrapper {
  children: React.ReactNode;
}

interface ConditionalWrapperProps<T> {
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
}: ConditionalWrapperProps<T>): JSX.Element =>
  isWrapping ? <Wrapper {...wrapperProps}>{children}</Wrapper> : <>{children}</>;
