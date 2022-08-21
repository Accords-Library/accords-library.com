import { GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { InsetBox } from "components/InsetBox";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import {
  Enum_Componenttranslationschronologyitem_Status,
  GetChronologyItemsQuery,
  GetErasQuery,
} from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettySlug } from "helpers/formatters";
import {
  filterHasAttributes,
  getStatusDescription,
  isDefined,
  isDefinedAndNotEmpty,
} from "helpers/others";
import { getOpenGraph } from "helpers/openGraph";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { ToolTip } from "components/ToolTip";
import { Chip } from "components/Chip";
import { Ico, Icon } from "components/Ico";
import { AnchorShare } from "components/AnchorShare";
import { datePickerToDate } from "helpers/date";
import { TranslatedProps } from "helpers/types/TranslatedProps";
import { TranslatedNavOption } from "components/PanelComponents/NavOption";
import { useIntersectionList } from "hooks/useIntersectionList";
import { HorizontalLine } from "components/HorizontalLine";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps, AppLayoutRequired {
  chronologyItems: NonNullable<
    GetChronologyItemsQuery["chronologyItems"]
  >["data"];
  chronologyEras: NonNullable<GetErasQuery["chronologyEras"]>["data"];
}

const Chronology = ({
  chronologyItems,
  chronologyEras,
  langui,
  languages,
  ...otherProps
}: Props): JSX.Element => {
  const ids = useMemo(
    () =>
      filterHasAttributes(chronologyEras, ["attributes"] as const).map(
        (era) => era.attributes.slug
      ),
    [chronologyEras]
  );

  const currentIntersection = useIntersectionList(ids);

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <ReturnButton
          href="/wiki"
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Desktop}
        />

        <HorizontalLine />

        {filterHasAttributes(chronologyEras, ["attributes", "id"] as const).map(
          (era, index) => (
            <Fragment key={era.id}>
              <TranslatedNavOption
                translations={filterHasAttributes(era.attributes.title, [
                  "language.data.attributes.code",
                ] as const).map((translation) => ({
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
              />
            </Fragment>
          )
        )}
      </SubPanel>
    ),
    [chronologyEras, currentIntersection, langui]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel>
        <ReturnButton
          href="/wiki"
          title={langui.wiki}
          langui={langui}
          displayOn={ReturnButtonType.Mobile}
          className="mb-10"
        />

        {filterHasAttributes(chronologyEras, ["attributes"] as const).map(
          (era) => (
            <TranslatedChronologyEra
              key={era.attributes.slug}
              id={era.attributes.slug}
              translations={filterHasAttributes(era.attributes.title, [
                "language.data.attributes.code",
              ] as const).map((translation) => ({
                language: translation.language.data.attributes.code,
                title: translation.title,
                description: translation.description,
              }))}
              fallback={{ title: prettySlug(era.attributes.slug) }}
              chronologyItems={filterHasAttributes(chronologyItems, [
                "attributes",
              ] as const).filter(
                (item) =>
                  item.attributes.year >= era.attributes.starting_year &&
                  item.attributes.year < era.attributes.ending_year
              )}
              langui={langui}
              languages={languages}
            />
          )
        )}
      </ContentPanel>
    ),
    [chronologyEras, chronologyItems, languages, langui]
  );

  return (
    <AppLayout
      contentPanel={contentPanel}
      subPanel={subPanel}
      langui={langui}
      languages={languages}
      {...otherProps}
    />
  );
};
export default Chronology;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const chronologyItems = await sdk.getChronologyItems();
  const chronologyEras = await sdk.getEras();
  if (!chronologyItems.chronologyItems || !chronologyEras.chronologyEras)
    return { notFound: true };
  const appStaticProps = await getAppStaticProps(context);
  const props: Props = {
    ...appStaticProps,
    chronologyItems: chronologyItems.chronologyItems.data,
    chronologyEras: chronologyEras.chronologyEras.data,
    openGraph: getOpenGraph(
      appStaticProps.langui,
      appStaticProps.langui.chronology ?? "Chronology"
    ),
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
  langui: AppStaticProps["langui"];
  languages: AppStaticProps["languages"];
}

const ChronologyEra = ({
  id,
  title,
  description,
  chronologyItems,
  langui,
  languages,
}: ChronologyEraProps) => {
  const yearGroups = useMemo(() => {
    const memo: Props["chronologyItems"][] = [];
    let currentYear = -Infinity;
    filterHasAttributes(chronologyItems, ["attributes"] as const).forEach(
      (item) => {
        if (currentYear === item.attributes.year) {
          memo[memo.length - 1].push(item);
        } else {
          currentYear = item.attributes.year;
          memo.push([item]);
        }
      }
    );
    return memo;
  }, [chronologyItems]);

  return (
    <div id={id}>
      <InsetBox className="my-8 grid gap-4 text-center">
        <h2 className="flex place-content-center gap-3 text-2xl">
          {title}
          <AnchorShare id={id} langui={langui} />
        </h2>

        {isDefinedAndNotEmpty(description) && (
          <p className="whitespace-pre-line ">{description}</p>
        )}
      </InsetBox>
      <div>
        {yearGroups.map((item, index) => (
          <ChronologyYear
            key={index}
            items={item}
            langui={langui}
            languages={languages}
          />
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
}: TranslatedProps<
  Parameters<typeof ChronologyEra>[0],
  "description" | "title"
>): JSX.Element => {
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
  langui: AppStaticProps["langui"];
  languages: AppStaticProps["languages"];
}

const ChronologyYear = ({ items, langui, languages }: ChronologyYearProps) => (
  <div
    className="rounded-2xl target:my-4 target:bg-mid target:py-4"
    id={generateAnchor(items[0].attributes?.year)}
  >
    {filterHasAttributes(items, ["attributes.events"] as const).map(
      (item, index) => (
        <ChronologyDate
          key={index}
          langui={langui}
          languages={languages}
          date={{
            year: item.attributes.year,
            month: item.attributes.month,
            day: item.attributes.day,
            displayYear: index === 0,
            overwriteYear: item.attributes.displayed_date,
          }}
          events={item.attributes.events}
        />
      )
    )}
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
    NonNullable<
      NonNullable<Props["chronologyItems"]>[number]["attributes"]
    >["events"]
  >;
  langui: AppStaticProps["langui"];
  languages: AppStaticProps["languages"];
}

export const ChronologyDate = ({
  date,
  events,
  langui,
  languages,
}: ChronologyDateProps): JSX.Element => {
  const router = useRouter();
  return (
    <div
      className="grid grid-cols-[4em] grid-rows-[auto_1fr]
        gap-x-8 rounded-2xl py-4 px-8 target:my-4 target:bg-mid target:py-8"
      id={generateAnchor(date.year, date.month, date.day)}
    >
      {date.displayYear && (
        <p className="mt-5 text-right text-lg font-bold">
          {isDefinedAndNotEmpty(date.overwriteYear)
            ? date.overwriteYear
            : date.year}
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
        {filterHasAttributes(events, ["id", "translations"] as const).map(
          (event) => (
            <ChronologyEvent
              id={generateAnchor(date.year, date.month, date.day)}
              key={event.id}
              event={event}
              langui={langui}
              languages={languages}
            />
          )
        )}
      </div>
    </div>
  );
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

interface ChronologyEventProps {
  event: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<Props["chronologyItems"]>[number]["attributes"]
      >["events"]
    >[number]
  >;
  langui: AppStaticProps["langui"];
  languages: AppStaticProps["languages"];
  id: string;
}

export const ChronologyEvent = ({
  event,
  langui,
  languages,
  id,
}: ChronologyEventProps): JSX.Element => {
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: event.translations ?? [],
      languageExtractor: useCallback(
        (
          item: NonNullable<
            ChronologyEventProps["event"]["translations"]
          >[number]
        ) => item?.language?.data?.attributes?.code,
        []
      ),
      languages: languages,
    });

  return (
    <div>
      {selectedTranslation && (
        <>
          <div className="mr-2 flex place-items-center gap-x-2">
            <LanguageSwitcher
              {...languageSwitcherProps}
              size="small"
              showBadge={false}
            />

            {selectedTranslation.status !==
              Enum_Componenttranslationschronologyitem_Status.Done && (
              <ToolTip
                content={getStatusDescription(
                  selectedTranslation.status,
                  langui
                )}
                maxWidth={"20rem"}
              >
                <Chip text={selectedTranslation.status} />
              </ToolTip>
            )}

            <p className="mt-[0.2rem] grid grid-flow-col gap-1 place-self-start text-xs text-dark">
              {event.source?.data ? (
                `(${event.source.data.attributes?.name})`
              ) : (
                <div className="flex items-center gap-1">
                  <Ico icon={Icon.Warning} className="!text-sm" />
                  {langui.no_source_warning}
                </div>
              )}
            </p>

            <span className="flex-shrink">
              <AnchorShare id={id} langui={langui} />
            </span>
          </div>

          {selectedTranslation.title && (
            <div className="mt-1 flex place-content-start place-items-start gap-2">
              <h3 className="font-headers font-bold">
                {selectedTranslation.title}
              </h3>
            </div>
          )}

          {selectedTranslation.description && (
            <p className="whitespace-pre-line">
              {selectedTranslation.description}
            </p>
          )}

          {selectedTranslation.note && (
            <em>{`${langui.notes}: ${selectedTranslation.note}`}</em>
          )}
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
