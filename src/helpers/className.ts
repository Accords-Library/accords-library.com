export const cIf = (
  condition: boolean | string | null | undefined,
  ifTrueCss: string,
  ifFalseCss?: string
): string => removeWhitespace(condition ? ifTrueCss : ifFalseCss ?? "");

export const cJoin = (...args: (string | undefined)[]): string =>
  removeWhitespace(args.filter((elem) => elem).join(" "));

const removeWhitespace = (string: string): string => string.replaceAll(/\s+/gu, " ");
