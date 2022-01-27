export type Exact<T> = T;
export type InputMaybe<T> = T;
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  DateTime: any;
  Time: any;
  Upload: any;
  LibraryContentRangeDynamicZoneInput: any;
  LibraryItemMetadataDynamicZoneInput: any;
  SourceSourceDynamicZoneInput: any;
};

/*
  The following is generated using https://www.graphql-code-generator.com/
  With the following codegen.yml:

  generates:
  operations-types.ts:
    plugins:
      - typescript-operations

  And the schema.graphql and operation.graphql files from this folder.
  
  But to make the type easier to work with, it went through the following transformation:
    - Removed ?
    - Removed | null
    - Removed | undefined
*/

export enum Enum_Componentmetadatabooks_Binding_Type {
  Paperback = "Paperback",
  Hardcover = "Hardcover",
}

export enum Enum_Componentmetadatabooks_Page_Order {
  LeftToRight = "Left_to_Right",
  RightToLeft = "Right_to_Left",
}

export enum Enum_Componentmetadatavideo_Resolution {
  Sd_480p = "SD_480p",
  Hd_720p = "HD_720p",
  FullHd_1080p = "FullHD_1080p",
  QuadHd_2160p = "QuadHD_2160p",
}

export type GetErasQueryVariables = Exact<{
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetErasQuery = {
  __typename: "Query";
  chronologyEras: {
    __typename: "ChronologyEraEntityResponseCollection";
    data: Array<{
      __typename: "ChronologyEraEntity";
      id: string;
      attributes: {
        __typename: "ChronologyEra";
        slug: string;
        starting_year: number;
        ending_year: number;
        title: Array<{
          __typename: "ComponentTranslationsChronologyEra";
          title: string;
        }>;
      };
    }>;
  };
};

export type GetChronologyItemsQueryVariables = Exact<{
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetChronologyItemsQuery = {
  __typename: "Query";
  chronologyItems: {
    __typename: "ChronologyItemEntityResponseCollection";
    data: Array<{
      __typename: "ChronologyItemEntity";
      id: string;
      attributes: {
        __typename: "ChronologyItem";
        year: number;
        month: number;
        day: number;
        displayed_date: string;
        events: Array<{
          __typename: "ComponentCollectionsComponentEvent";
          id: string;
          source: {
            __typename: "SourceEntityResponse";
            data: {
              __typename: "SourceEntity";
              attributes: {
                __typename: "Source";
                name: string;
              };
            };
          };
          translations: Array<{
            __typename: "ComponentTranslationsChronologyItem";
            title: string;
            description: string;
            note: string;
            status: string;
          }>;
        }>;
      };
    }>;
  };
};

export type GetLibraryItemsPreviewQueryVariables = Exact<{
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetLibraryItemsPreviewQuery = {
  __typename: "Query";
  libraryItems: {
    __typename: "LibraryItemEntityResponseCollection";
    data: Array<{
      __typename: "LibraryItemEntity";
      id: string;
      attributes: {
        __typename: "LibraryItem";
        title: string;
        subtitle: string;
        slug: string;
        thumbnail: {
          __typename: "UploadFileEntityResponse";
          data: {
            __typename: "UploadFileEntity";
            attributes: {
              __typename: "UploadFile";
              name: string;
              alternativeText: string;
              caption: string;
              width: number;
              height: number;
              url: string;
            };
          };
        };
        release_date: {
          __typename: "ComponentBasicsDatepicker";
          year: number;
          month: number;
          day: number;
        };
        price: {
          __typename: "ComponentBasicsPrice";
          amount: number;
          currency: {
            __typename: "CurrencyEntityResponse";
            data: {
              __typename: "CurrencyEntity";
              attributes: {
                __typename: "Currency";
                symbol: string;
                code: string;
              };
            };
          };
        };
        size: {
          __typename: "ComponentBasicsSize";
          width: number;
          height: number;
          thickness: number;
        };
        descriptions: Array<{
          __typename: "ComponentTranslationsLibraryItems";
          description: string;
        }>;
      };
    }>;
  };
};

export type GetLibraryItemsSlugsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetLibraryItemsSlugsQuery = {
  __typename: "Query";
  libraryItems: {
    __typename: "LibraryItemEntityResponseCollection";
    data: Array<{
      __typename: "LibraryItemEntity";
      attributes: { __typename: "LibraryItem"; slug: string };
    }>;
  };
};

export type GetLibraryItemQueryVariables = Exact<{
  slug: InputMaybe<Scalars["String"]>;
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetLibraryItemQuery = {
  __typename: "Query";
  libraryItems: {
    __typename: "LibraryItemEntityResponseCollection";
    data: Array<{
      __typename: "LibraryItemEntity";
      id: string;
      attributes: {
        __typename: "LibraryItem";
        title: string;
        subtitle: string;
        slug: string;
        thumbnail: {
          __typename: "UploadFileEntityResponse";
          data: {
            __typename: "UploadFileEntity";
            attributes: {
              __typename: "UploadFile";
              name: string;
              alternativeText: string;
              caption: string;
              width: number;
              height: number;
              url: string;
            };
          };
        };
        release_date: {
          __typename: "ComponentBasicsDatepicker";
          year: number;
          month: number;
          day: number;
        };
        price: {
          __typename: "ComponentBasicsPrice";
          amount: number;
          currency: {
            __typename: "CurrencyEntityResponse";
            data: {
              __typename: "CurrencyEntity";
              attributes: {
                __typename: "Currency";
                symbol: string;
                code: string;
              };
            };
          };
        };
        size: {
          __typename: "ComponentBasicsSize";
          width: number;
          height: number;
          thickness: number;
        };
        descriptions: Array<{
          __typename: "ComponentTranslationsLibraryItems";
          description: string;
        }>;
        metadata: Array<
          | {
              __typename: "ComponentMetadataBooks";
              binding_type: Enum_Componentmetadatabooks_Binding_Type;
              page_count: number;
              page_order: Enum_Componentmetadatabooks_Page_Order;
              subtype: {
                __typename: "TextualSubtypeEntityResponse";
                data: {
                  __typename: "TextualSubtypeEntity";
                  attributes: {
                    __typename: "TextualSubtype";
                    slug: string;
                  };
                };
              };
              languages: {
                __typename: "LanguageRelationResponseCollection";
                data: Array<{
                  __typename: "LanguageEntity";
                  attributes: {
                    __typename: "Language";
                    code: string;
                    name: string;
                  };
                }>;
              };
            }
          | {
              __typename: "ComponentMetadataVideo";
              resolution: Enum_Componentmetadatavideo_Resolution;
              audio_languages: {
                __typename: "LanguageRelationResponseCollection";
                data: Array<{
                  __typename: "LanguageEntity";
                  attributes: {
                    __typename: "Language";
                    code: string;
                    name: string;
                  };
                }>;
              };
            }
          | {
              __typename: "ComponentMetadataGame";
              platform: {
                __typename: "GamePlatformEntityResponse";
                data: {
                  __typename: "GamePlatformEntity";
                  attributes: {
                    __typename: "GamePlatform";
                    short: string;
                  };
                };
              };
              audio_languages: {
                __typename: "LanguageRelationResponseCollection";
                data: Array<{
                  __typename: "LanguageEntity";
                  attributes: {
                    __typename: "Language";
                    code: string;
                    name: string;
                  };
                }>;
              };
              sub_languages: {
                __typename: "LanguageRelationResponseCollection";
                data: Array<{
                  __typename: "LanguageEntity";
                  attributes: {
                    __typename: "Language";
                    code: string;
                    name: string;
                  };
                }>;
              };
              interface_languages: {
                __typename: "LanguageRelationResponseCollection";
                data: Array<{
                  __typename: "LanguageEntity";
                  attributes: {
                    __typename: "Language";
                    code: string;
                    name: string;
                  };
                }>;
              };
            }
          | {
              __typename: "ComponentMetadataAudio";
              subtype: {
                __typename: "AudioSubtypeEntityResponse";
                data: {
                  __typename: "AudioSubtypeEntity";
                  attributes: {
                    __typename: "AudioSubtype";
                    slug: string;
                  };
                };
              };
              languages: {
                __typename: "LanguageRelationResponseCollection";
                data: Array<{
                  __typename: "LanguageEntity";
                  attributes: {
                    __typename: "Language";
                    code: string;
                    name: string;
                  };
                }>;
              };
            }
          | { __typename: "Error" }
        >;
        subitem_of: {
          __typename: "LibraryItemRelationResponseCollection";
          data: Array<{
            __typename: "LibraryItemEntity";
            id: string;
            attributes: {
              __typename: "LibraryItem";
              title: string;
              subtitle: string;
              slug: string;
            };
          }>;
        };
        subitems: {
          __typename: "LibraryItemRelationResponseCollection";
          data: Array<{
            __typename: "LibraryItemEntity";
            id: string;
            attributes: {
              __typename: "LibraryItem";
              slug: string;
              title: string;
              subtitle: string;
              thumbnail: {
                __typename: "UploadFileEntityResponse";
                data: {
                  __typename: "UploadFileEntity";
                  attributes: {
                    __typename: "UploadFile";
                    name: string;
                    alternativeText: string;
                    caption: string;
                    width: number;
                    height: number;
                    url: string;
                  };
                };
              };
            };
          }>;
        };
        contents: {
          __typename: "LibraryContentRelationResponseCollection";
          data: Array<{
            __typename: "LibraryContentEntity";
            id: string;
            attributes: {
              __typename: "LibraryContent";
              slug: string;
              title: Array<{
                __typename: "ComponentTranslationsLibraryContent";
                title: string;
              }>;
              type: {
                __typename: "ContentTypeEntityResponse";
                data: {
                  __typename: "ContentTypeEntity";
                  attributes: {
                    __typename: "ContentType";
                    slug: string;
                  };
                };
              };
              categories: {
                __typename: "CategoryRelationResponseCollection";
                data: Array<{
                  __typename: "CategoryEntity";
                  attributes: {
                    __typename: "Category";
                    name: string;
                    short: string;
                  };
                }>;
              };
              range: Array<
                | {
                    __typename: "ComponentRangePageRange";
                    starting_page: number;
                    ending_page: number;
                  }
                | {
                    __typename: "ComponentRangeTimeRange";
                    starting_time: any;
                    ending_time: any;
                  }
                | { __typename: "ComponentRangeGameAspect" }
                | { __typename: "ComponentRangeOther" }
                | { __typename: "Error" }
              >;
            };
          }>;
        };
      };
    }>;
  };
};
