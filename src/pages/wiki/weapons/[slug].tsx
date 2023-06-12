import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";
import { Fragment, useCallback, useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { getReadySdk } from "graphql/sdk";
import { filterDefined, filterHasAttributes, isDefinedAndNotEmpty } from "helpers/asserts";
import { getFormat } from "helpers/i18n";
import { getOpenGraph } from "helpers/openGraph";
import { ContentPanel } from "components/Containers/ContentPanel";
import { ReturnButton } from "components/PanelComponents/ReturnButton";
import { useFormat } from "hooks/useFormat";
import { SubPanel } from "components/Containers/SubPanel";
import { ThumbnailHeader } from "components/ThumbnailHeader";
import { getDefaultPreferredLanguages } from "helpers/locales";
import { prettySlug } from "helpers/formatters";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { Weapon, WeaponGroupPreview, WeaponStoryWithTranslations } from "types/types";
import { InsetBox } from "components/Containers/InsetBox";
import { Chip } from "components/Chip";
import { Markdawn } from "components/Markdown/Markdawn";
import { NavOption } from "components/PanelComponents/NavOption";
import { HorizontalLine } from "components/HorizontalLine";
import { useIntersectionList } from "hooks/useIntersectionList";
import { ElementsSeparator } from "helpers/component";
import { useAtomGetter } from "helpers/atoms";
import { atoms } from "contexts/atoms";
import { TranslatedPreviewCard } from "components/PreviewCard";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  weapon: Weapon;
  primaryName: string;
  aliases: string[];
}

interface WeaponPreviewProps {
  weapon: WeaponGroupPreview;
}

const WeaponPreview = ({ weapon }: WeaponPreviewProps): JSX.Element => (
  <TranslatedPreviewCard
    href={`/wiki/weapons/${weapon.slug}`}
    translations={filterHasAttributes(weapon.name, ["language.data.attributes.code"]).map(
      ({ name, language }) => ({
        language: language.data.attributes.code,
        title: name,
      })
    )}
    fallback={{ title: prettySlug(weapon.slug) }}
    thumbnail={weapon.thumbnail?.data?.attributes}
    thumbnailAspectRatio="1/1"
    thumbnailForceAspectRatio
    thumbnailFitMethod="contain"
    keepInfoVisible
    topChips={
      weapon.type?.data?.attributes?.slug
        ? [prettySlug(weapon.type.data.attributes.slug)]
        : undefined
    }
  />
);

const WeaponPage = ({ weapon, primaryName, aliases, ...otherProps }: Props): JSX.Element => {
  const { format, formatCategory, formatWeaponType } = useFormat();

  const intersectionIds = useMemo(
    () => filterDefined(weapon.stories).map(({ id }) => `story-${id}`),
    [weapon.stories]
  );
  const currentIntersection = useIntersectionList(intersectionIds);
  const is3ColumnsLayout = useAtomGetter(atoms.containerQueries.is3ColumnsLayout);

  const searchInput = (
    <ReturnButton
      key="return-button"
      href="/wiki/weapons"
      title={format("weapon", { count: Infinity })}
    />
  );

  const subPanel = (
    <SubPanel>
      <ElementsSeparator>
        {[
          is3ColumnsLayout && searchInput,

          <Fragment key="nav-options">
            {intersectionIds.map((id, index) => (
              <NavOption
                key={index}
                url={`#${id}`}
                title={`Story ${index + 1}`}
                subtitle={filterHasAttributes(weapon.stories?.[index]?.categories?.data, [
                  "attributes",
                ])
                  .map((category) => formatCategory(category.attributes.slug))
                  .join("・")}
                active={currentIntersection === index}
                border
              />
            ))}
          </Fragment>,

          weapon.weapon_group?.data?.attributes?.weapons?.data && (
            <>
              <h3>Weapon group</h3>
              <p className="mb-8">{`${
                weapon.weapon_group.data.attributes.weapons.data.length
              } other weapons part of the ${prettySlug(
                weapon.weapon_group.data.attributes.slug
              )}'s group`}</p>
              <div className="grid gap-8">
                {filterHasAttributes(weapon.weapon_group.data.attributes.weapons.data, [
                  "attributes",
                ]).map((groupWeapon) => (
                  <WeaponPreview key={groupWeapon.id} weapon={groupWeapon.attributes} />
                ))}
              </div>
            </>
          ),
        ]}
      </ElementsSeparator>
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      {!is3ColumnsLayout && <div className="mb-10">{searchInput}</div>}

      <ThumbnailHeader
        title={primaryName}
        subtitle={aliases.join("・")}
        type={
          weapon.type?.data?.attributes
            ? formatWeaponType(weapon.type.data.attributes.slug)
            : undefined
        }
        thumbnail={weapon.thumbnail?.data?.attributes}
      />

      <HorizontalLine className="mb-12" />

      <div className="grid gap-8">
        <ElementsSeparator>
          {filterHasAttributes(weapon.stories, ["translations"]).map((story, index) => (
            <WeaponStory
              key={story.id}
              id={intersectionIds[index]}
              story={story}
              storyNumber={index + 1}
            />
          ))}
        </ElementsSeparator>
      </div>
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} subPanel={subPanel} {...otherProps} />;
};
export default WeaponPage;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const { format } = getFormat(context.locale);
  const slug = context.params?.slug ? context.params.slug.toString() : "";
  const weaponResp = await sdk.getWeapon({ slug: slug });

  const weapon = weaponResp.weaponStories?.data[0]?.attributes;

  if (!weapon?.stories || !context.locale || !context.locales) {
    return { notFound: true };
  }

  const names = weapon.name;
  const preferredLanguages = getDefaultPreferredLanguages(context.locale, context.locales);

  const [primaryName, ...aliases] = getFilteredNames(names, preferredLanguages);

  const props: Props = {
    primaryName: primaryName ?? prettySlug(slug),
    aliases,
    // eslint-disable-next-line id-denylist
    weapon,
    openGraph: getOpenGraph(format, undefined, undefined, weapon.thumbnail?.data?.attributes),
  };

  return {
    props: props,
  };
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sdk = getReadySdk();
  const weapons = await sdk.getWeaponsSlugs();
  const paths: GetStaticPathsResult["paths"] = [];
  filterHasAttributes(weapons.weaponStories?.data, ["attributes"]).map((item) => {
    context.locales?.map((local) => {
      paths.push({
        params: { slug: item.attributes.slug },
        locale: local,
      });
    });
  });
  return {
    paths,
    fallback: "blocking",
  };
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface WeaponStoryProps {
  story: WeaponStoryWithTranslations;
  storyNumber: number;
  id?: string;
}

const WeaponStory = ({ story, storyNumber, id }: WeaponStoryProps): JSX.Element => {
  const { format, formatCategory } = useFormat();
  const [selectedTranslation, LanguageSwitcher, languageSwitcherProps] = useSmartLanguage({
    items: story.translations,
    languageExtractor: useCallback(
      (item: WeaponStoryProps["story"]["translations"][number]) =>
        item?.language?.data?.attributes?.code,
      []
    ),
  });

  if (!selectedTranslation) return <></>;

  return (
    <InsetBox id={id} className="formatted">
      <div className="flex place-content-center place-items-center gap-4">
        <h2 className="!mb-4 !mt-4">{format("story_x", { x: storyNumber })}</h2>
        {languageSwitcherProps.locales.size > 1 && <LanguageSwitcher {...languageSwitcherProps} />}
      </div>

      {story.categories && story.categories.data.length > 0 && (
        <div className="mb-12 flex flex-row flex-wrap place-content-center gap-2">
          {filterHasAttributes(story.categories.data, ["attributes"]).map((category) => (
            <Chip
              key={category.attributes.slug}
              text={formatCategory(category.attributes.slug, "full")}
            />
          ))}
        </div>
      )}

      {isDefinedAndNotEmpty(selectedTranslation.description) && (
        <div className="mb-8">
          <h3>{format("description")}</h3>
          {selectedTranslation.description}
        </div>
      )}
      <h3>{format("level_x", { x: 1 })}</h3>
      <Markdawn text={selectedTranslation.level_1 ?? "To be added"} />

      <h3>{format("level_x", { x: 2 })}</h3>
      <Markdawn text={selectedTranslation.level_2 ?? "To be added"} />

      <h3>{format("level_x", { x: 3 })}</h3>
      <Markdawn text={selectedTranslation.level_3 ?? "To be added"} />

      <h3>{format("level_x", { x: 4 })}</h3>
      <Markdawn text={selectedTranslation.level_4 ?? "To be added"} />
    </InsetBox>
  );
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

export const getFilteredNames = (
  names: Props["weapon"]["name"],
  preferredLanguages: string[]
): string[] => {
  for (const language of preferredLanguages) {
    const filteredNames = filterHasAttributes(names, ["name"]).filter(
      (name) => name.language?.data?.attributes?.code === language
    );
    if (filteredNames.length > 0) {
      return filteredNames.map((name) => name.name);
    }
  }
  return [];
};
