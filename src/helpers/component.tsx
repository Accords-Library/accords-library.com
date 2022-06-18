export interface Wrapper {
  children: React.ReactNode;
}

export function ConditionalWrapper<T>(props: {
  isWrapping: boolean;
  children: React.ReactNode;
  wrapper: (wrapperProps: T & Wrapper) => JSX.Element;
  wrapperProps: T;
}): JSX.Element {
  const { isWrapping, children, wrapper: Wrapper, wrapperProps } = props;
  return isWrapping ? (
    <Wrapper {...wrapperProps}>{children}</Wrapper>
  ) : (
    <>{children}</>
  );
}
