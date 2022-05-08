import Chip from "components/Chip";
import Button from "components/Inputs/Button";
import { GetLibraryItemQuery } from "graphql/generated";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { useState } from "react";

interface Props {
  content: Exclude<
    Exclude<
      Exclude<
        GetLibraryItemQuery["libraryItems"],
        null | undefined
      >["data"][number]["attributes"],
      null | undefined
    >["contents"],
    null | undefined
  >["data"][number];
  parentSlug: string;
  langui: AppStaticProps["langui"];
}

export default function ContentLine(props: Props): JSX.Element {
  const { content, langui, parentSlug } = props;

  const [opened, setOpened] = useState(false);

  if (content.attributes) {
    return (
      <div
        className={`grid gap-2 px-4 rounded-lg ${
          opened && "bg-mid shadow-inner-sm shadow-shade h-auto py-3 my-2"
        }`}
      >
        <div className="grid gap-4 place-items-center grid-cols-[auto_auto_1fr_auto_12ch] thin:grid-cols-[auto_auto_1fr_auto]">
          <a>
            <h3 className="cursor-pointer" onClick={() => setOpened(!opened)}>
              {content.attributes.content?.data?.attributes?.titles?.[0]
                ? prettyinlineTitle(
                    content.attributes.content.data.attributes.titles[0]
                      ?.pre_title,
                    content.attributes.content.data.attributes.titles[0]?.title,
                    content.attributes.content.data.attributes.titles[0]
                      ?.subtitle
                  )
                : prettySlug(content.attributes.slug, props.parentSlug)}
            </h3>
          </a>
          <div className="flex flex-row flex-wrap gap-1">
            {content.attributes.content?.data?.attributes?.categories?.data.map(
              (category) => (
                <Chip key={category.id}>{category.attributes?.short}</Chip>
              )
            )}
          </div>
          <p className="border-b-2 h-4 w-full border-black border-dotted opacity-30"></p>
          <p>
            {content.attributes.range[0]?.__typename ===
            "ComponentRangePageRange"
              ? content.attributes.range[0].starting_page
              : ""}
          </p>
          {content.attributes.content?.data?.attributes?.type?.data
            ?.attributes && (
            <Chip className="justify-self-end thin:hidden">
              {content.attributes.content.data.attributes.type.data.attributes
                .titles &&
              content.attributes.content.data.attributes.type.data.attributes
                .titles.length > 0
                ? content.attributes.content.data.attributes.type.data
                    .attributes.titles[0]?.title
                : prettySlug(
                    content.attributes.content.data.attributes.type.data
                      .attributes.slug
                  )}
            </Chip>
          )}
        </div>
        <div
          className={`grid-flow-col place-content-start place-items-center gap-2 ${
            opened ? "grid" : "hidden"
          }`}
        >
          <span className="material-icons text-dark">
            subdirectory_arrow_right
          </span>

          {content.attributes.scan_set &&
            content.attributes.scan_set.length > 0 && (
              <Button
                href={`/library/${parentSlug}/scans#${content.attributes.slug}`}
              >
                {langui.view_scans}
              </Button>
            )}

          {content.attributes.content?.data && (
            <Button
              href={`/contents/${content.attributes.content.data.attributes?.slug}`}
            >
              {langui.open_content}
            </Button>
          )}

          {content.attributes.scan_set &&
          content.attributes.scan_set.length === 0 &&
          !content.attributes.content?.data
            ? "The content is not available"
            : ""}
        </div>
      </div>
    );
  }
  return <></>;
}
