import {
  ContentAttributesFragment,
  GetContentQuery,
  GetLibraryItemQuery,
  GetPostQuery,
  GetVideoQuery,
  LibraryItemAttributesFragment,
  PostAttributesFragment,
  VideoAttributesFragment,
} from "./generated";

export interface MeiliLibraryItem extends Omit<LibraryItemAttributesFragment, "descriptions"> {
  id: string;
  descriptions: string[];
}

export interface MeiliContent extends Omit<ContentAttributesFragment, "translations"> {
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

export enum MeiliIndices {
  LIBRARY_ITEM = "library-item",
  CONTENT = "content",
  VIDEOS = "video",
  POST = "post",
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
    };
