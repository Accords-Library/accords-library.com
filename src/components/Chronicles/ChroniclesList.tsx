import { useCallback } from "react";
import { useBoolean } from "usehooks-ts";
import { TranslatedChroniclePreview } from "./ChroniclePreview";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { filterHasAttributes } from "helpers/asserts";
import { prettyInlineTitle, prettySlug, sJoin } from "helpers/formatters";
import { Ico } from "components/Ico";
import { compareDate } from "helpers/date";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  chronicles: NonNullable<
    NonNullable<
      NonNullable<GetChroniclesChaptersQuery["chroniclesChapters"]>["data"][number]["attributes"]
    >["chronicles"]
  >["data"];
  currentSlug?: string;
  title: string;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const ChroniclesList = ({ chronicles, currentSlug, title }: Props): JSX.Element => {
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const { value: isOpen, toggle: toggleOpen } = useBoolean(
    chronicles.some((chronicle) => chronicle.attributes?.slug === currentSlug)
  );

  return (
    <div>
      <div className="grid place-content-center">
        <div className="grid cursor-pointer grid-cols-[1em_1fr] gap-4" onClick={toggleOpen}>
          <Ico className="!text-xl" icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"} />
          <p className="mb-4 font-headers text-xl">{title}</p>
        </div>
      </div>
      <div
        className="grid gap-4 overflow-hidden transition-height duration-500"
        style={{ maxHeight: isOpen ? `${8 * chronicles.length}rem` : 0 }}>
        {filterHasAttributes(chronicles, ["attributes.contents", "attributes.translations"])
          .sort((a, b) => compareDate(a.attributes.date_start, b.attributes.date_start))
          .map((chronicle) => (
            <div key={chronicle.id} id={`chronicle-${chronicle.attributes.slug}`}>
              {chronicle.attributes.translations.length === 0 &&
              chronicle.attributes.contents.data.length === 1
                ? filterHasAttributes(chronicle.attributes.contents.data, [
                    "attributes.translations",
                  ]).map((content, index) => (
                    <TranslatedChroniclePreview
                      key={index}
                      active={chronicle.attributes.slug === currentSlug}
                      date={chronicle.attributes.date_start}
                      translations={filterHasAttributes(content.attributes.translations, [
                        "language.data.attributes.code",
                      ]).map((translation) => ({
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
                      url={sJoin(
                        "/chronicles/",
                        chronicle.attributes.slug,
                        "/#chronicle-",
                        chronicle.attributes.slug
                      )}
                      onClick={() => setSubPanelOpened(false)}
                    />
                  ))
                : chronicle.attributes.translations.length > 0 && (
                    <TranslatedChroniclePreview
                      date={chronicle.attributes.date_start}
                      active={chronicle.attributes.slug === currentSlug}
                      translations={filterHasAttributes(chronicle.attributes.translations, [
                        "language.data.attributes.code",
                        "title",
                      ]).map((translation) => ({
                        title: translation.title,
                        language: translation.language.data.attributes.code,
                      }))}
                      fallback={{
                        title: prettySlug(chronicle.attributes.slug),
                      }}
                      url={sJoin(
                        "/chronicles/",
                        chronicle.attributes.slug,
                        "/#chronicle-",
                        chronicle.attributes.slug
                      )}
                    />
                  )}
            </div>
          ))}
      </div>
    </div>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedChroniclesList = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });

  return <ChroniclesList title={selectedTranslation?.title ?? fallback.title} {...otherProps} />;
};
