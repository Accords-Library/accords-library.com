import { Chip } from "components/Chip";
import { Ico, Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { GetLibraryItemQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";

import { useToggle } from "hooks/useToggle";
import { useState } from "react";

interface Props {
  content: NonNullable<
    NonNullable<
      NonNullable<
        GetLibraryItemQuery["libraryItems"]
      >["data"][number]["attributes"]
    >["contents"]
  >["data"][number];
  parentSlug: string;
  langui: AppStaticProps["langui"];
}

export function ContentLine(props: Props): JSX.Element {
  const { content, langui, parentSlug } = props;

  const [opened, setOpened] = useState(false);
  const toggleOpened = useToggle(setOpened);

  if (content.attributes) {
    return (
      <div
        className={`grid gap-2 rounded-lg px-4 ${
          opened && "my-2 h-auto bg-mid py-3 shadow-inner-sm shadow-shade"
        }`}
      >
        <div
          className="grid grid-cols-[auto_auto_1fr_auto_12ch] place-items-center
        gap-4 thin:grid-cols-[auto_auto_1fr_auto]"
        >
          <a>
            <h3 className="cursor-pointer" onClick={toggleOpened}>
              {content.attributes.content?.data?.attributes?.translations?.[0]
                ? prettyinlineTitle(
                    content.attributes.content.data.attributes.translations[0]
                      ?.pre_title,
                    content.attributes.content.data.attributes.translations[0]
                      ?.title,
                    content.attributes.content.data.attributes.translations[0]
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
          <p className="h-4 w-full border-b-2 border-dotted border-black opacity-30"></p>
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
          <Ico icon={Icon.SubdirectoryArrowRight} className="text-dark" />

          {content.attributes.scan_set &&
            content.attributes.scan_set.length > 0 && (
              <Button
                href={`/library/${parentSlug}/scans#${content.attributes.slug}`}
                text={langui.view_scans}
              />
            )}

          {content.attributes.content?.data && (
            <Button
              href={`/contents/${content.attributes.content.data.attributes?.slug}`}
              text={langui.open_content}
            />
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
