import { ReactNode, useMemo } from "react";
import { HorizontalLine } from "components/HorizontalLine";
import { insertInBetweenArray } from "helpers/others";
import { isDefined } from "helpers/asserts";

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

interface ElementsSeparatorProps {
  children: React.ReactNode[];
  separator?: React.ReactNode;
  className?: string;
}

export const ElementsSeparator = ({
  children,
  className,
  separator = <HorizontalLine className={className} />,
}: ElementsSeparatorProps): JSX.Element => (
  <>{insertInBetweenArray(children.filter(Boolean), separator)}</>
);

interface FormatWithComponentProps {
  text: string;
  component: React.ReactNode;
}

export const formatWithComponentSplitter = " [SPLITTER] ";
export const FormatWithComponent = ({ text, component }: FormatWithComponentProps): JSX.Element => {
  const splittedText = useMemo<ReactNode[]>(() => {
    const result = text.split("[SPLITTER]");
    return result;
  }, [text]);

  console.log(splittedText);
  return <ElementsSeparator separator={component}>{splittedText}</ElementsSeparator>;
};
