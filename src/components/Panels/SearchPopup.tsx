import { useEffect, useState } from "react";
import { Popup } from "components/Containers/Popup";
import { sendAnalytics } from "helpers/analytics";
import { atoms } from "contexts/atoms";
import { useAtomPair, useAtomGetter } from "helpers/atoms";
import { TextInput } from "components/Inputs/TextInput";
import { containsHighlight, CustomSearchResponse, meiliSearch } from "helpers/search";
import { PreviewCard, TranslatedPreviewCard } from "components/PreviewCard";
import { filterDefined, filterHasAttributes, isDefined } from "helpers/asserts";
import {
  MeiliContent,
  MeiliIndices,
  MeiliLibraryItem,
  MeiliPost,
  MeiliVideo,
  MeiliWikiPage,
} from "shared/meilisearch-graphql-typings/meiliTypes";
import { getVideoThumbnailURL } from "helpers/videos";
import { UpPressable } from "components/Containers/UpPressable";
import { prettyItemSubType, prettySlug } from "helpers/formatters";
import { Ico } from "components/Ico";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const SEARCH_LIMIT = 8;

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  COMPONENT  ╰──────────────────────────────────────────
 */

export const SearchPopup = (): JSX.Element => {
  const [isSearchOpened, setSearchOpened] = useAtomPair(atoms.layout.searchOpened);
  const [query, setQuery] = useState("");
  const langui = useAtomGetter(atoms.localData.langui);
  const [libraryItems, setLibraryItems] = useState<CustomSearchResponse<MeiliLibraryItem>>();
  const [contents, setContents] = useState<CustomSearchResponse<MeiliContent>>();
  const [videos, setVideos] = useState<CustomSearchResponse<MeiliVideo>>();
  const [posts, setPosts] = useState<CustomSearchResponse<MeiliPost>>();
  const [wikiPages, setWikiPages] = useState<CustomSearchResponse<MeiliWikiPage>>();

  useEffect(() => {
    const fetchLibraryItems = async () => {
      const searchResult = await meiliSearch(MeiliIndices.LIBRARY_ITEM, query, {
        limit: SEARCH_LIMIT,
        attributesToCrop: ["descriptions"],
      });
      searchResult.hits = searchResult.hits.map((item) => {
        if (
          isDefined(item._formatted) &&
          item._matchesPosition.descriptions &&
          item._matchesPosition.descriptions.length > 0
        ) {
          item._formatted.descriptions = filterDefined(item._formatted.descriptions).filter(
            (description) => description.includes("</mark>")
          );
        }
        return item;
      });
      setLibraryItems(searchResult);
    };

    const fetchContents = async () => {
      const searchResult = await meiliSearch(MeiliIndices.CONTENT, query, {
        attributesToCrop: ["translations.description"],
        limit: SEARCH_LIMIT,
      });
      searchResult.hits = searchResult.hits.map((item) => {
        if (
          Object.keys(item._matchesPosition).filter((match) => match.startsWith("translations"))
            .length > 0
        ) {
          item._formatted.translations = filterDefined(item._formatted.translations).filter(
            (translation) => JSON.stringify(translation).includes("</mark>")
          );
        }
        return item;
      });
      setContents(searchResult);
    };

    const fetchVideos = async () => {
      const searchResult = await meiliSearch(MeiliIndices.VIDEOS, query, {
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
        attributesToCrop: ["description"],
        sort: ["sortable_published_date:desc"],
      });
      setVideos(searchResult);
    };

    const fetchPosts = async () => {
      const searchResult = await meiliSearch(MeiliIndices.POST, query, {
        limit: SEARCH_LIMIT,
        attributesToRetrieve: ["translations", "thumbnail", "slug", "date", "categories"],
        attributesToHighlight: ["translations.title", "translations.excerpt", "translations.body"],
        attributesToCrop: ["translations.body"],
        sort: ["sortable_date:desc"],
        filter: ["hidden = false"],
      });
      setPosts(searchResult);
    };

    const fetchWikiPages = async () => {
      const searchResult = await meiliSearch(MeiliIndices.WIKI_PAGE, query, {
        limit: SEARCH_LIMIT,
        attributesToHighlight: [
          "translations.title",
          "translations.aliases",
          "translations.summary",
          "translations.displayable_description",
        ],
        attributesToCrop: ["translations.displayable_description"],
      });
      setWikiPages(searchResult);
    };

    if (query === "") {
      setWikiPages(undefined);
      setLibraryItems(undefined);
      setContents(undefined);
      setVideos(undefined);
      setPosts(undefined);
    } else {
      fetchWikiPages();
      fetchLibraryItems();
      fetchContents();
      fetchVideos();
      fetchPosts();
    }
  }, [query]);

  return (
    <Popup
      isVisible={isSearchOpened}
      onCloseRequest={() => {
        setSearchOpened(false);
        sendAnalytics("Search", "Close search");
      }}
      fillViewport>
      <h2 className="inline-flex place-items-center gap-2 text-2xl">
        <Ico icon="search" isFilled />
        {langui.search}
      </h2>
      <TextInput onChange={setQuery} value={query} placeholder={langui.search_title} />

      <div className="flex w-full flex-wrap gap-12 gap-x-16">
        {isDefined(libraryItems) && (
          <SearchResultSection
            title={langui.library}
            href={`/library?page=1&query=${query}&sort=0&primary=true&secondary=true&subitems=true&status=all`}
            totalHits={libraryItems.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {libraryItems.hits.map((item) => (
                <PreviewCard
                  key={item.id}
                  className="w-52"
                  href={`/library/${item.slug}`}
                  title={item._formatted.title}
                  subtitle={item._formatted.subtitle}
                  description={
                    item._matchesPosition.descriptions &&
                    item._matchesPosition.descriptions.length > 0
                      ? item._formatted.descriptions?.[0]
                      : undefined
                  }
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="21/29.7"
                  thumbnailRounded={false}
                  keepInfoVisible
                  topChips={
                    item.metadata && item.metadata.length > 0 && item.metadata[0]
                      ? [prettyItemSubType(item.metadata[0])]
                      : []
                  }
                  bottomChips={item.categories?.data.map(
                    (category) => category.attributes?.short ?? ""
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

        {isDefined(contents) && (
          <SearchResultSection
            title={langui.contents}
            href={`/contents/all?page=1&query=${query}&sort=0`}
            totalHits={contents.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {contents.hits.map((item) => (
                <PreviewCard
                  key={item.id}
                  className="w-56"
                  href={`/contents/${item.slug}`}
                  pre_title={item._formatted.translations?.[0]?.pre_title}
                  title={item._formatted.translations?.[0]?.title}
                  subtitle={item._formatted.translations?.[0]?.subtitle}
                  description={item._formatted.translations?.[0]?.description}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="3/2"
                  thumbnailForceAspectRatio
                  topChips={
                    item.type?.data?.attributes
                      ? [
                          item.type.data.attributes.titles?.[0]
                            ? item.type.data.attributes.titles[0]?.title
                            : prettySlug(item.type.data.attributes.slug),
                        ]
                      : undefined
                  }
                  bottomChips={item.categories?.data.map(
                    (category) => category.attributes?.short ?? ""
                  )}
                  keepInfoVisible
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(wikiPages) && (
          <SearchResultSection
            title={langui.wiki}
            href={"/wiki"}
            totalHits={wikiPages.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {wikiPages.hits.map((item) => (
                <TranslatedPreviewCard
                  key={item.id}
                  className="w-56"
                  href={`/wiki/${item.slug}`}
                  translations={filterHasAttributes(item._formatted.translations, [
                    "language.data.attributes.code",
                  ] as const).map(
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
                  topChips={filterHasAttributes(item.tags?.data, ["attributes"] as const).map(
                    (tag) => tag.attributes.titles?.[0]?.title ?? prettySlug(tag.attributes.slug)
                  )}
                  bottomChips={filterHasAttributes(item.categories?.data, [
                    "attributes",
                  ] as const).map((category) => category.attributes.short)}
                />
              ))}
            </div>
          </SearchResultSection>
        )}

        {isDefined(posts) && (
          <SearchResultSection
            title={langui.news}
            href={`/news?page=1&query=${query}`}
            totalHits={posts.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {posts.hits.map((item) => (
                <TranslatedPreviewCard
                  className="w-56"
                  key={item.id}
                  href={`/news/${item.slug}`}
                  translations={filterHasAttributes(item._formatted.translations, [
                    "language.data.attributes.code",
                  ] as const).map(({ excerpt, body, language, ...otherAttributes }) => ({
                    ...otherAttributes,
                    description: containsHighlight(excerpt)
                      ? excerpt
                      : containsHighlight(body)
                      ? body
                      : excerpt,
                    language: language.data.attributes.code,
                  }))}
                  fallback={{ title: prettySlug(item.slug) }}
                  thumbnail={item.thumbnail?.data?.attributes}
                  thumbnailAspectRatio="3/2"
                  thumbnailForceAspectRatio
                  keepInfoVisible
                  bottomChips={item.categories?.data.map(
                    (category) => category.attributes?.short ?? ""
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

        {isDefined(videos) && (
          <SearchResultSection
            title={langui.videos}
            href={`/archives/videos?page=1&query=${query}&sort=1&gone=`}
            totalHits={videos.estimatedTotalHits}>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
              {videos.hits.map((item) => (
                <PreviewCard
                  className="w-56"
                  key={item.uid}
                  href={`/archives/videos/v/${item.uid}`}
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
      </div>
    </Popup>
  );
};

interface SearchResultSectionProps {
  title?: string | null;
  href: string;
  totalHits?: number;
  children: React.ReactNode;
}

const SearchResultSection = ({ title, href, totalHits, children }: SearchResultSectionProps) => (
  <>
    {isDefined(totalHits) && totalHits > 0 && (
      <div>
        <div className="mb-6 grid place-content-start">
          <UpPressable className="px-6 py-4" href={href}>
            <p className="font-headers text-lg">{title}</p>
            {isDefined(totalHits) && totalHits > SEARCH_LIMIT && (
              <p className="text-sm">{`(showing ${SEARCH_LIMIT} out of ${totalHits} results)`}</p>
            )}
          </UpPressable>
        </div>
        {children}
      </div>
    )}
  </>
);
