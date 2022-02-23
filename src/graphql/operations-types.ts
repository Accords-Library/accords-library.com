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

export enum Enum_Componenttranslationschronologyitem_Status {
  Incomplete = "Incomplete",
  Draft = "Draft",
  Review = "Review",
  Done = "Done",
}

export enum Enum_Componentsetstextset_Status {
  Incomplete = "Incomplete",
  Draft = "Draft",
  Review = "Review",
  Done = "Done",
}

// __________________________________________________________________

export type GetWebsiteInterfaceQueryVariables = Exact<{
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetWebsiteInterfaceQuery = {
  __typename: "Query";
  websiteInterfaces: {
    __typename: "WebsiteInterfaceEntityResponseCollection";
    data: Array<{
      __typename: "WebsiteInterfaceEntity";
      attributes: {
        __typename: "WebsiteInterface";
        main_library: string;
        main_library_description: string;
        main_news: string;
        main_merch: string;
        main_gallery: string;
        main_archives: string;
        main_about_us: string;
        main_licensing: string;
        main_copyright: string;
        library_description: string;
        library_item_summary: string;
        library_item_gallery: string;
        library_item_details: string;
        library_item_subitems: string;
        library_item_variants: string;
        library_item_content: string;
        global_return_label: string;
        global_subitem_of: string;
        global_type: string;
        global_width: string;
        global_height: string;
        global_thickness: string;
        global_binding: string;
        global_language: string;
        global_languages: string;
        global_page: string;
        global_pages: string;
        global_page_order: string;
        global_release_date: string;
        global_price: string;
        library_item_physical_size: string;
        library_item_type_information: string;
        library_item_front_matter: string;
        library_item_back_matter: string;
        library_item_type_textual: string;
        library_item_type_audio: string;
        library_item_type_game: string;
        library_item_type_video: string;
        library_item_type_other: string;
        library_item_open_content: string;
        library_item_view_scans: string;
        content_read_content: string;
        content_watch_content: string;
        content_listen_content: string;
        global_category: string;
        global_categories: string;
        global_paperback: string;
        global_hardcover: string;
        global_left_to_right: string;
        global_right_to_left: string;
        main_wiki: string;
        main_wiki_description: string;
        main_chronicles: string;
        main_chronicles_description: string;
        library_items: string;
        library_items_description: string;
        library_content: string;
        library_content_description: string;
        wiki_description: string;
        news_description: string;
        chronicles_description: string;
        gallery_description: string;
        archives_description: string;
        about_us_description: string;
        merch_description: string;
      };
    }>;
  };
};

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
          description: string;
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
              attributes: { __typename: "Source"; name: string };
            };
          };
          translations: Array<{
            __typename: "ComponentTranslationsChronologyItem";
            title: string;
            description: string;
            note: string;
            status: Enum_Componenttranslationschronologyitem_Status;
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
        metadata: Array<
          | {
              __typename: "ComponentMetadataBooks";
              subtype: {
                __typename: "TextualSubtypeEntityResponse";
                data: {
                  __typename: "TextualSubtypeEntity";
                  attributes: {
                    __typename: "TextualSubtype";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
            }
          | {
              __typename: "ComponentMetadataVideo";
              subtype: {
                __typename: "VideoSubtypeEntityResponse";
                data: {
                  __typename: "VideoSubtypeEntity";
                  attributes: {
                    __typename: "VideoSubtype";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
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
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
            }
          | {
              __typename: "ComponentMetadataOther";
              subtype: {
                __typename: "OtherSubtypeEntityResponse";
                data: {
                  __typename: "OtherSubtypeEntity";
                  attributes: {
                    __typename: "OtherSubtype";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
            }
          | { __typename: "Error" }
        >;
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
        gallery: {
          __typename: "UploadFileRelationResponseCollection";
          data: Array<{
            __typename: "UploadFileEntity";
            id: string;
            attributes: {
              __typename: "UploadFile";
              name: string;
              alternativeText: string;
              caption: string;
              width: number;
              height: number;
              url: string;
            };
          }>;
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
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
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
              subtype: {
                __typename: "VideoSubtypeEntityResponse";
                data: {
                  __typename: "VideoSubtypeEntity";
                  attributes: {
                    __typename: "VideoSubtype";
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
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
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
            }
          | {
              __typename: "ComponentMetadataOther";
              subtype: {
                __typename: "OtherSubtypeEntityResponse";
                data: {
                  __typename: "OtherSubtypeEntity";
                  attributes: {
                    __typename: "OtherSubtype";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
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
              metadata: Array<
                | {
                    __typename: "ComponentMetadataBooks";
                    subtype: {
                      __typename: "TextualSubtypeEntityResponse";
                      data: {
                        __typename: "TextualSubtypeEntity";
                        attributes: {
                          __typename: "TextualSubtype";
                          slug: string;
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
                    };
                  }
                | {
                    __typename: "ComponentMetadataVideo";
                    subtype: {
                      __typename: "VideoSubtypeEntityResponse";
                      data: {
                        __typename: "VideoSubtypeEntity";
                        attributes: {
                          __typename: "VideoSubtype";
                          slug: string;
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
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
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
                    };
                  }
                | {
                    __typename: "ComponentMetadataOther";
                    subtype: {
                      __typename: "OtherSubtypeEntityResponse";
                      data: {
                        __typename: "OtherSubtypeEntity";
                        attributes: {
                          __typename: "OtherSubtype";
                          slug: string;
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
                    };
                  }
                | { __typename: "Error" }
              >;
            };
          }>;
        };
        submerchs: {
          __typename: "MerchItemRelationResponseCollection";
          data: Array<{
            __typename: "MerchItemEntity";
            id: string;
            attributes: {
              __typename: "MerchItem";
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
          __typename: "RangedContentRelationResponseCollection";
          data: Array<{
            __typename: "RangedContentEntity";
            id: string;
            attributes: {
              __typename: "RangedContent";
              slug: string;
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
                | { __typename: "ComponentRangeOther" }
                | { __typename: "Error" }
              >;
              scan_set: Array<{
                __typename: "ComponentSetsScanSet";
                id: string;
              }>;
              content: {
                __typename: "ContentEntityResponse";
                data: {
                  __typename: "ContentEntity";
                  attributes: {
                    __typename: "Content";
                    slug: string;
                    categories: {
                      __typename: "CategoryRelationResponseCollection";
                      data: Array<{
                        __typename: "CategoryEntity";
                        id: string;
                        attributes: {
                          __typename: "Category";
                          short: string;
                        };
                      }>;
                    };
                    type: {
                      __typename: "ContentTypeEntityResponse";
                      data: {
                        __typename: "ContentTypeEntity";
                        attributes: {
                          __typename: "ContentType";
                          slug: string;
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
                    };
                    titles: Array<{
                      __typename: "ComponentTranslationsTitle";
                      pre_title: string;
                      title: string;
                      subtitle: string;
                    }>;
                    text_set: Array<{
                      __typename: "ComponentSetsTextSet";
                      id: string;
                    }>;
                    video_set: Array<{
                      __typename: "ComponentSetsVideoSet";
                      id: string;
                    }>;
                    audio_set: Array<{
                      __typename: "ComponentSetsAudioSet";
                      id: string;
                    }>;
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

export type GetContentsSlugsQueryVariables = Exact<{ [key: string]: never }>;

export type GetContentsSlugsQuery = {
  __typename: "Query";
  contents: {
    __typename: "ContentEntityResponseCollection";
    data: Array<{
      __typename: "ContentEntity";
      attributes: { __typename: "Content"; slug: string };
    }>;
  };
};

export type GetContentQueryVariables = Exact<{
  slug: InputMaybe<Scalars["String"]>;
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetContentsQueryVariables = Exact<{
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetContentsQuery = {
  __typename: "Query";
  contents: {
    __typename: "ContentEntityResponseCollection";
    data: Array<{
      __typename: "ContentEntity";
      id: string;
      attributes: {
        __typename: "Content";
        slug: string;
        titles: Array<{
          __typename: "ComponentTranslationsTitle";
          pre_title: string;
          title: string;
          subtitle: string;
        }>;
        categories: {
          __typename: "CategoryRelationResponseCollection";
          data: Array<{
            __typename: "CategoryEntity";
            id: string;
            attributes: { __typename: "Category"; short: string };
          }>;
        };
        type: {
          __typename: "ContentTypeEntityResponse";
          data: {
            __typename: "ContentTypeEntity";
            attributes: {
              __typename: "ContentType";
              slug: string;
              titles: Array<{
                __typename: "ComponentTranslationsSimpleTitle";
                title: string;
              }>;
            };
          };
        };
        ranged_contents: {
          __typename: "RangedContentRelationResponseCollection";
          data: Array<{
            __typename: "RangedContentEntity";
            id: string;
            attributes: {
              __typename: "RangedContent";
              slug: string;
              scan_set: Array<{
                __typename: "ComponentSetsScanSet";
                id: string;
              }>;
              library_item: {
                __typename: "LibraryItemEntityResponse";
                data: {
                  __typename: "LibraryItemEntity";
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
                };
              };
            };
          }>;
        };
        text_set: Array<{
          __typename: "ComponentSetsTextSet";
          id: string;
        }>;
        video_set: Array<{
          __typename: "ComponentSetsVideoSet";
          id: string;
        }>;
        audio_set: Array<{
          __typename: "ComponentSetsAudioSet";
          id: string;
        }>;
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

export type GetContentQuery = {
  __typename: "Query";
  contents: {
    __typename: "ContentEntityResponseCollection";
    data: Array<{
      __typename: "ContentEntity";
      attributes: {
        __typename: "Content";
        slug: string;
        titles: Array<{
          __typename: "ComponentTranslationsTitle";
          pre_title: string;
          title: string;
          subtitle: string;
        }>;
        categories: {
          __typename: "CategoryRelationResponseCollection";
          data: Array<{
            __typename: "CategoryEntity";
            id: string;
            attributes: {
              __typename: "Category";
              name: string;
              short: string;
            };
          }>;
        };
        type: {
          __typename: "ContentTypeEntityResponse";
          data: {
            __typename: "ContentTypeEntity";
            attributes: {
              __typename: "ContentType";
              slug: string;
              titles: Array<{
                __typename: "ComponentTranslationsSimpleTitle";
                title: string;
              }>;
            };
          };
        };
        ranged_contents: {
          __typename: "RangedContentRelationResponseCollection";
          data: Array<{
            __typename: "RangedContentEntity";
            id: string;
            attributes: {
              __typename: "RangedContent";
              slug: string;
              scan_set: Array<{
                __typename: "ComponentSetsScanSet";
                id: string;
              }>;
              library_item: {
                __typename: "LibraryItemEntityResponse";
                data: {
                  __typename: "LibraryItemEntity";
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
                };
              };
            };
          }>;
        };
        text_set: Array<{
          __typename: "ComponentSetsTextSet";
          id: string;
        }>;
        video_set: Array<{
          __typename: "ComponentSetsVideoSet";
          id: string;
        }>;
        audio_set: Array<{
          __typename: "ComponentSetsAudioSet";
          id: string;
        }>;
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

export type GetContentTextQueryVariables = Exact<{
  slug: InputMaybe<Scalars["String"]>;
  language_code: InputMaybe<Scalars["String"]>;
}>;

export type GetContentTextQuery = {
  __typename: "Query";
  contents: {
    __typename: "ContentEntityResponseCollection";
    data: Array<{
      __typename: "ContentEntity";
      attributes: {
        __typename: "Content";
        slug: string;
        titles: Array<{
          __typename: "ComponentTranslationsTitle";
          pre_title: string;
          title: string;
          subtitle: string;
        }>;
        categories: {
          __typename: "CategoryRelationResponseCollection";
          data: Array<{
            __typename: "CategoryEntity";
            id: string;
            attributes: {
              __typename: "Category";
              name: string;
              short: string;
            };
          }>;
        };
        type: {
          __typename: "ContentTypeEntityResponse";
          data: {
            __typename: "ContentTypeEntity";
            attributes: {
              __typename: "ContentType";
              slug: string;
              titles: Array<{
                __typename: "ComponentTranslationsSimpleTitle";
                title: string;
              }>;
            };
          };
        };
        ranged_contents: {
          __typename: "RangedContentRelationResponseCollection";
          data: Array<{
            __typename: "RangedContentEntity";
            id: string;
            attributes: {
              __typename: "RangedContent";
              slug: string;
              scan_set: Array<{
                __typename: "ComponentSetsScanSet";
                id: string;
              }>;
              library_item: {
                __typename: "LibraryItemEntityResponse";
                data: {
                  __typename: "LibraryItemEntity";
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
                };
              };
            };
          }>;
        };
        text_set: Array<{
          __typename: "ComponentSetsTextSet";
          status: Enum_Componentsetstextset_Status;
          text: string;
          notes: string;
          source_language: {
            __typename: "LanguageEntityResponse";
            data: {
              __typename: "LanguageEntity";
              attributes: { __typename: "Language"; name: string };
            };
          };
          transcribers: {
            __typename: "RecorderRelationResponseCollection";
            data: Array<{
              __typename: "RecorderEntity";
              attributes: {
                __typename: "Recorder";
                username: string;
                anonymize: boolean;
                anonymous_code: string;
                avatar: {
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
          translators: {
            __typename: "RecorderRelationResponseCollection";
            data: Array<{
              __typename: "RecorderEntity";
              attributes: {
                __typename: "Recorder";
                username: string;
                anonymize: boolean;
                anonymous_code: string;
                avatar: {
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
          proofreaders: {
            __typename: "RecorderRelationResponseCollection";
            data: Array<{
              __typename: "RecorderEntity";
              attributes: {
                __typename: "Recorder";
                username: string;
                anonymize: boolean;
                anonymous_code: string;
                avatar: {
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
        }>;
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
