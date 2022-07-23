import { GetChroniclesChaptersQuery } from "graphql/generated";
import { filterHasAttributes } from "helpers/others";
import { TranslatedChroniclePreview } from "components/Translated";
import { prettyInlineTitle, prettySlug } from "helpers/formatters";
import { Ico, Icon } from "components/Ico";
import { useBoolean } from "hooks/useBoolean";
import { compareDate } from "helpers/date";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  chronicles: NonNullable<
    NonNullable<
      NonNullable<
        GetChroniclesChaptersQuery["chroniclesChapters"]
      >["data"][number]["attributes"]
    >["chronicles"]
  >["data"];
  currentSlug?: string;
  title: string;
}

export const ChroniclesList = ({
  chronicles,
  currentSlug,
  title,
}: Props): JSX.Element => {
  const { state: isOpen, toggleState: toggleOpen } = useBoolean(
    chronicles.some((chronicle) => chronicle.attributes?.slug === currentSlug)
  );

  return (
    <div>
      <div className="grid place-content-center">
        <div
          className="grid cursor-pointer grid-cols-[1em_1fr] gap-4"
          onClick={toggleOpen}
        >
          <Ico
            className="!text-xl"
            icon={isOpen ? Icon.ArrowDropUp : Icon.ArrowDropDown}
          />
          <p className="mb-4 font-headers text-xl">{title}</p>
        </div>
      </div>
      <div
        className="grid gap-4 overflow-hidden transition-[max-height] duration-500"
        style={{ maxHeight: isOpen ? `${8 * chronicles.length}rem` : 0 }}
      >
        {filterHasAttributes(chronicles, [
          "attributes.contents",
          "attributes.translations",
        ] as const)
          .sort((a, b) =>
            compareDate(a.attributes.date_start, b.attributes.date_start)
          )
          .map((chronicle) => (
            <div
              key={chronicle.id}
              id={`chronicle-${chronicle.attributes.slug}`}
              className="scroll-m-[45vh]"
            >
              {chronicle.attributes.translations.length === 0 &&
              chronicle.attributes.contents.data.length === 1
                ? filterHasAttributes(chronicle.attributes.contents.data, [
                    "attributes.translations",
                  ] as const).map((content, index) => (
                    <TranslatedChroniclePreview
                      key={index}
                      isActive={chronicle.attributes.slug === currentSlug}
                      date={chronicle.attributes.date_start}
                      translations={filterHasAttributes(
                        content.attributes.translations,
                        ["language.data.attributes.code"] as const
                      ).map((translation) => ({
                        title: prettyInlineTitle(
                          translation.pre_title,
                          translation.title,
                          translation.subtitle
                        ),
                        language: translation.language.data.attributes.code,
                      }))}
                      fallback={{
                        title: prettySlug(chronicle.attributes.slug),
                      }}
                      url={`/chronicles/${chronicle.attributes.slug}/#chronicle-${chronicle.attributes.slug}`}
                    />
                  ))
                : chronicle.attributes.translations.length > 0 && (
                    <TranslatedChroniclePreview
                      date={chronicle.attributes.date_start}
                      isActive={chronicle.attributes.slug === currentSlug}
                      translations={filterHasAttributes(
                        chronicle.attributes.translations,
                        ["language.data.attributes.code", "title"] as const
                      ).map((translation) => ({
                        title: translation.title,
                        language: translation.language.data.attributes.code,
                      }))}
                      fallback={{
                        title: prettySlug(chronicle.attributes.slug),
                      }}
                      url={`/chronicles/${chronicle.attributes.slug}/#chronicle-${chronicle.attributes.slug}`}
                    />
                  )}
            </div>
          ))}
      </div>
    </div>
  );
};
