import {
  ContentAttributesFragment,
  GetContentQuery,
  GetLibraryItemQuery,
  GetPostQuery,
  GetVideoQuery,
  GetWikiPageQuery,
  LibraryItemAttributesFragment,
  PostAttributesFragment,
  VideoAttributesFragment,
  WikiPageAttributesFragment,
} from "./generated";

export interface MeiliLibraryItem extends Omit<LibraryItemAttributesFragment, "descriptions"> {
  id: string;
  descriptions: string[];
  sortable_name: string;
  sortable_price: number | undefined;
  sortable_date: number | undefined;
  untangible_group_item: boolean;
}

export interface MeiliContent
  extends Omit<ContentAttributesFragment, "translations" | "updatedAt"> {
  id: string;
  translations?: Array<{
    __typename?: "ComponentTranslationsTitle";
    pre_title?: string | null;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    language?: {
      __typename?: "LanguageEntityResponse";
      data?: {
        __typename?: "LanguageEntity";
        attributes?: { __typename?: "Language"; code: string } | null;
      } | null;
    } | null;
  } | null> | null;
  sortable_updated_date: number;
}

export interface MeiliVideo extends VideoAttributesFragment {
  id: string;
  sortable_published_date: number;
  channel_uid?: string;
}

export interface MeiliPost extends PostAttributesFragment {
  id: string;
  sortable_date: number;
}

export interface MeiliWikiPage extends Omit<WikiPageAttributesFragment, "translations"> {
  id: string;
  translations: (Omit<
    NonNullable<NonNullable<WikiPageAttributesFragment["translations"]>[number]>,
    "body"
  > & {
    displayable_description?: string | null;
  })[];
}

export enum MeiliIndices {
  LIBRARY_ITEM = "library-item",
  CONTENT = "content",
  VIDEOS = "video",
  POST = "post",
  WIKI_PAGE = "wiki-page",
}

export type MeiliDocumentsType =
  | {
      index: MeiliIndices.LIBRARY_ITEM;
      documents: MeiliLibraryItem;
      strapi: GetLibraryItemQuery["libraryItem"];
    }
  | {
      index: MeiliIndices.CONTENT;
      documents: MeiliContent;
      strapi: GetContentQuery["content"];
    }
  | {
      index: MeiliIndices.VIDEOS;
      documents: MeiliVideo;
      strapi: GetVideoQuery["video"];
    }
  | {
      index: MeiliIndices.POST;
      documents: MeiliPost;
      strapi: GetPostQuery["post"];
    }
  | {
      index: MeiliIndices.WIKI_PAGE;
      documents: MeiliWikiPage;
      strapi: GetWikiPageQuery["wikiPage"];
    };
