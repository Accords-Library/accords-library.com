import { useState } from "react";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { filterHasAttributes } from "helpers/asserts";
import { TranslatedChroniclesList } from "components/Chronicles/ChroniclesList";
import { prettySlug } from "helpers/formatters";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  chapters: NonNullable<GetChroniclesChaptersQuery["chroniclesChapters"]>["data"];
  currentChronicleSlug?: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ChroniclesLists = ({ chapters, currentChronicleSlug }: Props): JSX.Element => {
  const [openedIndex, setOpenedIndex] = useState(
    currentChronicleSlug
      ? chapters.findIndex((chapter) =>
          chapter.attributes?.chronicles?.data.some(
            (chronicle) => chronicle.attributes?.slug === currentChronicleSlug
          )
        )
      : -1
  );

  return (
    <div className="grid gap-16">
      {filterHasAttributes(chapters, ["attributes.chronicles", "id"]).map(
        (chapter, chapterIndex) => (
          <TranslatedChroniclesList
            currentSlug={currentChronicleSlug}
            open={openedIndex === chapterIndex}
            onOpening={() => setOpenedIndex(chapterIndex)}
            onTriggerClosing={() => setOpenedIndex(-1)}
            key={chapter.id}
            chronicles={chapter.attributes.chronicles.data}
            translations={filterHasAttributes(chapter.attributes.titles, [
              "language.data.attributes.code",
            ]).map((translation) => ({
              title: translation.title,
              language: translation.language.data.attributes.code,
            }))}
            fallback={{ title: prettySlug(chapter.attributes.slug) }}
          />
        )
      )}
    </div>
  );
};
