import { convert } from "html-to-text";
import { sanitize } from "isomorphic-dompurify";
import { Renderer, marked } from "marked";
import { isDefinedAndNotEmpty } from "./asserts";

export const prettySlug = (slug?: string, parentSlug?: string): string => {
  let newSlug = slug;
  if (newSlug) {
    if (isDefinedAndNotEmpty(parentSlug) && newSlug.startsWith(parentSlug))
      newSlug = newSlug.substring(parentSlug.length + 1);
    newSlug = newSlug.replaceAll("-", " ");
    return capitalizeString(newSlug);
  }
  return "";
};

export const prettyInlineTitle = (
  pretitle: string | null | undefined,
  title: string | null | undefined,
  subtitle: string | null | undefined
): string => {
  let result = "";
  if (pretitle) result += `${pretitle}: `;
  result += title;
  if (subtitle) result += ` - ${subtitle}`;
  return result;
};

export const prettyShortenNumber = (number: number): string => {
  if (number > 1_000_000) {
    return `${(number / 1_000_000).toLocaleString(undefined, {
      maximumSignificantDigits: 3,
    })}M`;
  } else if (number > 1_000) {
    return `${(number / 1_000).toLocaleString(undefined, {
      maximumSignificantDigits: 2,
    })}K`;
  }
  return number.toLocaleString();
};

export const prettyDuration = (seconds: number): string => {
  let hours = 0;
  let minutes = 0;
  let remainingSeconds = seconds;
  while (remainingSeconds > 60) {
    minutes++;
    remainingSeconds -= 60;
  }
  while (minutes > 60) {
    hours++;
    minutes -= 60;
  }
  let result = "";
  if (hours) result += `${hours.toString().padStart(2, "0")}:`;
  result += `${minutes.toString().padStart(2, "0")}:`;
  result += Math.floor(remainingSeconds).toString().padStart(2, "0");
  return result;
};

export const prettyURL = (url: string): string => {
  const domain = new URL(url);
  return domain.hostname.replace("www.", "");
};

const capitalizeString = (string: string): string => {
  const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.substring(1);

  let words = string.split(" ");
  words = words.map((word) => capitalizeWord(word));
  return words.join(" ");
};

export const slugify = (string: string | undefined): string => {
  if (!string) {
    return "";
  }
  return string
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/gu, "a")
    .replace(/[çÇ]/gu, "c")
    .replace(/[ðÐ]/gu, "d")
    .replace(/[ÈÉÊËéèêë]/gu, "e")
    .replace(/[ÏïÎîÍíÌì]/gu, "i")
    .replace(/[Ññ]/gu, "n")
    .replace(/[øØœŒÕõÔôÓóÒò]/gu, "o")
    .replace(/[ÜüÛûÚúÙù]/gu, "u")
    .replace(/[ŸÿÝý]/gu, "y")
    .toLowerCase()
    .replace(/[^a-z0-9- ]/gu, "")
    .trim()
    .replace(/ /gu, "-");
};

export const sJoin = (...args: (string | null | undefined)[]): string => args.join("");

export const prettyMarkdown = (markdown: string): string => {
  const block = (text: string) => `${text}\n\n`;
  const escapeBlock = (text: string) => `${escape(text)}\n\n`;
  const line = (text: string) => `${text}\n`;
  const inline = (text: string) => text;
  const newline = () => "\n";
  const empty = () => "";

  const TxtRenderer: Renderer = {
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

  return convert(sanitize(marked(markdown, { renderer: TxtRenderer }))).trim();
};
