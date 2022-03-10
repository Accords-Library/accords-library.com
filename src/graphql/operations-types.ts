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

export type StrapiImage = {
  __typename: "UploadFile";
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
};

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
        library: string;
        contents: string;
        wiki: string;
        chronicles: string;
        library_short_description: string;
        contents_short_description: string;
        wiki_short_description: string;
        chronicles_short_description: string;
        news: string;
        merch: string;
        gallery: string;
        archives: string;
        about_us: string;
        licensing_notice: string;
        copyright_notice: string;
        contents_description: string;
        type: string;
        category: string;
        categories: string;
        size: string;
        release_date: string;
        release_year: string;
        details: string;
        price: string;
        width: string;
        height: string;
        thickness: string;
        subitem: string;
        subitems: string;
        subitem_of: string;
        variant: string;
        variants: string;
        variant_of: string;
        summary: string;
        audio: string;
        video: string;
        textual: string;
        game: string;
        other: string;
        return_to: string;
        left_to_right: string;
        right_to_left: string;
        page: string;
        pages: string;
        page_order: string;
        binding: string;
        type_information: string;
        front_matter: string;
        back_matter: string;
        open_content: string;
        read_content: string;
        watch_content: string;
        listen_content: string;
        view_scans: string;
        paperback: string;
        hardcover: string;
        languages: string;
        select_language: string;
        language: string;
        library_description: string;
        wiki_description: string;
        chronicles_description: string;
        news_description: string;
        merch_description: string;
        gallery_description: string;
        archives_description: string;
        about_us_description: string;
        page_not_found: string;
        default_description: string;
        name: string;
        show_subitems: string;
        show_primary_items: string;
        show_secondary_items: string;
        no_type: string;
        no_year: string;
        order_by: string;
        group_by: string;
        select_option_sidebar: string;
        group: string;
        settings: string;
        theme: string;
        light: string;
        auto: string;
        dark: string;
        font_size: string;
        player_name: string;
        currency: string;
        font: string;
        calculated: string;
        status_incomplete: string;
        status_draft: string;
        status_review: string;
        status_done: string;
        incomplete: string;
        draft: string;
        review: string;
        done: string;
        status: string;
        transcribers: string;
        translators: string;
        proofreaders: string;
        transcript_notice: string;
        translation_notice: string;
        source_language: string;
        pronouns: string;
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
        root_item: boolean;
        primary: boolean;
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
                rate_to_usd: number;
              };
            };
          };
        };
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
        metadata: Array<
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
              __typename: "ComponentMetadataGame";
              platforms: {
                __typename: "GamePlatformRelationResponseCollection";
                data: Array<{
                  __typename: "GamePlatformEntity";
                  id: string;
                  attributes: {
                    __typename: "GamePlatform";
                    short: string;
                  };
                }>;
              };
            }
          | {
              __typename: "ComponentMetadataGroup";
              subtype: {
                __typename: "GroupSubtypeEntityResponse";
                data: {
                  __typename: "GroupSubtypeEntity";
                  attributes: {
                    __typename: "GroupSubtype";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
              subitems_type: {
                __typename: "MetadataTypeEntityResponse";
                data: {
                  __typename: "MetadataTypeEntity";
                  attributes: {
                    __typename: "MetadataType";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
            }
          | { __typename: "ComponentMetadataOther" }
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
        root_item: boolean;
        primary: boolean;
        digital: boolean;
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
                rate_to_usd: number;
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
              __typename: "ComponentMetadataGame";
              platforms: {
                __typename: "GamePlatformRelationResponseCollection";
                data: Array<{
                  __typename: "GamePlatformEntity";
                  id: string;
                  attributes: {
                    __typename: "GamePlatform";
                    short: string;
                  };
                }>;
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
              __typename: "ComponentMetadataGroup";
              subtype: {
                __typename: "GroupSubtypeEntityResponse";
                data: {
                  __typename: "GroupSubtypeEntity";
                  attributes: {
                    __typename: "GroupSubtype";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
              subitems_type: {
                __typename: "MetadataTypeEntityResponse";
                data: {
                  __typename: "MetadataTypeEntity";
                  attributes: {
                    __typename: "MetadataType";
                    slug: string;
                    titles: Array<{
                      __typename: "ComponentTranslationsSimpleTitle";
                      title: string;
                    }>;
                  };
                };
              };
            }
          | { __typename: "ComponentMetadataOther" }
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
                      rate_to_usd: number;
                    };
                  };
                };
              };
              metadata: Array<
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
                    __typename: "ComponentMetadataGame";
                    platforms: {
                      __typename: "GamePlatformRelationResponseCollection";
                      data: Array<{
                        __typename: "GamePlatformEntity";
                        id: string;
                        attributes: {
                          __typename: "GamePlatform";
                          short: string;
                        };
                      }>;
                    };
                  }
                | {
                    __typename: "ComponentMetadataGroup";
                    subtype: {
                      __typename: "GroupSubtypeEntityResponse";
                      data: {
                        __typename: "GroupSubtypeEntity";
                        attributes: {
                          __typename: "GroupSubtype";
                          slug: string;
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
                    };
                    subitems_type: {
                      __typename: "MetadataTypeEntityResponse";
                      data: {
                        __typename: "MetadataTypeEntity";
                        attributes: {
                          __typename: "MetadataType";
                          slug: string;
                          titles: Array<{
                            __typename: "ComponentTranslationsSimpleTitle";
                            title: string;
                          }>;
                        };
                      };
                    };
                  }
                | { __typename: "ComponentMetadataOther" }
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

export type GetContentQueryVariables = Exact<{
  slug: InputMaybe<Scalars["String"]>;
  language_code: InputMaybe<Scalars["String"]>;
}>;

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
          description: string;
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
      id: string;
      attributes: {
        __typename: "Content";
        slug: string;
        titles: Array<{
          __typename: "ComponentTranslationsTitle";
          pre_title: string;
          title: string;
          subtitle: string;
          description: string;
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
              attributes: { __typename: "Language"; code: string };
            };
          };
          transcribers: {
            __typename: "RecorderRelationResponseCollection";
            data: Array<{
              __typename: "RecorderEntity";
              id: string;
              attributes: {
                __typename: "Recorder";
                username: string;
                anonymize: boolean;
                anonymous_code: string;
                pronouns: string;
                bio: Array<{
                  __typename: "ComponentTranslationsBio";
                  bio: string;
                }>;
                languages: {
                  __typename: "LanguageRelationResponseCollection";
                  data: Array<{
                    __typename: "LanguageEntity";
                    attributes: {
                      __typename: "Language";
                      code: string;
                    };
                  }>;
                };
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
              id: string;
              attributes: {
                __typename: "Recorder";
                username: string;
                anonymize: boolean;
                anonymous_code: string;
                pronouns: string;
                bio: Array<{
                  __typename: "ComponentTranslationsBio";
                  bio: string;
                }>;
                languages: {
                  __typename: "LanguageRelationResponseCollection";
                  data: Array<{
                    __typename: "LanguageEntity";
                    attributes: {
                      __typename: "Language";
                      code: string;
                    };
                  }>;
                };
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
              id: string;
              attributes: {
                __typename: "Recorder";
                username: string;
                anonymize: boolean;
                anonymous_code: string;
                pronouns: string;
                bio: Array<{
                  __typename: "ComponentTranslationsBio";
                  bio: string;
                }>;
                languages: {
                  __typename: "LanguageRelationResponseCollection";
                  data: Array<{
                    __typename: "LanguageEntity";
                    attributes: {
                      __typename: "Language";
                      code: string;
                    };
                  }>;
                };
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

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrenciesQuery = {
  __typename: "Query";
  currencies: {
    __typename: "CurrencyEntityResponseCollection";
    data: Array<{
      __typename: "CurrencyEntity";
      id: string;
      attributes: {
        __typename: "Currency";
        code: string;
        symbol: string;
        rate_to_usd: number;
        display_decimals: boolean;
      };
    }>;
  };
};

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetLanguagesQuery = {
  __typename: "Query";
  languages: {
    __typename: "LanguageEntityResponseCollection";
    data: Array<{
      __typename: "LanguageEntity";
      id: string;
      attributes: {
        __typename: "Language";
        name: string;
        code: string;
        localized_name: string;
      };
    }>;
  };
};
