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

export type GetLibraryItemsSkeletonQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetLibraryItemsSkeletonQuery = {
  __typename: "Query";
  libraryItems: {
    __typename: "LibraryItemEntityResponseCollection";
    data: Array<{
      __typename: "LibraryItemEntity";
      attributes: {
        __typename: "LibraryItem";
        slug: string;
        subitems: {
          __typename: "LibraryItemRelationResponseCollection";
          data: Array<{
            __typename: "LibraryItemEntity";
            attributes: {
              __typename: "LibraryItem";
              slug: string;
              subitems: {
                __typename: "LibraryItemRelationResponseCollection";
                data: Array<{
                  __typename: "LibraryItemEntity";
                  attributes: {
                    __typename: "LibraryItem";
                    slug: string;
                    subitems: {
                      __typename: "LibraryItemRelationResponseCollection";
                      data: Array<{
                        __typename: "LibraryItemEntity";
                        attributes: {
                          __typename: "LibraryItem";
                          slug: string;
                        };
                      }>;
                    };
                  };
                }>;
              };
            };
          }>;
        };
      };
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
      };
    }>;
  };
};
