import { useCallback, useRef, useState } from "react";
import { MaterialSymbol } from "material-symbols";
import { Popup } from "components/Containers/Popup";
import { sendAnalytics } from "helpers/analytics";
import { atoms } from "contexts/atoms";
import { useAtomPair, useAtomSetter } from "helpers/atoms";
import { TextInput } from "components/Inputs/TextInput";
import {
  containsHighlight,
  CustomSearchResponse,
  filterHitsWithHighlight,
  meiliMultiSearch,
} from "helpers/search";
import { PreviewCard, TranslatedPreviewCard } from "components/PreviewCard";
import { filterHasAttributes, isDefined } from "helpers/asserts";
import {
  MeiliContent,
  MeiliIndices,
  MeiliLibraryItem,
  MeiliPost,
  MeiliVideo,
  MeiliWeapon,
  MeiliWikiPage,
} from "shared/meilisearch-graphql-typings/meiliTypes";
import { getVideoThumbnailURL } from "helpers/videos";
import { UpPressable } from "components/Containers/UpPressable";
import { prettySlug } from "helpers/formatters";
import { Ico } from "components/Ico";
import { useFormat } from "hooks/useFormat";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const SEARCH_LIMIT = 8;

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  COMPONENT  ╰──────────────────────────────────────────
 */

interface MultiResult {
  libraryItems?: CustomSearchResponse<MeiliLibraryItem>;
  contents?: CustomSearchResponse<MeiliContent>;
  videos?: CustomSearchResponse<MeiliVideo>;
  posts?: CustomSearchResponse<MeiliPost>;
  wikiPages?: CustomSearchResponse<MeiliWikiPage>;
  weapons?: CustomSearchResponse<MeiliWeapon>;
}

export const SearchPopup = (): JSX.Element => {
  const [isSearchOpened, setSearchOpened] = useAtomPair(atoms.layout.searchOpened);
  const [query, setQuery] = useState("");
  const {
    format,
    formatCategory,
    formatContentType,
    formatWikiTag,
    formatLibraryItemSubType,
    formatWeaponType,
  } = useFormat();
  const [multiResult, setMultiResult] = useState<MultiResult>({});

  const fetchSearchResults = useCallback((q: string) => {
    const fetchMultiResult = async () => {
      const searchResults = (
        await meiliMultiSearch([
          {
            indexUid: MeiliIndices.LIBRARY_ITEM,
            q,
            limit: SEARCH_LIMIT,
            attributesToRetrieve: [
              "title",
              "subtitle",
              "descriptions",
              "id",
              "slug",
              "thumbnail",
              "release_date",
              "price",
              "categories",
              "metadata",
            ],
            attributesToHighlight: ["title", "subtitle", "descriptions"],
            attributesToCrop: ["descriptions"],
          },
          {
            indexUid: MeiliIndices.CONTENT,
            q,
            limit: SEARCH_LIMIT,
            attributesToRetrieve: ["translations", "id", "slug", "categories", "type", "thumbnail"],
            attributesToHighlight: ["translations"],
            attributesToCrop: ["translations.displayable_description"],
          },
          {
            indexUid: MeiliIndices.VIDEOS,
            q,
            limit: SEARCH_LIMIT,
            attributesToRetrieve: [
              "title",
              "channel",
              "uid",
              "published_date",
              "views",
              "duration",
              "description",
            ],
            attributesToHighlight: ["title", "channel", "description"],
            attributesToCrop: ["description"],
          },
          {
            indexUid: MeiliIndices.POST,
            q,
            limit: SEARCH_LIMIT,
            attributesToRetrieve: ["translations", "thumbnail", "slug", "date", "categories"],
            attributesToHighlight: ["translations.title", "translations.displayable_description"],
            attributesToCrop: ["translations.displayable_description"],
            filter: ["hidden = false"],
          },
          {
            indexUid: MeiliIndices.WEAPON,
            q,
            limit: SEARCH_LIMIT,
            attributesToHighlight: ["translations.description", "translations.names"],
            attributesToCrop: ["translations.description"],
            sort: ["slug:asc"],
          },
          {
            indexUid: MeiliIndices.WIKI_PAGE,
            q,
            limit: SEARCH_LIMIT,
            attributesToHighlight: [
              "translations.title",
              "translations.aliases",
              "translations.summary",
              "translations.displayable_description",
            ],
            attributesToCrop: ["translations.displayable_description"],
          },
        ])
      ).results;

      const result: MultiResult = {};

      searchResults.map((searchResult) => {
        switch (searchResult.indexUid) {
          case MeiliIndices.LIBRARY_ITEM: {
            result.libraryItems = filterHitsWithHighlight<MeiliLibraryItem>(
              searchResult,
              "descriptions"
            );
            break;
          }

          case MeiliIndices.CONTENT: {
            result.contents = filterHitsWithHighlight<MeiliContent>(searchResult, "translations");
            break;
          }

          case MeiliIndices.VIDEOS: {
            result.videos = filterHitsWithHighlight<MeiliVideo>(searchResult);
            break;
          }

          case MeiliIndices.POST: {
            result.posts = filterHitsWithHighlight<MeiliPost>(searchResult, "translations");
            break;
          }

          case MeiliIndices.WEAPON: {
            result.weapons = filterHitsWithHighlight<MeiliWeapon>(searchResult, "translations");
            break;
          }

          case MeiliIndices.WIKI_PAGE: {
            result.wikiPages = filterHitsWithHighlight<MeiliWikiPage>(searchResult, "translations");
            break;
          }

          default: {
            console.log("What the fuck?");
          }
        }
      });

      setMultiResult(result);
    };

    if (q === "") {
      setMultiResult({});
    } else {
      fetchMultiResult();
    }

    setQuery(q);
  }, []);

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Popup
      isVisible={isSearchOpened}
      onCloseRequest={() => {
        setSearchOpened(false);
        sendAnalytics("Search", "Close search");
      }}
      onOpen={() => searchInputRef.current?.focus()}
      fillViewport>
      <h2 className="inline-flex place-items-center gap-2 text-2xl">
        <Ico icon="search" isFilled />
        {format("search")}
      </h2>
      <TextInput
        ref={searchInputRef}
        onChange={fetchSearchResults}
        value={query}
        placeholder={format("search_placeholder")}
      />

      <div className="flex w-full flex-wrap gap-12 gap-x-16">
        {isDefined(multiResult.libraryItems) && (
          <SearchResultSection
            title={format("library")}
            icon="auto_stories"
            href={`/library?page=1&query=${query}\
&sort=0&primary=true&secondary=true&subitems=true&status=all`}
            totalHits={multiResult.libraryItems.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {multiResult.libraryItems.hits.map((item) => (
                <TranslatedPreviewCard
                  key={item.id}
                  className="w-56"
                  href={`/library/${item.slug}`}
                  onClick={() => setSearchOpened(false)}
                  translations={filterHasAttributes(item._formatted.descriptions, [
                    "language.data.attributes.code",
                  ]).map((translation) => ({
                    language: translation.language.data.attributes.code,
                    title: item.title,
                    subtitle: item.subtitle,
                    description: containsHighlight(translation.description)
                      ? translation.description
                      : undefined,
                  }))}
                  fallback={{ title: item._formatted.title, subtitle: item._formatted.subtitle }}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="21/29.7"
                  thumbnailRounded={false}
                  keepInfoVisible
                  topChips={
                    item.metadata && item.metadata.length > 0 && item.metadata[0]
                      ? [formatLibraryItemSubType(item.metadata[0])]
                      : []
                  }
                  bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                    (category) => formatCategory(category.attributes.slug)
                  )}
                  metadata={{
                    releaseDate: item.release_date,
                    price: item.price,
                    position: "Bottom",
                  }}
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(multiResult.contents) && (
          <SearchResultSection
            title={format("contents")}
            icon="workspaces"
            href={`/contents/all?page=1&query=${query}&sort=0`}
            totalHits={multiResult.contents.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {multiResult.contents.hits.map((item) => (
                <TranslatedPreviewCard
                  key={item.id}
                  className="w-56"
                  href={`/contents/${item.slug}`}
                  onClick={() => setSearchOpened(false)}
                  translations={filterHasAttributes(item._formatted.translations, [
                    "language.data.attributes.code",
                  ]).map(({ displayable_description, language, ...otherAttributes }) => ({
                    ...otherAttributes,
                    description: containsHighlight(displayable_description)
                      ? displayable_description
                      : undefined,
                    language: language.data.attributes.code,
                  }))}
                  fallback={{ title: prettySlug(item.slug) }}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="3/2"
                  thumbnailForceAspectRatio
                  topChips={
                    item.type?.data?.attributes
                      ? [formatContentType(item.type.data.attributes.slug)]
                      : undefined
                  }
                  bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                    (category) => formatCategory(category.attributes.slug)
                  )}
                  keepInfoVisible
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(multiResult.wikiPages) && (
          <SearchResultSection
            title={format("wiki")}
            icon="travel_explore"
            href={`/wiki?page=1&query=${query}`}
            totalHits={multiResult.wikiPages.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {multiResult.wikiPages.hits.map((item) => (
                <TranslatedPreviewCard
                  key={item.id}
                  className="w-56"
                  href={`/wiki/${item.slug}`}
                  onClick={() => setSearchOpened(false)}
                  translations={filterHasAttributes(item._formatted.translations, [
                    "language.data.attributes.code",
                  ]).map(
                    ({
                      aliases,
                      summary,
                      displayable_description,
                      language,
                      ...otherAttributes
                    }) => ({
                      ...otherAttributes,
                      subtitle:
                        aliases && aliases.length > 0
                          ? aliases.map((alias) => alias?.alias).join("・")
                          : undefined,
                      description: containsHighlight(displayable_description)
                        ? displayable_description
                        : summary,
                      language: language.data.attributes.code,
                    })
                  )}
                  fallback={{ title: prettySlug(item.slug) }}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio={"4/3"}
                  thumbnailRounded
                  thumbnailForceAspectRatio
                  keepInfoVisible
                  topChips={filterHasAttributes(item.tags?.data, ["attributes"]).map((tag) =>
                    formatWikiTag(tag.attributes.slug)
                  )}
                  bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                    (category) => formatCategory(category.attributes.slug)
                  )}
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(multiResult.posts) && (
          <SearchResultSection
            title={format("news")}
            icon="newspaper"
            href={`/news?page=1&query=${query}`}
            totalHits={multiResult.posts.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {multiResult.posts.hits.map((item) => (
                <TranslatedPreviewCard
                  className="w-56"
                  key={item.id}
                  href={`/news/${item.slug}`}
                  onClick={() => setSearchOpened(false)}
                  translations={filterHasAttributes(item._formatted.translations, [
                    "language.data.attributes.code",
                  ]).map(({ excerpt, displayable_description, language, ...otherAttributes }) => ({
                    ...otherAttributes,
                    description: containsHighlight(displayable_description)
                      ? displayable_description
                      : excerpt,
                    language: language.data.attributes.code,
                  }))}
                  fallback={{ title: prettySlug(item.slug) }}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="3/2"
                  thumbnailForceAspectRatio
                  keepInfoVisible
                  bottomChips={filterHasAttributes(item.categories?.data, ["attributes"]).map(
                    (category) => formatCategory(category.attributes.slug)
                  )}
                  metadata={{
                    releaseDate: item.date,
                    releaseDateFormat: "long",
                    position: "Top",
                  }}
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(multiResult.videos) && (
          <SearchResultSection
            title={format("videos")}
            icon="movie"
            href={`/archives/videos?page=1&query=${query}&sort=1&gone=`}
            totalHits={multiResult.videos.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {multiResult.videos.hits.map((item) => (
                <PreviewCard
                  className="w-56"
                  key={item.uid}
                  href={`/archives/videos/v/${item.uid}`}
                  onClick={() => setSearchOpened(false)}
                  title={item._formatted.title}
                  thumbnail={getVideoThumbnailURL(item.uid)}
                  thumbnailAspectRatio="16/9"
                  thumbnailForceAspectRatio
                  keepInfoVisible
                  metadata={{
                    releaseDate: item.published_date,
                    views: item.views,
                    author: item._formatted.channel?.data?.attributes?.title,
                    position: "Top",
                  }}
                  description={
                    item._matchesPosition.description &&
                    item._matchesPosition.description.length > 0
                      ? item._formatted.description
                      : undefined
                  }
                  hoverlay={{
                    __typename: "Video",
                    duration: item.duration,
                  }}
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(multiResult.weapons) && (
          <SearchResultSection
            title={format("weapon", { count: Infinity })}
            icon="shield"
            href={`/wiki/weapons?page=1&query=${query}`}
            totalHits={multiResult.weapons.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {multiResult.weapons.hits.map((item) => (
                <TranslatedPreviewCard
                  key={item.id}
                  className="w-56"
                  href={"/"}
                  translations={filterHasAttributes(item._formatted.translations, [
                    "language.data.attributes.code",
                  ]).map(({ description, language, names: [primaryName, ...aliases] }) => ({
                    language: language.data.attributes.code,
                    title: primaryName,
                    subtitle: aliases.join("・"),
                    description: containsHighlight(description) ? description : undefined,
                  }))}
                  fallback={{ title: prettySlug(item.slug) }}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="1/1"
                  thumbnailForceAspectRatio
                  thumbnailFitMethod="contain"
                  keepInfoVisible
                  topChips={
                    item.type?.data?.attributes?.slug
                      ? [formatWeaponType(item.type.data.attributes.slug)]
                      : undefined
                  }
                  bottomChips={filterHasAttributes(item.categories, ["attributes"]).map(
                    (category) => formatCategory(category.attributes.slug)
                  )}
                />
              ))}
            </div>
          </SearchResultSection>
        )}
      </div>
    </Popup>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface SearchResultSectionProps {
  title?: string | null;
  icon: MaterialSymbol;
  href: string;
  totalHits?: number;
  children: React.ReactNode;
}

const SearchResultSection = ({
  title,
  icon,
  href,
  totalHits,
  children,
}: SearchResultSectionProps) => {
  const { format } = useFormat();
  const setSearchOpened = useAtomSetter(atoms.layout.searchOpened);
  return (
    <>
      {isDefined(totalHits) && totalHits > 0 && (
        <div>
          <div className="mb-6 grid place-content-start">
            <UpPressable
              className="grid grid-cols-[auto_1fr] place-items-center gap-6 px-6 py-4"
              href={href}
              onClick={() => setSearchOpened(false)}>
              <Ico icon={icon} className="!text-3xl" isFilled={false} />
              <div>
                <p className="font-headers text-lg">{title}</p>
                {isDefined(totalHits) && totalHits > SEARCH_LIMIT && (
                  <p className="text-sm">
                    ({format("showing_x_out_of_y_results", { x: SEARCH_LIMIT, y: totalHits })})
                  </p>
                )}
              </div>
            </UpPressable>
          </div>
          {children}
        </div>
      )}
    </>
  );
};
