export function cIf(
  condition: boolean | null | undefined | string,
  ifTrueCss: string,
  ifFalseCss?: string
) {
  return condition ? ifTrueCss : ifFalseCss ?? "";
}

export function cJoin(...args: (string | undefined)[]): string {
  return args.filter((elem) => elem).join(" ");
}
