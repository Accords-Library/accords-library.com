import { useCallback } from "react";
import Collapsible from "react-collapsible";
import { TranslatedChroniclePreview } from "./ChroniclePreview";
import { GetChroniclesChaptersQuery } from "graphql/generated";
import { filterHasAttributes } from "helpers/asserts";
import { prettyInlineTitle, prettySlug, sJoin } from "helpers/formatters";
import { compareDate } from "helpers/date";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { Button } from "components/Inputs/Button";

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
  open?: boolean;
  onTriggerClosing?: () => void;
  onOpening?: () => void;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const ChroniclesList = ({
  chronicles,
  currentSlug,
  title,
  open,
  onTriggerClosing,
  onOpening,
}: Props): JSX.Element => {
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);

  return (
    <div>
      <Collapsible
        open={open}
        accordionPosition={title}
        contentInnerClassName="grid gap-4 pt-4"
        onTriggerClosing={onTriggerClosing}
        onOpening={onOpening}
        easing="ease-in-out"
        transitionTime={400}
        lazyRender
        contentHiddenWhenClosed
        trigger={
          <div className="flex place-content-center place-items-center gap-4">
            <h2 className="text-center text-xl">{title}</h2>
            <Button icon={open ? "expand_less" : "expand_more"} active={open} size="small" />
          </div>
        }>
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
      </Collapsible>
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
