export const cIf = (
  condition: boolean | string | null | undefined,
  ifTrueCss: string,
  ifFalseCss?: string
): string => (condition ? ifTrueCss : ifFalseCss ?? "");

export const cJoin = (...args: (string | undefined)[]): string =>
  args.filter((elem) => elem).join(" ");
