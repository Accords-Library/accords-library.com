import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettySlug } from "./formatters";
import { isDefined } from "./others";
import { Content } from "./types";

interface Description {
  langui: AppStaticProps["langui"];
  description?: string | null | undefined;
  type?: Content["type"];
  categories?: Content["categories"];
}

export function getDescription(props: Description): string {
  const { langui, description: text, type, categories } = props;

  let description = "";

  // TEXT
  if (text) {
    description += prettyMarkdown(text);
    description += "\n\n";
  }

  // TYPE
  if (type?.data) {
    description += `${langui.type}: `;

    description += `(${
      type.data.attributes?.titles?.[0]?.title ??
      prettySlug(type.data.attributes?.slug)
    })`;

    description += "\n";
  }

  // CATEGORIES
  if (categories?.data && categories.data.length > 0) {
    description += `${langui.categories}: `;
    description += prettyChip(
      categories.data.map((category) => category.attributes?.short)
    );

    description += "\n";
  }

  return description;
}

function prettyMarkdown(markdown: string): string {
  return markdown.replace(/[*]/gu, "").replace(/[_]/gu, "");
}

function prettyChip(items: (string | undefined)[]): string {
  return items
    .filter((item) => isDefined(item))
    .map((item) => `(${item})`)
    .join(" ");
}
