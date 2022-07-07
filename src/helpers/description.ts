import { prettySlug } from "./formatters";
import { isDefined } from "./others";
import { Content } from "./types";
import { AppStaticProps } from "graphql/getAppStaticProps";

interface Description {
  langui: AppStaticProps["langui"];
  description?: string | null | undefined;
  type?: Content["type"];
  categories?: Content["categories"];
}

export const getDescription = ({
  langui,
  description: text,
  type,
  categories,
}: Description): string => {
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
};

const prettyMarkdown = (markdown: string): string =>
  markdown.replace(/[*]/gu, "").replace(/[_]/gu, "");

const prettyChip = (items: (string | undefined)[]): string =>
  items
    .filter((item) => isDefined(item))
    .map((item) => `(${item})`)
    .join(" ");
