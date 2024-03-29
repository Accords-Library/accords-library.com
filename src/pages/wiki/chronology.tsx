import { GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { InsetBox } from "components/Containers/InsetBox";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Containers/ContentPanel";
import { SubPanel } from "components/Containers/SubPanel";
import {
  Enum_Componenttranslationschronologyitem_Status,
  GetChronologyItemsQuery,
  GetErasQuery,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { prettySlug } from "helpers/formatters";
import { filterHasAttributes, isDefined, isDefinedAndNotEmpty } from "helpers/asserts";
import { getOpenGraph } from "helpers/openGraph";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { ToolTip } from "components/ToolTip";
import { Chip } from "components/Chip";
import { Ico } from "components/Ico";
import { AnchorShare } from "components/AnchorShare";
import { datePickerToDate } from "helpers/date";
import { TranslatedProps } from "types/TranslatedProps";
import { TranslatedNavOption } from "components/PanelComponents/NavOption";
import { useIntersectionList } from "hooks/useIntersectionList";
import { HorizontalLine } from "components/HorizontalLine";
import { useFormat } from "hooks/useFormat";
import { getFormat } from "helpers/i18n";
import { useAtomGetter, useAtomSetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  chronologyItems: NonNullable<GetChronologyItemsQuery["chronologyItems"]>["data"];
  chronologyEras: NonNullable<GetErasQuery["chronologyEras"]>["data"];
}

const Chronology = ({ chronologyItems, chronologyEras, ...otherProps }: Props): JSX.Element => {
  const { format } = useFormat();
  const setSubPanelOpened = useAtomSetter(atoms.layout.subPanelOpened);
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const closeSubPanel = useCallback(() => setSubPanelOpened(false), [setSubPanelOpened]);
  const ids = useMemo(
    () => filterHasAttributes(chronologyEras, ["attributes"]).map((era) => era.attributes.slug),
    [chronologyEras]
  );

  const currentIntersection = useIntersectionList(ids);

  const subPanel = (
    <SubPanel>
      {!is1ColumnLayout && <ReturnButton href="/wiki" title={format("wiki")} />}

      <HorizontalLine />

      {filterHasAttributes(chronologyEras, ["attributes", "id"]).map((era, index) => (
        <Fragment key={era.id}>
          <TranslatedNavOption
            translations={filterHasAttributes(era.attributes.title, [
              "language.data.attributes.code",
            ]).map((translation) => ({
              language: translation.language.data.attributes.code,
              title: translation.title,
              subtitle: `${era.attributes.starting_year} → ${era.attributes.ending_year}`,
            }))}
            fallback={{
              title: prettySlug(era.attributes.slug),
              subtitle: `${era.attributes.starting_year} → ${era.attributes.ending_year}`,
            }}
            url={`#${era.attributes.slug}`}
            border
            active={currentIntersection === index}
            onClick={closeSubPanel}
          />
        </Fragment>
      ))}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      {is1ColumnLayout && <ReturnButton href="/wiki" title={format("wiki")} className="mb-10" />}

      {filterHasAttributes(chronologyEras, ["attributes"]).map((era) => (
        <TranslatedChronologyEra
          key={era.attributes.slug}
          id={era.attributes.slug}
          translations={filterHasAttributes(era.attributes.title, [
            "language.data.attributes.code",
          ]).map((translation) => ({
            language: translation.language.data.attributes.code,
            title: translation.title,
            description: translation.description,
          }))}
          fallback={{ title: prettySlug(era.attributes.slug) }}
          chronologyItems={filterHasAttributes(chronologyItems, ["attributes"]).filter(
            (item) =>
              item.attributes.year >= era.attributes.starting_year &&
              item.attributes.year < era.attributes.ending_year
          )}
        />
      ))}
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} subPanel={subPanel} {...otherProps} />;
};
export default Chronology;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);
  const chronologyItems = await sdk.getChronologyItems();
  const chronologyEras = await sdk.getEras();
  if (!chronologyItems.chronologyItems || !chronologyEras.chronologyEras) return { notFound: true };

  const props: Props = {
    chronologyItems: chronologyItems.chronologyItems.data,
    chronologyEras: chronologyEras.chronologyEras.data,
    openGraph: getOpenGraph(format, format("chronology")),
  };
  return {
    props: props,
  };
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface ChronologyEraProps {
  id: string;
  title: string;
  description?: string | null | undefined;
  chronologyItems: Props["chronologyItems"];
}

const ChronologyEra = ({ id, title, description, chronologyItems }: ChronologyEraProps) => {
  const yearGroups = (() => {
    const memo: Props["chronologyItems"][] = [];
    let currentYear = -Infinity;
    filterHasAttributes(chronologyItems, ["attributes"]).forEach((item) => {
      if (currentYear === item.attributes.year) {
        memo[memo.length - 1]?.push(item);
      } else {
        currentYear = item.attributes.year;
        memo.push([item]);
      }
    });
    return memo;
  })();

  return (
    <div id={id}>
      <InsetBox className="my-8 grid gap-4 text-center">
        <h2 className="flex place-content-center gap-3 text-2xl">
          {title}
          <AnchorShare id={id} />
        </h2>

        {isDefinedAndNotEmpty(description) && <p className="whitespace-pre-line ">{description}</p>}
      </InsetBox>
      <div>
        {yearGroups.map((item, index) => (
          <ChronologyYear key={index} items={item} />
        ))}
      </div>
    </div>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const TranslatedChronologyEra = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Parameters<typeof ChronologyEra>[0], "description" | "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: (item: { language: string }): string => item.language,
  });

  return (
    <ChronologyEra
      title={selectedTranslation?.title ?? fallback.title}
      description={selectedTranslation?.description ?? fallback.description}
      {...otherProps}
    />
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ChronologyYearProps {
  items: NonNullable<Props["chronologyItems"]>;
}

const ChronologyYear = ({ items }: ChronologyYearProps) => (
  <div
    className="rounded-2xl target:my-4 target:bg-mid target:py-4"
    id={generateAnchor(items[0]?.attributes?.year)}>
    {filterHasAttributes(items, ["attributes.events"]).map((item, index) => (
      <ChronologyDate
        key={index}
        date={{
          year: item.attributes.year,
          month: item.attributes.month,
          day: item.attributes.day,
          displayYear: index === 0,
          overwriteYear: item.attributes.displayed_date,
        }}
        events={item.attributes.events}
      />
    ))}
  </div>
);

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ChronologyDateProps {
  date: {
    year: number;
    month: number | null | undefined;
    day: number | null | undefined;
    displayYear: boolean;
    overwriteYear?: string | null | undefined;
  };
  events: NonNullable<
    NonNullable<NonNullable<Props["chronologyItems"]>[number]["attributes"]>["events"]
  >;
}

export const ChronologyDate = ({ date, events }: ChronologyDateProps): JSX.Element => {
  const router = useRouter();
  return (
    <div
      className="grid grid-cols-[4em] grid-rows-[auto_1fr]
        gap-x-8 rounded-2xl px-8 py-4 target:my-4 target:bg-mid target:py-8"
      id={generateAnchor(date.year, date.month, date.day)}>
      {date.displayYear && (
        <p className="mt-5 text-right text-lg font-bold">
          {isDefinedAndNotEmpty(date.overwriteYear) ? date.overwriteYear : date.year}
        </p>
      )}

      <p className="col-start-1 text-right text-sm text-dark">
        {isDefined(date.month)
          ? isDefined(date.day)
            ? datePickerToDate({
                year: date.year,
                month: date.month,
                day: date.day,
              }).toLocaleDateString(router.locale, {
                month: "short",
                day: "numeric",
              })
            : datePickerToDate({
                year: date.year,
                month: date.month,
                day: date.day,
              }).toLocaleDateString(router.locale, {
                month: "short",
              })
          : ""}
      </p>

      <div className="col-start-2 row-span-2 row-start-1 grid gap-4">
        {filterHasAttributes(events, ["id", "translations"]).map((event) => (
          <ChronologyEvent
            id={generateAnchor(date.year, date.month, date.day)}
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </div>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ChronologyEventProps {
  event: NonNullable<
    NonNullable<
      NonNullable<NonNullable<Props["chronologyItems"]>[number]["attributes"]>["events"]
    >[number]
  >;

  id: string;
}

export const ChronologyEvent = ({ event, id }: ChronologyEventProps): JSX.Element => {
  const { format, formatStatusDescription } = useFormat();
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: event.translations ?? [],
    languageExtractor: useCallback(
      (item: NonNullable<ChronologyEventProps["event"]["translations"]>[number]) =>
        item?.language?.data?.attributes?.code,
      []
    ),
  });

  return (
    <div>
      {selectedTranslation && (
        <>
          <div className="mr-2 flex place-items-center gap-x-2">
            <LanguageSwitcher {...languageSwitcherProps} size="small" showBadge={false} />

            {selectedTranslation.status !==
              Enum_Componenttranslationschronologyitem_Status.Done && (
              <ToolTip
                content={formatStatusDescription(selectedTranslation.status)}
                maxWidth={"20rem"}>
                <Chip text={selectedTranslation.status} />
              </ToolTip>
            )}

            <p className="grid grid-flow-col gap-1 place-self-start text-xs leading-6 text-dark">
              {event.source?.data ? (
                `(${event.source.data.attributes?.name})`
              ) : (
                <div className="flex items-center gap-1">
                  <Ico icon="warning" className="!text-sm" />
                  {format("no_source_warning")}
                </div>
              )}
            </p>

            <span className="flex-shrink">
              <AnchorShare id={id} />
            </span>
          </div>

          {selectedTranslation.title && (
            <div className="mt-1 flex place-content-start place-items-start gap-2">
              <h3 className="font-headers font-bold">{selectedTranslation.title}</h3>
            </div>
          )}

          {selectedTranslation.description && (
            <p className="whitespace-pre-line">{selectedTranslation.description}</p>
          )}

          {selectedTranslation.note && <em>{`${format("notes")}: ${selectedTranslation.note}`}</em>}
        </>
      )}
    </div>
  );
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const generateAnchor = (
  year: number | undefined,
  month?: number | null | undefined,
  day?: number | null | undefined
): string => {
  let result = "";
  if (isDefined(year)) result += year;
  if (isDefined(month)) result += `-${month.toString().padStart(2, "0")}`;
  if (isDefined(day)) result += `-${day.toString().padStart(2, "0")}`;
  return result;
};
