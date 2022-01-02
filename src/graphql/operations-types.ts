export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
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

export type Error = {
  __typename?: "Error";
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

export type Pagination = {
  __typename?: "Pagination";
  total: Scalars["Int"];
  page: Scalars["Int"];
  pageSize: Scalars["Int"];
  pageCount: Scalars["Int"];
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  not?: InputMaybe<IdFilterInput>;
  eq?: InputMaybe<Scalars["ID"]>;
  ne?: InputMaybe<Scalars["ID"]>;
  startsWith?: InputMaybe<Scalars["ID"]>;
  endsWith?: InputMaybe<Scalars["ID"]>;
  contains?: InputMaybe<Scalars["ID"]>;
  notContains?: InputMaybe<Scalars["ID"]>;
  containsi?: InputMaybe<Scalars["ID"]>;
  notContainsi?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  gte?: InputMaybe<Scalars["ID"]>;
  lt?: InputMaybe<Scalars["ID"]>;
  lte?: InputMaybe<Scalars["ID"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  not?: InputMaybe<BooleanFilterInput>;
  eq?: InputMaybe<Scalars["Boolean"]>;
  ne?: InputMaybe<Scalars["Boolean"]>;
  startsWith?: InputMaybe<Scalars["Boolean"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]>;
  contains?: InputMaybe<Scalars["Boolean"]>;
  notContains?: InputMaybe<Scalars["Boolean"]>;
  containsi?: InputMaybe<Scalars["Boolean"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  not?: InputMaybe<StringFilterInput>;
  eq?: InputMaybe<Scalars["String"]>;
  ne?: InputMaybe<Scalars["String"]>;
  startsWith?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  contains?: InputMaybe<Scalars["String"]>;
  notContains?: InputMaybe<Scalars["String"]>;
  containsi?: InputMaybe<Scalars["String"]>;
  notContainsi?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  not?: InputMaybe<IntFilterInput>;
  eq?: InputMaybe<Scalars["Int"]>;
  ne?: InputMaybe<Scalars["Int"]>;
  startsWith?: InputMaybe<Scalars["Int"]>;
  endsWith?: InputMaybe<Scalars["Int"]>;
  contains?: InputMaybe<Scalars["Int"]>;
  notContains?: InputMaybe<Scalars["Int"]>;
  containsi?: InputMaybe<Scalars["Int"]>;
  notContainsi?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  not?: InputMaybe<FloatFilterInput>;
  eq?: InputMaybe<Scalars["Float"]>;
  ne?: InputMaybe<Scalars["Float"]>;
  startsWith?: InputMaybe<Scalars["Float"]>;
  endsWith?: InputMaybe<Scalars["Float"]>;
  contains?: InputMaybe<Scalars["Float"]>;
  notContains?: InputMaybe<Scalars["Float"]>;
  containsi?: InputMaybe<Scalars["Float"]>;
  notContainsi?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  not?: InputMaybe<DateTimeFilterInput>;
  eq?: InputMaybe<Scalars["DateTime"]>;
  ne?: InputMaybe<Scalars["DateTime"]>;
  startsWith?: InputMaybe<Scalars["DateTime"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]>;
  contains?: InputMaybe<Scalars["DateTime"]>;
  notContains?: InputMaybe<Scalars["DateTime"]>;
  containsi?: InputMaybe<Scalars["DateTime"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  not?: InputMaybe<JsonFilterInput>;
  eq?: InputMaybe<Scalars["JSON"]>;
  ne?: InputMaybe<Scalars["JSON"]>;
  startsWith?: InputMaybe<Scalars["JSON"]>;
  endsWith?: InputMaybe<Scalars["JSON"]>;
  contains?: InputMaybe<Scalars["JSON"]>;
  notContains?: InputMaybe<Scalars["JSON"]>;
  containsi?: InputMaybe<Scalars["JSON"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]>;
  gt?: InputMaybe<Scalars["JSON"]>;
  gte?: InputMaybe<Scalars["JSON"]>;
  lt?: InputMaybe<Scalars["JSON"]>;
  lte?: InputMaybe<Scalars["JSON"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
};

export type ComponentBasicsCreditsInput = {
  id?: InputMaybe<Scalars["ID"]>;
  source_language?: InputMaybe<Scalars["ID"]>;
  transcribers?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  scanners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cleaners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  typesetters?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  subbers?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  footnotes?: InputMaybe<Scalars["String"]>;
};

export type ComponentBasicsCredits = {
  __typename?: "ComponentBasicsCredits";
  id: Scalars["ID"];
  source_language?: Maybe<LanguageEntityResponse>;
  transcribers?: Maybe<RecorderRelationResponseCollection>;
  translators?: Maybe<RecorderRelationResponseCollection>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  scanners?: Maybe<RecorderRelationResponseCollection>;
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  typesetters?: Maybe<RecorderRelationResponseCollection>;
  subbers?: Maybe<RecorderRelationResponseCollection>;
  footnotes?: Maybe<Scalars["String"]>;
};

export type ComponentBasicsCreditsTranscribersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsCreditsTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsCreditsProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsCreditsScannersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsCreditsCleanersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsCreditsTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsCreditsSubbersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsDatepickerInput = {
  id?: InputMaybe<Scalars["ID"]>;
  year?: InputMaybe<Scalars["Int"]>;
  month?: InputMaybe<Scalars["Int"]>;
  day?: InputMaybe<Scalars["Int"]>;
};

export type ComponentBasicsDatepicker = {
  __typename?: "ComponentBasicsDatepicker";
  id: Scalars["ID"];
  year?: Maybe<Scalars["Int"]>;
  month?: Maybe<Scalars["Int"]>;
  day?: Maybe<Scalars["Int"]>;
};

export type ComponentBasicsPriceInput = {
  id?: InputMaybe<Scalars["ID"]>;
  amount?: InputMaybe<Scalars["Float"]>;
  currency?: InputMaybe<Scalars["ID"]>;
};

export type ComponentBasicsPrice = {
  __typename?: "ComponentBasicsPrice";
  id: Scalars["ID"];
  amount?: Maybe<Scalars["Float"]>;
  currency?: Maybe<CurrencyEntityResponse>;
};

export type ComponentBasicsSizeInput = {
  id?: InputMaybe<Scalars["ID"]>;
  width?: InputMaybe<Scalars["Int"]>;
  height?: InputMaybe<Scalars["Int"]>;
  thickness?: InputMaybe<Scalars["Int"]>;
};

export type ComponentBasicsSize = {
  __typename?: "ComponentBasicsSize";
  id: Scalars["ID"];
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  thickness?: Maybe<Scalars["Int"]>;
};

export type ComponentCollectionsComponentEventFiltersInput = {
  source?: InputMaybe<SourceFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentEventFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentEventFiltersInput>>
  >;
  not?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
};

export type ComponentCollectionsComponentEventInput = {
  id?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsChronologyItemInput>>
  >;
  source?: InputMaybe<Scalars["ID"]>;
};

export type ComponentCollectionsComponentEvent = {
  __typename?: "ComponentCollectionsComponentEvent";
  id: Scalars["ID"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronologyItem>>>;
  source?: Maybe<SourceEntityResponse>;
};

export type ComponentCollectionsComponentEventTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionFiltersInput = {
  source?: InputMaybe<SourceFiltersInput>;
  categories?: InputMaybe<CategoryFiltersInput>;
  and?: InputMaybe<
    Array<
      InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>
    >
  >;
  or?: InputMaybe<
    Array<
      InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>
    >
  >;
  not?: InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>;
};

export type ComponentCollectionsComponentGlossaryDefinitionInput = {
  id?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsGlossaryDefinitionInput>>
  >;
  source?: InputMaybe<Scalars["ID"]>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentCollectionsComponentGlossaryDefinition = {
  __typename?: "ComponentCollectionsComponentGlossaryDefinition";
  id: Scalars["ID"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsGlossaryDefinition>>>;
  source?: Maybe<SourceEntityResponse>;
  categories?: Maybe<CategoryRelationResponseCollection>;
};

export type ComponentCollectionsComponentGlossaryDefinitionTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentWeaponStoryFiltersInput = {
  source?: InputMaybe<SourceFiltersInput>;
  categories?: InputMaybe<CategoryFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>>
  >;
  not?: InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>;
};

export type ComponentCollectionsComponentWeaponStoryInput = {
  id?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryStoryInput>>
  >;
  source?: InputMaybe<Scalars["ID"]>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentCollectionsComponentWeaponStory = {
  __typename?: "ComponentCollectionsComponentWeaponStory";
  id: Scalars["ID"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryStory>>>;
  source?: Maybe<SourceEntityResponse>;
  categories?: Maybe<CategoryRelationResponseCollection>;
};

export type ComponentCollectionsComponentWeaponStoryTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentWeaponStoryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataAudio = {
  __typename?: "ComponentMetadataAudio";
  id: Scalars["ID"];
  languages?: Maybe<LanguageRelationResponseCollection>;
  subtype?: Maybe<AudioSubtypeEntityResponse>;
};

export type ComponentMetadataAudioLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataBooks = {
  __typename?: "ComponentMetadataBooks";
  id: Scalars["ID"];
  binding_type?: Maybe<Scalars["String"]>;
  page_count?: Maybe<Scalars["Int"]>;
  languages?: Maybe<LanguageRelationResponseCollection>;
  page_order: Scalars["String"];
  subtype?: Maybe<TextualSubtypeEntityResponse>;
};

export type ComponentMetadataBooksLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGame = {
  __typename?: "ComponentMetadataGame";
  id: Scalars["ID"];
  platform?: Maybe<GamePlatformEntityResponse>;
  demo: Scalars["Boolean"];
  audio_languages?: Maybe<LanguageRelationResponseCollection>;
  sub_languages?: Maybe<LanguageRelationResponseCollection>;
  interface_languages?: Maybe<LanguageRelationResponseCollection>;
};

export type ComponentMetadataGameAudio_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGameSub_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGameInterface_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataVideo = {
  __typename?: "ComponentMetadataVideo";
  id: Scalars["ID"];
  resolution?: Maybe<Scalars["String"]>;
  audio_languages?: Maybe<LanguageRelationResponseCollection>;
  sub_languages?: Maybe<LanguageEntityResponse>;
};

export type ComponentMetadataVideoAudio_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentPageBuilderComponentPaneFiltersInput = {
  text?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentPageBuilderComponentPaneFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentPageBuilderComponentPaneFiltersInput>>
  >;
  not?: InputMaybe<ComponentPageBuilderComponentPaneFiltersInput>;
};

export type ComponentPageBuilderComponentPane = {
  __typename?: "ComponentPageBuilderComponentPane";
  id: Scalars["ID"];
  text?: Maybe<Scalars["String"]>;
};

export type ComponentPageBuilderComponentTabFiltersInput = {
  text?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentPageBuilderComponentTabFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentPageBuilderComponentTabFiltersInput>>
  >;
  not?: InputMaybe<ComponentPageBuilderComponentTabFiltersInput>;
};

export type ComponentPageBuilderComponentTab = {
  __typename?: "ComponentPageBuilderComponentTab";
  id: Scalars["ID"];
  text?: Maybe<Scalars["String"]>;
};

export type ComponentPageBuilderGallery = {
  __typename?: "ComponentPageBuilderGallery";
  id: Scalars["ID"];
  gallery?: Maybe<UploadFileRelationResponseCollection>;
};

export type ComponentPageBuilderGalleryGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentPageBuilderGrid = {
  __typename?: "ComponentPageBuilderGrid";
  id: Scalars["ID"];
  column_count: Scalars["Int"];
  panes?: Maybe<Array<Maybe<ComponentPageBuilderComponentPane>>>;
};

export type ComponentPageBuilderGridPanesArgs = {
  filters?: InputMaybe<ComponentPageBuilderComponentPaneFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentPageBuilderTabs = {
  __typename?: "ComponentPageBuilderTabs";
  id: Scalars["ID"];
  tabs?: Maybe<Array<Maybe<ComponentPageBuilderComponentTab>>>;
};

export type ComponentPageBuilderTabsTabsArgs = {
  filters?: InputMaybe<ComponentPageBuilderComponentTabFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentPageBuilderText = {
  __typename?: "ComponentPageBuilderText";
  id: Scalars["ID"];
  text?: Maybe<Scalars["String"]>;
};

export type ComponentRangeGameAspect = {
  __typename?: "ComponentRangeGameAspect";
  id: Scalars["ID"];
  note?: Maybe<Scalars["String"]>;
};

export type ComponentRangeOther = {
  __typename?: "ComponentRangeOther";
  id: Scalars["ID"];
  note?: Maybe<Scalars["String"]>;
};

export type ComponentRangePageRange = {
  __typename?: "ComponentRangePageRange";
  id: Scalars["ID"];
  starting_page?: Maybe<Scalars["Int"]>;
  ending_page?: Maybe<Scalars["Int"]>;
};

export type ComponentRangeTimeRange = {
  __typename?: "ComponentRangeTimeRange";
  id: Scalars["ID"];
  starting_time?: Maybe<Scalars["Time"]>;
  ending_time?: Maybe<Scalars["Time"]>;
};

export type ComponentSourceLibraryText = {
  __typename?: "ComponentSourceLibraryText";
  id: Scalars["ID"];
  text_set?: Maybe<TextSetEntityResponse>;
};

export type ComponentSourceUrlSource = {
  __typename?: "ComponentSourceUrlSource";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
  credits: ComponentBasicsCredits;
};

export type ComponentTranslationsAudioSetsFiltersInput = {
  language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsAudioSetsFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsAudioSetsFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsAudioSetsFiltersInput>;
};

export type ComponentTranslationsAudioSetsInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  audiofile?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Scalars["String"]>;
  credits?: InputMaybe<ComponentBasicsCreditsInput>;
};

export type ComponentTranslationsAudioSets = {
  __typename?: "ComponentTranslationsAudioSets";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  audiofile: UploadFileEntityResponse;
  status: Scalars["String"];
  credits: ComponentBasicsCredits;
};

export type ComponentTranslationsChronologyEraFiltersInput = {
  title?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsChronologyEraFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsChronologyEraFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsChronologyEraFiltersInput>;
};

export type ComponentTranslationsChronologyEraInput = {
  id?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsChronologyEra = {
  __typename?: "ComponentTranslationsChronologyEra";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsChronologyItemFiltersInput = {
  language?: InputMaybe<LanguageFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  note?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsChronologyItemFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsChronologyItemFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
};

export type ComponentTranslationsChronologyItemInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  note?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsChronologyItem = {
  __typename?: "ComponentTranslationsChronologyItem";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  note?: Maybe<Scalars["String"]>;
  status: Scalars["String"];
};

export type ComponentTranslationsGlossaryDefinitionFiltersInput = {
  definition?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
};

export type ComponentTranslationsGlossaryDefinitionInput = {
  id?: InputMaybe<Scalars["ID"]>;
  definition?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsGlossaryDefinition = {
  __typename?: "ComponentTranslationsGlossaryDefinition";
  id: Scalars["ID"];
  definition?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
  status: Scalars["String"];
};

export type ComponentTranslationsGlossaryItemFiltersInput = {
  title?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
};

export type ComponentTranslationsGlossaryItemInput = {
  id?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsGlossaryItem = {
  __typename?: "ComponentTranslationsGlossaryItem";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsLibraryContentFiltersInput = {
  title?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsLibraryContentFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsLibraryContentFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsLibraryContentFiltersInput>;
};

export type ComponentTranslationsLibraryContentInput = {
  id?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsLibraryContent = {
  __typename?: "ComponentTranslationsLibraryContent";
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsLibraryItemsFiltersInput = {
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>;
};

export type ComponentTranslationsLibraryItemsInput = {
  id?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsLibraryItems = {
  __typename?: "ComponentTranslationsLibraryItems";
  id: Scalars["ID"];
  description: Scalars["String"];
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsPostsFiltersInput = {
  Status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  excerpt?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsPostsFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsPostsFiltersInput>>>;
  not?: InputMaybe<ComponentTranslationsPostsFiltersInput>;
};

export type ComponentTranslationsPostsInput = {
  id?: InputMaybe<Scalars["ID"]>;
  Status?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  excerpt?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsPosts = {
  __typename?: "ComponentTranslationsPosts";
  id: Scalars["ID"];
  Status: Scalars["String"];
  title: Scalars["String"];
  excerpt?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
};

export type ComponentTranslationsScanSetFiltersInput = {
  language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsScanSetFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsScanSetFiltersInput>>>;
  not?: InputMaybe<ComponentTranslationsScanSetFiltersInput>;
};

export type ComponentTranslationsScanSetInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  status?: InputMaybe<Scalars["String"]>;
  credits?: InputMaybe<ComponentBasicsCreditsInput>;
};

export type ComponentTranslationsScanSet = {
  __typename?: "ComponentTranslationsScanSet";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  pages: UploadFileRelationResponseCollection;
  status: Scalars["String"];
  credits: ComponentBasicsCredits;
};

export type ComponentTranslationsScanSetPagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentTranslationsTextSetFiltersInput = {
  text?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsTextSetFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsTextSetFiltersInput>>>;
  not?: InputMaybe<ComponentTranslationsTextSetFiltersInput>;
};

export type ComponentTranslationsTextSetInput = {
  id?: InputMaybe<Scalars["ID"]>;
  text?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Scalars["String"]>;
  credits?: InputMaybe<ComponentBasicsCreditsInput>;
};

export type ComponentTranslationsTextSet = {
  __typename?: "ComponentTranslationsTextSet";
  id: Scalars["ID"];
  text?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
  status: Scalars["String"];
  credits: ComponentBasicsCredits;
};

export type ComponentTranslationsVideoSetsFiltersInput = {
  language?: InputMaybe<LanguageFiltersInput>;
  video_url?: InputMaybe<StringFilterInput>;
  video_embed?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsVideoSetsFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsVideoSetsFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsVideoSetsFiltersInput>;
};

export type ComponentTranslationsVideoSetsInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  video_url?: InputMaybe<Scalars["String"]>;
  video_embed?: InputMaybe<Scalars["String"]>;
  subfile?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Scalars["String"]>;
  credits?: InputMaybe<ComponentBasicsCreditsInput>;
};

export type ComponentTranslationsVideoSets = {
  __typename?: "ComponentTranslationsVideoSets";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  video_url: Scalars["String"];
  video_embed?: Maybe<Scalars["String"]>;
  subfile?: Maybe<UploadFileEntityResponse>;
  status: Scalars["String"];
  credits: ComponentBasicsCredits;
};

export type ComponentTranslationsWeaponStoryStoryFiltersInput = {
  description?: InputMaybe<StringFilterInput>;
  level_1?: InputMaybe<StringFilterInput>;
  level_2?: InputMaybe<StringFilterInput>;
  level_3?: InputMaybe<StringFilterInput>;
  level_4?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
};

export type ComponentTranslationsWeaponStoryStoryInput = {
  id?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  level_1?: InputMaybe<Scalars["String"]>;
  level_2?: InputMaybe<Scalars["String"]>;
  level_3?: InputMaybe<Scalars["String"]>;
  level_4?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsWeaponStoryStory = {
  __typename?: "ComponentTranslationsWeaponStoryStory";
  id: Scalars["ID"];
  description?: Maybe<Scalars["String"]>;
  level_1?: Maybe<Scalars["String"]>;
  level_2?: Maybe<Scalars["String"]>;
  level_3?: Maybe<Scalars["String"]>;
  level_4?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
  status: Scalars["String"];
};

export type ComponentTranslationsWeaponStoryTypeFiltersInput = {
  name?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
};

export type ComponentTranslationsWeaponStoryTypeInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsWeaponStoryType = {
  __typename?: "ComponentTranslationsWeaponStoryType";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsWeaponStoryFiltersInput = {
  name?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  and?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>>
  >;
  or?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>>
  >;
  not?: InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>;
};

export type ComponentTranslationsWeaponStoryInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsWeaponStory = {
  __typename?: "ComponentTranslationsWeaponStory";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  language?: Maybe<LanguageEntityResponse>;
};

export type UploadFileFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  alternativeText?: InputMaybe<StringFilterInput>;
  caption?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  not?: InputMaybe<UploadFileFiltersInput>;
};

export type UploadFileInput = {
  name?: InputMaybe<Scalars["String"]>;
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["Int"]>;
  height?: InputMaybe<Scalars["Int"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash?: InputMaybe<Scalars["String"]>;
  ext?: InputMaybe<Scalars["String"]>;
  mime?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["Float"]>;
  url?: InputMaybe<Scalars["String"]>;
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  name: Scalars["String"];
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["Int"]>;
  height?: Maybe<Scalars["Int"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["Float"];
  url: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<UploadFile>;
};

export type UploadFileEntityResponse = {
  __typename?: "UploadFileEntityResponse";
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type I18NLocaleFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
};

export type I18NLocale = {
  __typename?: "I18NLocale";
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type I18NLocaleEntity = {
  __typename?: "I18NLocaleEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<I18NLocale>;
};

export type I18NLocaleEntityResponse = {
  __typename?: "I18NLocaleEntityResponse";
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: "I18NLocaleEntityResponseCollection";
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsPermissionFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  action?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"];
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: "UsersPermissionsPermissionEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<UsersPermissionsPermission>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRoleFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: "UsersPermissionsRoleEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: "UsersPermissionsRoleEntityResponse";
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  username?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  password?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  blocked?: InputMaybe<BooleanFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsUserInput = {
  username?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  confirmationToken?: InputMaybe<Scalars["String"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  blocked?: InputMaybe<Scalars["Boolean"]>;
  role?: InputMaybe<Scalars["ID"]>;
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsUserEntity = {
  __typename?: "UsersPermissionsUserEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<UsersPermissionsUser>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
};

export type AudioSetFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  library_contents?: InputMaybe<LibraryContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AudioSetFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<AudioSetFiltersInput>>>;
  not?: InputMaybe<AudioSetFiltersInput>;
};

export type AudioSetInput = {
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsAudioSetsInput>>
  >;
  library_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type AudioSet = {
  __typename?: "AudioSet";
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsAudioSets>>>;
  library_contents?: Maybe<LibraryContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AudioSetTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsAudioSetsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AudioSetLibrary_ContentsArgs = {
  filters?: InputMaybe<LibraryContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AudioSetEntity = {
  __typename?: "AudioSetEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<AudioSet>;
};

export type AudioSetEntityResponse = {
  __typename?: "AudioSetEntityResponse";
  data?: Maybe<AudioSetEntity>;
};

export type AudioSetEntityResponseCollection = {
  __typename?: "AudioSetEntityResponseCollection";
  data: Array<AudioSetEntity>;
  meta: ResponseCollectionMeta;
};

export type AudioSubtypeFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AudioSubtypeFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<AudioSubtypeFiltersInput>>>;
  not?: InputMaybe<AudioSubtypeFiltersInput>;
};

export type AudioSubtypeInput = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type AudioSubtype = {
  __typename?: "AudioSubtype";
  slug: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AudioSubtypeEntity = {
  __typename?: "AudioSubtypeEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<AudioSubtype>;
};

export type AudioSubtypeEntityResponse = {
  __typename?: "AudioSubtypeEntityResponse";
  data?: Maybe<AudioSubtypeEntity>;
};

export type AudioSubtypeEntityResponseCollection = {
  __typename?: "AudioSubtypeEntityResponseCollection";
  data: Array<AudioSubtypeEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  short?: InputMaybe<StringFilterInput>;
  series?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  not?: InputMaybe<CategoryFiltersInput>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars["String"]>;
  short?: InputMaybe<Scalars["String"]>;
  series?: InputMaybe<Scalars["String"]>;
};

export type Category = {
  __typename?: "Category";
  name: Scalars["String"];
  short: Scalars["String"];
  series?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CategoryEntity = {
  __typename?: "CategoryEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Category>;
};

export type CategoryEntityResponse = {
  __typename?: "CategoryEntityResponse";
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: "CategoryEntityResponseCollection";
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryRelationResponseCollection = {
  __typename?: "CategoryRelationResponseCollection";
  data: Array<CategoryEntity>;
};

export type ChronologyEraFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  starting_year?: InputMaybe<IntFilterInput>;
  ending_year?: InputMaybe<IntFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ChronologyEraFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ChronologyEraFiltersInput>>>;
  not?: InputMaybe<ChronologyEraFiltersInput>;
};

export type ChronologyEraInput = {
  starting_year?: InputMaybe<Scalars["Int"]>;
  ending_year?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsChronologyEraInput>>
  >;
};

export type ChronologyEra = {
  __typename?: "ChronologyEra";
  starting_year: Scalars["Int"];
  ending_year: Scalars["Int"];
  slug: Scalars["String"];
  title?: Maybe<Array<Maybe<ComponentTranslationsChronologyEra>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ChronologyEraTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyEraFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronologyEraEntity = {
  __typename?: "ChronologyEraEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<ChronologyEra>;
};

export type ChronologyEraEntityResponse = {
  __typename?: "ChronologyEraEntityResponse";
  data?: Maybe<ChronologyEraEntity>;
};

export type ChronologyEraEntityResponseCollection = {
  __typename?: "ChronologyEraEntityResponseCollection";
  data: Array<ChronologyEraEntity>;
  meta: ResponseCollectionMeta;
};

export type ChronologyItemFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  year?: InputMaybe<IntFilterInput>;
  month?: InputMaybe<IntFilterInput>;
  day?: InputMaybe<IntFilterInput>;
  displayed_date?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ChronologyItemFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ChronologyItemFiltersInput>>>;
  not?: InputMaybe<ChronologyItemFiltersInput>;
};

export type ChronologyItemInput = {
  year?: InputMaybe<Scalars["Int"]>;
  month?: InputMaybe<Scalars["Int"]>;
  day?: InputMaybe<Scalars["Int"]>;
  displayed_date?: InputMaybe<Scalars["String"]>;
  events?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentEventInput>>
  >;
};

export type ChronologyItem = {
  __typename?: "ChronologyItem";
  year: Scalars["Int"];
  month?: Maybe<Scalars["Int"]>;
  day?: Maybe<Scalars["Int"]>;
  displayed_date?: Maybe<Scalars["String"]>;
  events?: Maybe<Array<Maybe<ComponentCollectionsComponentEvent>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ChronologyItemEventsArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronologyItemEntity = {
  __typename?: "ChronologyItemEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<ChronologyItem>;
};

export type ChronologyItemEntityResponse = {
  __typename?: "ChronologyItemEntityResponse";
  data?: Maybe<ChronologyItemEntity>;
};

export type ChronologyItemEntityResponseCollection = {
  __typename?: "ChronologyItemEntityResponseCollection";
  data: Array<ChronologyItemEntity>;
  meta: ResponseCollectionMeta;
};

export type ContentTypeFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ContentTypeFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ContentTypeFiltersInput>>>;
  not?: InputMaybe<ContentTypeFiltersInput>;
};

export type ContentTypeInput = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type ContentType = {
  __typename?: "ContentType";
  slug: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContentTypeEntity = {
  __typename?: "ContentTypeEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<ContentType>;
};

export type ContentTypeEntityResponse = {
  __typename?: "ContentTypeEntityResponse";
  data?: Maybe<ContentTypeEntity>;
};

export type ContentTypeEntityResponseCollection = {
  __typename?: "ContentTypeEntityResponseCollection";
  data: Array<ContentTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type CurrencyFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  symbol?: InputMaybe<StringFilterInput>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<CurrencyFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<CurrencyFiltersInput>>>;
  not?: InputMaybe<CurrencyFiltersInput>;
};

export type CurrencyInput = {
  symbol?: InputMaybe<Scalars["String"]>;
  code?: InputMaybe<Scalars["String"]>;
};

export type Currency = {
  __typename?: "Currency";
  symbol: Scalars["String"];
  code: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CurrencyEntity = {
  __typename?: "CurrencyEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Currency>;
};

export type CurrencyEntityResponse = {
  __typename?: "CurrencyEntityResponse";
  data?: Maybe<CurrencyEntity>;
};

export type CurrencyEntityResponseCollection = {
  __typename?: "CurrencyEntityResponseCollection";
  data: Array<CurrencyEntity>;
  meta: ResponseCollectionMeta;
};

export type GamePlatformFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  short?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<GamePlatformFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<GamePlatformFiltersInput>>>;
  not?: InputMaybe<GamePlatformFiltersInput>;
};

export type GamePlatformInput = {
  name?: InputMaybe<Scalars["String"]>;
  short?: InputMaybe<Scalars["String"]>;
};

export type GamePlatform = {
  __typename?: "GamePlatform";
  name: Scalars["String"];
  short: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GamePlatformEntity = {
  __typename?: "GamePlatformEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<GamePlatform>;
};

export type GamePlatformEntityResponse = {
  __typename?: "GamePlatformEntityResponse";
  data?: Maybe<GamePlatformEntity>;
};

export type GamePlatformEntityResponseCollection = {
  __typename?: "GamePlatformEntityResponseCollection";
  data: Array<GamePlatformEntity>;
  meta: ResponseCollectionMeta;
};

export type GlossaryItemFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<GlossaryItemTypeFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<GlossaryItemFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<GlossaryItemFiltersInput>>>;
  not?: InputMaybe<GlossaryItemFiltersInput>;
};

export type GlossaryItemInput = {
  title?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemInput>>>;
  definitions?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentGlossaryDefinitionInput>>
  >;
  slug?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["ID"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
};

export type GlossaryItem = {
  __typename?: "GlossaryItem";
  title?: Maybe<Array<Maybe<ComponentTranslationsGlossaryItem>>>;
  definitions?: Maybe<
    Array<Maybe<ComponentCollectionsComponentGlossaryDefinition>>
  >;
  slug: Scalars["String"];
  type?: Maybe<GlossaryItemTypeEntityResponse>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GlossaryItemTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type GlossaryItemDefinitionsArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type GlossaryItemEntity = {
  __typename?: "GlossaryItemEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<GlossaryItem>;
};

export type GlossaryItemEntityResponse = {
  __typename?: "GlossaryItemEntityResponse";
  data?: Maybe<GlossaryItemEntity>;
};

export type GlossaryItemEntityResponseCollection = {
  __typename?: "GlossaryItemEntityResponseCollection";
  data: Array<GlossaryItemEntity>;
  meta: ResponseCollectionMeta;
};

export type GlossaryItemTypeFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<GlossaryItemTypeFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<GlossaryItemTypeFiltersInput>>>;
  not?: InputMaybe<GlossaryItemTypeFiltersInput>;
};

export type GlossaryItemTypeInput = {
  type?: InputMaybe<Scalars["String"]>;
};

export type GlossaryItemType = {
  __typename?: "GlossaryItemType";
  type: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GlossaryItemTypeEntity = {
  __typename?: "GlossaryItemTypeEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<GlossaryItemType>;
};

export type GlossaryItemTypeEntityResponse = {
  __typename?: "GlossaryItemTypeEntityResponse";
  data?: Maybe<GlossaryItemTypeEntity>;
};

export type GlossaryItemTypeEntityResponseCollection = {
  __typename?: "GlossaryItemTypeEntityResponseCollection";
  data: Array<GlossaryItemTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type LanguageFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  code?: InputMaybe<StringFilterInput>;
  localized_name?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LanguageFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<LanguageFiltersInput>>>;
  not?: InputMaybe<LanguageFiltersInput>;
};

export type LanguageInput = {
  name?: InputMaybe<Scalars["String"]>;
  code?: InputMaybe<Scalars["String"]>;
  localized_name?: InputMaybe<Scalars["String"]>;
};

export type Language = {
  __typename?: "Language";
  name: Scalars["String"];
  code: Scalars["String"];
  localized_name: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LanguageEntity = {
  __typename?: "LanguageEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Language>;
};

export type LanguageEntityResponse = {
  __typename?: "LanguageEntityResponse";
  data?: Maybe<LanguageEntity>;
};

export type LanguageEntityResponseCollection = {
  __typename?: "LanguageEntityResponseCollection";
  data: Array<LanguageEntity>;
  meta: ResponseCollectionMeta;
};

export type LanguageRelationResponseCollection = {
  __typename?: "LanguageRelationResponseCollection";
  data: Array<LanguageEntity>;
};

export type LibraryContentRangeDynamicZone =
  | ComponentRangePageRange
  | ComponentRangeTimeRange
  | ComponentRangeGameAspect
  | ComponentRangeOther
  | Error;

export type LibraryContentFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  library_item?: InputMaybe<LibraryItemFiltersInput>;
  scan_set?: InputMaybe<ScanSetFiltersInput>;
  text_set?: InputMaybe<TextSetFiltersInput>;
  audio_set?: InputMaybe<AudioSetFiltersInput>;
  video_set?: InputMaybe<VideoSetFiltersInput>;
  type?: InputMaybe<ContentTypeFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LibraryContentFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<LibraryContentFiltersInput>>>;
  not?: InputMaybe<LibraryContentFiltersInput>;
};

export type LibraryContentInput = {
  slug?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsLibraryContentInput>>
  >;
  library_item?: InputMaybe<Scalars["ID"]>;
  scan_set?: InputMaybe<Scalars["ID"]>;
  text_set?: InputMaybe<Scalars["ID"]>;
  range?: InputMaybe<Array<Scalars["LibraryContentRangeDynamicZoneInput"]>>;
  audio_set?: InputMaybe<Scalars["ID"]>;
  video_set?: InputMaybe<Scalars["ID"]>;
  type?: InputMaybe<Scalars["ID"]>;
};

export type LibraryContent = {
  __typename?: "LibraryContent";
  slug: Scalars["String"];
  title?: Maybe<Array<Maybe<ComponentTranslationsLibraryContent>>>;
  library_item?: Maybe<LibraryItemEntityResponse>;
  scan_set?: Maybe<ScanSetEntityResponse>;
  text_set?: Maybe<TextSetEntityResponse>;
  range: Array<Maybe<LibraryContentRangeDynamicZone>>;
  audio_set?: Maybe<AudioSetEntityResponse>;
  video_set?: Maybe<VideoSetEntityResponse>;
  type?: Maybe<ContentTypeEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LibraryContentTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsLibraryContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryContentEntity = {
  __typename?: "LibraryContentEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<LibraryContent>;
};

export type LibraryContentEntityResponse = {
  __typename?: "LibraryContentEntityResponse";
  data?: Maybe<LibraryContentEntity>;
};

export type LibraryContentEntityResponseCollection = {
  __typename?: "LibraryContentEntityResponseCollection";
  data: Array<LibraryContentEntity>;
  meta: ResponseCollectionMeta;
};

export type LibraryContentRelationResponseCollection = {
  __typename?: "LibraryContentRelationResponseCollection";
  data: Array<LibraryContentEntity>;
};

export type LibraryItemMetadataDynamicZone =
  | ComponentMetadataBooks
  | ComponentMetadataVideo
  | ComponentMetadataGame
  | ComponentMetadataAudio
  | Error;

export type LibraryItemFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  subitems?: InputMaybe<LibraryItemFiltersInput>;
  subitem_of?: InputMaybe<LibraryItemFiltersInput>;
  root_item?: InputMaybe<BooleanFilterInput>;
  variants?: InputMaybe<LibraryVariantFiltersInput>;
  contents?: InputMaybe<LibraryContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LibraryItemFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<LibraryItemFiltersInput>>>;
  not?: InputMaybe<LibraryItemFiltersInput>;
};

export type LibraryItemInput = {
  title?: InputMaybe<Scalars["String"]>;
  subtitle?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  subitems?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  subitem_of?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  root_item?: InputMaybe<Scalars["Boolean"]>;
  price?: InputMaybe<ComponentBasicsPriceInput>;
  variants?: InputMaybe<Scalars["ID"]>;
  metadata?: InputMaybe<Array<Scalars["LibraryItemMetadataDynamicZoneInput"]>>;
  size?: InputMaybe<ComponentBasicsSizeInput>;
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  release_date?: InputMaybe<ComponentBasicsDatepickerInput>;
  descriptions?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsLibraryItemsInput>>
  >;
};

export type LibraryItem = {
  __typename?: "LibraryItem";
  title: Scalars["String"];
  subtitle?: Maybe<Scalars["String"]>;
  slug: Scalars["String"];
  thumbnail?: Maybe<UploadFileEntityResponse>;
  subitems?: Maybe<LibraryItemRelationResponseCollection>;
  subitem_of?: Maybe<LibraryItemRelationResponseCollection>;
  root_item: Scalars["Boolean"];
  price?: Maybe<ComponentBasicsPrice>;
  variants?: Maybe<LibraryVariantEntityResponse>;
  metadata?: Maybe<Array<Maybe<LibraryItemMetadataDynamicZone>>>;
  size?: Maybe<ComponentBasicsSize>;
  contents?: Maybe<LibraryContentRelationResponseCollection>;
  release_date?: Maybe<ComponentBasicsDatepicker>;
  descriptions?: Maybe<Array<Maybe<ComponentTranslationsLibraryItems>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LibraryItemSubitemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemSubitem_OfArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemContentsArgs = {
  filters?: InputMaybe<LibraryContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemDescriptionsArgs = {
  filters?: InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemEntity = {
  __typename?: "LibraryItemEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<LibraryItem>;
};

export type LibraryItemEntityResponse = {
  __typename?: "LibraryItemEntityResponse";
  data?: Maybe<LibraryItemEntity>;
};

export type LibraryItemEntityResponseCollection = {
  __typename?: "LibraryItemEntityResponseCollection";
  data: Array<LibraryItemEntity>;
  meta: ResponseCollectionMeta;
};

export type LibraryItemRelationResponseCollection = {
  __typename?: "LibraryItemRelationResponseCollection";
  data: Array<LibraryItemEntity>;
};

export type LibraryVariantFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  items?: InputMaybe<LibraryItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LibraryVariantFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<LibraryVariantFiltersInput>>>;
  not?: InputMaybe<LibraryVariantFiltersInput>;
};

export type LibraryVariantInput = {
  items?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type LibraryVariant = {
  __typename?: "LibraryVariant";
  items?: Maybe<LibraryItemRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LibraryVariantItemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryVariantEntity = {
  __typename?: "LibraryVariantEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<LibraryVariant>;
};

export type LibraryVariantEntityResponse = {
  __typename?: "LibraryVariantEntityResponse";
  data?: Maybe<LibraryVariantEntity>;
};

export type LibraryVariantEntityResponseCollection = {
  __typename?: "LibraryVariantEntityResponseCollection";
  data: Array<LibraryVariantEntity>;
  meta: ResponseCollectionMeta;
};

export type PostFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  authors?: InputMaybe<RecorderFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  categories?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  not?: InputMaybe<PostFiltersInput>;
};

export type PostInput = {
  authors?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slug?: InputMaybe<Scalars["String"]>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsPostsInput>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type Post = {
  __typename?: "Post";
  authors?: Maybe<RecorderRelationResponseCollection>;
  slug: Scalars["String"];
  categories?: Maybe<CategoryRelationResponseCollection>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsPosts>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
};

export type PostAuthorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PostCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PostTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsPostsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PostEntity = {
  __typename?: "PostEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Post>;
};

export type PostEntityResponse = {
  __typename?: "PostEntityResponse";
  data?: Maybe<PostEntity>;
};

export type PostEntityResponseCollection = {
  __typename?: "PostEntityResponseCollection";
  data: Array<PostEntity>;
  meta: ResponseCollectionMeta;
};

export type RecorderFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  username?: InputMaybe<StringFilterInput>;
  anonymize?: InputMaybe<BooleanFilterInput>;
  anonymous_code?: InputMaybe<StringFilterInput>;
  languages?: InputMaybe<LanguageFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<RecorderFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<RecorderFiltersInput>>>;
  not?: InputMaybe<RecorderFiltersInput>;
};

export type RecorderInput = {
  username?: InputMaybe<Scalars["String"]>;
  anonymize?: InputMaybe<Scalars["Boolean"]>;
  anonymous_code?: InputMaybe<Scalars["String"]>;
  avatar?: InputMaybe<Scalars["ID"]>;
  languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type Recorder = {
  __typename?: "Recorder";
  username: Scalars["String"];
  anonymize: Scalars["Boolean"];
  anonymous_code: Scalars["String"];
  avatar?: Maybe<UploadFileEntityResponse>;
  languages?: Maybe<LanguageRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RecorderLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecorderEntity = {
  __typename?: "RecorderEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Recorder>;
};

export type RecorderEntityResponse = {
  __typename?: "RecorderEntityResponse";
  data?: Maybe<RecorderEntity>;
};

export type RecorderEntityResponseCollection = {
  __typename?: "RecorderEntityResponseCollection";
  data: Array<RecorderEntity>;
  meta: ResponseCollectionMeta;
};

export type RecorderRelationResponseCollection = {
  __typename?: "RecorderRelationResponseCollection";
  data: Array<RecorderEntity>;
};

export type ScanSetFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  library_content?: InputMaybe<LibraryContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ScanSetFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<ScanSetFiltersInput>>>;
  not?: InputMaybe<ScanSetFiltersInput>;
};

export type ScanSetInput = {
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsScanSetInput>>
  >;
  library_content?: InputMaybe<Scalars["ID"]>;
};

export type ScanSet = {
  __typename?: "ScanSet";
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsScanSet>>>;
  library_content?: Maybe<LibraryContentEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ScanSetTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsScanSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ScanSetEntity = {
  __typename?: "ScanSetEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<ScanSet>;
};

export type ScanSetEntityResponse = {
  __typename?: "ScanSetEntityResponse";
  data?: Maybe<ScanSetEntity>;
};

export type ScanSetEntityResponseCollection = {
  __typename?: "ScanSetEntityResponseCollection";
  data: Array<ScanSetEntity>;
  meta: ResponseCollectionMeta;
};

export type SourceSourceDynamicZone =
  | ComponentSourceUrlSource
  | ComponentSourceLibraryText
  | Error;

export type SourceFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<SourceFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<SourceFiltersInput>>>;
  not?: InputMaybe<SourceFiltersInput>;
};

export type SourceInput = {
  source?: InputMaybe<Array<Scalars["SourceSourceDynamicZoneInput"]>>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Source = {
  __typename?: "Source";
  source: Array<Maybe<SourceSourceDynamicZone>>;
  name: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type SourceEntity = {
  __typename?: "SourceEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<Source>;
};

export type SourceEntityResponse = {
  __typename?: "SourceEntityResponse";
  data?: Maybe<SourceEntity>;
};

export type SourceEntityResponseCollection = {
  __typename?: "SourceEntityResponseCollection";
  data: Array<SourceEntity>;
  meta: ResponseCollectionMeta;
};

export type TextSetFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  library_contents?: InputMaybe<LibraryContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<TextSetFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<TextSetFiltersInput>>>;
  not?: InputMaybe<TextSetFiltersInput>;
};

export type TextSetInput = {
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsTextSetInput>>
  >;
  library_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type TextSet = {
  __typename?: "TextSet";
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsTextSet>>>;
  library_contents?: Maybe<LibraryContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TextSetTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsTextSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TextSetLibrary_ContentsArgs = {
  filters?: InputMaybe<LibraryContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TextSetEntity = {
  __typename?: "TextSetEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<TextSet>;
};

export type TextSetEntityResponse = {
  __typename?: "TextSetEntityResponse";
  data?: Maybe<TextSetEntity>;
};

export type TextSetEntityResponseCollection = {
  __typename?: "TextSetEntityResponseCollection";
  data: Array<TextSetEntity>;
  meta: ResponseCollectionMeta;
};

export type TextualSubtypeFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<TextualSubtypeFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<TextualSubtypeFiltersInput>>>;
  not?: InputMaybe<TextualSubtypeFiltersInput>;
};

export type TextualSubtypeInput = {
  slug?: InputMaybe<Scalars["String"]>;
};

export type TextualSubtype = {
  __typename?: "TextualSubtype";
  slug: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TextualSubtypeEntity = {
  __typename?: "TextualSubtypeEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<TextualSubtype>;
};

export type TextualSubtypeEntityResponse = {
  __typename?: "TextualSubtypeEntityResponse";
  data?: Maybe<TextualSubtypeEntity>;
};

export type TextualSubtypeEntityResponseCollection = {
  __typename?: "TextualSubtypeEntityResponseCollection";
  data: Array<TextualSubtypeEntity>;
  meta: ResponseCollectionMeta;
};

export type VideoSetFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  library_contents?: InputMaybe<LibraryContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<VideoSetFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<VideoSetFiltersInput>>>;
  not?: InputMaybe<VideoSetFiltersInput>;
};

export type VideoSetInput = {
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsVideoSetsInput>>
  >;
  library_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type VideoSet = {
  __typename?: "VideoSet";
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsVideoSets>>>;
  library_contents?: Maybe<LibraryContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type VideoSetTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsVideoSetsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoSetLibrary_ContentsArgs = {
  filters?: InputMaybe<LibraryContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoSetEntity = {
  __typename?: "VideoSetEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<VideoSet>;
};

export type VideoSetEntityResponse = {
  __typename?: "VideoSetEntityResponse";
  data?: Maybe<VideoSetEntity>;
};

export type VideoSetEntityResponseCollection = {
  __typename?: "VideoSetEntityResponseCollection";
  data: Array<VideoSetEntity>;
  meta: ResponseCollectionMeta;
};

export type WeaponStoryFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<WeaponStoryTypeFiltersInput>;
  weapon_group?: InputMaybe<WeaponStoryGroupFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<WeaponStoryFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<WeaponStoryFiltersInput>>>;
  not?: InputMaybe<WeaponStoryFiltersInput>;
};

export type WeaponStoryInput = {
  name?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryInput>>>;
  slug?: InputMaybe<Scalars["String"]>;
  stories?: InputMaybe<
    Array<InputMaybe<ComponentCollectionsComponentWeaponStoryInput>>
  >;
  type?: InputMaybe<Scalars["ID"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  weapon_group?: InputMaybe<Scalars["ID"]>;
};

export type WeaponStory = {
  __typename?: "WeaponStory";
  name?: Maybe<Array<Maybe<ComponentTranslationsWeaponStory>>>;
  slug?: Maybe<Scalars["String"]>;
  stories?: Maybe<Array<Maybe<ComponentCollectionsComponentWeaponStory>>>;
  type?: Maybe<WeaponStoryTypeEntityResponse>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  weapon_group?: Maybe<WeaponStoryGroupEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type WeaponStoryNameArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WeaponStoryStoriesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WeaponStoryEntity = {
  __typename?: "WeaponStoryEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<WeaponStory>;
};

export type WeaponStoryEntityResponse = {
  __typename?: "WeaponStoryEntityResponse";
  data?: Maybe<WeaponStoryEntity>;
};

export type WeaponStoryEntityResponseCollection = {
  __typename?: "WeaponStoryEntityResponseCollection";
  data: Array<WeaponStoryEntity>;
  meta: ResponseCollectionMeta;
};

export type WeaponStoryRelationResponseCollection = {
  __typename?: "WeaponStoryRelationResponseCollection";
  data: Array<WeaponStoryEntity>;
};

export type WeaponStoryGroupFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  weapons?: InputMaybe<WeaponStoryFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<WeaponStoryGroupFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<WeaponStoryGroupFiltersInput>>>;
  not?: InputMaybe<WeaponStoryGroupFiltersInput>;
};

export type WeaponStoryGroupInput = {
  weapons?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type WeaponStoryGroup = {
  __typename?: "WeaponStoryGroup";
  weapons?: Maybe<WeaponStoryRelationResponseCollection>;
  slug: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type WeaponStoryGroupWeaponsArgs = {
  filters?: InputMaybe<WeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WeaponStoryGroupEntity = {
  __typename?: "WeaponStoryGroupEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<WeaponStoryGroup>;
};

export type WeaponStoryGroupEntityResponse = {
  __typename?: "WeaponStoryGroupEntityResponse";
  data?: Maybe<WeaponStoryGroupEntity>;
};

export type WeaponStoryGroupEntityResponseCollection = {
  __typename?: "WeaponStoryGroupEntityResponseCollection";
  data: Array<WeaponStoryGroupEntity>;
  meta: ResponseCollectionMeta;
};

export type WeaponStoryTypeFiltersInput = {
  id?: InputMaybe<IdFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  and?: InputMaybe<Array<InputMaybe<WeaponStoryTypeFiltersInput>>>;
  or?: InputMaybe<Array<InputMaybe<WeaponStoryTypeFiltersInput>>>;
  not?: InputMaybe<WeaponStoryTypeFiltersInput>;
};

export type WeaponStoryTypeInput = {
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<
    Array<InputMaybe<ComponentTranslationsWeaponStoryTypeInput>>
  >;
};

export type WeaponStoryType = {
  __typename?: "WeaponStoryType";
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryType>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type WeaponStoryTypeTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WeaponStoryTypeEntity = {
  __typename?: "WeaponStoryTypeEntity";
  id?: Maybe<Scalars["ID"]>;
  attributes?: Maybe<WeaponStoryType>;
};

export type WeaponStoryTypeEntityResponse = {
  __typename?: "WeaponStoryTypeEntityResponse";
  data?: Maybe<WeaponStoryTypeEntity>;
};

export type WeaponStoryTypeEntityResponseCollection = {
  __typename?: "WeaponStoryTypeEntityResponseCollection";
  data: Array<WeaponStoryTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type GenericMorph =
  | ComponentBasicsCredits
  | ComponentBasicsDatepicker
  | ComponentBasicsPrice
  | ComponentBasicsSize
  | ComponentCollectionsComponentEvent
  | ComponentCollectionsComponentGlossaryDefinition
  | ComponentCollectionsComponentWeaponStory
  | ComponentMetadataAudio
  | ComponentMetadataBooks
  | ComponentMetadataGame
  | ComponentMetadataVideo
  | ComponentPageBuilderComponentPane
  | ComponentPageBuilderComponentTab
  | ComponentPageBuilderGallery
  | ComponentPageBuilderGrid
  | ComponentPageBuilderTabs
  | ComponentPageBuilderText
  | ComponentRangeGameAspect
  | ComponentRangeOther
  | ComponentRangePageRange
  | ComponentRangeTimeRange
  | ComponentSourceLibraryText
  | ComponentSourceUrlSource
  | ComponentTranslationsAudioSets
  | ComponentTranslationsChronologyEra
  | ComponentTranslationsChronologyItem
  | ComponentTranslationsGlossaryDefinition
  | ComponentTranslationsGlossaryItem
  | ComponentTranslationsLibraryContent
  | ComponentTranslationsLibraryItems
  | ComponentTranslationsPosts
  | ComponentTranslationsScanSet
  | ComponentTranslationsTextSet
  | ComponentTranslationsVideoSets
  | ComponentTranslationsWeaponStoryStory
  | ComponentTranslationsWeaponStoryType
  | ComponentTranslationsWeaponStory
  | UploadFile
  | I18NLocale
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser
  | AudioSet
  | AudioSubtype
  | Category
  | ChronologyEra
  | ChronologyItem
  | ContentType
  | Currency
  | GamePlatform
  | GlossaryItem
  | GlossaryItemType
  | Language
  | LibraryContent
  | LibraryItem
  | LibraryVariant
  | Post
  | Recorder
  | ScanSet
  | Source
  | TextSet
  | TextualSubtype
  | VideoSet
  | WeaponStory
  | WeaponStoryGroup
  | WeaponStoryType;

export type FileInfoInput = {
  name?: InputMaybe<Scalars["String"]>;
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  id: Scalars["ID"];
  username: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: Scalars["String"];
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"];
};

export type PaginationArg = {
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Int"]>;
  limit?: InputMaybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  audioSet?: Maybe<AudioSetEntityResponse>;
  audioSets?: Maybe<AudioSetEntityResponseCollection>;
  audioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  audioSubtypes?: Maybe<AudioSubtypeEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  categories?: Maybe<CategoryEntityResponseCollection>;
  chronologyEra?: Maybe<ChronologyEraEntityResponse>;
  chronologyEras?: Maybe<ChronologyEraEntityResponseCollection>;
  chronologyItem?: Maybe<ChronologyItemEntityResponse>;
  chronologyItems?: Maybe<ChronologyItemEntityResponseCollection>;
  contentType?: Maybe<ContentTypeEntityResponse>;
  contentTypes?: Maybe<ContentTypeEntityResponseCollection>;
  currency?: Maybe<CurrencyEntityResponse>;
  currencies?: Maybe<CurrencyEntityResponseCollection>;
  gamePlatform?: Maybe<GamePlatformEntityResponse>;
  gamePlatforms?: Maybe<GamePlatformEntityResponseCollection>;
  glossaryItem?: Maybe<GlossaryItemEntityResponse>;
  glossaryItems?: Maybe<GlossaryItemEntityResponseCollection>;
  glossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  glossaryItemTypes?: Maybe<GlossaryItemTypeEntityResponseCollection>;
  language?: Maybe<LanguageEntityResponse>;
  languages?: Maybe<LanguageEntityResponseCollection>;
  libraryContent?: Maybe<LibraryContentEntityResponse>;
  libraryContents?: Maybe<LibraryContentEntityResponseCollection>;
  libraryItem?: Maybe<LibraryItemEntityResponse>;
  libraryItems?: Maybe<LibraryItemEntityResponseCollection>;
  libraryVariant?: Maybe<LibraryVariantEntityResponse>;
  libraryVariants?: Maybe<LibraryVariantEntityResponseCollection>;
  post?: Maybe<PostEntityResponse>;
  posts?: Maybe<PostEntityResponseCollection>;
  recorder?: Maybe<RecorderEntityResponse>;
  recorders?: Maybe<RecorderEntityResponseCollection>;
  scanSet?: Maybe<ScanSetEntityResponse>;
  scanSets?: Maybe<ScanSetEntityResponseCollection>;
  source?: Maybe<SourceEntityResponse>;
  sources?: Maybe<SourceEntityResponseCollection>;
  textSet?: Maybe<TextSetEntityResponse>;
  textSets?: Maybe<TextSetEntityResponseCollection>;
  textualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  textualSubtypes?: Maybe<TextualSubtypeEntityResponseCollection>;
  videoSet?: Maybe<VideoSetEntityResponse>;
  videoSets?: Maybe<VideoSetEntityResponseCollection>;
  weaponStory?: Maybe<WeaponStoryEntityResponse>;
  weaponStories?: Maybe<WeaponStoryEntityResponseCollection>;
  weaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  weaponStoryGroups?: Maybe<WeaponStoryGroupEntityResponseCollection>;
  weaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  weaponStoryTypes?: Maybe<WeaponStoryTypeEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAudioSetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAudioSetsArgs = {
  filters?: InputMaybe<AudioSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAudioSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAudioSubtypesArgs = {
  filters?: InputMaybe<AudioSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryChronologyEraArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryChronologyErasArgs = {
  filters?: InputMaybe<ChronologyEraFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryChronologyItemArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryChronologyItemsArgs = {
  filters?: InputMaybe<ChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContentTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContentTypesArgs = {
  filters?: InputMaybe<ContentTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCurrencyArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCurrenciesArgs = {
  filters?: InputMaybe<CurrencyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGamePlatformArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGamePlatformsArgs = {
  filters?: InputMaybe<GamePlatformFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGlossaryItemArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGlossaryItemsArgs = {
  filters?: InputMaybe<GlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGlossaryItemTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGlossaryItemTypesArgs = {
  filters?: InputMaybe<GlossaryItemTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLanguageArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLibraryContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLibraryContentsArgs = {
  filters?: InputMaybe<LibraryContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLibraryItemArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLibraryItemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLibraryVariantArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLibraryVariantsArgs = {
  filters?: InputMaybe<LibraryVariantFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryPostArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryRecorderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRecordersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryScanSetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryScanSetsArgs = {
  filters?: InputMaybe<ScanSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuerySourceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QuerySourcesArgs = {
  filters?: InputMaybe<SourceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTextSetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTextSetsArgs = {
  filters?: InputMaybe<TextSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTextualSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTextualSubtypesArgs = {
  filters?: InputMaybe<TextualSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryVideoSetArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryVideoSetsArgs = {
  filters?: InputMaybe<VideoSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWeaponStoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWeaponStoriesArgs = {
  filters?: InputMaybe<WeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWeaponStoryGroupArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWeaponStoryGroupsArgs = {
  filters?: InputMaybe<WeaponStoryGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWeaponStoryTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWeaponStoryTypesArgs = {
  filters?: InputMaybe<WeaponStoryTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  createAudioSet?: Maybe<AudioSetEntityResponse>;
  updateAudioSet?: Maybe<AudioSetEntityResponse>;
  deleteAudioSet?: Maybe<AudioSetEntityResponse>;
  createAudioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  updateAudioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  deleteAudioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  createCategory?: Maybe<CategoryEntityResponse>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  createChronologyEra?: Maybe<ChronologyEraEntityResponse>;
  updateChronologyEra?: Maybe<ChronologyEraEntityResponse>;
  deleteChronologyEra?: Maybe<ChronologyEraEntityResponse>;
  createChronologyItem?: Maybe<ChronologyItemEntityResponse>;
  updateChronologyItem?: Maybe<ChronologyItemEntityResponse>;
  deleteChronologyItem?: Maybe<ChronologyItemEntityResponse>;
  createContentType?: Maybe<ContentTypeEntityResponse>;
  updateContentType?: Maybe<ContentTypeEntityResponse>;
  deleteContentType?: Maybe<ContentTypeEntityResponse>;
  createCurrency?: Maybe<CurrencyEntityResponse>;
  updateCurrency?: Maybe<CurrencyEntityResponse>;
  deleteCurrency?: Maybe<CurrencyEntityResponse>;
  createGamePlatform?: Maybe<GamePlatformEntityResponse>;
  updateGamePlatform?: Maybe<GamePlatformEntityResponse>;
  deleteGamePlatform?: Maybe<GamePlatformEntityResponse>;
  createGlossaryItem?: Maybe<GlossaryItemEntityResponse>;
  updateGlossaryItem?: Maybe<GlossaryItemEntityResponse>;
  deleteGlossaryItem?: Maybe<GlossaryItemEntityResponse>;
  createGlossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  updateGlossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  deleteGlossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  createLanguage?: Maybe<LanguageEntityResponse>;
  updateLanguage?: Maybe<LanguageEntityResponse>;
  deleteLanguage?: Maybe<LanguageEntityResponse>;
  createLibraryContent?: Maybe<LibraryContentEntityResponse>;
  updateLibraryContent?: Maybe<LibraryContentEntityResponse>;
  deleteLibraryContent?: Maybe<LibraryContentEntityResponse>;
  createLibraryItem?: Maybe<LibraryItemEntityResponse>;
  updateLibraryItem?: Maybe<LibraryItemEntityResponse>;
  deleteLibraryItem?: Maybe<LibraryItemEntityResponse>;
  createLibraryVariant?: Maybe<LibraryVariantEntityResponse>;
  updateLibraryVariant?: Maybe<LibraryVariantEntityResponse>;
  deleteLibraryVariant?: Maybe<LibraryVariantEntityResponse>;
  createPost?: Maybe<PostEntityResponse>;
  updatePost?: Maybe<PostEntityResponse>;
  deletePost?: Maybe<PostEntityResponse>;
  createRecorder?: Maybe<RecorderEntityResponse>;
  updateRecorder?: Maybe<RecorderEntityResponse>;
  deleteRecorder?: Maybe<RecorderEntityResponse>;
  createScanSet?: Maybe<ScanSetEntityResponse>;
  updateScanSet?: Maybe<ScanSetEntityResponse>;
  deleteScanSet?: Maybe<ScanSetEntityResponse>;
  createSource?: Maybe<SourceEntityResponse>;
  updateSource?: Maybe<SourceEntityResponse>;
  deleteSource?: Maybe<SourceEntityResponse>;
  createTextSet?: Maybe<TextSetEntityResponse>;
  updateTextSet?: Maybe<TextSetEntityResponse>;
  deleteTextSet?: Maybe<TextSetEntityResponse>;
  createTextualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  updateTextualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  deleteTextualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  createVideoSet?: Maybe<VideoSetEntityResponse>;
  updateVideoSet?: Maybe<VideoSetEntityResponse>;
  deleteVideoSet?: Maybe<VideoSetEntityResponse>;
  createWeaponStory?: Maybe<WeaponStoryEntityResponse>;
  updateWeaponStory?: Maybe<WeaponStoryEntityResponse>;
  deleteWeaponStory?: Maybe<WeaponStoryEntityResponse>;
  createWeaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  updateWeaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  deleteWeaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  createWeaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  updateWeaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  deleteWeaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  upload: UploadFileEntityResponse;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  updateFileInfo: UploadFileEntityResponse;
  removeFile?: Maybe<UploadFileEntityResponse>;
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationUpdateUploadFileArgs = {
  id: Scalars["ID"];
  data: UploadFileInput;
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"];
};

export type MutationCreateAudioSetArgs = {
  data: AudioSetInput;
};

export type MutationUpdateAudioSetArgs = {
  id: Scalars["ID"];
  data: AudioSetInput;
};

export type MutationDeleteAudioSetArgs = {
  id: Scalars["ID"];
};

export type MutationCreateAudioSubtypeArgs = {
  data: AudioSubtypeInput;
};

export type MutationUpdateAudioSubtypeArgs = {
  id: Scalars["ID"];
  data: AudioSubtypeInput;
};

export type MutationDeleteAudioSubtypeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"];
  data: CategoryInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"];
};

export type MutationCreateChronologyEraArgs = {
  data: ChronologyEraInput;
};

export type MutationUpdateChronologyEraArgs = {
  id: Scalars["ID"];
  data: ChronologyEraInput;
};

export type MutationDeleteChronologyEraArgs = {
  id: Scalars["ID"];
};

export type MutationCreateChronologyItemArgs = {
  data: ChronologyItemInput;
};

export type MutationUpdateChronologyItemArgs = {
  id: Scalars["ID"];
  data: ChronologyItemInput;
};

export type MutationDeleteChronologyItemArgs = {
  id: Scalars["ID"];
};

export type MutationCreateContentTypeArgs = {
  data: ContentTypeInput;
};

export type MutationUpdateContentTypeArgs = {
  id: Scalars["ID"];
  data: ContentTypeInput;
};

export type MutationDeleteContentTypeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCurrencyArgs = {
  data: CurrencyInput;
};

export type MutationUpdateCurrencyArgs = {
  id: Scalars["ID"];
  data: CurrencyInput;
};

export type MutationDeleteCurrencyArgs = {
  id: Scalars["ID"];
};

export type MutationCreateGamePlatformArgs = {
  data: GamePlatformInput;
};

export type MutationUpdateGamePlatformArgs = {
  id: Scalars["ID"];
  data: GamePlatformInput;
};

export type MutationDeleteGamePlatformArgs = {
  id: Scalars["ID"];
};

export type MutationCreateGlossaryItemArgs = {
  data: GlossaryItemInput;
};

export type MutationUpdateGlossaryItemArgs = {
  id: Scalars["ID"];
  data: GlossaryItemInput;
};

export type MutationDeleteGlossaryItemArgs = {
  id: Scalars["ID"];
};

export type MutationCreateGlossaryItemTypeArgs = {
  data: GlossaryItemTypeInput;
};

export type MutationUpdateGlossaryItemTypeArgs = {
  id: Scalars["ID"];
  data: GlossaryItemTypeInput;
};

export type MutationDeleteGlossaryItemTypeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateLanguageArgs = {
  data: LanguageInput;
};

export type MutationUpdateLanguageArgs = {
  id: Scalars["ID"];
  data: LanguageInput;
};

export type MutationDeleteLanguageArgs = {
  id: Scalars["ID"];
};

export type MutationCreateLibraryContentArgs = {
  data: LibraryContentInput;
};

export type MutationUpdateLibraryContentArgs = {
  id: Scalars["ID"];
  data: LibraryContentInput;
};

export type MutationDeleteLibraryContentArgs = {
  id: Scalars["ID"];
};

export type MutationCreateLibraryItemArgs = {
  data: LibraryItemInput;
};

export type MutationUpdateLibraryItemArgs = {
  id: Scalars["ID"];
  data: LibraryItemInput;
};

export type MutationDeleteLibraryItemArgs = {
  id: Scalars["ID"];
};

export type MutationCreateLibraryVariantArgs = {
  data: LibraryVariantInput;
};

export type MutationUpdateLibraryVariantArgs = {
  id: Scalars["ID"];
  data: LibraryVariantInput;
};

export type MutationDeleteLibraryVariantArgs = {
  id: Scalars["ID"];
};

export type MutationCreatePostArgs = {
  data: PostInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars["ID"];
  data: PostInput;
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
};

export type MutationCreateRecorderArgs = {
  data: RecorderInput;
};

export type MutationUpdateRecorderArgs = {
  id: Scalars["ID"];
  data: RecorderInput;
};

export type MutationDeleteRecorderArgs = {
  id: Scalars["ID"];
};

export type MutationCreateScanSetArgs = {
  data: ScanSetInput;
};

export type MutationUpdateScanSetArgs = {
  id: Scalars["ID"];
  data: ScanSetInput;
};

export type MutationDeleteScanSetArgs = {
  id: Scalars["ID"];
};

export type MutationCreateSourceArgs = {
  data: SourceInput;
};

export type MutationUpdateSourceArgs = {
  id: Scalars["ID"];
  data: SourceInput;
};

export type MutationDeleteSourceArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTextSetArgs = {
  data: TextSetInput;
};

export type MutationUpdateTextSetArgs = {
  id: Scalars["ID"];
  data: TextSetInput;
};

export type MutationDeleteTextSetArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTextualSubtypeArgs = {
  data: TextualSubtypeInput;
};

export type MutationUpdateTextualSubtypeArgs = {
  id: Scalars["ID"];
  data: TextualSubtypeInput;
};

export type MutationDeleteTextualSubtypeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateVideoSetArgs = {
  data: VideoSetInput;
};

export type MutationUpdateVideoSetArgs = {
  id: Scalars["ID"];
  data: VideoSetInput;
};

export type MutationDeleteVideoSetArgs = {
  id: Scalars["ID"];
};

export type MutationCreateWeaponStoryArgs = {
  data: WeaponStoryInput;
};

export type MutationUpdateWeaponStoryArgs = {
  id: Scalars["ID"];
  data: WeaponStoryInput;
};

export type MutationDeleteWeaponStoryArgs = {
  id: Scalars["ID"];
};

export type MutationCreateWeaponStoryGroupArgs = {
  data: WeaponStoryGroupInput;
};

export type MutationUpdateWeaponStoryGroupArgs = {
  id: Scalars["ID"];
  data: WeaponStoryGroupInput;
};

export type MutationDeleteWeaponStoryGroupArgs = {
  id: Scalars["ID"];
};

export type MutationCreateWeaponStoryTypeArgs = {
  data: WeaponStoryTypeInput;
};

export type MutationUpdateWeaponStoryTypeArgs = {
  id: Scalars["ID"];
  data: WeaponStoryTypeInput;
};

export type MutationDeleteWeaponStoryTypeArgs = {
  id: Scalars["ID"];
};

export type MutationUploadArgs = {
  refId?: InputMaybe<Scalars["ID"]>;
  ref?: InputMaybe<Scalars["String"]>;
  field?: InputMaybe<Scalars["String"]>;
  info?: InputMaybe<FileInfoInput>;
  file: Scalars["Upload"];
};

export type MutationMultipleUploadArgs = {
  refId?: InputMaybe<Scalars["ID"]>;
  ref?: InputMaybe<Scalars["String"]>;
  field?: InputMaybe<Scalars["String"]>;
  files: Array<InputMaybe<Scalars["Upload"]>>;
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"];
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  id: Scalars["ID"];
  data: UsersPermissionsRoleInput;
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"];
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationUpdateUsersPermissionsUserArgs = {
  id: Scalars["ID"];
  data: UsersPermissionsUserInput;
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
  code: Scalars["String"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export type GetErasQueryVariables = Exact<{
  language_code?: InputMaybe<Scalars["String"]>;
}>;

export type GetErasQuery = {
  __typename?: "Query";
  chronologyEras?:
    | {
        __typename?: "ChronologyEraEntityResponseCollection";
        data: Array<{
          __typename?: "ChronologyEraEntity";
          id?: string | null | undefined;
          attributes?:
            | {
                __typename?: "ChronologyEra";
                slug: string;
                starting_year: number;
                ending_year: number;
                title?:
                  | Array<
                      | {
                          __typename?: "ComponentTranslationsChronologyEra";
                          title?: string | null | undefined;
                        }
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }
            | null
            | undefined;
        }>;
      }
    | null
    | undefined;
};

export type GetChronologyItemsQueryVariables = Exact<{
  language_code?: InputMaybe<Scalars["String"]>;
}>;

export type GetChronologyItemsQuery = {
  __typename?: "Query";
  chronologyItems?:
    | {
        __typename?: "ChronologyItemEntityResponseCollection";
        data: Array<{
          __typename?: "ChronologyItemEntity";
          id?: string | null | undefined;
          attributes?:
            | {
                __typename?: "ChronologyItem";
                year: number;
                month?: number | null | undefined;
                day?: number | null | undefined;
                displayed_date?: string | null | undefined;
                events?:
                  | Array<
                      | {
                          __typename?: "ComponentCollectionsComponentEvent";
                          id: string;
                          source?:
                            | {
                                __typename?: "SourceEntityResponse";
                                data?:
                                  | {
                                      __typename?: "SourceEntity";
                                      attributes?:
                                        | {
                                            __typename?: "Source";
                                            name: string;
                                          }
                                        | null
                                        | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined;
                          translations?:
                            | Array<
                                | {
                                    __typename?: "ComponentTranslationsChronologyItem";
                                    title?: string | null | undefined;
                                    description?: string | null | undefined;
                                    note?: string | null | undefined;
                                    status: string;
                                  }
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                        }
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }
            | null
            | undefined;
        }>;
      }
    | null
    | undefined;
};

export type GetLibraryItemsPreviewQueryVariables = Exact<{
  language_code?: InputMaybe<Scalars["String"]>;
}>;

export type GetLibraryItemsPreviewQuery = {
  __typename?: "Query";
  libraryItems?:
    | {
        __typename?: "LibraryItemEntityResponseCollection";
        data: Array<{
          __typename?: "LibraryItemEntity";
          id?: string | null | undefined;
          attributes?:
            | {
                __typename?: "LibraryItem";
                title: string;
                subtitle?: string | null | undefined;
                slug: string;
                thumbnail?:
                  | {
                      __typename?: "UploadFileEntityResponse";
                      data?:
                        | {
                            __typename?: "UploadFileEntity";
                            attributes?:
                              | {
                                  __typename?: "UploadFile";
                                  name: string;
                                  alternativeText?: string | null | undefined;
                                  caption?: string | null | undefined;
                                  width?: number | null | undefined;
                                  height?: number | null | undefined;
                                  url: string;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined;
                release_date?:
                  | {
                      __typename?: "ComponentBasicsDatepicker";
                      year?: number | null | undefined;
                      month?: number | null | undefined;
                      day?: number | null | undefined;
                    }
                  | null
                  | undefined;
                price?:
                  | {
                      __typename?: "ComponentBasicsPrice";
                      amount?: number | null | undefined;
                      currency?:
                        | {
                            __typename?: "CurrencyEntityResponse";
                            data?:
                              | {
                                  __typename?: "CurrencyEntity";
                                  attributes?:
                                    | {
                                        __typename?: "Currency";
                                        symbol: string;
                                        code: string;
                                      }
                                    | null
                                    | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined;
                size?:
                  | {
                      __typename?: "ComponentBasicsSize";
                      width?: number | null | undefined;
                      height?: number | null | undefined;
                      thickness?: number | null | undefined;
                    }
                  | null
                  | undefined;
                descriptions?:
                  | Array<
                      | {
                          __typename?: "ComponentTranslationsLibraryItems";
                          description: string;
                        }
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }
            | null
            | undefined;
        }>;
      }
    | null
    | undefined;
};
