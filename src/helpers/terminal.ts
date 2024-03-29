import { isDefinedAndNotEmpty } from "./asserts";

export const prettyTerminalUnderlinedTitle = (string: string | null | undefined): string =>
  isDefinedAndNotEmpty(string)
    ? `\n\n${string}
${"‾".repeat(string.length)}
`
    : "";

export const prettyTerminalBoxedTitle = (string: string | null | undefined): string =>
  isDefinedAndNotEmpty(string)
    ? `╭${"─".repeat(string.length + 2)}╮
       │ ${string} │
       ╰${"─".repeat(string.length + 2)}╯`
    : "";
