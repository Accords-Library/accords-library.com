export type GetErasQueryVariables = {
  language_code: string;
};

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

export type GetChronologyItemsQueryVariables = {
  language_code: string;
};

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

export type GetLibraryItemsPreviewQueryVariables = {
  language_code: string;
};

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

export type GetLibraryItemsSkeletonQueryVariables = {
  [key: string]: never;
};

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

export type GetLibraryItemQueryVariables = {
  slug: string;
  language_code: string;
};

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

        descriptions: Array<
          | {
              __typename: "ComponentTranslationsLibraryItems";
              description: string;
            }
          | undefined
        >;

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
