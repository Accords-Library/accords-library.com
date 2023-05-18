import { convert } from "html-to-text";
import { sanitize } from "isomorphic-dompurify";
import { marked } from "marked";
import { filterDefined, isDefined, isDefinedAndNotEmpty } from "./asserts";

export const getDescription = (
  description: string | null | undefined,
  chipsGroups?: Record<string, (string | undefined)[]>
): string => {
  let result = "";

  for (const key in chipsGroups) {
    if (Object.hasOwn(chipsGroups, key)) {
      const chipsGroup = filterDefined(chipsGroups[key]);
      if (chipsGroup.length > 0) {
        result += `${key}: ${prettyChip(chipsGroup)}\n`;
      }
    }
  }

  if (isDefinedAndNotEmpty(description)) {
    if (result !== "") {
      result += "\n";
    }
    result += prettyMarkdown(description);
  }

  return result;
};

const block = (text: string) => `${text}\n\n`;
const escapeBlock = (text: string) => `${escape(text)}\n\n`;
const line = (text: string) => `${text}\n`;
const inline = (text: string) => text;
const newline = () => "\n";
const empty = () => "";

const TxtRenderer: marked.Renderer = {
  // Block elements
  code: escapeBlock,
  blockquote: block,
  html: empty,
  heading: block,
  hr: newline,
  list: (text) => block(text.trim()),
  listitem: line,
  checkbox: empty,
  paragraph: block,
  table: (header, body) => line(header + body),
  tablerow: (text) => line(text.trim()),
  tablecell: (text) => `${text} `,
  // Inline elements
  strong: inline,
  em: inline,
  codespan: inline,
  br: newline,
  del: inline,
  link: (_0, _1, text) => text,
  image: (_0, _1, text) => text,
  text: inline,
  // etc.
  options: {},
};

const prettyMarkdown = (markdown: string): string =>
  convert(sanitize(marked(markdown, { renderer: TxtRenderer }))).trim();

const prettyChip = (items: (string | undefined)[]): string =>
  items
    .filter((item) => isDefined(item))
    .map((item) => `(${item})`)
    .join(" ");
