import { GraphQLClient } from "graphql-request";
import { GraphQLClientRequestHeaders } from "graphql-request/build/cjs/types";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  LibraryItemMetadataDynamicZoneInput: { input: any; output: any };
  RangedContentRangeDynamicZoneInput: { input: any; output: any };
  Time: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type AudioSubtype = {
  __typename?: "AudioSubtype";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AudioSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type AudioSubtypeEntity = {
  __typename?: "AudioSubtypeEntity";
  attributes?: Maybe<AudioSubtype>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type AudioSubtypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AudioSubtypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AudioSubtypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AudioSubtypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AudioSubtypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]["input"]>;
  containsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  eqi?: InputMaybe<Scalars["Boolean"]["input"]>;
  gt?: InputMaybe<Scalars["Boolean"]["input"]>;
  gte?: InputMaybe<Scalars["Boolean"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]["input"]>;
  lte?: InputMaybe<Scalars["Boolean"]["input"]>;
  ne?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Category = {
  __typename?: "Category";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  series?: Maybe<Enum_Category_Series>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsCategoriesTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CategoryTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsCategoriesTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CategoryEntity = {
  __typename?: "CategoryEntity";
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  series?: InputMaybe<StringFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsCategoriesTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  series?: InputMaybe<Enum_Category_Series>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsCategoriesTitleInput>>>;
};

export type CategoryRelationResponseCollection = {
  __typename?: "CategoryRelationResponseCollection";
  data: Array<CategoryEntity>;
};

export type Chronicle = {
  __typename?: "Chronicle";
  chapter?: Maybe<ChroniclesChapterEntityResponse>;
  contents?: Maybe<ContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  date_end: ComponentBasicsDatepicker;
  date_start: ComponentBasicsDatepicker;
  slug: Scalars["String"]["output"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronicles>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ChronicleContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChronicleTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChroniclesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChronicleEntity = {
  __typename?: "ChronicleEntity";
  attributes?: Maybe<Chronicle>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ChronicleEntityResponse = {
  __typename?: "ChronicleEntityResponse";
  data?: Maybe<ChronicleEntity>;
};

export type ChronicleEntityResponseCollection = {
  __typename?: "ChronicleEntityResponseCollection";
  data: Array<ChronicleEntity>;
  meta: ResponseCollectionMeta;
};

export type ChronicleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChronicleFiltersInput>>>;
  chapter?: InputMaybe<ChroniclesChapterFiltersInput>;
  contents?: InputMaybe<ContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date_end?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  date_start?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ChronicleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChronicleFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsChroniclesFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChronicleInput = {
  chapter?: InputMaybe<Scalars["ID"]["input"]>;
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  date_end?: InputMaybe<ComponentBasicsDatepickerInput>;
  date_start?: InputMaybe<ComponentBasicsDatepickerInput>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsChroniclesInput>>>;
};

export type ChronicleRelationResponseCollection = {
  __typename?: "ChronicleRelationResponseCollection";
  data: Array<ChronicleEntity>;
};

export type ChroniclesChapter = {
  __typename?: "ChroniclesChapter";
  chronicles?: Maybe<ChronicleRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ChroniclesChapterChroniclesArgs = {
  filters?: InputMaybe<ChronicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChroniclesChapterTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChroniclesChapterEntity = {
  __typename?: "ChroniclesChapterEntity";
  attributes?: Maybe<ChroniclesChapter>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ChroniclesChapterEntityResponse = {
  __typename?: "ChroniclesChapterEntityResponse";
  data?: Maybe<ChroniclesChapterEntity>;
};

export type ChroniclesChapterEntityResponseCollection = {
  __typename?: "ChroniclesChapterEntityResponseCollection";
  data: Array<ChroniclesChapterEntity>;
  meta: ResponseCollectionMeta;
};

export type ChroniclesChapterFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChroniclesChapterFiltersInput>>>;
  chronicles?: InputMaybe<ChronicleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ChroniclesChapterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChroniclesChapterFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChroniclesChapterInput = {
  chronicles?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type ChronologyEra = {
  __typename?: "ChronologyEra";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  ending_year: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
  starting_year: Scalars["Int"]["output"];
  title?: Maybe<Array<Maybe<ComponentTranslationsChronologyEra>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ChronologyEraTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyEraFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChronologyEraEntity = {
  __typename?: "ChronologyEraEntity";
  attributes?: Maybe<ChronologyEra>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type ChronologyEraFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChronologyEraFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ending_year?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ChronologyEraFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChronologyEraFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  starting_year?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<ComponentTranslationsChronologyEraFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChronologyEraInput = {
  ending_year?: InputMaybe<Scalars["Int"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  starting_year?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyEraInput>>>;
};

export type ChronologyItem = {
  __typename?: "ChronologyItem";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  day?: Maybe<Scalars["Int"]["output"]>;
  displayed_date?: Maybe<Scalars["String"]["output"]>;
  events?: Maybe<Array<Maybe<ComponentCollectionsComponentEvent>>>;
  month?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  wiki_pages?: Maybe<WikiPageRelationResponseCollection>;
  year: Scalars["Int"]["output"];
};

export type ChronologyItemEventsArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChronologyItemWiki_PagesArgs = {
  filters?: InputMaybe<WikiPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ChronologyItemEntity = {
  __typename?: "ChronologyItemEntity";
  attributes?: Maybe<ChronologyItem>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type ChronologyItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChronologyItemFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  day?: InputMaybe<IntFilterInput>;
  displayed_date?: InputMaybe<StringFilterInput>;
  events?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  month?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ChronologyItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChronologyItemFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  wiki_pages?: InputMaybe<WikiPageFiltersInput>;
  year?: InputMaybe<IntFilterInput>;
};

export type ChronologyItemInput = {
  day?: InputMaybe<Scalars["Int"]["input"]>;
  displayed_date?: InputMaybe<Scalars["String"]["input"]>;
  events?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentEventInput>>>;
  month?: InputMaybe<Scalars["Int"]["input"]>;
  wiki_pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ChronologyItemRelationResponseCollection = {
  __typename?: "ChronologyItemRelationResponseCollection";
  data: Array<ChronologyItemEntity>;
};

export type ComponentBasicsCredits = {
  __typename?: "ComponentBasicsCredits";
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  footnotes?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  scanners?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  subbers?: Maybe<RecorderRelationResponseCollection>;
  transcribers?: Maybe<RecorderRelationResponseCollection>;
  translators?: Maybe<RecorderRelationResponseCollection>;
  typesetters?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentBasicsCreditsCleanersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsCreditsProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsCreditsScannersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsCreditsSubbersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsCreditsTranscribersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsCreditsTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsCreditsTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentBasicsDatepicker = {
  __typename?: "ComponentBasicsDatepicker";
  day?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  month?: Maybe<Scalars["Int"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type ComponentBasicsDatepickerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsDatepickerFiltersInput>>>;
  day?: InputMaybe<IntFilterInput>;
  month?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsDatepickerFiltersInput>>>;
  year?: InputMaybe<IntFilterInput>;
};

export type ComponentBasicsDatepickerInput = {
  day?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  month?: InputMaybe<Scalars["Int"]["input"]>;
  year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ComponentBasicsFileSize = {
  __typename?: "ComponentBasicsFileSize";
  id: Scalars["ID"]["output"];
  size: Scalars["Float"]["output"];
  unit: Enum_Componentbasicsfilesize_Unit;
};

export type ComponentBasicsFileSizeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsFileSizeFiltersInput>>>;
  not?: InputMaybe<ComponentBasicsFileSizeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsFileSizeFiltersInput>>>;
  size?: InputMaybe<FloatFilterInput>;
  unit?: InputMaybe<StringFilterInput>;
};

export type ComponentBasicsFileSizeInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  size?: InputMaybe<Scalars["Float"]["input"]>;
  unit?: InputMaybe<Enum_Componentbasicsfilesize_Unit>;
};

export type ComponentBasicsPrice = {
  __typename?: "ComponentBasicsPrice";
  amount?: Maybe<Scalars["Float"]["output"]>;
  currency?: Maybe<CurrencyEntityResponse>;
  id: Scalars["ID"]["output"];
};

export type ComponentBasicsPriceFiltersInput = {
  amount?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsPriceFiltersInput>>>;
  currency?: InputMaybe<CurrencyFiltersInput>;
  not?: InputMaybe<ComponentBasicsPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsPriceFiltersInput>>>;
};

export type ComponentBasicsPriceInput = {
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  currency?: InputMaybe<Scalars["ID"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentBasicsSize = {
  __typename?: "ComponentBasicsSize";
  height?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  thickness?: Maybe<Scalars["Int"]["output"]>;
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type ComponentBasicsSizeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsSizeFiltersInput>>>;
  height?: InputMaybe<IntFilterInput>;
  not?: InputMaybe<ComponentBasicsSizeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsSizeFiltersInput>>>;
  thickness?: InputMaybe<IntFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type ComponentBasicsSizeInput = {
  height?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  thickness?: InputMaybe<Scalars["Int"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ComponentBasicsUrl = {
  __typename?: "ComponentBasicsUrl";
  id: Scalars["ID"]["output"];
  url?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentBasicsUrlFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsUrlFiltersInput>>>;
  not?: InputMaybe<ComponentBasicsUrlFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsUrlFiltersInput>>>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBasicsUrlInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentCollectionsComponentAliases = {
  __typename?: "ComponentCollectionsComponentAliases";
  alias: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type ComponentCollectionsComponentAliasesFiltersInput = {
  alias?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>>>;
};

export type ComponentCollectionsComponentAliasesInput = {
  alias?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentCollectionsComponentBody = {
  __typename?: "ComponentCollectionsComponentBody";
  authors?: Maybe<RecorderRelationResponseCollection>;
  body: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentcollectionscomponentbody_Status;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentCollectionsComponentBodyAuthorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentBodyProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentBodyTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentBodyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentBodyFiltersInput>>>;
  authors?: InputMaybe<RecorderFiltersInput>;
  body?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentCollectionsComponentBodyFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentBodyFiltersInput>>>;
  proofreaders?: InputMaybe<RecorderFiltersInput>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  translators?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentCollectionsComponentBodyInput = {
  authors?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  body?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componentcollectionscomponentbody_Status>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentCollectionsComponentDefinition = {
  __typename?: "ComponentCollectionsComponentDefinition";
  definition: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentcollectionscomponentdefinition_Status;
};

export type ComponentCollectionsComponentEvent = {
  __typename?: "ComponentCollectionsComponentEvent";
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronologyItem>>>;
};

export type ComponentCollectionsComponentEventTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentEventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentEventFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentEventFiltersInput>>>;
  source?: InputMaybe<SourceFiltersInput>;
  translations?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
};

export type ComponentCollectionsComponentEventInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  source?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyItemInput>>>;
};

export type ComponentCollectionsComponentGlossaryDefinition = {
  __typename?: "ComponentCollectionsComponentGlossaryDefinition";
  categories?: Maybe<CategoryRelationResponseCollection>;
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsGlossaryDefinition>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>>>;
  source?: InputMaybe<SourceFiltersInput>;
  translations?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
};

export type ComponentCollectionsComponentGlossaryDefinitionInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  source?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionInput>>>;
};

export type ComponentCollectionsComponentLibraryCover = {
  __typename?: "ComponentCollectionsComponentLibraryCover";
  back?: Maybe<UploadFileEntityResponse>;
  front?: Maybe<UploadFileEntityResponse>;
  full?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"]["output"];
  inside_back?: Maybe<UploadFileEntityResponse>;
  inside_front?: Maybe<UploadFileEntityResponse>;
  inside_full?: Maybe<UploadFileEntityResponse>;
  spine?: Maybe<UploadFileEntityResponse>;
};

export type ComponentCollectionsComponentLibraryCoverFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryCoverFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentLibraryCoverFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryCoverFiltersInput>>>;
};

export type ComponentCollectionsComponentLibraryCoverInput = {
  back?: InputMaybe<Scalars["ID"]["input"]>;
  front?: InputMaybe<Scalars["ID"]["input"]>;
  full?: InputMaybe<Scalars["ID"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  inside_back?: InputMaybe<Scalars["ID"]["input"]>;
  inside_front?: InputMaybe<Scalars["ID"]["input"]>;
  inside_full?: InputMaybe<Scalars["ID"]["input"]>;
  spine?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentCollectionsComponentLibraryDustJacket = {
  __typename?: "ComponentCollectionsComponentLibraryDustJacket";
  back?: Maybe<UploadFileEntityResponse>;
  flap_back?: Maybe<UploadFileEntityResponse>;
  flap_front?: Maybe<UploadFileEntityResponse>;
  front?: Maybe<UploadFileEntityResponse>;
  full?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"]["output"];
  inside_full?: Maybe<UploadFileEntityResponse>;
  spine?: Maybe<UploadFileEntityResponse>;
};

export type ComponentCollectionsComponentLibraryDustJacketFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>>>;
};

export type ComponentCollectionsComponentLibraryDustJacketInput = {
  back?: InputMaybe<Scalars["ID"]["input"]>;
  flap_back?: InputMaybe<Scalars["ID"]["input"]>;
  flap_front?: InputMaybe<Scalars["ID"]["input"]>;
  front?: InputMaybe<Scalars["ID"]["input"]>;
  full?: InputMaybe<Scalars["ID"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  inside_full?: InputMaybe<Scalars["ID"]["input"]>;
  spine?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentCollectionsComponentLibraryImages = {
  __typename?: "ComponentCollectionsComponentLibraryImages";
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  cover?: Maybe<ComponentCollectionsComponentLibraryCover>;
  dust_jacket?: Maybe<ComponentCollectionsComponentLibraryDustJacket>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  obi_belt?: Maybe<ComponentCollectionsComponentLibraryObiBelt>;
  scanners?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentcollectionscomponentlibraryimages_Status;
  typesetters?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentCollectionsComponentLibraryImagesCleanersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentLibraryImagesScannersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentLibraryImagesTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentLibraryImagesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryImagesFiltersInput>>>;
  cleaners?: InputMaybe<RecorderFiltersInput>;
  cover?: InputMaybe<ComponentCollectionsComponentLibraryCoverFiltersInput>;
  dust_jacket?: InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentCollectionsComponentLibraryImagesFiltersInput>;
  obi_belt?: InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryImagesFiltersInput>>>;
  scanners?: InputMaybe<RecorderFiltersInput>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  typesetters?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentCollectionsComponentLibraryImagesInput = {
  cleaners?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  cover?: InputMaybe<ComponentCollectionsComponentLibraryCoverInput>;
  dust_jacket?: InputMaybe<ComponentCollectionsComponentLibraryDustJacketInput>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  obi_belt?: InputMaybe<ComponentCollectionsComponentLibraryObiBeltInput>;
  scanners?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componentcollectionscomponentlibraryimages_Status>;
  typesetters?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentCollectionsComponentLibraryObiBelt = {
  __typename?: "ComponentCollectionsComponentLibraryObiBelt";
  back?: Maybe<UploadFileEntityResponse>;
  flap_back?: Maybe<UploadFileEntityResponse>;
  flap_front?: Maybe<UploadFileEntityResponse>;
  front?: Maybe<UploadFileEntityResponse>;
  full?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"]["output"];
  inside_full?: Maybe<UploadFileEntityResponse>;
  spine?: Maybe<UploadFileEntityResponse>;
};

export type ComponentCollectionsComponentLibraryObiBeltFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>>>;
};

export type ComponentCollectionsComponentLibraryObiBeltInput = {
  back?: InputMaybe<Scalars["ID"]["input"]>;
  flap_back?: InputMaybe<Scalars["ID"]["input"]>;
  flap_front?: InputMaybe<Scalars["ID"]["input"]>;
  front?: InputMaybe<Scalars["ID"]["input"]>;
  full?: InputMaybe<Scalars["ID"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  inside_full?: InputMaybe<Scalars["ID"]["input"]>;
  spine?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentCollectionsComponentTitles = {
  __typename?: "ComponentCollectionsComponentTitles";
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type ComponentCollectionsComponentTitlesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentTitlesFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentTitlesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentTitlesFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentCollectionsComponentWeaponStory = {
  __typename?: "ComponentCollectionsComponentWeaponStory";
  categories?: Maybe<CategoryRelationResponseCollection>;
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryStory>>>;
};

export type ComponentCollectionsComponentWeaponStoryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentWeaponStoryTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentCollectionsComponentWeaponStoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>>>;
  source?: InputMaybe<SourceFiltersInput>;
  translations?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
};

export type ComponentCollectionsComponentWeaponStoryInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  source?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryStoryInput>>>;
};

export type ComponentCollectionsComponentWikiDefinition = {
  __typename?: "ComponentCollectionsComponentWikiDefinition";
  categories?: Maybe<CategoryRelationResponseCollection>;
  definition?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
};

export type ComponentCollectionsComponentWikiDefinitionCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataAudio = {
  __typename?: "ComponentMetadataAudio";
  id: Scalars["ID"]["output"];
  subtype?: Maybe<AudioSubtypeEntityResponse>;
  tracks?: Maybe<Array<Maybe<ComponentSetsTrackSet>>>;
};

export type ComponentMetadataAudioTracksArgs = {
  filters?: InputMaybe<ComponentSetsTrackSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataBooks = {
  __typename?: "ComponentMetadataBooks";
  binding_type?: Maybe<Enum_Componentmetadatabooks_Binding_Type>;
  id: Scalars["ID"]["output"];
  languages?: Maybe<LanguageRelationResponseCollection>;
  page_count?: Maybe<Scalars["Int"]["output"]>;
  page_order: Enum_Componentmetadatabooks_Page_Order;
  subtype?: Maybe<TextualSubtypeEntityResponse>;
};

export type ComponentMetadataBooksLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataGame = {
  __typename?: "ComponentMetadataGame";
  audio_languages?: Maybe<LanguageRelationResponseCollection>;
  demo: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  interface_languages?: Maybe<LanguageRelationResponseCollection>;
  platform?: Maybe<GamePlatformEntityResponse>;
  platforms?: Maybe<GamePlatformRelationResponseCollection>;
  sub_languages?: Maybe<LanguageRelationResponseCollection>;
};

export type ComponentMetadataGameAudio_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataGameInterface_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataGamePlatformsArgs = {
  filters?: InputMaybe<GamePlatformFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataGameSub_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentMetadataGroup = {
  __typename?: "ComponentMetadataGroup";
  id: Scalars["ID"]["output"];
  subitems_type?: Maybe<MetadataTypeEntityResponse>;
  subtype?: Maybe<GroupSubtypeEntityResponse>;
};

export type ComponentMetadataMerch = {
  __typename?: "ComponentMetadataMerch";
  id: Scalars["ID"]["output"];
  merch_item?: Maybe<MerchItemEntityResponse>;
};

export type ComponentMetadataOther = {
  __typename?: "ComponentMetadataOther";
  id: Scalars["ID"]["output"];
};

export type ComponentMetadataVideo = {
  __typename?: "ComponentMetadataVideo";
  id: Scalars["ID"]["output"];
  subtype?: Maybe<VideoSubtypeEntityResponse>;
};

export type ComponentPageBuilderGallery = {
  __typename?: "ComponentPageBuilderGallery";
  gallery?: Maybe<UploadFileRelationResponseCollection>;
  id: Scalars["ID"]["output"];
};

export type ComponentPageBuilderGalleryGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentPageBuilderGrid = {
  __typename?: "ComponentPageBuilderGrid";
  column_count: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
};

export type ComponentPageBuilderTabs = {
  __typename?: "ComponentPageBuilderTabs";
  id: Scalars["ID"]["output"];
};

export type ComponentRangeGameAspect = {
  __typename?: "ComponentRangeGameAspect";
  id: Scalars["ID"]["output"];
  note?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentRangeOther = {
  __typename?: "ComponentRangeOther";
  id: Scalars["ID"]["output"];
  note?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentRangePageRange = {
  __typename?: "ComponentRangePageRange";
  ending_page: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  starting_page: Scalars["Int"]["output"];
};

export type ComponentRangeTimeRange = {
  __typename?: "ComponentRangeTimeRange";
  ending_time?: Maybe<Scalars["Time"]["output"]>;
  id: Scalars["ID"]["output"];
  starting_time?: Maybe<Scalars["Time"]["output"]>;
};

export type ComponentSetsAudioSet = {
  __typename?: "ComponentSetsAudioSet";
  dubbers?: Maybe<RecorderRelationResponseCollection>;
  id: Scalars["ID"]["output"];
  notes?: Maybe<Scalars["String"]["output"]>;
  source_language?: Maybe<LanguageEntityResponse>;
  status?: Maybe<Enum_Componentsetsaudioset_Status>;
};

export type ComponentSetsAudioSetDubbersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsAudioSetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSetsAudioSetFiltersInput>>>;
  dubbers?: InputMaybe<RecorderFiltersInput>;
  not?: InputMaybe<ComponentSetsAudioSetFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSetsAudioSetFiltersInput>>>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
};

export type ComponentSetsAudioSetInput = {
  dubbers?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componentsetsaudioset_Status>;
};

export type ComponentSetsScanSet = {
  __typename?: "ComponentSetsScanSet";
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  notes?: Maybe<Scalars["String"]["output"]>;
  pages?: Maybe<UploadFileRelationResponseCollection>;
  scanners?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetsscanset_Status;
  typesetters?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsScanSetCleanersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsScanSetPagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsScanSetScannersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsScanSetTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsScanSetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSetsScanSetFiltersInput>>>;
  cleaners?: InputMaybe<RecorderFiltersInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentSetsScanSetFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSetsScanSetFiltersInput>>>;
  scanners?: InputMaybe<RecorderFiltersInput>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  typesetters?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentSetsScanSetInput = {
  cleaners?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  scanners?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componentsetsscanset_Status>;
  typesetters?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentSetsTextSet = {
  __typename?: "ComponentSetsTextSet";
  id: Scalars["ID"]["output"];
  notes?: Maybe<Scalars["String"]["output"]>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetstextset_Status;
  text?: Maybe<Scalars["String"]["output"]>;
  transcribers?: Maybe<RecorderRelationResponseCollection>;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsTextSetProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsTextSetTranscribersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsTextSetTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsTextSetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSetsTextSetFiltersInput>>>;
  not?: InputMaybe<ComponentSetsTextSetFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSetsTextSetFiltersInput>>>;
  proofreaders?: InputMaybe<RecorderFiltersInput>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  text?: InputMaybe<StringFilterInput>;
  transcribers?: InputMaybe<RecorderFiltersInput>;
  translators?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentSetsTextSetInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componentsetstextset_Status>;
  text?: InputMaybe<Scalars["String"]["input"]>;
  transcribers?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentSetsTrackSet = {
  __typename?: "ComponentSetsTrackSet";
  id: Scalars["ID"]["output"];
  slug: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type ComponentSetsTrackSetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSetsTrackSetFiltersInput>>>;
  not?: InputMaybe<ComponentSetsTrackSetFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSetsTrackSetFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSetsVideoSet = {
  __typename?: "ComponentSetsVideoSet";
  has_subfile: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  notes?: Maybe<Scalars["String"]["output"]>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetsvideoset_Status;
  subbers?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsVideoSetSubbersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsVideoSetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSetsVideoSetFiltersInput>>>;
  has_subfile?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ComponentSetsVideoSetFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSetsVideoSetFiltersInput>>>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  subbers?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentSetsVideoSetInput = {
  has_subfile?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componentsetsvideoset_Status>;
  subbers?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentSetsWikiSet = {
  __typename?: "ComponentSetsWikiSet";
  body?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetswikiset_Status;
  summary?: Maybe<Scalars["String"]["output"]>;
  titles?: Maybe<Array<Maybe<ComponentCollectionsComponentTitles>>>;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsWikiSetProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsWikiSetTitlesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentTitlesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSetsWikiSetTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentSourceUrlSource = {
  __typename?: "ComponentSourceUrlSource";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"]["output"];
  note?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsAudioSets = {
  __typename?: "ComponentTranslationsAudioSets";
  audiofile: UploadFileEntityResponse;
  credits: ComponentBasicsCredits;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsaudiosets_Status;
};

export type ComponentTranslationsBio = {
  __typename?: "ComponentTranslationsBio";
  bio?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsBioFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsBioFiltersInput>>>;
  bio?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsBioFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsBioFiltersInput>>>;
};

export type ComponentTranslationsBioInput = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentTranslationsCategoriesTitle = {
  __typename?: "ComponentTranslationsCategoriesTitle";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  short?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsCategoriesTitleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsCategoriesTitleFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsCategoriesTitleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsCategoriesTitleFiltersInput>>>;
  short?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsCategoriesTitleInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  short?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsChronicles = {
  __typename?: "ComponentTranslationsChronicles";
  body?: Maybe<ComponentCollectionsComponentBody>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  summary?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type ComponentTranslationsChroniclesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsChroniclesFiltersInput>>>;
  body?: InputMaybe<ComponentCollectionsComponentBodyFiltersInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsChroniclesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsChroniclesFiltersInput>>>;
  summary?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsChroniclesInput = {
  body?: InputMaybe<ComponentCollectionsComponentBodyInput>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsChronologyEra = {
  __typename?: "ComponentTranslationsChronologyEra";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  title: Scalars["String"]["output"];
};

export type ComponentTranslationsChronologyEraFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyEraFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsChronologyEraFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyEraFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsChronologyEraInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsChronologyItem = {
  __typename?: "ComponentTranslationsChronologyItem";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  note?: Maybe<Scalars["String"]["output"]>;
  status: Enum_Componenttranslationschronologyitem_Status;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsChronologyItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyItemFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
  note?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyItemFiltersInput>>>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsChronologyItemInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  note?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Enum_Componenttranslationschronologyitem_Status>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsGamePlatformsTranslations = {
  __typename?: "ComponentTranslationsGamePlatformsTranslations";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  short?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsGamePlatformsTranslationsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsGamePlatformsTranslationsFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsGamePlatformsTranslationsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsGamePlatformsTranslationsFiltersInput>>>;
  short?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsGamePlatformsTranslationsInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  short?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsGlossaryDefinition = {
  __typename?: "ComponentTranslationsGlossaryDefinition";
  definition?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsglossarydefinition_Status;
  transcribers?: Maybe<RecorderRelationResponseCollection>;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentTranslationsGlossaryDefinitionProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsGlossaryDefinitionTranscribersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsGlossaryDefinitionTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsGlossaryDefinitionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>>>;
  definition?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>>>;
  proofreaders?: InputMaybe<RecorderFiltersInput>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  transcribers?: InputMaybe<RecorderFiltersInput>;
  translators?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentTranslationsGlossaryDefinitionInput = {
  definition?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componenttranslationsglossarydefinition_Status>;
  transcribers?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentTranslationsGlossaryItem = {
  __typename?: "ComponentTranslationsGlossaryItem";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsGlossaryItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsGlossaryItemInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsLibraryContent = {
  __typename?: "ComponentTranslationsLibraryContent";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsLibraryItems = {
  __typename?: "ComponentTranslationsLibraryItems";
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
};

export type ComponentTranslationsLibraryItemsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>>>;
};

export type ComponentTranslationsLibraryItemsInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ComponentTranslationsPosts = {
  __typename?: "ComponentTranslationsPosts";
  body?: Maybe<Scalars["String"]["output"]>;
  excerpt?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsposts_Status;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars["String"]["output"];
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentTranslationsPostsProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsPostsTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsPostsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsPostsFiltersInput>>>;
  body?: InputMaybe<StringFilterInput>;
  excerpt?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsPostsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsPostsFiltersInput>>>;
  proofreaders?: InputMaybe<RecorderFiltersInput>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  translators?: InputMaybe<RecorderFiltersInput>;
};

export type ComponentTranslationsPostsInput = {
  body?: InputMaybe<Scalars["String"]["input"]>;
  excerpt?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  source_language?: InputMaybe<Scalars["ID"]["input"]>;
  status?: InputMaybe<Enum_Componenttranslationsposts_Status>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type ComponentTranslationsReinCostumes = {
  __typename?: "ComponentTranslationsReinCostumes";
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  name: Scalars["String"]["output"];
};

export type ComponentTranslationsReinCostumesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsReinCostumesFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsReinCostumesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsReinCostumesFiltersInput>>>;
};

export type ComponentTranslationsReinCostumesInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsReinEmblems = {
  __typename?: "ComponentTranslationsReinEmblems";
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  name: Scalars["String"]["output"];
};

export type ComponentTranslationsReinEmblemsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsReinEmblemsFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsReinEmblemsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsReinEmblemsFiltersInput>>>;
};

export type ComponentTranslationsReinEmblemsInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsScanSet = {
  __typename?: "ComponentTranslationsScanSet";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  pages: UploadFileRelationResponseCollection;
  status: Enum_Componenttranslationsscanset_Status;
};

export type ComponentTranslationsScanSetPagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsSimpleTitle = {
  __typename?: "ComponentTranslationsSimpleTitle";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  title: Scalars["String"]["output"];
};

export type ComponentTranslationsSimpleTitleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsSimpleTitleInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsTextSet = {
  __typename?: "ComponentTranslationsTextSet";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationstextset_Status;
  text?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsTitle = {
  __typename?: "ComponentTranslationsTitle";
  audio_set?: Maybe<ComponentSetsAudioSet>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  pre_title?: Maybe<Scalars["String"]["output"]>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  text_set?: Maybe<ComponentSetsTextSet>;
  title: Scalars["String"]["output"];
  video_set?: Maybe<ComponentSetsVideoSet>;
};

export type ComponentTranslationsTitleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsTitleFiltersInput>>>;
  audio_set?: InputMaybe<ComponentSetsAudioSetFiltersInput>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsTitleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsTitleFiltersInput>>>;
  pre_title?: InputMaybe<StringFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  text_set?: InputMaybe<ComponentSetsTextSetFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  video_set?: InputMaybe<ComponentSetsVideoSetFiltersInput>;
};

export type ComponentTranslationsTitleInput = {
  audio_set?: InputMaybe<ComponentSetsAudioSetInput>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  pre_title?: InputMaybe<Scalars["String"]["input"]>;
  subtitle?: InputMaybe<Scalars["String"]["input"]>;
  text_set?: InputMaybe<ComponentSetsTextSetInput>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  video_set?: InputMaybe<ComponentSetsVideoSetInput>;
};

export type ComponentTranslationsVideoSets = {
  __typename?: "ComponentTranslationsVideoSets";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsvideosets_Status;
  subfile?: Maybe<UploadFileEntityResponse>;
  video_embed?: Maybe<Scalars["String"]["output"]>;
  video_url: Scalars["String"]["output"];
};

export type ComponentTranslationsWeaponStory = {
  __typename?: "ComponentTranslationsWeaponStory";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsWeaponStoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>>>;
};

export type ComponentTranslationsWeaponStoryInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsWeaponStoryStory = {
  __typename?: "ComponentTranslationsWeaponStoryStory";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  level_1?: Maybe<Scalars["String"]["output"]>;
  level_2?: Maybe<Scalars["String"]["output"]>;
  level_3?: Maybe<Scalars["String"]["output"]>;
  level_4?: Maybe<Scalars["String"]["output"]>;
  status: Enum_Componenttranslationsweaponstorystory_Status;
};

export type ComponentTranslationsWeaponStoryStoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  level_1?: InputMaybe<StringFilterInput>;
  level_2?: InputMaybe<StringFilterInput>;
  level_3?: InputMaybe<StringFilterInput>;
  level_4?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>>>;
  status?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsWeaponStoryStoryInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  level_1?: InputMaybe<Scalars["String"]["input"]>;
  level_2?: InputMaybe<Scalars["String"]["input"]>;
  level_3?: InputMaybe<Scalars["String"]["input"]>;
  level_4?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Enum_Componenttranslationsweaponstorystory_Status>;
};

export type ComponentTranslationsWeaponStoryType = {
  __typename?: "ComponentTranslationsWeaponStoryType";
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsWeaponStoryTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>>>;
};

export type ComponentTranslationsWeaponStoryTypeInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsWebArchives = {
  __typename?: "ComponentTranslationsWebArchives";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  notes?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsWebArchivesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWebArchivesFiltersInput>>>;
  description?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsWebArchivesFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWebArchivesFiltersInput>>>;
};

export type ComponentTranslationsWebArchivesInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsWiki = {
  __typename?: "ComponentTranslationsWiki";
  aliases?: Maybe<Array<Maybe<ComponentCollectionsComponentAliases>>>;
  body?: Maybe<ComponentCollectionsComponentBody>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  summary?: Maybe<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type ComponentTranslationsWikiAliasesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentTranslationsWikiFiltersInput = {
  aliases?: InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWikiFiltersInput>>>;
  body?: InputMaybe<ComponentCollectionsComponentBodyFiltersInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsWikiFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWikiFiltersInput>>>;
  summary?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsWikiInput = {
  aliases?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentAliasesInput>>>;
  body?: InputMaybe<ComponentCollectionsComponentBodyInput>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["ID"]["input"]>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ComponentTranslationsWikiPost = {
  __typename?: "ComponentTranslationsWikiPost";
  body?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<LanguageEntityResponse>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationswikipost_Status;
  summary?: Maybe<Scalars["String"]["output"]>;
};

export type ComponentTranslationsWikiPostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWikiPostFiltersInput>>>;
  body?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsWikiPostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWikiPostFiltersInput>>>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
};

export type ComponentWikiSpecializationChronology = {
  __typename?: "ComponentWikiSpecializationChronology";
  date: ComponentBasicsDatepicker;
  displayed_date?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronologyItem>>>;
};

export type ComponentWikiSpecializationChronologyTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentWikiSpecializationGlossaryItem = {
  __typename?: "ComponentWikiSpecializationGlossaryItem";
  categories?: Maybe<CategoryRelationResponseCollection>;
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsGlossaryDefinition>>>;
};

export type ComponentWikiSpecializationGlossaryItemCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentWikiSpecializationGlossaryItemTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentWikiSpecializationGlossaryItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentWikiSpecializationGlossaryItemFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  not?: InputMaybe<ComponentWikiSpecializationGlossaryItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentWikiSpecializationGlossaryItemFiltersInput>>>;
  source?: InputMaybe<SourceFiltersInput>;
  translations?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
};

export type ComponentWikiSpecializationGlossaryItemInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  source?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionInput>>>;
};

export type ComponentWikiSpecializationPost = {
  __typename?: "ComponentWikiSpecializationPost";
  authors?: Maybe<RecorderRelationResponseCollection>;
  id: Scalars["ID"]["output"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsWikiPost>>>;
};

export type ComponentWikiSpecializationPostAuthorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentWikiSpecializationPostTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWikiPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ComponentWikiSpecializationWeapon = {
  __typename?: "ComponentWikiSpecializationWeapon";
  id: Scalars["ID"]["output"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryStory>>>;
};

export type ComponentWikiSpecializationWeaponTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Content = {
  __typename?: "Content";
  categories?: Maybe<CategoryRelationResponseCollection>;
  chronicles?: Maybe<ChronicleRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  folder?: Maybe<ContentsFolderEntityResponse>;
  next_contents?: Maybe<ContentRelationResponseCollection>;
  previous_contents?: Maybe<ContentRelationResponseCollection>;
  ranged_contents?: Maybe<RangedContentRelationResponseCollection>;
  slug: Scalars["String"]["output"];
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsTitle>>>;
  type?: Maybe<ContentTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ContentCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentChroniclesArgs = {
  filters?: InputMaybe<ChronicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentNext_ContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentPrevious_ContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentRanged_ContentsArgs = {
  filters?: InputMaybe<RangedContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentEntity = {
  __typename?: "ContentEntity";
  attributes?: Maybe<Content>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ContentEntityResponse = {
  __typename?: "ContentEntityResponse";
  data?: Maybe<ContentEntity>;
};

export type ContentEntityResponseCollection = {
  __typename?: "ContentEntityResponseCollection";
  data: Array<ContentEntity>;
  meta: ResponseCollectionMeta;
};

export type ContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContentFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  chronicles?: InputMaybe<ChronicleFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  folder?: InputMaybe<ContentsFolderFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  next_contents?: InputMaybe<ContentFiltersInput>;
  not?: InputMaybe<ContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentFiltersInput>>>;
  previous_contents?: InputMaybe<ContentFiltersInput>;
  ranged_contents?: InputMaybe<RangedContentFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsTitleFiltersInput>;
  type?: InputMaybe<ContentTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  chronicles?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  folder?: InputMaybe<Scalars["ID"]["input"]>;
  next_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  previous_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  ranged_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsTitleInput>>>;
  type?: InputMaybe<Scalars["ID"]["input"]>;
};

export type ContentRelationResponseCollection = {
  __typename?: "ContentRelationResponseCollection";
  data: Array<ContentEntity>;
};

export type ContentType = {
  __typename?: "ContentType";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ContentTypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentTypeEntity = {
  __typename?: "ContentTypeEntity";
  attributes?: Maybe<ContentType>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type ContentTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContentTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ContentTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentTypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentTypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type ContentsFolder = {
  __typename?: "ContentsFolder";
  contents?: Maybe<ContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  parent_folder?: Maybe<ContentsFolderEntityResponse>;
  slug: Scalars["String"]["output"];
  subfolders?: Maybe<ContentsFolderRelationResponseCollection>;
  titles: Array<Maybe<ComponentTranslationsSimpleTitle>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ContentsFolderContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentsFolderSubfoldersArgs = {
  filters?: InputMaybe<ContentsFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentsFolderTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentsFolderEntity = {
  __typename?: "ContentsFolderEntity";
  attributes?: Maybe<ContentsFolder>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ContentsFolderEntityResponse = {
  __typename?: "ContentsFolderEntityResponse";
  data?: Maybe<ContentsFolderEntity>;
};

export type ContentsFolderEntityResponseCollection = {
  __typename?: "ContentsFolderEntityResponseCollection";
  data: Array<ContentsFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type ContentsFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContentsFolderFiltersInput>>>;
  contents?: InputMaybe<ContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ContentsFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentsFolderFiltersInput>>>;
  parent_folder?: InputMaybe<ContentsFolderFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  subfolders?: InputMaybe<ContentsFolderFiltersInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentsFolderInput = {
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  parent_folder?: InputMaybe<Scalars["ID"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  subfolders?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type ContentsFolderRelationResponseCollection = {
  __typename?: "ContentsFolderRelationResponseCollection";
  data: Array<ContentsFolderEntity>;
};

export type Currency = {
  __typename?: "Currency";
  code: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  display_decimals: Scalars["Boolean"]["output"];
  rate_to_usd: Scalars["Float"]["output"];
  symbol: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CurrencyEntity = {
  __typename?: "CurrencyEntity";
  attributes?: Maybe<Currency>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type CurrencyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CurrencyFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  display_decimals?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CurrencyFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CurrencyFiltersInput>>>;
  rate_to_usd?: InputMaybe<FloatFilterInput>;
  symbol?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CurrencyInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  display_decimals?: InputMaybe<Scalars["Boolean"]["input"]>;
  rate_to_usd?: InputMaybe<Scalars["Float"]["input"]>;
  symbol?: InputMaybe<Scalars["String"]["input"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]["input"]>;
  containsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  eqi?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  ne?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]["input"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum Enum_Category_Series {
  Drakengard = "Drakengard",
  NieR = "NieR",
  YoRHa = "YoRHa",
}

export enum Enum_Componentbasicsfilesize_Unit {
  Gb = "gb",
  Kb = "kb",
  Mb = "mb",
}

export enum Enum_Componentcollectionscomponentbody_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentcollectionscomponentdefinition_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentcollectionscomponentlibraryimages_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentmetadatabooks_Binding_Type {
  Hardcover = "Hardcover",
  Paperback = "Paperback",
}

export enum Enum_Componentmetadatabooks_Page_Order {
  LeftToRight = "Left_to_Right",
  RightToLeft = "Right_to_Left",
}

export enum Enum_Componentsetsaudioset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentsetsscanset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentsetstextset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentsetsvideoset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componentsetswikiset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationsaudiosets_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationschronologyitem_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationsglossarydefinition_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationsposts_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationsscanset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationstextset_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationsvideosets_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationsweaponstorystory_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Componenttranslationswikipost_Status {
  Done = "Done",
  Draft = "Draft",
  Incomplete = "Incomplete",
  Review = "Review",
}

export enum Enum_Video_Source {
  NicoNico = "NicoNico",
  Tumblr = "Tumblr",
  YouTube = "YouTube",
}

export enum Enum_Webarchive_Format {
  Wacz = "wacz",
  Zip = "zip",
}

export enum Enum_Webarchive_Type {
  OnlineDoc = "online_doc",
  Webpage = "webpage",
  Website = "website",
}

export type Error = {
  __typename?: "Error";
  code: Scalars["String"]["output"];
  message?: Maybe<Scalars["String"]["output"]>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  contains?: InputMaybe<Scalars["Float"]["input"]>;
  containsi?: InputMaybe<Scalars["Float"]["input"]>;
  endsWith?: InputMaybe<Scalars["Float"]["input"]>;
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  eqi?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  ne?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Float"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]["input"]>;
};

export type GamePlatform = {
  __typename?: "GamePlatform";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsGamePlatformsTranslations>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type GamePlatformTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsGamePlatformsTranslationsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GamePlatformEntity = {
  __typename?: "GamePlatformEntity";
  attributes?: Maybe<GamePlatform>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type GamePlatformFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GamePlatformFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<GamePlatformFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GamePlatformFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsGamePlatformsTranslationsFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GamePlatformInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsGamePlatformsTranslationsInput>>>;
};

export type GamePlatformRelationResponseCollection = {
  __typename?: "GamePlatformRelationResponseCollection";
  data: Array<GamePlatformEntity>;
};

export type GenericMorph =
  | AudioSubtype
  | Category
  | Chronicle
  | ChroniclesChapter
  | ChronologyEra
  | ChronologyItem
  | ComponentBasicsCredits
  | ComponentBasicsDatepicker
  | ComponentBasicsFileSize
  | ComponentBasicsPrice
  | ComponentBasicsSize
  | ComponentBasicsUrl
  | ComponentCollectionsComponentAliases
  | ComponentCollectionsComponentBody
  | ComponentCollectionsComponentDefinition
  | ComponentCollectionsComponentEvent
  | ComponentCollectionsComponentGlossaryDefinition
  | ComponentCollectionsComponentLibraryCover
  | ComponentCollectionsComponentLibraryDustJacket
  | ComponentCollectionsComponentLibraryImages
  | ComponentCollectionsComponentLibraryObiBelt
  | ComponentCollectionsComponentTitles
  | ComponentCollectionsComponentWeaponStory
  | ComponentCollectionsComponentWikiDefinition
  | ComponentMetadataAudio
  | ComponentMetadataBooks
  | ComponentMetadataGame
  | ComponentMetadataGroup
  | ComponentMetadataMerch
  | ComponentMetadataOther
  | ComponentMetadataVideo
  | ComponentPageBuilderGallery
  | ComponentPageBuilderGrid
  | ComponentPageBuilderTabs
  | ComponentRangeGameAspect
  | ComponentRangeOther
  | ComponentRangePageRange
  | ComponentRangeTimeRange
  | ComponentSetsAudioSet
  | ComponentSetsScanSet
  | ComponentSetsTextSet
  | ComponentSetsTrackSet
  | ComponentSetsVideoSet
  | ComponentSetsWikiSet
  | ComponentSourceUrlSource
  | ComponentTranslationsAudioSets
  | ComponentTranslationsBio
  | ComponentTranslationsCategoriesTitle
  | ComponentTranslationsChronicles
  | ComponentTranslationsChronologyEra
  | ComponentTranslationsChronologyItem
  | ComponentTranslationsGamePlatformsTranslations
  | ComponentTranslationsGlossaryDefinition
  | ComponentTranslationsGlossaryItem
  | ComponentTranslationsLibraryContent
  | ComponentTranslationsLibraryItems
  | ComponentTranslationsPosts
  | ComponentTranslationsReinCostumes
  | ComponentTranslationsReinEmblems
  | ComponentTranslationsScanSet
  | ComponentTranslationsSimpleTitle
  | ComponentTranslationsTextSet
  | ComponentTranslationsTitle
  | ComponentTranslationsVideoSets
  | ComponentTranslationsWeaponStory
  | ComponentTranslationsWeaponStoryStory
  | ComponentTranslationsWeaponStoryType
  | ComponentTranslationsWebArchives
  | ComponentTranslationsWiki
  | ComponentTranslationsWikiPost
  | ComponentWikiSpecializationChronology
  | ComponentWikiSpecializationGlossaryItem
  | ComponentWikiSpecializationPost
  | ComponentWikiSpecializationWeapon
  | Content
  | ContentType
  | ContentsFolder
  | Currency
  | GamePlatform
  | GlossaryItem
  | GlossaryItemType
  | GroupSubtype
  | Language
  | LibraryItem
  | MerchItem
  | MetadataType
  | Post
  | RangedContent
  | Recorder
  | ReinCostume
  | ReinEmblem
  | Source
  | TextualSubtype
  | UploadFile
  | UploadFolder
  | Video
  | VideoChannel
  | VideoSubtype
  | WeaponStory
  | WeaponStoryGroup
  | WeaponStoryType
  | WebArchive
  | WebsiteInterface
  | WikiPage
  | WikiPagesTag;

export type GlossaryItem = {
  __typename?: "GlossaryItem";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  definitions?: Maybe<Array<Maybe<ComponentCollectionsComponentGlossaryDefinition>>>;
  slug: Scalars["String"]["output"];
  title?: Maybe<Array<Maybe<ComponentTranslationsGlossaryItem>>>;
  type?: Maybe<GlossaryItemTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type GlossaryItemDefinitionsArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GlossaryItemTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GlossaryItemEntity = {
  __typename?: "GlossaryItemEntity";
  attributes?: Maybe<GlossaryItem>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type GlossaryItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GlossaryItemFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  definitions?: InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<GlossaryItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GlossaryItemFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
  type?: InputMaybe<GlossaryItemTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GlossaryItemInput = {
  definitions?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentGlossaryDefinitionInput>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemInput>>>;
  type?: InputMaybe<Scalars["ID"]["input"]>;
};

export type GlossaryItemType = {
  __typename?: "GlossaryItemType";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  type: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type GlossaryItemTypeEntity = {
  __typename?: "GlossaryItemTypeEntity";
  attributes?: Maybe<GlossaryItemType>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type GlossaryItemTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GlossaryItemTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<GlossaryItemTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GlossaryItemTypeFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GlossaryItemTypeInput = {
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type GroupSubtype = {
  __typename?: "GroupSubtype";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type GroupSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GroupSubtypeEntity = {
  __typename?: "GroupSubtypeEntity";
  attributes?: Maybe<GroupSubtype>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type GroupSubtypeEntityResponse = {
  __typename?: "GroupSubtypeEntityResponse";
  data?: Maybe<GroupSubtypeEntity>;
};

export type GroupSubtypeEntityResponseCollection = {
  __typename?: "GroupSubtypeEntityResponseCollection";
  data: Array<GroupSubtypeEntity>;
  meta: ResponseCollectionMeta;
};

export type GroupSubtypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GroupSubtypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<GroupSubtypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GroupSubtypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GroupSubtypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  contains?: InputMaybe<Scalars["ID"]["input"]>;
  containsi?: InputMaybe<Scalars["ID"]["input"]>;
  endsWith?: InputMaybe<Scalars["ID"]["input"]>;
  eq?: InputMaybe<Scalars["ID"]["input"]>;
  eqi?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  ne?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]["input"]>;
  notContainsi?: InputMaybe<Scalars["ID"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  contains?: InputMaybe<Scalars["Int"]["input"]>;
  containsi?: InputMaybe<Scalars["Int"]["input"]>;
  endsWith?: InputMaybe<Scalars["Int"]["input"]>;
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  eqi?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Int"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  contains?: InputMaybe<Scalars["JSON"]["input"]>;
  containsi?: InputMaybe<Scalars["JSON"]["input"]>;
  endsWith?: InputMaybe<Scalars["JSON"]["input"]>;
  eq?: InputMaybe<Scalars["JSON"]["input"]>;
  eqi?: InputMaybe<Scalars["JSON"]["input"]>;
  gt?: InputMaybe<Scalars["JSON"]["input"]>;
  gte?: InputMaybe<Scalars["JSON"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  lt?: InputMaybe<Scalars["JSON"]["input"]>;
  lte?: InputMaybe<Scalars["JSON"]["input"]>;
  ne?: InputMaybe<Scalars["JSON"]["input"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]["input"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type Language = {
  __typename?: "Language";
  code: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  localized_name: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type LanguageEntity = {
  __typename?: "LanguageEntity";
  attributes?: Maybe<Language>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type LanguageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LanguageFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  localized_name?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<LanguageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LanguageFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LanguageInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  localized_name?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type LanguageRelationResponseCollection = {
  __typename?: "LanguageRelationResponseCollection";
  data: Array<LanguageEntity>;
};

export type LibraryItem = {
  __typename?: "LibraryItem";
  categories?: Maybe<CategoryRelationResponseCollection>;
  contents?: Maybe<RangedContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  descriptions?: Maybe<Array<Maybe<ComponentTranslationsLibraryItems>>>;
  digital: Scalars["Boolean"]["output"];
  download_available: Scalars["Boolean"]["output"];
  gallery?: Maybe<UploadFileRelationResponseCollection>;
  images?: Maybe<Array<Maybe<ComponentCollectionsComponentLibraryImages>>>;
  metadata?: Maybe<Array<Maybe<LibraryItemMetadataDynamicZone>>>;
  price?: Maybe<ComponentBasicsPrice>;
  primary: Scalars["Boolean"]["output"];
  release_date?: Maybe<ComponentBasicsDatepicker>;
  root_item: Scalars["Boolean"]["output"];
  size?: Maybe<ComponentBasicsSize>;
  slug: Scalars["String"]["output"];
  subitem_of?: Maybe<LibraryItemRelationResponseCollection>;
  subitems?: Maybe<LibraryItemRelationResponseCollection>;
  submerchs?: Maybe<MerchItemRelationResponseCollection>;
  subtitle?: Maybe<Scalars["String"]["output"]>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  urls?: Maybe<Array<Maybe<ComponentBasicsUrl>>>;
};

export type LibraryItemCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemContentsArgs = {
  filters?: InputMaybe<RangedContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemDescriptionsArgs = {
  filters?: InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemImagesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentLibraryImagesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemSubitem_OfArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemSubitemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemSubmerchsArgs = {
  filters?: InputMaybe<MerchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemUrlsArgs = {
  filters?: InputMaybe<ComponentBasicsUrlFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LibraryItemEntity = {
  __typename?: "LibraryItemEntity";
  attributes?: Maybe<LibraryItem>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type LibraryItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<LibraryItemFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  contents?: InputMaybe<RangedContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  descriptions?: InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>;
  digital?: InputMaybe<BooleanFilterInput>;
  download_available?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  images?: InputMaybe<ComponentCollectionsComponentLibraryImagesFiltersInput>;
  not?: InputMaybe<LibraryItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LibraryItemFiltersInput>>>;
  price?: InputMaybe<ComponentBasicsPriceFiltersInput>;
  primary?: InputMaybe<BooleanFilterInput>;
  release_date?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  root_item?: InputMaybe<BooleanFilterInput>;
  size?: InputMaybe<ComponentBasicsSizeFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  subitem_of?: InputMaybe<LibraryItemFiltersInput>;
  subitems?: InputMaybe<LibraryItemFiltersInput>;
  submerchs?: InputMaybe<MerchItemFiltersInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  urls?: InputMaybe<ComponentBasicsUrlFiltersInput>;
};

export type LibraryItemInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  descriptions?: InputMaybe<Array<InputMaybe<ComponentTranslationsLibraryItemsInput>>>;
  digital?: InputMaybe<Scalars["Boolean"]["input"]>;
  download_available?: InputMaybe<Scalars["Boolean"]["input"]>;
  gallery?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  images?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryImagesInput>>>;
  metadata?: InputMaybe<Array<Scalars["LibraryItemMetadataDynamicZoneInput"]["input"]>>;
  price?: InputMaybe<ComponentBasicsPriceInput>;
  primary?: InputMaybe<Scalars["Boolean"]["input"]>;
  release_date?: InputMaybe<ComponentBasicsDatepickerInput>;
  root_item?: InputMaybe<Scalars["Boolean"]["input"]>;
  size?: InputMaybe<ComponentBasicsSizeInput>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  subitem_of?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  subitems?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  submerchs?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  subtitle?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  urls?: InputMaybe<Array<InputMaybe<ComponentBasicsUrlInput>>>;
};

export type LibraryItemMetadataDynamicZone =
  | ComponentMetadataAudio
  | ComponentMetadataBooks
  | ComponentMetadataGame
  | ComponentMetadataGroup
  | ComponentMetadataOther
  | ComponentMetadataVideo
  | Error;

export type LibraryItemRelationResponseCollection = {
  __typename?: "LibraryItemRelationResponseCollection";
  data: Array<LibraryItemEntity>;
};

export type MerchItem = {
  __typename?: "MerchItem";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  library_items?: Maybe<LibraryItemRelationResponseCollection>;
  slug: Scalars["String"]["output"];
  subtitle?: Maybe<Scalars["String"]["output"]>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type MerchItemLibrary_ItemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MerchItemEntity = {
  __typename?: "MerchItemEntity";
  attributes?: Maybe<MerchItem>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type MerchItemEntityResponse = {
  __typename?: "MerchItemEntityResponse";
  data?: Maybe<MerchItemEntity>;
};

export type MerchItemEntityResponseCollection = {
  __typename?: "MerchItemEntityResponseCollection";
  data: Array<MerchItemEntity>;
  meta: ResponseCollectionMeta;
};

export type MerchItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MerchItemFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  library_items?: InputMaybe<LibraryItemFiltersInput>;
  not?: InputMaybe<MerchItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MerchItemFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MerchItemInput = {
  library_items?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  subtitle?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MerchItemRelationResponseCollection = {
  __typename?: "MerchItemRelationResponseCollection";
  data: Array<MerchItemEntity>;
};

export type MetadataType = {
  __typename?: "MetadataType";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type MetadataTypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MetadataTypeEntity = {
  __typename?: "MetadataTypeEntity";
  attributes?: Maybe<MetadataType>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type MetadataTypeEntityResponse = {
  __typename?: "MetadataTypeEntityResponse";
  data?: Maybe<MetadataTypeEntity>;
};

export type MetadataTypeEntityResponseCollection = {
  __typename?: "MetadataTypeEntityResponseCollection";
  data: Array<MetadataTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type MetadataTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MetadataTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<MetadataTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MetadataTypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MetadataTypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createAudioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createChronicle?: Maybe<ChronicleEntityResponse>;
  createChroniclesChapter?: Maybe<ChroniclesChapterEntityResponse>;
  createChronologyEra?: Maybe<ChronologyEraEntityResponse>;
  createChronologyItem?: Maybe<ChronologyItemEntityResponse>;
  createContent?: Maybe<ContentEntityResponse>;
  createContentType?: Maybe<ContentTypeEntityResponse>;
  createContentsFolder?: Maybe<ContentsFolderEntityResponse>;
  createCurrency?: Maybe<CurrencyEntityResponse>;
  createGamePlatform?: Maybe<GamePlatformEntityResponse>;
  createGlossaryItem?: Maybe<GlossaryItemEntityResponse>;
  createGlossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  createGroupSubtype?: Maybe<GroupSubtypeEntityResponse>;
  createLanguage?: Maybe<LanguageEntityResponse>;
  createLibraryItem?: Maybe<LibraryItemEntityResponse>;
  createMerchItem?: Maybe<MerchItemEntityResponse>;
  createMetadataType?: Maybe<MetadataTypeEntityResponse>;
  createPost?: Maybe<PostEntityResponse>;
  createRangedContent?: Maybe<RangedContentEntityResponse>;
  createRecorder?: Maybe<RecorderEntityResponse>;
  createReinCostume?: Maybe<ReinCostumeEntityResponse>;
  createReinEmblem?: Maybe<ReinEmblemEntityResponse>;
  createSource?: Maybe<SourceEntityResponse>;
  createTextualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  createVideo?: Maybe<VideoEntityResponse>;
  createVideoChannel?: Maybe<VideoChannelEntityResponse>;
  createVideoSubtype?: Maybe<VideoSubtypeEntityResponse>;
  createWeaponStory?: Maybe<WeaponStoryEntityResponse>;
  createWeaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  createWeaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  createWebArchive?: Maybe<WebArchiveEntityResponse>;
  createWebsiteInterface?: Maybe<WebsiteInterfaceEntityResponse>;
  createWikiPage?: Maybe<WikiPageEntityResponse>;
  createWikiPagesTag?: Maybe<WikiPagesTagEntityResponse>;
  deleteAudioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteChronicle?: Maybe<ChronicleEntityResponse>;
  deleteChroniclesChapter?: Maybe<ChroniclesChapterEntityResponse>;
  deleteChronologyEra?: Maybe<ChronologyEraEntityResponse>;
  deleteChronologyItem?: Maybe<ChronologyItemEntityResponse>;
  deleteContent?: Maybe<ContentEntityResponse>;
  deleteContentType?: Maybe<ContentTypeEntityResponse>;
  deleteContentsFolder?: Maybe<ContentsFolderEntityResponse>;
  deleteCurrency?: Maybe<CurrencyEntityResponse>;
  deleteGamePlatform?: Maybe<GamePlatformEntityResponse>;
  deleteGlossaryItem?: Maybe<GlossaryItemEntityResponse>;
  deleteGlossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  deleteGroupSubtype?: Maybe<GroupSubtypeEntityResponse>;
  deleteLanguage?: Maybe<LanguageEntityResponse>;
  deleteLibraryItem?: Maybe<LibraryItemEntityResponse>;
  deleteMerchItem?: Maybe<MerchItemEntityResponse>;
  deleteMetadataType?: Maybe<MetadataTypeEntityResponse>;
  deletePost?: Maybe<PostEntityResponse>;
  deleteRangedContent?: Maybe<RangedContentEntityResponse>;
  deleteRecorder?: Maybe<RecorderEntityResponse>;
  deleteReinCostume?: Maybe<ReinCostumeEntityResponse>;
  deleteReinEmblem?: Maybe<ReinEmblemEntityResponse>;
  deleteSource?: Maybe<SourceEntityResponse>;
  deleteTextualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  deleteVideo?: Maybe<VideoEntityResponse>;
  deleteVideoChannel?: Maybe<VideoChannelEntityResponse>;
  deleteVideoSubtype?: Maybe<VideoSubtypeEntityResponse>;
  deleteWeaponStory?: Maybe<WeaponStoryEntityResponse>;
  deleteWeaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  deleteWeaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  deleteWebArchive?: Maybe<WebArchiveEntityResponse>;
  deleteWebsiteInterface?: Maybe<WebsiteInterfaceEntityResponse>;
  deleteWikiPage?: Maybe<WikiPageEntityResponse>;
  deleteWikiPagesTag?: Maybe<WikiPagesTagEntityResponse>;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  removeFile?: Maybe<UploadFileEntityResponse>;
  updateAudioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateChronicle?: Maybe<ChronicleEntityResponse>;
  updateChroniclesChapter?: Maybe<ChroniclesChapterEntityResponse>;
  updateChronologyEra?: Maybe<ChronologyEraEntityResponse>;
  updateChronologyItem?: Maybe<ChronologyItemEntityResponse>;
  updateContent?: Maybe<ContentEntityResponse>;
  updateContentType?: Maybe<ContentTypeEntityResponse>;
  updateContentsFolder?: Maybe<ContentsFolderEntityResponse>;
  updateCurrency?: Maybe<CurrencyEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateGamePlatform?: Maybe<GamePlatformEntityResponse>;
  updateGlossaryItem?: Maybe<GlossaryItemEntityResponse>;
  updateGlossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  updateGroupSubtype?: Maybe<GroupSubtypeEntityResponse>;
  updateLanguage?: Maybe<LanguageEntityResponse>;
  updateLibraryItem?: Maybe<LibraryItemEntityResponse>;
  updateMerchItem?: Maybe<MerchItemEntityResponse>;
  updateMetadataType?: Maybe<MetadataTypeEntityResponse>;
  updatePost?: Maybe<PostEntityResponse>;
  updateRangedContent?: Maybe<RangedContentEntityResponse>;
  updateRecorder?: Maybe<RecorderEntityResponse>;
  updateReinCostume?: Maybe<ReinCostumeEntityResponse>;
  updateReinEmblem?: Maybe<ReinEmblemEntityResponse>;
  updateSource?: Maybe<SourceEntityResponse>;
  updateTextualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  updateVideo?: Maybe<VideoEntityResponse>;
  updateVideoChannel?: Maybe<VideoChannelEntityResponse>;
  updateVideoSubtype?: Maybe<VideoSubtypeEntityResponse>;
  updateWeaponStory?: Maybe<WeaponStoryEntityResponse>;
  updateWeaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  updateWeaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  updateWebArchive?: Maybe<WebArchiveEntityResponse>;
  updateWebsiteInterface?: Maybe<WebsiteInterfaceEntityResponse>;
  updateWikiPage?: Maybe<WikiPageEntityResponse>;
  updateWikiPagesTag?: Maybe<WikiPagesTagEntityResponse>;
  upload: UploadFileEntityResponse;
};

export type MutationCreateAudioSubtypeArgs = {
  data: AudioSubtypeInput;
};

export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};

export type MutationCreateChronicleArgs = {
  data: ChronicleInput;
};

export type MutationCreateChroniclesChapterArgs = {
  data: ChroniclesChapterInput;
};

export type MutationCreateChronologyEraArgs = {
  data: ChronologyEraInput;
};

export type MutationCreateChronologyItemArgs = {
  data: ChronologyItemInput;
};

export type MutationCreateContentArgs = {
  data: ContentInput;
};

export type MutationCreateContentTypeArgs = {
  data: ContentTypeInput;
};

export type MutationCreateContentsFolderArgs = {
  data: ContentsFolderInput;
};

export type MutationCreateCurrencyArgs = {
  data: CurrencyInput;
};

export type MutationCreateGamePlatformArgs = {
  data: GamePlatformInput;
};

export type MutationCreateGlossaryItemArgs = {
  data: GlossaryItemInput;
};

export type MutationCreateGlossaryItemTypeArgs = {
  data: GlossaryItemTypeInput;
};

export type MutationCreateGroupSubtypeArgs = {
  data: GroupSubtypeInput;
};

export type MutationCreateLanguageArgs = {
  data: LanguageInput;
};

export type MutationCreateLibraryItemArgs = {
  data: LibraryItemInput;
};

export type MutationCreateMerchItemArgs = {
  data: MerchItemInput;
};

export type MutationCreateMetadataTypeArgs = {
  data: MetadataTypeInput;
};

export type MutationCreatePostArgs = {
  data: PostInput;
};

export type MutationCreateRangedContentArgs = {
  data: RangedContentInput;
};

export type MutationCreateRecorderArgs = {
  data: RecorderInput;
};

export type MutationCreateReinCostumeArgs = {
  data: ReinCostumeInput;
};

export type MutationCreateReinEmblemArgs = {
  data: ReinEmblemInput;
};

export type MutationCreateSourceArgs = {
  data: SourceInput;
};

export type MutationCreateTextualSubtypeArgs = {
  data: TextualSubtypeInput;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateVideoArgs = {
  data: VideoInput;
};

export type MutationCreateVideoChannelArgs = {
  data: VideoChannelInput;
};

export type MutationCreateVideoSubtypeArgs = {
  data: VideoSubtypeInput;
};

export type MutationCreateWeaponStoryArgs = {
  data: WeaponStoryInput;
};

export type MutationCreateWeaponStoryGroupArgs = {
  data: WeaponStoryGroupInput;
};

export type MutationCreateWeaponStoryTypeArgs = {
  data: WeaponStoryTypeInput;
};

export type MutationCreateWebArchiveArgs = {
  data: WebArchiveInput;
};

export type MutationCreateWebsiteInterfaceArgs = {
  data: WebsiteInterfaceInput;
};

export type MutationCreateWikiPageArgs = {
  data: WikiPageInput;
};

export type MutationCreateWikiPagesTagArgs = {
  data: WikiPagesTagInput;
};

export type MutationDeleteAudioSubtypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteChronicleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteChroniclesChapterArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteChronologyEraArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteChronologyItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteContentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteContentTypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteContentsFolderArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteCurrencyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteGamePlatformArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteGlossaryItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteGlossaryItemTypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteGroupSubtypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteLanguageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteLibraryItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteMerchItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteMetadataTypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteRangedContentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteRecorderArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteReinCostumeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteReinEmblemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteSourceArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTextualSubtypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteVideoArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteVideoChannelArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteVideoSubtypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWeaponStoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWeaponStoryGroupArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWeaponStoryTypeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWebArchiveArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWebsiteInterfaceArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWikiPageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteWikiPagesTagArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]["input"]>;
  files: Array<InputMaybe<Scalars["Upload"]["input"]>>;
  ref?: InputMaybe<Scalars["String"]["input"]>;
  refId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateAudioSubtypeArgs = {
  data: AudioSubtypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateChronicleArgs = {
  data: ChronicleInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateChroniclesChapterArgs = {
  data: ChroniclesChapterInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateChronologyEraArgs = {
  data: ChronologyEraInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateChronologyItemArgs = {
  data: ChronologyItemInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateContentArgs = {
  data: ContentInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateContentTypeArgs = {
  data: ContentTypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateContentsFolderArgs = {
  data: ContentsFolderInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCurrencyArgs = {
  data: CurrencyInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"]["input"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateGamePlatformArgs = {
  data: GamePlatformInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateGlossaryItemArgs = {
  data: GlossaryItemInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateGlossaryItemTypeArgs = {
  data: GlossaryItemTypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateGroupSubtypeArgs = {
  data: GroupSubtypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateLanguageArgs = {
  data: LanguageInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateLibraryItemArgs = {
  data: LibraryItemInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateMerchItemArgs = {
  data: MerchItemInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateMetadataTypeArgs = {
  data: MetadataTypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdatePostArgs = {
  data: PostInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateRangedContentArgs = {
  data: RangedContentInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateRecorderArgs = {
  data: RecorderInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateReinCostumeArgs = {
  data: ReinCostumeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateReinEmblemArgs = {
  data: ReinEmblemInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateSourceArgs = {
  data: SourceInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateTextualSubtypeArgs = {
  data: TextualSubtypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateVideoArgs = {
  data: VideoInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateVideoChannelArgs = {
  data: VideoChannelInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateVideoSubtypeArgs = {
  data: VideoSubtypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWeaponStoryArgs = {
  data: WeaponStoryInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWeaponStoryGroupArgs = {
  data: WeaponStoryGroupInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWeaponStoryTypeArgs = {
  data: WeaponStoryTypeInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWebArchiveArgs = {
  data: WebArchiveInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWebsiteInterfaceArgs = {
  data: WebsiteInterfaceInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWikiPageArgs = {
  data: WikiPageInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateWikiPagesTagArgs = {
  data: WikiPagesTagInput;
  id: Scalars["ID"]["input"];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]["input"]>;
  file: Scalars["Upload"]["input"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]["input"]>;
  refId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"]["output"];
  pageCount: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Post = {
  __typename?: "Post";
  authors?: Maybe<RecorderRelationResponseCollection>;
  categories?: Maybe<CategoryRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  date: ComponentBasicsDatepicker;
  hidden: Scalars["Boolean"]["output"];
  slug: Scalars["String"]["output"];
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsPosts>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PostAuthorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsPostsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PostEntity = {
  __typename?: "PostEntity";
  attributes?: Maybe<Post>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type PostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  authors?: InputMaybe<RecorderFiltersInput>;
  categories?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  hidden?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<PostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PostFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsPostsFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PostInput = {
  authors?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  date?: InputMaybe<ComponentBasicsDatepickerInput>;
  hidden?: InputMaybe<Scalars["Boolean"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsPostsInput>>>;
};

export type Query = {
  __typename?: "Query";
  audioSubtype?: Maybe<AudioSubtypeEntityResponse>;
  audioSubtypes?: Maybe<AudioSubtypeEntityResponseCollection>;
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  chronicle?: Maybe<ChronicleEntityResponse>;
  chronicles?: Maybe<ChronicleEntityResponseCollection>;
  chroniclesChapter?: Maybe<ChroniclesChapterEntityResponse>;
  chroniclesChapters?: Maybe<ChroniclesChapterEntityResponseCollection>;
  chronologyEra?: Maybe<ChronologyEraEntityResponse>;
  chronologyEras?: Maybe<ChronologyEraEntityResponseCollection>;
  chronologyItem?: Maybe<ChronologyItemEntityResponse>;
  chronologyItems?: Maybe<ChronologyItemEntityResponseCollection>;
  content?: Maybe<ContentEntityResponse>;
  contentType?: Maybe<ContentTypeEntityResponse>;
  contentTypes?: Maybe<ContentTypeEntityResponseCollection>;
  contents?: Maybe<ContentEntityResponseCollection>;
  contentsFolder?: Maybe<ContentsFolderEntityResponse>;
  contentsFolders?: Maybe<ContentsFolderEntityResponseCollection>;
  currencies?: Maybe<CurrencyEntityResponseCollection>;
  currency?: Maybe<CurrencyEntityResponse>;
  gamePlatform?: Maybe<GamePlatformEntityResponse>;
  gamePlatforms?: Maybe<GamePlatformEntityResponseCollection>;
  glossaryItem?: Maybe<GlossaryItemEntityResponse>;
  glossaryItemType?: Maybe<GlossaryItemTypeEntityResponse>;
  glossaryItemTypes?: Maybe<GlossaryItemTypeEntityResponseCollection>;
  glossaryItems?: Maybe<GlossaryItemEntityResponseCollection>;
  groupSubtype?: Maybe<GroupSubtypeEntityResponse>;
  groupSubtypes?: Maybe<GroupSubtypeEntityResponseCollection>;
  language?: Maybe<LanguageEntityResponse>;
  languages?: Maybe<LanguageEntityResponseCollection>;
  libraryItem?: Maybe<LibraryItemEntityResponse>;
  libraryItems?: Maybe<LibraryItemEntityResponseCollection>;
  merchItem?: Maybe<MerchItemEntityResponse>;
  merchItems?: Maybe<MerchItemEntityResponseCollection>;
  metadataType?: Maybe<MetadataTypeEntityResponse>;
  metadataTypes?: Maybe<MetadataTypeEntityResponseCollection>;
  post?: Maybe<PostEntityResponse>;
  posts?: Maybe<PostEntityResponseCollection>;
  rangedContent?: Maybe<RangedContentEntityResponse>;
  rangedContents?: Maybe<RangedContentEntityResponseCollection>;
  recorder?: Maybe<RecorderEntityResponse>;
  recorders?: Maybe<RecorderEntityResponseCollection>;
  reinCostume?: Maybe<ReinCostumeEntityResponse>;
  reinCostumes?: Maybe<ReinCostumeEntityResponseCollection>;
  reinEmblem?: Maybe<ReinEmblemEntityResponse>;
  reinEmblems?: Maybe<ReinEmblemEntityResponseCollection>;
  source?: Maybe<SourceEntityResponse>;
  sources?: Maybe<SourceEntityResponseCollection>;
  textualSubtype?: Maybe<TextualSubtypeEntityResponse>;
  textualSubtypes?: Maybe<TextualSubtypeEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  video?: Maybe<VideoEntityResponse>;
  videoChannel?: Maybe<VideoChannelEntityResponse>;
  videoChannels?: Maybe<VideoChannelEntityResponseCollection>;
  videoSubtype?: Maybe<VideoSubtypeEntityResponse>;
  videoSubtypes?: Maybe<VideoSubtypeEntityResponseCollection>;
  videos?: Maybe<VideoEntityResponseCollection>;
  weaponStories?: Maybe<WeaponStoryEntityResponseCollection>;
  weaponStory?: Maybe<WeaponStoryEntityResponse>;
  weaponStoryGroup?: Maybe<WeaponStoryGroupEntityResponse>;
  weaponStoryGroups?: Maybe<WeaponStoryGroupEntityResponseCollection>;
  weaponStoryType?: Maybe<WeaponStoryTypeEntityResponse>;
  weaponStoryTypes?: Maybe<WeaponStoryTypeEntityResponseCollection>;
  webArchive?: Maybe<WebArchiveEntityResponse>;
  webArchives?: Maybe<WebArchiveEntityResponseCollection>;
  websiteInterface?: Maybe<WebsiteInterfaceEntityResponse>;
  websiteInterfaces?: Maybe<WebsiteInterfaceEntityResponseCollection>;
  wikiPage?: Maybe<WikiPageEntityResponse>;
  wikiPages?: Maybe<WikiPageEntityResponseCollection>;
  wikiPagesTag?: Maybe<WikiPagesTagEntityResponse>;
  wikiPagesTags?: Maybe<WikiPagesTagEntityResponseCollection>;
};

export type QueryAudioSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryAudioSubtypesArgs = {
  filters?: InputMaybe<AudioSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryChronicleArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryChroniclesArgs = {
  filters?: InputMaybe<ChronicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryChroniclesChapterArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryChroniclesChaptersArgs = {
  filters?: InputMaybe<ChroniclesChapterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryChronologyEraArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryChronologyErasArgs = {
  filters?: InputMaybe<ChronologyEraFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryChronologyItemArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryChronologyItemsArgs = {
  filters?: InputMaybe<ChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryContentArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryContentTypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryContentTypesArgs = {
  filters?: InputMaybe<ContentTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryContentsFolderArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryContentsFoldersArgs = {
  filters?: InputMaybe<ContentsFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCurrenciesArgs = {
  filters?: InputMaybe<CurrencyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCurrencyArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryGamePlatformArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryGamePlatformsArgs = {
  filters?: InputMaybe<GamePlatformFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGlossaryItemArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryGlossaryItemTypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryGlossaryItemTypesArgs = {
  filters?: InputMaybe<GlossaryItemTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGlossaryItemsArgs = {
  filters?: InputMaybe<GlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGroupSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryGroupSubtypesArgs = {
  filters?: InputMaybe<GroupSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryLanguageArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryLibraryItemArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryLibraryItemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryMerchItemArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryMerchItemsArgs = {
  filters?: InputMaybe<MerchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryMetadataTypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryMetadataTypesArgs = {
  filters?: InputMaybe<MetadataTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryPostArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryRangedContentArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRangedContentsArgs = {
  filters?: InputMaybe<RangedContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryRecorderArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRecordersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryReinCostumeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryReinCostumesArgs = {
  filters?: InputMaybe<ReinCostumeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryReinEmblemArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryReinEmblemsArgs = {
  filters?: InputMaybe<ReinEmblemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QuerySourceArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QuerySourcesArgs = {
  filters?: InputMaybe<SourceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTextualSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryTextualSubtypesArgs = {
  filters?: InputMaybe<TextualSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryVideoArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryVideoChannelArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryVideoChannelsArgs = {
  filters?: InputMaybe<VideoChannelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryVideoSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryVideoSubtypesArgs = {
  filters?: InputMaybe<VideoSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryVideosArgs = {
  filters?: InputMaybe<VideoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWeaponStoriesArgs = {
  filters?: InputMaybe<WeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWeaponStoryArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWeaponStoryGroupArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWeaponStoryGroupsArgs = {
  filters?: InputMaybe<WeaponStoryGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWeaponStoryTypeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWeaponStoryTypesArgs = {
  filters?: InputMaybe<WeaponStoryTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWebArchiveArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWebArchivesArgs = {
  filters?: InputMaybe<WebArchiveFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWebsiteInterfaceArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWebsiteInterfacesArgs = {
  filters?: InputMaybe<WebsiteInterfaceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWikiPageArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWikiPagesArgs = {
  filters?: InputMaybe<WikiPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryWikiPagesTagArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryWikiPagesTagsArgs = {
  filters?: InputMaybe<WikiPagesTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type RangedContent = {
  __typename?: "RangedContent";
  content?: Maybe<ContentEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  library_item?: Maybe<LibraryItemEntityResponse>;
  range: Array<Maybe<RangedContentRangeDynamicZone>>;
  scan_set?: Maybe<Array<Maybe<ComponentSetsScanSet>>>;
  slug: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type RangedContentScan_SetArgs = {
  filters?: InputMaybe<ComponentSetsScanSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type RangedContentEntity = {
  __typename?: "RangedContentEntity";
  attributes?: Maybe<RangedContent>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type RangedContentEntityResponse = {
  __typename?: "RangedContentEntityResponse";
  data?: Maybe<RangedContentEntity>;
};

export type RangedContentEntityResponseCollection = {
  __typename?: "RangedContentEntityResponseCollection";
  data: Array<RangedContentEntity>;
  meta: ResponseCollectionMeta;
};

export type RangedContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RangedContentFiltersInput>>>;
  content?: InputMaybe<ContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  library_item?: InputMaybe<LibraryItemFiltersInput>;
  not?: InputMaybe<RangedContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RangedContentFiltersInput>>>;
  scan_set?: InputMaybe<ComponentSetsScanSetFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RangedContentInput = {
  content?: InputMaybe<Scalars["ID"]["input"]>;
  library_item?: InputMaybe<Scalars["ID"]["input"]>;
  range?: InputMaybe<Array<Scalars["RangedContentRangeDynamicZoneInput"]["input"]>>;
  scan_set?: InputMaybe<Array<InputMaybe<ComponentSetsScanSetInput>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type RangedContentRangeDynamicZone =
  | ComponentRangeOther
  | ComponentRangePageRange
  | ComponentRangeTimeRange
  | Error;

export type RangedContentRelationResponseCollection = {
  __typename?: "RangedContentRelationResponseCollection";
  data: Array<RangedContentEntity>;
};

export type Recorder = {
  __typename?: "Recorder";
  anonymize: Scalars["Boolean"]["output"];
  anonymous_code: Scalars["String"]["output"];
  avatar?: Maybe<UploadFileEntityResponse>;
  bio?: Maybe<Array<Maybe<ComponentTranslationsBio>>>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  languages?: Maybe<LanguageRelationResponseCollection>;
  pronouns?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  username: Scalars["String"]["output"];
};

export type RecorderBioArgs = {
  filters?: InputMaybe<ComponentTranslationsBioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type RecorderLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type RecorderEntity = {
  __typename?: "RecorderEntity";
  attributes?: Maybe<Recorder>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type RecorderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RecorderFiltersInput>>>;
  anonymize?: InputMaybe<BooleanFilterInput>;
  anonymous_code?: InputMaybe<StringFilterInput>;
  bio?: InputMaybe<ComponentTranslationsBioFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  languages?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<RecorderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RecorderFiltersInput>>>;
  pronouns?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type RecorderInput = {
  anonymize?: InputMaybe<Scalars["Boolean"]["input"]>;
  anonymous_code?: InputMaybe<Scalars["String"]["input"]>;
  avatar?: InputMaybe<Scalars["ID"]["input"]>;
  bio?: InputMaybe<Array<InputMaybe<ComponentTranslationsBioInput>>>;
  languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  pronouns?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type RecorderRelationResponseCollection = {
  __typename?: "RecorderRelationResponseCollection";
  data: Array<RecorderEntity>;
};

export type ReinCostume = {
  __typename?: "ReinCostume";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  emblem?: Maybe<ReinEmblemEntityResponse>;
  slug: Scalars["String"]["output"];
  sprite?: Maybe<UploadFileEntityResponse>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsReinCostumes>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ReinCostumeTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsReinCostumesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReinCostumeEntity = {
  __typename?: "ReinCostumeEntity";
  attributes?: Maybe<ReinCostume>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ReinCostumeEntityResponse = {
  __typename?: "ReinCostumeEntityResponse";
  data?: Maybe<ReinCostumeEntity>;
};

export type ReinCostumeEntityResponseCollection = {
  __typename?: "ReinCostumeEntityResponseCollection";
  data: Array<ReinCostumeEntity>;
  meta: ResponseCollectionMeta;
};

export type ReinCostumeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReinCostumeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  emblem?: InputMaybe<ReinEmblemFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ReinCostumeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReinCostumeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsReinCostumesFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReinCostumeInput = {
  emblem?: InputMaybe<Scalars["ID"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  sprite?: InputMaybe<Scalars["ID"]["input"]>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsReinCostumesInput>>>;
};

export type ReinCostumeRelationResponseCollection = {
  __typename?: "ReinCostumeRelationResponseCollection";
  data: Array<ReinCostumeEntity>;
};

export type ReinEmblem = {
  __typename?: "ReinEmblem";
  costumes?: Maybe<ReinCostumeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsReinEmblems>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ReinEmblemCostumesArgs = {
  filters?: InputMaybe<ReinCostumeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReinEmblemTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsReinEmblemsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ReinEmblemEntity = {
  __typename?: "ReinEmblemEntity";
  attributes?: Maybe<ReinEmblem>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ReinEmblemEntityResponse = {
  __typename?: "ReinEmblemEntityResponse";
  data?: Maybe<ReinEmblemEntity>;
};

export type ReinEmblemEntityResponseCollection = {
  __typename?: "ReinEmblemEntityResponseCollection";
  data: Array<ReinEmblemEntity>;
  meta: ResponseCollectionMeta;
};

export type ReinEmblemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReinEmblemFiltersInput>>>;
  costumes?: InputMaybe<ReinCostumeFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ReinEmblemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ReinEmblemFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsReinEmblemsFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ReinEmblemInput = {
  costumes?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsReinEmblemsInput>>>;
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export type Source = {
  __typename?: "Source";
  content?: Maybe<ContentEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  name: Scalars["String"]["output"];
  ranged_content?: Maybe<RangedContentEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type SourceEntity = {
  __typename?: "SourceEntity";
  attributes?: Maybe<Source>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type SourceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SourceFiltersInput>>>;
  content?: InputMaybe<ContentFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<SourceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SourceFiltersInput>>>;
  ranged_content?: InputMaybe<RangedContentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SourceInput = {
  content?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  ranged_content?: InputMaybe<Scalars["ID"]["input"]>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  containsi?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  eqi?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]["input"]>;
  notContainsi?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type TextualSubtype = {
  __typename?: "TextualSubtype";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type TextualSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type TextualSubtypeEntity = {
  __typename?: "TextualSubtypeEntity";
  attributes?: Maybe<TextualSubtype>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type TextualSubtypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TextualSubtypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TextualSubtypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TextualSubtypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TextualSubtypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]["output"]>;
  caption?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  ext?: Maybe<Scalars["String"]["output"]>;
  formats?: Maybe<Scalars["JSON"]["output"]>;
  hash: Scalars["String"]["output"];
  height?: Maybe<Scalars["Int"]["output"]>;
  mime: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  previewUrl?: Maybe<Scalars["String"]["output"]>;
  provider: Scalars["String"]["output"];
  provider_metadata?: Maybe<Scalars["JSON"]["output"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  url: Scalars["String"]["output"];
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  ext?: InputMaybe<Scalars["String"]["input"]>;
  folder?: InputMaybe<Scalars["ID"]["input"]>;
  folderPath?: InputMaybe<Scalars["String"]["input"]>;
  formats?: InputMaybe<Scalars["JSON"]["input"]>;
  hash?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  mime?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  previewUrl?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  size?: InputMaybe<Scalars["Float"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: "UploadFolder";
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars["String"]["output"];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars["String"]["output"];
  pathId: Scalars["Int"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UploadFolderEntity = {
  __typename?: "UploadFolderEntity";
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type UploadFolderEntityResponse = {
  __typename?: "UploadFolderEntityResponse";
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: "UploadFolderEntityResponseCollection";
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  parent?: InputMaybe<Scalars["ID"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  pathId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: "UploadFolderRelationResponseCollection";
  data: Array<UploadFolderEntity>;
};

export type Video = {
  __typename?: "Video";
  audio_languages?: Maybe<LanguageRelationResponseCollection>;
  categories?: Maybe<CategoryRelationResponseCollection>;
  channel?: Maybe<VideoChannelEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description: Scalars["String"]["output"];
  duration: Scalars["Int"]["output"];
  gone: Scalars["Boolean"]["output"];
  height: Scalars["Int"]["output"];
  likes: Scalars["Int"]["output"];
  live_chat: Scalars["Boolean"]["output"];
  published_date: ComponentBasicsDatepicker;
  source?: Maybe<Enum_Video_Source>;
  sub_languages?: Maybe<LanguageRelationResponseCollection>;
  title: Scalars["String"]["output"];
  uid: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  views: Scalars["Int"]["output"];
  width: Scalars["Int"]["output"];
};

export type VideoAudio_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoSub_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoChannel = {
  __typename?: "VideoChannel";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  subscribers: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  uid: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  videos?: Maybe<VideoRelationResponseCollection>;
};

export type VideoChannelVideosArgs = {
  filters?: InputMaybe<VideoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoChannelEntity = {
  __typename?: "VideoChannelEntity";
  attributes?: Maybe<VideoChannel>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type VideoChannelEntityResponse = {
  __typename?: "VideoChannelEntityResponse";
  data?: Maybe<VideoChannelEntity>;
};

export type VideoChannelEntityResponseCollection = {
  __typename?: "VideoChannelEntityResponseCollection";
  data: Array<VideoChannelEntity>;
  meta: ResponseCollectionMeta;
};

export type VideoChannelFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VideoChannelFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<VideoChannelFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VideoChannelFiltersInput>>>;
  subscribers?: InputMaybe<IntFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  uid?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  videos?: InputMaybe<VideoFiltersInput>;
};

export type VideoChannelInput = {
  subscribers?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  uid?: InputMaybe<Scalars["String"]["input"]>;
  videos?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type VideoEntity = {
  __typename?: "VideoEntity";
  attributes?: Maybe<Video>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type VideoEntityResponse = {
  __typename?: "VideoEntityResponse";
  data?: Maybe<VideoEntity>;
};

export type VideoEntityResponseCollection = {
  __typename?: "VideoEntityResponseCollection";
  data: Array<VideoEntity>;
  meta: ResponseCollectionMeta;
};

export type VideoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VideoFiltersInput>>>;
  audio_languages?: InputMaybe<LanguageFiltersInput>;
  categories?: InputMaybe<CategoryFiltersInput>;
  channel?: InputMaybe<VideoChannelFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  duration?: InputMaybe<IntFilterInput>;
  gone?: InputMaybe<BooleanFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  likes?: InputMaybe<IntFilterInput>;
  live_chat?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<VideoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VideoFiltersInput>>>;
  published_date?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  source?: InputMaybe<StringFilterInput>;
  sub_languages?: InputMaybe<LanguageFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  uid?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  views?: InputMaybe<IntFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type VideoInput = {
  audio_languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  channel?: InputMaybe<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  duration?: InputMaybe<Scalars["Int"]["input"]>;
  gone?: InputMaybe<Scalars["Boolean"]["input"]>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  likes?: InputMaybe<Scalars["Int"]["input"]>;
  live_chat?: InputMaybe<Scalars["Boolean"]["input"]>;
  published_date?: InputMaybe<ComponentBasicsDatepickerInput>;
  source?: InputMaybe<Enum_Video_Source>;
  sub_languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  uid?: InputMaybe<Scalars["String"]["input"]>;
  views?: InputMaybe<Scalars["Int"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type VideoRelationResponseCollection = {
  __typename?: "VideoRelationResponseCollection";
  data: Array<VideoEntity>;
};

export type VideoSubtype = {
  __typename?: "VideoSubtype";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type VideoSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type VideoSubtypeEntity = {
  __typename?: "VideoSubtypeEntity";
  attributes?: Maybe<VideoSubtype>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type VideoSubtypeEntityResponse = {
  __typename?: "VideoSubtypeEntityResponse";
  data?: Maybe<VideoSubtypeEntity>;
};

export type VideoSubtypeEntityResponseCollection = {
  __typename?: "VideoSubtypeEntityResponseCollection";
  data: Array<VideoSubtypeEntity>;
  meta: ResponseCollectionMeta;
};

export type VideoSubtypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<VideoSubtypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<VideoSubtypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VideoSubtypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type VideoSubtypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type WeaponStory = {
  __typename?: "WeaponStory";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  name?: Maybe<Array<Maybe<ComponentTranslationsWeaponStory>>>;
  slug: Scalars["String"]["output"];
  stories?: Maybe<Array<Maybe<ComponentCollectionsComponentWeaponStory>>>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  type?: Maybe<WeaponStoryTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  weapon_group?: Maybe<WeaponStoryGroupEntityResponse>;
  wiki_page?: Maybe<WikiPageEntityResponse>;
};

export type WeaponStoryNameArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WeaponStoryStoriesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WeaponStoryEntity = {
  __typename?: "WeaponStoryEntity";
  attributes?: Maybe<WeaponStory>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type WeaponStoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WeaponStoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>;
  not?: InputMaybe<WeaponStoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WeaponStoryFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  stories?: InputMaybe<ComponentCollectionsComponentWeaponStoryFiltersInput>;
  type?: InputMaybe<WeaponStoryTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weapon_group?: InputMaybe<WeaponStoryGroupFiltersInput>;
  wiki_page?: InputMaybe<WikiPageFiltersInput>;
};

export type WeaponStoryGroup = {
  __typename?: "WeaponStoryGroup";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  subgroup_of?: Maybe<WeaponStoryGroupEntityResponse>;
  subgroups?: Maybe<WeaponStoryGroupRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  weapons?: Maybe<WeaponStoryRelationResponseCollection>;
};

export type WeaponStoryGroupSubgroupsArgs = {
  filters?: InputMaybe<WeaponStoryGroupFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WeaponStoryGroupWeaponsArgs = {
  filters?: InputMaybe<WeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WeaponStoryGroupEntity = {
  __typename?: "WeaponStoryGroupEntity";
  attributes?: Maybe<WeaponStoryGroup>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type WeaponStoryGroupFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WeaponStoryGroupFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<WeaponStoryGroupFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WeaponStoryGroupFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  subgroup_of?: InputMaybe<WeaponStoryGroupFiltersInput>;
  subgroups?: InputMaybe<WeaponStoryGroupFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weapons?: InputMaybe<WeaponStoryFiltersInput>;
};

export type WeaponStoryGroupInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  subgroup_of?: InputMaybe<Scalars["ID"]["input"]>;
  subgroups?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  weapons?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type WeaponStoryGroupRelationResponseCollection = {
  __typename?: "WeaponStoryGroupRelationResponseCollection";
  data: Array<WeaponStoryGroupEntity>;
};

export type WeaponStoryInput = {
  name?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryInput>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  stories?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentWeaponStoryInput>>>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  type?: InputMaybe<Scalars["ID"]["input"]>;
  weapon_group?: InputMaybe<Scalars["ID"]["input"]>;
  wiki_page?: InputMaybe<Scalars["ID"]["input"]>;
};

export type WeaponStoryRelationResponseCollection = {
  __typename?: "WeaponStoryRelationResponseCollection";
  data: Array<WeaponStoryEntity>;
};

export type WeaponStoryType = {
  __typename?: "WeaponStoryType";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryType>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type WeaponStoryTypeTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WeaponStoryTypeEntity = {
  __typename?: "WeaponStoryTypeEntity";
  attributes?: Maybe<WeaponStoryType>;
  id?: Maybe<Scalars["ID"]["output"]>;
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

export type WeaponStoryTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WeaponStoryTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<WeaponStoryTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WeaponStoryTypeFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type WeaponStoryTypeInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryTypeInput>>>;
};

export type WebArchive = {
  __typename?: "WebArchive";
  author?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  date: ComponentBasicsDatepicker;
  descriptions?: Maybe<Array<Maybe<ComponentTranslationsWebArchives>>>;
  format: Enum_Webarchive_Format;
  num_pages?: Maybe<Scalars["Int"]["output"]>;
  size: ComponentBasicsFileSize;
  source_url: Scalars["String"]["output"];
  still_online: Scalars["Boolean"]["output"];
  type: Enum_Webarchive_Type;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type WebArchiveDescriptionsArgs = {
  filters?: InputMaybe<ComponentTranslationsWebArchivesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WebArchiveEntity = {
  __typename?: "WebArchiveEntity";
  attributes?: Maybe<WebArchive>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type WebArchiveEntityResponse = {
  __typename?: "WebArchiveEntityResponse";
  data?: Maybe<WebArchiveEntity>;
};

export type WebArchiveEntityResponseCollection = {
  __typename?: "WebArchiveEntityResponseCollection";
  data: Array<WebArchiveEntity>;
  meta: ResponseCollectionMeta;
};

export type WebArchiveFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WebArchiveFiltersInput>>>;
  author?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date?: InputMaybe<ComponentBasicsDatepickerFiltersInput>;
  descriptions?: InputMaybe<ComponentTranslationsWebArchivesFiltersInput>;
  format?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<WebArchiveFiltersInput>;
  num_pages?: InputMaybe<IntFilterInput>;
  or?: InputMaybe<Array<InputMaybe<WebArchiveFiltersInput>>>;
  size?: InputMaybe<ComponentBasicsFileSizeFiltersInput>;
  source_url?: InputMaybe<StringFilterInput>;
  still_online?: InputMaybe<BooleanFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type WebArchiveInput = {
  author?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<ComponentBasicsDatepickerInput>;
  descriptions?: InputMaybe<Array<InputMaybe<ComponentTranslationsWebArchivesInput>>>;
  format?: InputMaybe<Enum_Webarchive_Format>;
  num_pages?: InputMaybe<Scalars["Int"]["input"]>;
  size?: InputMaybe<ComponentBasicsFileSizeInput>;
  source_url?: InputMaybe<Scalars["String"]["input"]>;
  still_online?: InputMaybe<Scalars["Boolean"]["input"]>;
  type?: InputMaybe<Enum_Webarchive_Type>;
};

export type WebsiteInterface = {
  __typename?: "WebsiteInterface";
  about_us?: Maybe<Scalars["String"]["output"]>;
  about_us_description?: Maybe<Scalars["String"]["output"]>;
  accords_handbook?: Maybe<Scalars["String"]["output"]>;
  all?: Maybe<Scalars["String"]["output"]>;
  always_show_info?: Maybe<Scalars["String"]["output"]>;
  anchor_link_copied?: Maybe<Scalars["String"]["output"]>;
  archives?: Maybe<Scalars["String"]["output"]>;
  archives_description?: Maybe<Scalars["String"]["output"]>;
  audio?: Maybe<Scalars["String"]["output"]>;
  author?: Maybe<Scalars["String"]["output"]>;
  auto?: Maybe<Scalars["String"]["output"]>;
  available_at?: Maybe<Scalars["String"]["output"]>;
  available_at_x?: Maybe<Scalars["String"]["output"]>;
  back_matter?: Maybe<Scalars["String"]["output"]>;
  binding?: Maybe<Scalars["String"]["output"]>;
  book_fold?: Maybe<Scalars["String"]["output"]>;
  calculated?: Maybe<Scalars["String"]["output"]>;
  category?: Maybe<Scalars["String"]["output"]>;
  channel?: Maybe<Scalars["String"]["output"]>;
  chronicles?: Maybe<Scalars["String"]["output"]>;
  chronicles_description?: Maybe<Scalars["String"]["output"]>;
  chronicles_short_description?: Maybe<Scalars["String"]["output"]>;
  chronology?: Maybe<Scalars["String"]["output"]>;
  cleaners?: Maybe<Scalars["String"]["output"]>;
  contact_us?: Maybe<Scalars["String"]["output"]>;
  content?: Maybe<Scalars["String"]["output"]>;
  content_is_not_available?: Maybe<Scalars["String"]["output"]>;
  contents?: Maybe<Scalars["String"]["output"]>;
  contents_description?: Maybe<Scalars["String"]["output"]>;
  contents_short_description?: Maybe<Scalars["String"]["output"]>;
  copy_anchor_link?: Maybe<Scalars["String"]["output"]>;
  copyright_notice?: Maybe<Scalars["String"]["output"]>;
  cover?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  currency?: Maybe<Scalars["String"]["output"]>;
  dark?: Maybe<Scalars["String"]["output"]>;
  dark_mode_extension_warning?: Maybe<Scalars["String"]["output"]>;
  default_description?: Maybe<Scalars["String"]["output"]>;
  definition_x?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  details?: Maybe<Scalars["String"]["output"]>;
  done?: Maybe<Scalars["String"]["output"]>;
  double_page_view?: Maybe<Scalars["String"]["output"]>;
  download_archive?: Maybe<Scalars["String"]["output"]>;
  draft?: Maybe<Scalars["String"]["output"]>;
  dubber?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  email_gdpr_notice?: Maybe<Scalars["String"]["output"]>;
  empty_folder_message?: Maybe<Scalars["String"]["output"]>;
  folders?: Maybe<Scalars["String"]["output"]>;
  followup_content?: Maybe<Scalars["String"]["output"]>;
  font?: Maybe<Scalars["String"]["output"]>;
  font_size?: Maybe<Scalars["String"]["output"]>;
  front_matter?: Maybe<Scalars["String"]["output"]>;
  gallery?: Maybe<Scalars["String"]["output"]>;
  game?: Maybe<Scalars["String"]["output"]>;
  group?: Maybe<Scalars["String"]["output"]>;
  group_by?: Maybe<Scalars["String"]["output"]>;
  hardcover?: Maybe<Scalars["String"]["output"]>;
  have_it?: Maybe<Scalars["String"]["output"]>;
  height?: Maybe<Scalars["String"]["output"]>;
  incomplete?: Maybe<Scalars["String"]["output"]>;
  item?: Maybe<Scalars["String"]["output"]>;
  item_not_available?: Maybe<Scalars["String"]["output"]>;
  language?: Maybe<Scalars["String"]["output"]>;
  least_popular?: Maybe<Scalars["String"]["output"]>;
  left_to_right?: Maybe<Scalars["String"]["output"]>;
  legality?: Maybe<Scalars["String"]["output"]>;
  level_x?: Maybe<Scalars["String"]["output"]>;
  library?: Maybe<Scalars["String"]["output"]>;
  library_description?: Maybe<Scalars["String"]["output"]>;
  library_short_description?: Maybe<Scalars["String"]["output"]>;
  licensing_notice?: Maybe<Scalars["String"]["output"]>;
  light?: Maybe<Scalars["String"]["output"]>;
  lighting?: Maybe<Scalars["String"]["output"]>;
  listen_content?: Maybe<Scalars["String"]["output"]>;
  longest?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  most_popular?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  newest?: Maybe<Scalars["String"]["output"]>;
  news?: Maybe<Scalars["String"]["output"]>;
  news_description?: Maybe<Scalars["String"]["output"]>;
  night_reader?: Maybe<Scalars["String"]["output"]>;
  no_results_message?: Maybe<Scalars["String"]["output"]>;
  no_source_warning?: Maybe<Scalars["String"]["output"]>;
  notes?: Maybe<Scalars["String"]["output"]>;
  oldest?: Maybe<Scalars["String"]["output"]>;
  only_display_items_i_have?: Maybe<Scalars["String"]["output"]>;
  only_display_items_i_want?: Maybe<Scalars["String"]["output"]>;
  only_display_unmarked_items?: Maybe<Scalars["String"]["output"]>;
  only_unavailable_videos?: Maybe<Scalars["String"]["output"]>;
  open_content?: Maybe<Scalars["String"]["output"]>;
  open_search?: Maybe<Scalars["String"]["output"]>;
  open_settings?: Maybe<Scalars["String"]["output"]>;
  order_by?: Maybe<Scalars["String"]["output"]>;
  other?: Maybe<Scalars["String"]["output"]>;
  page?: Maybe<Scalars["String"]["output"]>;
  page_not_found?: Maybe<Scalars["String"]["output"]>;
  page_order?: Maybe<Scalars["String"]["output"]>;
  paper_texture?: Maybe<Scalars["String"]["output"]>;
  paperback?: Maybe<Scalars["String"]["output"]>;
  performance_mode?: Maybe<Scalars["String"]["output"]>;
  performance_mode_tooltip?: Maybe<Scalars["String"]["output"]>;
  player_name?: Maybe<Scalars["String"]["output"]>;
  player_name_tooltip?: Maybe<Scalars["String"]["output"]>;
  previous_content?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["String"]["output"]>;
  primary_language?: Maybe<Scalars["String"]["output"]>;
  pronouns?: Maybe<Scalars["String"]["output"]>;
  proofreader?: Maybe<Scalars["String"]["output"]>;
  quality?: Maybe<Scalars["String"]["output"]>;
  read_content?: Maybe<Scalars["String"]["output"]>;
  reading_layout?: Maybe<Scalars["String"]["output"]>;
  release_date?: Maybe<Scalars["String"]["output"]>;
  release_year?: Maybe<Scalars["String"]["output"]>;
  reset_all_filters?: Maybe<Scalars["String"]["output"]>;
  reset_all_options?: Maybe<Scalars["String"]["output"]>;
  response_email_success?: Maybe<Scalars["String"]["output"]>;
  response_invalid_code?: Maybe<Scalars["String"]["output"]>;
  response_invalid_email?: Maybe<Scalars["String"]["output"]>;
  return_to_x?: Maybe<Scalars["String"]["output"]>;
  review?: Maybe<Scalars["String"]["output"]>;
  right_to_left?: Maybe<Scalars["String"]["output"]>;
  scan?: Maybe<Scalars["String"]["output"]>;
  scanlation?: Maybe<Scalars["String"]["output"]>;
  scanners?: Maybe<Scalars["String"]["output"]>;
  search?: Maybe<Scalars["String"]["output"]>;
  search_placeholder?: Maybe<Scalars["String"]["output"]>;
  secondary_language?: Maybe<Scalars["String"]["output"]>;
  select_option_sidebar?: Maybe<Scalars["String"]["output"]>;
  send?: Maybe<Scalars["String"]["output"]>;
  settings?: Maybe<Scalars["String"]["output"]>;
  shadow?: Maybe<Scalars["String"]["output"]>;
  sharing_policy?: Maybe<Scalars["String"]["output"]>;
  shortest?: Maybe<Scalars["String"]["output"]>;
  show_primary_items?: Maybe<Scalars["String"]["output"]>;
  show_secondary_items?: Maybe<Scalars["String"]["output"]>;
  show_subitems?: Maybe<Scalars["String"]["output"]>;
  showing_x_out_of_y_results?: Maybe<Scalars["String"]["output"]>;
  side_pages?: Maybe<Scalars["String"]["output"]>;
  single_page_view?: Maybe<Scalars["String"]["output"]>;
  size?: Maybe<Scalars["String"]["output"]>;
  source?: Maybe<Scalars["String"]["output"]>;
  source_language?: Maybe<Scalars["String"]["output"]>;
  special_pages?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  status_done?: Maybe<Scalars["String"]["output"]>;
  status_draft?: Maybe<Scalars["String"]["output"]>;
  status_incomplete?: Maybe<Scalars["String"]["output"]>;
  status_review?: Maybe<Scalars["String"]["output"]>;
  story_x?: Maybe<Scalars["String"]["output"]>;
  subber?: Maybe<Scalars["String"]["output"]>;
  subitem?: Maybe<Scalars["String"]["output"]>;
  subitem_of_x?: Maybe<Scalars["String"]["output"]>;
  subscribers?: Maybe<Scalars["String"]["output"]>;
  summary?: Maybe<Scalars["String"]["output"]>;
  switch_to_folder_view?: Maybe<Scalars["String"]["output"]>;
  switch_to_grid_view?: Maybe<Scalars["String"]["output"]>;
  table_of_contents?: Maybe<Scalars["String"]["output"]>;
  tags?: Maybe<Scalars["String"]["output"]>;
  textual?: Maybe<Scalars["String"]["output"]>;
  theme?: Maybe<Scalars["String"]["output"]>;
  thickness?: Maybe<Scalars["String"]["output"]>;
  transcriber?: Maybe<Scalars["String"]["output"]>;
  transcript_notice?: Maybe<Scalars["String"]["output"]>;
  translation_notice?: Maybe<Scalars["String"]["output"]>;
  translator?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  type_information?: Maybe<Scalars["String"]["output"]>;
  typesetters?: Maybe<Scalars["String"]["output"]>;
  ui_language?: Maybe<LanguageEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  variant?: Maybe<Scalars["String"]["output"]>;
  variant_of_x?: Maybe<Scalars["String"]["output"]>;
  video?: Maybe<Scalars["String"]["output"]>;
  videos?: Maybe<Scalars["String"]["output"]>;
  view_on?: Maybe<Scalars["String"]["output"]>;
  view_on_x?: Maybe<Scalars["String"]["output"]>;
  view_scans?: Maybe<Scalars["String"]["output"]>;
  want_it?: Maybe<Scalars["String"]["output"]>;
  watch_content?: Maybe<Scalars["String"]["output"]>;
  weapon?: Maybe<Scalars["String"]["output"]>;
  weapons_description?: Maybe<Scalars["String"]["output"]>;
  width?: Maybe<Scalars["String"]["output"]>;
  wiki?: Maybe<Scalars["String"]["output"]>;
  wiki_description?: Maybe<Scalars["String"]["output"]>;
  wiki_short_description?: Maybe<Scalars["String"]["output"]>;
  x_results?: Maybe<Scalars["String"]["output"]>;
};

export type WebsiteInterfaceEntity = {
  __typename?: "WebsiteInterfaceEntity";
  attributes?: Maybe<WebsiteInterface>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type WebsiteInterfaceEntityResponse = {
  __typename?: "WebsiteInterfaceEntityResponse";
  data?: Maybe<WebsiteInterfaceEntity>;
};

export type WebsiteInterfaceEntityResponseCollection = {
  __typename?: "WebsiteInterfaceEntityResponseCollection";
  data: Array<WebsiteInterfaceEntity>;
  meta: ResponseCollectionMeta;
};

export type WebsiteInterfaceFiltersInput = {
  about_us?: InputMaybe<StringFilterInput>;
  about_us_description?: InputMaybe<StringFilterInput>;
  accords_handbook?: InputMaybe<StringFilterInput>;
  all?: InputMaybe<StringFilterInput>;
  always_show_info?: InputMaybe<StringFilterInput>;
  anchor_link_copied?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<WebsiteInterfaceFiltersInput>>>;
  archives?: InputMaybe<StringFilterInput>;
  archives_description?: InputMaybe<StringFilterInput>;
  audio?: InputMaybe<StringFilterInput>;
  author?: InputMaybe<StringFilterInput>;
  auto?: InputMaybe<StringFilterInput>;
  available_at?: InputMaybe<StringFilterInput>;
  available_at_x?: InputMaybe<StringFilterInput>;
  back_matter?: InputMaybe<StringFilterInput>;
  binding?: InputMaybe<StringFilterInput>;
  book_fold?: InputMaybe<StringFilterInput>;
  calculated?: InputMaybe<StringFilterInput>;
  category?: InputMaybe<StringFilterInput>;
  channel?: InputMaybe<StringFilterInput>;
  chronicles?: InputMaybe<StringFilterInput>;
  chronicles_description?: InputMaybe<StringFilterInput>;
  chronicles_short_description?: InputMaybe<StringFilterInput>;
  chronology?: InputMaybe<StringFilterInput>;
  cleaners?: InputMaybe<StringFilterInput>;
  contact_us?: InputMaybe<StringFilterInput>;
  content?: InputMaybe<StringFilterInput>;
  content_is_not_available?: InputMaybe<StringFilterInput>;
  contents?: InputMaybe<StringFilterInput>;
  contents_description?: InputMaybe<StringFilterInput>;
  contents_short_description?: InputMaybe<StringFilterInput>;
  copy_anchor_link?: InputMaybe<StringFilterInput>;
  copyright_notice?: InputMaybe<StringFilterInput>;
  cover?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  currency?: InputMaybe<StringFilterInput>;
  dark?: InputMaybe<StringFilterInput>;
  dark_mode_extension_warning?: InputMaybe<StringFilterInput>;
  default_description?: InputMaybe<StringFilterInput>;
  definition_x?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  details?: InputMaybe<StringFilterInput>;
  done?: InputMaybe<StringFilterInput>;
  double_page_view?: InputMaybe<StringFilterInput>;
  download_archive?: InputMaybe<StringFilterInput>;
  draft?: InputMaybe<StringFilterInput>;
  dubber?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  email_gdpr_notice?: InputMaybe<StringFilterInput>;
  empty_folder_message?: InputMaybe<StringFilterInput>;
  folders?: InputMaybe<StringFilterInput>;
  followup_content?: InputMaybe<StringFilterInput>;
  font?: InputMaybe<StringFilterInput>;
  font_size?: InputMaybe<StringFilterInput>;
  front_matter?: InputMaybe<StringFilterInput>;
  gallery?: InputMaybe<StringFilterInput>;
  game?: InputMaybe<StringFilterInput>;
  group?: InputMaybe<StringFilterInput>;
  group_by?: InputMaybe<StringFilterInput>;
  hardcover?: InputMaybe<StringFilterInput>;
  have_it?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  incomplete?: InputMaybe<StringFilterInput>;
  item?: InputMaybe<StringFilterInput>;
  item_not_available?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<StringFilterInput>;
  least_popular?: InputMaybe<StringFilterInput>;
  left_to_right?: InputMaybe<StringFilterInput>;
  legality?: InputMaybe<StringFilterInput>;
  level_x?: InputMaybe<StringFilterInput>;
  library?: InputMaybe<StringFilterInput>;
  library_description?: InputMaybe<StringFilterInput>;
  library_short_description?: InputMaybe<StringFilterInput>;
  licensing_notice?: InputMaybe<StringFilterInput>;
  light?: InputMaybe<StringFilterInput>;
  lighting?: InputMaybe<StringFilterInput>;
  listen_content?: InputMaybe<StringFilterInput>;
  longest?: InputMaybe<StringFilterInput>;
  message?: InputMaybe<StringFilterInput>;
  most_popular?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  newest?: InputMaybe<StringFilterInput>;
  news?: InputMaybe<StringFilterInput>;
  news_description?: InputMaybe<StringFilterInput>;
  night_reader?: InputMaybe<StringFilterInput>;
  no_results_message?: InputMaybe<StringFilterInput>;
  no_source_warning?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<WebsiteInterfaceFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  oldest?: InputMaybe<StringFilterInput>;
  only_display_items_i_have?: InputMaybe<StringFilterInput>;
  only_display_items_i_want?: InputMaybe<StringFilterInput>;
  only_display_unmarked_items?: InputMaybe<StringFilterInput>;
  only_unavailable_videos?: InputMaybe<StringFilterInput>;
  open_content?: InputMaybe<StringFilterInput>;
  open_search?: InputMaybe<StringFilterInput>;
  open_settings?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<WebsiteInterfaceFiltersInput>>>;
  order_by?: InputMaybe<StringFilterInput>;
  other?: InputMaybe<StringFilterInput>;
  page?: InputMaybe<StringFilterInput>;
  page_not_found?: InputMaybe<StringFilterInput>;
  page_order?: InputMaybe<StringFilterInput>;
  paper_texture?: InputMaybe<StringFilterInput>;
  paperback?: InputMaybe<StringFilterInput>;
  performance_mode?: InputMaybe<StringFilterInput>;
  performance_mode_tooltip?: InputMaybe<StringFilterInput>;
  player_name?: InputMaybe<StringFilterInput>;
  player_name_tooltip?: InputMaybe<StringFilterInput>;
  previous_content?: InputMaybe<StringFilterInput>;
  price?: InputMaybe<StringFilterInput>;
  primary_language?: InputMaybe<StringFilterInput>;
  pronouns?: InputMaybe<StringFilterInput>;
  proofreader?: InputMaybe<StringFilterInput>;
  quality?: InputMaybe<StringFilterInput>;
  read_content?: InputMaybe<StringFilterInput>;
  reading_layout?: InputMaybe<StringFilterInput>;
  release_date?: InputMaybe<StringFilterInput>;
  release_year?: InputMaybe<StringFilterInput>;
  reset_all_filters?: InputMaybe<StringFilterInput>;
  reset_all_options?: InputMaybe<StringFilterInput>;
  response_email_success?: InputMaybe<StringFilterInput>;
  response_invalid_code?: InputMaybe<StringFilterInput>;
  response_invalid_email?: InputMaybe<StringFilterInput>;
  return_to_x?: InputMaybe<StringFilterInput>;
  review?: InputMaybe<StringFilterInput>;
  right_to_left?: InputMaybe<StringFilterInput>;
  scan?: InputMaybe<StringFilterInput>;
  scanlation?: InputMaybe<StringFilterInput>;
  scanners?: InputMaybe<StringFilterInput>;
  search?: InputMaybe<StringFilterInput>;
  search_placeholder?: InputMaybe<StringFilterInput>;
  secondary_language?: InputMaybe<StringFilterInput>;
  select_option_sidebar?: InputMaybe<StringFilterInput>;
  send?: InputMaybe<StringFilterInput>;
  settings?: InputMaybe<StringFilterInput>;
  shadow?: InputMaybe<StringFilterInput>;
  sharing_policy?: InputMaybe<StringFilterInput>;
  shortest?: InputMaybe<StringFilterInput>;
  show_primary_items?: InputMaybe<StringFilterInput>;
  show_secondary_items?: InputMaybe<StringFilterInput>;
  show_subitems?: InputMaybe<StringFilterInput>;
  showing_x_out_of_y_results?: InputMaybe<StringFilterInput>;
  side_pages?: InputMaybe<StringFilterInput>;
  single_page_view?: InputMaybe<StringFilterInput>;
  size?: InputMaybe<StringFilterInput>;
  source?: InputMaybe<StringFilterInput>;
  source_language?: InputMaybe<StringFilterInput>;
  special_pages?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  status_done?: InputMaybe<StringFilterInput>;
  status_draft?: InputMaybe<StringFilterInput>;
  status_incomplete?: InputMaybe<StringFilterInput>;
  status_review?: InputMaybe<StringFilterInput>;
  story_x?: InputMaybe<StringFilterInput>;
  subber?: InputMaybe<StringFilterInput>;
  subitem?: InputMaybe<StringFilterInput>;
  subitem_of_x?: InputMaybe<StringFilterInput>;
  subscribers?: InputMaybe<StringFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
  switch_to_folder_view?: InputMaybe<StringFilterInput>;
  switch_to_grid_view?: InputMaybe<StringFilterInput>;
  table_of_contents?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<StringFilterInput>;
  textual?: InputMaybe<StringFilterInput>;
  theme?: InputMaybe<StringFilterInput>;
  thickness?: InputMaybe<StringFilterInput>;
  transcriber?: InputMaybe<StringFilterInput>;
  transcript_notice?: InputMaybe<StringFilterInput>;
  translation_notice?: InputMaybe<StringFilterInput>;
  translator?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  type_information?: InputMaybe<StringFilterInput>;
  typesetters?: InputMaybe<StringFilterInput>;
  ui_language?: InputMaybe<LanguageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variant?: InputMaybe<StringFilterInput>;
  variant_of_x?: InputMaybe<StringFilterInput>;
  video?: InputMaybe<StringFilterInput>;
  videos?: InputMaybe<StringFilterInput>;
  view_on?: InputMaybe<StringFilterInput>;
  view_on_x?: InputMaybe<StringFilterInput>;
  view_scans?: InputMaybe<StringFilterInput>;
  want_it?: InputMaybe<StringFilterInput>;
  watch_content?: InputMaybe<StringFilterInput>;
  weapon?: InputMaybe<StringFilterInput>;
  weapons_description?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<StringFilterInput>;
  wiki?: InputMaybe<StringFilterInput>;
  wiki_description?: InputMaybe<StringFilterInput>;
  wiki_short_description?: InputMaybe<StringFilterInput>;
  x_results?: InputMaybe<StringFilterInput>;
};

export type WebsiteInterfaceInput = {
  about_us?: InputMaybe<Scalars["String"]["input"]>;
  about_us_description?: InputMaybe<Scalars["String"]["input"]>;
  accords_handbook?: InputMaybe<Scalars["String"]["input"]>;
  all?: InputMaybe<Scalars["String"]["input"]>;
  always_show_info?: InputMaybe<Scalars["String"]["input"]>;
  anchor_link_copied?: InputMaybe<Scalars["String"]["input"]>;
  archives?: InputMaybe<Scalars["String"]["input"]>;
  archives_description?: InputMaybe<Scalars["String"]["input"]>;
  audio?: InputMaybe<Scalars["String"]["input"]>;
  author?: InputMaybe<Scalars["String"]["input"]>;
  auto?: InputMaybe<Scalars["String"]["input"]>;
  available_at?: InputMaybe<Scalars["String"]["input"]>;
  available_at_x?: InputMaybe<Scalars["String"]["input"]>;
  back_matter?: InputMaybe<Scalars["String"]["input"]>;
  binding?: InputMaybe<Scalars["String"]["input"]>;
  book_fold?: InputMaybe<Scalars["String"]["input"]>;
  calculated?: InputMaybe<Scalars["String"]["input"]>;
  category?: InputMaybe<Scalars["String"]["input"]>;
  channel?: InputMaybe<Scalars["String"]["input"]>;
  chronicles?: InputMaybe<Scalars["String"]["input"]>;
  chronicles_description?: InputMaybe<Scalars["String"]["input"]>;
  chronicles_short_description?: InputMaybe<Scalars["String"]["input"]>;
  chronology?: InputMaybe<Scalars["String"]["input"]>;
  cleaners?: InputMaybe<Scalars["String"]["input"]>;
  contact_us?: InputMaybe<Scalars["String"]["input"]>;
  content?: InputMaybe<Scalars["String"]["input"]>;
  content_is_not_available?: InputMaybe<Scalars["String"]["input"]>;
  contents?: InputMaybe<Scalars["String"]["input"]>;
  contents_description?: InputMaybe<Scalars["String"]["input"]>;
  contents_short_description?: InputMaybe<Scalars["String"]["input"]>;
  copy_anchor_link?: InputMaybe<Scalars["String"]["input"]>;
  copyright_notice?: InputMaybe<Scalars["String"]["input"]>;
  cover?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dark?: InputMaybe<Scalars["String"]["input"]>;
  dark_mode_extension_warning?: InputMaybe<Scalars["String"]["input"]>;
  default_description?: InputMaybe<Scalars["String"]["input"]>;
  definition_x?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  details?: InputMaybe<Scalars["String"]["input"]>;
  done?: InputMaybe<Scalars["String"]["input"]>;
  double_page_view?: InputMaybe<Scalars["String"]["input"]>;
  download_archive?: InputMaybe<Scalars["String"]["input"]>;
  draft?: InputMaybe<Scalars["String"]["input"]>;
  dubber?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  email_gdpr_notice?: InputMaybe<Scalars["String"]["input"]>;
  empty_folder_message?: InputMaybe<Scalars["String"]["input"]>;
  folders?: InputMaybe<Scalars["String"]["input"]>;
  followup_content?: InputMaybe<Scalars["String"]["input"]>;
  font?: InputMaybe<Scalars["String"]["input"]>;
  font_size?: InputMaybe<Scalars["String"]["input"]>;
  front_matter?: InputMaybe<Scalars["String"]["input"]>;
  gallery?: InputMaybe<Scalars["String"]["input"]>;
  game?: InputMaybe<Scalars["String"]["input"]>;
  group?: InputMaybe<Scalars["String"]["input"]>;
  group_by?: InputMaybe<Scalars["String"]["input"]>;
  hardcover?: InputMaybe<Scalars["String"]["input"]>;
  have_it?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  incomplete?: InputMaybe<Scalars["String"]["input"]>;
  item?: InputMaybe<Scalars["String"]["input"]>;
  item_not_available?: InputMaybe<Scalars["String"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  least_popular?: InputMaybe<Scalars["String"]["input"]>;
  left_to_right?: InputMaybe<Scalars["String"]["input"]>;
  legality?: InputMaybe<Scalars["String"]["input"]>;
  level_x?: InputMaybe<Scalars["String"]["input"]>;
  library?: InputMaybe<Scalars["String"]["input"]>;
  library_description?: InputMaybe<Scalars["String"]["input"]>;
  library_short_description?: InputMaybe<Scalars["String"]["input"]>;
  licensing_notice?: InputMaybe<Scalars["String"]["input"]>;
  light?: InputMaybe<Scalars["String"]["input"]>;
  lighting?: InputMaybe<Scalars["String"]["input"]>;
  listen_content?: InputMaybe<Scalars["String"]["input"]>;
  longest?: InputMaybe<Scalars["String"]["input"]>;
  message?: InputMaybe<Scalars["String"]["input"]>;
  most_popular?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  newest?: InputMaybe<Scalars["String"]["input"]>;
  news?: InputMaybe<Scalars["String"]["input"]>;
  news_description?: InputMaybe<Scalars["String"]["input"]>;
  night_reader?: InputMaybe<Scalars["String"]["input"]>;
  no_results_message?: InputMaybe<Scalars["String"]["input"]>;
  no_source_warning?: InputMaybe<Scalars["String"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  oldest?: InputMaybe<Scalars["String"]["input"]>;
  only_display_items_i_have?: InputMaybe<Scalars["String"]["input"]>;
  only_display_items_i_want?: InputMaybe<Scalars["String"]["input"]>;
  only_display_unmarked_items?: InputMaybe<Scalars["String"]["input"]>;
  only_unavailable_videos?: InputMaybe<Scalars["String"]["input"]>;
  open_content?: InputMaybe<Scalars["String"]["input"]>;
  open_search?: InputMaybe<Scalars["String"]["input"]>;
  open_settings?: InputMaybe<Scalars["String"]["input"]>;
  order_by?: InputMaybe<Scalars["String"]["input"]>;
  other?: InputMaybe<Scalars["String"]["input"]>;
  page?: InputMaybe<Scalars["String"]["input"]>;
  page_not_found?: InputMaybe<Scalars["String"]["input"]>;
  page_order?: InputMaybe<Scalars["String"]["input"]>;
  paper_texture?: InputMaybe<Scalars["String"]["input"]>;
  paperback?: InputMaybe<Scalars["String"]["input"]>;
  performance_mode?: InputMaybe<Scalars["String"]["input"]>;
  performance_mode_tooltip?: InputMaybe<Scalars["String"]["input"]>;
  player_name?: InputMaybe<Scalars["String"]["input"]>;
  player_name_tooltip?: InputMaybe<Scalars["String"]["input"]>;
  previous_content?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["String"]["input"]>;
  primary_language?: InputMaybe<Scalars["String"]["input"]>;
  pronouns?: InputMaybe<Scalars["String"]["input"]>;
  proofreader?: InputMaybe<Scalars["String"]["input"]>;
  quality?: InputMaybe<Scalars["String"]["input"]>;
  read_content?: InputMaybe<Scalars["String"]["input"]>;
  reading_layout?: InputMaybe<Scalars["String"]["input"]>;
  release_date?: InputMaybe<Scalars["String"]["input"]>;
  release_year?: InputMaybe<Scalars["String"]["input"]>;
  reset_all_filters?: InputMaybe<Scalars["String"]["input"]>;
  reset_all_options?: InputMaybe<Scalars["String"]["input"]>;
  response_email_success?: InputMaybe<Scalars["String"]["input"]>;
  response_invalid_code?: InputMaybe<Scalars["String"]["input"]>;
  response_invalid_email?: InputMaybe<Scalars["String"]["input"]>;
  return_to_x?: InputMaybe<Scalars["String"]["input"]>;
  review?: InputMaybe<Scalars["String"]["input"]>;
  right_to_left?: InputMaybe<Scalars["String"]["input"]>;
  scan?: InputMaybe<Scalars["String"]["input"]>;
  scanlation?: InputMaybe<Scalars["String"]["input"]>;
  scanners?: InputMaybe<Scalars["String"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  search_placeholder?: InputMaybe<Scalars["String"]["input"]>;
  secondary_language?: InputMaybe<Scalars["String"]["input"]>;
  select_option_sidebar?: InputMaybe<Scalars["String"]["input"]>;
  send?: InputMaybe<Scalars["String"]["input"]>;
  settings?: InputMaybe<Scalars["String"]["input"]>;
  shadow?: InputMaybe<Scalars["String"]["input"]>;
  sharing_policy?: InputMaybe<Scalars["String"]["input"]>;
  shortest?: InputMaybe<Scalars["String"]["input"]>;
  show_primary_items?: InputMaybe<Scalars["String"]["input"]>;
  show_secondary_items?: InputMaybe<Scalars["String"]["input"]>;
  show_subitems?: InputMaybe<Scalars["String"]["input"]>;
  showing_x_out_of_y_results?: InputMaybe<Scalars["String"]["input"]>;
  side_pages?: InputMaybe<Scalars["String"]["input"]>;
  single_page_view?: InputMaybe<Scalars["String"]["input"]>;
  size?: InputMaybe<Scalars["String"]["input"]>;
  source?: InputMaybe<Scalars["String"]["input"]>;
  source_language?: InputMaybe<Scalars["String"]["input"]>;
  special_pages?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  status_done?: InputMaybe<Scalars["String"]["input"]>;
  status_draft?: InputMaybe<Scalars["String"]["input"]>;
  status_incomplete?: InputMaybe<Scalars["String"]["input"]>;
  status_review?: InputMaybe<Scalars["String"]["input"]>;
  story_x?: InputMaybe<Scalars["String"]["input"]>;
  subber?: InputMaybe<Scalars["String"]["input"]>;
  subitem?: InputMaybe<Scalars["String"]["input"]>;
  subitem_of_x?: InputMaybe<Scalars["String"]["input"]>;
  subscribers?: InputMaybe<Scalars["String"]["input"]>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  switch_to_folder_view?: InputMaybe<Scalars["String"]["input"]>;
  switch_to_grid_view?: InputMaybe<Scalars["String"]["input"]>;
  table_of_contents?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Scalars["String"]["input"]>;
  textual?: InputMaybe<Scalars["String"]["input"]>;
  theme?: InputMaybe<Scalars["String"]["input"]>;
  thickness?: InputMaybe<Scalars["String"]["input"]>;
  transcriber?: InputMaybe<Scalars["String"]["input"]>;
  transcript_notice?: InputMaybe<Scalars["String"]["input"]>;
  translation_notice?: InputMaybe<Scalars["String"]["input"]>;
  translator?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  type_information?: InputMaybe<Scalars["String"]["input"]>;
  typesetters?: InputMaybe<Scalars["String"]["input"]>;
  ui_language?: InputMaybe<Scalars["ID"]["input"]>;
  variant?: InputMaybe<Scalars["String"]["input"]>;
  variant_of_x?: InputMaybe<Scalars["String"]["input"]>;
  video?: InputMaybe<Scalars["String"]["input"]>;
  videos?: InputMaybe<Scalars["String"]["input"]>;
  view_on?: InputMaybe<Scalars["String"]["input"]>;
  view_on_x?: InputMaybe<Scalars["String"]["input"]>;
  view_scans?: InputMaybe<Scalars["String"]["input"]>;
  want_it?: InputMaybe<Scalars["String"]["input"]>;
  watch_content?: InputMaybe<Scalars["String"]["input"]>;
  weapon?: InputMaybe<Scalars["String"]["input"]>;
  weapons_description?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["String"]["input"]>;
  wiki?: InputMaybe<Scalars["String"]["input"]>;
  wiki_description?: InputMaybe<Scalars["String"]["input"]>;
  wiki_short_description?: InputMaybe<Scalars["String"]["input"]>;
  x_results?: InputMaybe<Scalars["String"]["input"]>;
};

export type WikiPage = {
  __typename?: "WikiPage";
  categories?: Maybe<CategoryRelationResponseCollection>;
  chronology_items?: Maybe<ChronologyItemRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  definitions?: Maybe<Array<Maybe<ComponentWikiSpecializationGlossaryItem>>>;
  slug: Scalars["String"]["output"];
  tags?: Maybe<WikiPagesTagRelationResponseCollection>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsWiki>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  weapon?: Maybe<WeaponStoryEntityResponse>;
};

export type WikiPageCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WikiPageChronology_ItemsArgs = {
  filters?: InputMaybe<ChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WikiPageDefinitionsArgs = {
  filters?: InputMaybe<ComponentWikiSpecializationGlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WikiPageTagsArgs = {
  filters?: InputMaybe<WikiPagesTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WikiPageTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWikiFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WikiPageEntity = {
  __typename?: "WikiPageEntity";
  attributes?: Maybe<WikiPage>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type WikiPageEntityResponse = {
  __typename?: "WikiPageEntityResponse";
  data?: Maybe<WikiPageEntity>;
};

export type WikiPageEntityResponseCollection = {
  __typename?: "WikiPageEntityResponseCollection";
  data: Array<WikiPageEntity>;
  meta: ResponseCollectionMeta;
};

export type WikiPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WikiPageFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  chronology_items?: InputMaybe<ChronologyItemFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  definitions?: InputMaybe<ComponentWikiSpecializationGlossaryItemFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<WikiPageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WikiPageFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<WikiPagesTagFiltersInput>;
  translations?: InputMaybe<ComponentTranslationsWikiFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weapon?: InputMaybe<WeaponStoryFiltersInput>;
};

export type WikiPageInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  chronology_items?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  definitions?: InputMaybe<Array<InputMaybe<ComponentWikiSpecializationGlossaryItemInput>>>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  thumbnail?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsWikiInput>>>;
  weapon?: InputMaybe<Scalars["ID"]["input"]>;
};

export type WikiPageRelationResponseCollection = {
  __typename?: "WikiPageRelationResponseCollection";
  data: Array<WikiPageEntity>;
};

export type WikiPagesTag = {
  __typename?: "WikiPagesTag";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  slug: Scalars["String"]["output"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type WikiPagesTagTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type WikiPagesTagEntity = {
  __typename?: "WikiPagesTagEntity";
  attributes?: Maybe<WikiPagesTag>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type WikiPagesTagEntityResponse = {
  __typename?: "WikiPagesTagEntityResponse";
  data?: Maybe<WikiPagesTagEntity>;
};

export type WikiPagesTagEntityResponseCollection = {
  __typename?: "WikiPagesTagEntityResponseCollection";
  data: Array<WikiPagesTagEntity>;
  meta: ResponseCollectionMeta;
};

export type WikiPagesTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WikiPagesTagFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<WikiPagesTagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WikiPagesTagFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type WikiPagesTagInput = {
  slug?: InputMaybe<Scalars["String"]["input"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type WikiPagesTagRelationResponseCollection = {
  __typename?: "WikiPagesTagRelationResponseCollection";
  data: Array<WikiPagesTagEntity>;
};

export type ContentAttributesFragment = {
  __typename?: "Content";
  slug: string;
  updatedAt?: any | null;
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
    text_set?: { __typename?: "ComponentSetsTextSet"; text?: string | null } | null;
  } | null> | null;
  categories?: {
    __typename?: "CategoryRelationResponseCollection";
    data: Array<{
      __typename?: "CategoryEntity";
      attributes?: { __typename?: "Category"; slug: string } | null;
    }>;
  } | null;
  type?: {
    __typename?: "ContentTypeEntityResponse";
    data?: {
      __typename?: "ContentTypeEntity";
      attributes?: { __typename?: "ContentType"; slug: string } | null;
    } | null;
  } | null;
  thumbnail?: {
    __typename?: "UploadFileEntityResponse";
    data?: {
      __typename?: "UploadFileEntity";
      attributes?: {
        __typename?: "UploadFile";
        name: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number | null;
        height?: number | null;
        url: string;
      } | null;
    } | null;
  } | null;
};

export type LibraryItemAttributesFragment = {
  __typename?: "LibraryItem";
  title: string;
  subtitle?: string | null;
  slug: string;
  root_item: boolean;
  primary: boolean;
  descriptions?: Array<{
    __typename?: "ComponentTranslationsLibraryItems";
    description: string;
    language?: {
      __typename?: "LanguageEntityResponse";
      data?: {
        __typename?: "LanguageEntity";
        attributes?: { __typename?: "Language"; code: string } | null;
      } | null;
    } | null;
  } | null> | null;
  thumbnail?: {
    __typename?: "UploadFileEntityResponse";
    data?: {
      __typename?: "UploadFileEntity";
      attributes?: {
        __typename?: "UploadFile";
        name: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number | null;
        height?: number | null;
        url: string;
      } | null;
    } | null;
  } | null;
  release_date?: {
    __typename?: "ComponentBasicsDatepicker";
    year?: number | null;
    month?: number | null;
    day?: number | null;
  } | null;
  price?: {
    __typename?: "ComponentBasicsPrice";
    amount?: number | null;
    currency?: {
      __typename?: "CurrencyEntityResponse";
      data?: {
        __typename?: "CurrencyEntity";
        attributes?: {
          __typename?: "Currency";
          symbol: string;
          code: string;
          rate_to_usd: number;
        } | null;
      } | null;
    } | null;
  } | null;
  categories?: {
    __typename?: "CategoryRelationResponseCollection";
    data: Array<{
      __typename?: "CategoryEntity";
      attributes?: { __typename?: "Category"; slug: string } | null;
    }>;
  } | null;
  metadata?: Array<
    | {
        __typename: "ComponentMetadataAudio";
        subtype?: {
          __typename?: "AudioSubtypeEntityResponse";
          data?: {
            __typename?: "AudioSubtypeEntity";
            attributes?: { __typename?: "AudioSubtype"; slug: string } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataBooks";
        subtype?: {
          __typename?: "TextualSubtypeEntityResponse";
          data?: {
            __typename?: "TextualSubtypeEntity";
            attributes?: { __typename?: "TextualSubtype"; slug: string } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGame";
        platform?: {
          __typename?: "GamePlatformEntityResponse";
          data?: {
            __typename?: "GamePlatformEntity";
            attributes?: { __typename?: "GamePlatform"; slug: string } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGroup";
        subtype?: {
          __typename?: "GroupSubtypeEntityResponse";
          data?: {
            __typename?: "GroupSubtypeEntity";
            attributes?: { __typename?: "GroupSubtype"; slug: string } | null;
          } | null;
        } | null;
        subitems_type?: {
          __typename?: "MetadataTypeEntityResponse";
          data?: {
            __typename?: "MetadataTypeEntity";
            attributes?: { __typename?: "MetadataType"; slug: string } | null;
          } | null;
        } | null;
      }
    | { __typename: "ComponentMetadataOther" }
    | {
        __typename: "ComponentMetadataVideo";
        subtype?: {
          __typename?: "VideoSubtypeEntityResponse";
          data?: {
            __typename?: "VideoSubtypeEntity";
            attributes?: { __typename?: "VideoSubtype"; slug: string } | null;
          } | null;
        } | null;
      }
    | { __typename: "Error" }
    | null
  > | null;
};

export type PostAttributesFragment = {
  __typename?: "Post";
  slug: string;
  hidden: boolean;
  date: {
    __typename?: "ComponentBasicsDatepicker";
    year?: number | null;
    month?: number | null;
    day?: number | null;
  };
  categories?: {
    __typename?: "CategoryRelationResponseCollection";
    data: Array<{
      __typename?: "CategoryEntity";
      attributes?: { __typename?: "Category"; slug: string } | null;
    }>;
  } | null;
  thumbnail?: {
    __typename?: "UploadFileEntityResponse";
    data?: {
      __typename?: "UploadFileEntity";
      attributes?: {
        __typename?: "UploadFile";
        name: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number | null;
        height?: number | null;
        url: string;
      } | null;
    } | null;
  } | null;
  translations?: Array<{
    __typename?: "ComponentTranslationsPosts";
    title: string;
    excerpt?: string | null;
    body?: string | null;
    language?: {
      __typename?: "LanguageEntityResponse";
      data?: {
        __typename?: "LanguageEntity";
        attributes?: { __typename?: "Language"; code: string } | null;
      } | null;
    } | null;
    thumbnail?: {
      __typename?: "UploadFileEntityResponse";
      data?: {
        __typename?: "UploadFileEntity";
        attributes?: {
          __typename?: "UploadFile";
          name: string;
          alternativeText?: string | null;
          caption?: string | null;
          width?: number | null;
          height?: number | null;
          url: string;
        } | null;
      } | null;
    } | null;
  } | null> | null;
};

export type VideoAttributesFragment = {
  __typename?: "Video";
  uid: string;
  title: string;
  description: string;
  views: number;
  gone: boolean;
  duration: number;
  published_date: {
    __typename?: "ComponentBasicsDatepicker";
    year?: number | null;
    month?: number | null;
    day?: number | null;
  };
  channel?: {
    __typename?: "VideoChannelEntityResponse";
    data?: {
      __typename?: "VideoChannelEntity";
      attributes?: { __typename?: "VideoChannel"; title: string; uid: string } | null;
    } | null;
  } | null;
};

export type WeaponAttributesFragment = {
  __typename?: "WeaponStory";
  slug: string;
  thumbnail?: {
    __typename?: "UploadFileEntityResponse";
    data?: {
      __typename?: "UploadFileEntity";
      attributes?: {
        __typename?: "UploadFile";
        name: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number | null;
        height?: number | null;
        url: string;
      } | null;
    } | null;
  } | null;
  type?: {
    __typename?: "WeaponStoryTypeEntityResponse";
    data?: {
      __typename?: "WeaponStoryTypeEntity";
      attributes?: { __typename?: "WeaponStoryType"; slug: string } | null;
    } | null;
  } | null;
  name?: Array<{
    __typename?: "ComponentTranslationsWeaponStory";
    id: string;
    name?: string | null;
    language?: {
      __typename?: "LanguageEntityResponse";
      data?: {
        __typename?: "LanguageEntity";
        attributes?: { __typename?: "Language"; code: string } | null;
      } | null;
    } | null;
  } | null> | null;
  stories?: Array<{
    __typename?: "ComponentCollectionsComponentWeaponStory";
    id: string;
    categories?: {
      __typename?: "CategoryRelationResponseCollection";
      data: Array<{
        __typename?: "CategoryEntity";
        attributes?: { __typename?: "Category"; slug: string } | null;
      }>;
    } | null;
    translations?: Array<{
      __typename?: "ComponentTranslationsWeaponStoryStory";
      description?: string | null;
      level_1?: string | null;
      level_2?: string | null;
      level_3?: string | null;
      level_4?: string | null;
      status: Enum_Componenttranslationsweaponstorystory_Status;
      language?: {
        __typename?: "LanguageEntityResponse";
        data?: {
          __typename?: "LanguageEntity";
          attributes?: { __typename?: "Language"; code: string } | null;
        } | null;
      } | null;
    } | null> | null;
  } | null> | null;
};

export type WikiPageAttributesFragment = {
  __typename?: "WikiPage";
  slug: string;
  thumbnail?: {
    __typename?: "UploadFileEntityResponse";
    data?: {
      __typename?: "UploadFileEntity";
      attributes?: {
        __typename?: "UploadFile";
        name: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number | null;
        height?: number | null;
        url: string;
      } | null;
    } | null;
  } | null;
  categories?: {
    __typename?: "CategoryRelationResponseCollection";
    data: Array<{
      __typename?: "CategoryEntity";
      attributes?: { __typename?: "Category"; slug: string } | null;
    }>;
  } | null;
  definitions?: Array<{
    __typename?: "ComponentWikiSpecializationGlossaryItem";
    translations?: Array<{
      __typename?: "ComponentTranslationsGlossaryDefinition";
      definition?: string | null;
      language?: {
        __typename?: "LanguageEntityResponse";
        data?: {
          __typename?: "LanguageEntity";
          attributes?: { __typename?: "Language"; code: string } | null;
        } | null;
      } | null;
    } | null> | null;
  } | null> | null;
  tags?: {
    __typename?: "WikiPagesTagRelationResponseCollection";
    data: Array<{
      __typename?: "WikiPagesTagEntity";
      attributes?: { __typename?: "WikiPagesTag"; slug: string } | null;
    }>;
  } | null;
  translations?: Array<{
    __typename?: "ComponentTranslationsWiki";
    title: string;
    summary?: string | null;
    aliases?: Array<{
      __typename?: "ComponentCollectionsComponentAliases";
      alias: string;
    } | null> | null;
    body?: { __typename?: "ComponentCollectionsComponentBody"; body: string } | null;
    language?: {
      __typename?: "LanguageEntityResponse";
      data?: {
        __typename?: "LanguageEntity";
        attributes?: { __typename?: "Language"; code: string } | null;
      } | null;
    } | null;
  } | null> | null;
};

export type GetContentQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type GetContentQuery = {
  __typename?: "Query";
  content?: {
    __typename?: "ContentEntityResponse";
    data?: {
      __typename?: "ContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Content";
        slug: string;
        updatedAt?: any | null;
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
          text_set?: { __typename?: "ComponentSetsTextSet"; text?: string | null } | null;
        } | null> | null;
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        type?: {
          __typename?: "ContentTypeEntityResponse";
          data?: {
            __typename?: "ContentTypeEntity";
            attributes?: { __typename?: "ContentType"; slug: string } | null;
          } | null;
        } | null;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetContentsQueryVariables = Exact<{ [key: string]: never }>;

export type GetContentsQuery = {
  __typename?: "Query";
  contents?: {
    __typename?: "ContentEntityResponseCollection";
    data: Array<{
      __typename?: "ContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Content";
        slug: string;
        updatedAt?: any | null;
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
          text_set?: { __typename?: "ComponentSetsTextSet"; text?: string | null } | null;
        } | null> | null;
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        type?: {
          __typename?: "ContentTypeEntityResponse";
          data?: {
            __typename?: "ContentTypeEntity";
            attributes?: { __typename?: "ContentType"; slug: string } | null;
          } | null;
        } | null;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetLibraryItemQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type GetLibraryItemQuery = {
  __typename?: "Query";
  libraryItem?: {
    __typename?: "LibraryItemEntityResponse";
    data?: {
      __typename?: "LibraryItemEntity";
      id?: string | null;
      attributes?: {
        __typename?: "LibraryItem";
        title: string;
        subtitle?: string | null;
        slug: string;
        root_item: boolean;
        primary: boolean;
        descriptions?: Array<{
          __typename?: "ComponentTranslationsLibraryItems";
          description: string;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
        } | null> | null;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        release_date?: {
          __typename?: "ComponentBasicsDatepicker";
          year?: number | null;
          month?: number | null;
          day?: number | null;
        } | null;
        price?: {
          __typename?: "ComponentBasicsPrice";
          amount?: number | null;
          currency?: {
            __typename?: "CurrencyEntityResponse";
            data?: {
              __typename?: "CurrencyEntity";
              attributes?: {
                __typename?: "Currency";
                symbol: string;
                code: string;
                rate_to_usd: number;
              } | null;
            } | null;
          } | null;
        } | null;
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        metadata?: Array<
          | {
              __typename: "ComponentMetadataAudio";
              subtype?: {
                __typename?: "AudioSubtypeEntityResponse";
                data?: {
                  __typename?: "AudioSubtypeEntity";
                  attributes?: { __typename?: "AudioSubtype"; slug: string } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataBooks";
              subtype?: {
                __typename?: "TextualSubtypeEntityResponse";
                data?: {
                  __typename?: "TextualSubtypeEntity";
                  attributes?: { __typename?: "TextualSubtype"; slug: string } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGame";
              platform?: {
                __typename?: "GamePlatformEntityResponse";
                data?: {
                  __typename?: "GamePlatformEntity";
                  attributes?: { __typename?: "GamePlatform"; slug: string } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGroup";
              subtype?: {
                __typename?: "GroupSubtypeEntityResponse";
                data?: {
                  __typename?: "GroupSubtypeEntity";
                  attributes?: { __typename?: "GroupSubtype"; slug: string } | null;
                } | null;
              } | null;
              subitems_type?: {
                __typename?: "MetadataTypeEntityResponse";
                data?: {
                  __typename?: "MetadataTypeEntity";
                  attributes?: { __typename?: "MetadataType"; slug: string } | null;
                } | null;
              } | null;
            }
          | { __typename: "ComponentMetadataOther" }
          | {
              __typename: "ComponentMetadataVideo";
              subtype?: {
                __typename?: "VideoSubtypeEntityResponse";
                data?: {
                  __typename?: "VideoSubtypeEntity";
                  attributes?: { __typename?: "VideoSubtype"; slug: string } | null;
                } | null;
              } | null;
            }
          | { __typename: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetLibraryItemsQueryVariables = Exact<{ [key: string]: never }>;

export type GetLibraryItemsQuery = {
  __typename?: "Query";
  libraryItems?: {
    __typename?: "LibraryItemEntityResponseCollection";
    data: Array<{
      __typename?: "LibraryItemEntity";
      id?: string | null;
      attributes?: {
        __typename?: "LibraryItem";
        title: string;
        subtitle?: string | null;
        slug: string;
        root_item: boolean;
        primary: boolean;
        descriptions?: Array<{
          __typename?: "ComponentTranslationsLibraryItems";
          description: string;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
        } | null> | null;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        release_date?: {
          __typename?: "ComponentBasicsDatepicker";
          year?: number | null;
          month?: number | null;
          day?: number | null;
        } | null;
        price?: {
          __typename?: "ComponentBasicsPrice";
          amount?: number | null;
          currency?: {
            __typename?: "CurrencyEntityResponse";
            data?: {
              __typename?: "CurrencyEntity";
              attributes?: {
                __typename?: "Currency";
                symbol: string;
                code: string;
                rate_to_usd: number;
              } | null;
            } | null;
          } | null;
        } | null;
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        metadata?: Array<
          | {
              __typename: "ComponentMetadataAudio";
              subtype?: {
                __typename?: "AudioSubtypeEntityResponse";
                data?: {
                  __typename?: "AudioSubtypeEntity";
                  attributes?: { __typename?: "AudioSubtype"; slug: string } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataBooks";
              subtype?: {
                __typename?: "TextualSubtypeEntityResponse";
                data?: {
                  __typename?: "TextualSubtypeEntity";
                  attributes?: { __typename?: "TextualSubtype"; slug: string } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGame";
              platform?: {
                __typename?: "GamePlatformEntityResponse";
                data?: {
                  __typename?: "GamePlatformEntity";
                  attributes?: { __typename?: "GamePlatform"; slug: string } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGroup";
              subtype?: {
                __typename?: "GroupSubtypeEntityResponse";
                data?: {
                  __typename?: "GroupSubtypeEntity";
                  attributes?: { __typename?: "GroupSubtype"; slug: string } | null;
                } | null;
              } | null;
              subitems_type?: {
                __typename?: "MetadataTypeEntityResponse";
                data?: {
                  __typename?: "MetadataTypeEntity";
                  attributes?: { __typename?: "MetadataType"; slug: string } | null;
                } | null;
              } | null;
            }
          | { __typename: "ComponentMetadataOther" }
          | {
              __typename: "ComponentMetadataVideo";
              subtype?: {
                __typename?: "VideoSubtypeEntityResponse";
                data?: {
                  __typename?: "VideoSubtypeEntity";
                  attributes?: { __typename?: "VideoSubtype"; slug: string } | null;
                } | null;
              } | null;
            }
          | { __typename: "Error" }
          | null
        > | null;
      } | null;
    }>;
  } | null;
};

export type GetPostQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type GetPostQuery = {
  __typename?: "Query";
  post?: {
    __typename?: "PostEntityResponse";
    data?: {
      __typename?: "PostEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Post";
        slug: string;
        hidden: boolean;
        date: {
          __typename?: "ComponentBasicsDatepicker";
          year?: number | null;
          month?: number | null;
          day?: number | null;
        };
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        translations?: Array<{
          __typename?: "ComponentTranslationsPosts";
          title: string;
          excerpt?: string | null;
          body?: string | null;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
          thumbnail?: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              attributes?: {
                __typename?: "UploadFile";
                name: string;
                alternativeText?: string | null;
                caption?: string | null;
                width?: number | null;
                height?: number | null;
                url: string;
              } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostsQuery = {
  __typename?: "Query";
  posts?: {
    __typename?: "PostEntityResponseCollection";
    data: Array<{
      __typename?: "PostEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Post";
        slug: string;
        hidden: boolean;
        date: {
          __typename?: "ComponentBasicsDatepicker";
          year?: number | null;
          month?: number | null;
          day?: number | null;
        };
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        translations?: Array<{
          __typename?: "ComponentTranslationsPosts";
          title: string;
          excerpt?: string | null;
          body?: string | null;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
          thumbnail?: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              attributes?: {
                __typename?: "UploadFile";
                name: string;
                alternativeText?: string | null;
                caption?: string | null;
                width?: number | null;
                height?: number | null;
                url: string;
              } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
    }>;
  } | null;
};

export type GetVideoQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type GetVideoQuery = {
  __typename?: "Query";
  video?: {
    __typename?: "VideoEntityResponse";
    data?: {
      __typename?: "VideoEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Video";
        uid: string;
        title: string;
        description: string;
        views: number;
        gone: boolean;
        duration: number;
        published_date: {
          __typename?: "ComponentBasicsDatepicker";
          year?: number | null;
          month?: number | null;
          day?: number | null;
        };
        channel?: {
          __typename?: "VideoChannelEntityResponse";
          data?: {
            __typename?: "VideoChannelEntity";
            attributes?: { __typename?: "VideoChannel"; title: string; uid: string } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetVideosQueryVariables = Exact<{ [key: string]: never }>;

export type GetVideosQuery = {
  __typename?: "Query";
  videos?: {
    __typename?: "VideoEntityResponseCollection";
    data: Array<{
      __typename?: "VideoEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Video";
        uid: string;
        title: string;
        description: string;
        views: number;
        gone: boolean;
        duration: number;
        published_date: {
          __typename?: "ComponentBasicsDatepicker";
          year?: number | null;
          month?: number | null;
          day?: number | null;
        };
        channel?: {
          __typename?: "VideoChannelEntityResponse";
          data?: {
            __typename?: "VideoChannelEntity";
            attributes?: { __typename?: "VideoChannel"; title: string; uid: string } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetWeaponQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type GetWeaponQuery = {
  __typename?: "Query";
  weaponStory?: {
    __typename?: "WeaponStoryEntityResponse";
    data?: {
      __typename?: "WeaponStoryEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WeaponStory";
        slug: string;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        type?: {
          __typename?: "WeaponStoryTypeEntityResponse";
          data?: {
            __typename?: "WeaponStoryTypeEntity";
            attributes?: { __typename?: "WeaponStoryType"; slug: string } | null;
          } | null;
        } | null;
        name?: Array<{
          __typename?: "ComponentTranslationsWeaponStory";
          id: string;
          name?: string | null;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
        } | null> | null;
        stories?: Array<{
          __typename?: "ComponentCollectionsComponentWeaponStory";
          id: string;
          categories?: {
            __typename?: "CategoryRelationResponseCollection";
            data: Array<{
              __typename?: "CategoryEntity";
              attributes?: { __typename?: "Category"; slug: string } | null;
            }>;
          } | null;
          translations?: Array<{
            __typename?: "ComponentTranslationsWeaponStoryStory";
            description?: string | null;
            level_1?: string | null;
            level_2?: string | null;
            level_3?: string | null;
            level_4?: string | null;
            status: Enum_Componenttranslationsweaponstorystory_Status;
            language?: {
              __typename?: "LanguageEntityResponse";
              data?: {
                __typename?: "LanguageEntity";
                attributes?: { __typename?: "Language"; code: string } | null;
              } | null;
            } | null;
          } | null> | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetWeaponsQueryVariables = Exact<{ [key: string]: never }>;

export type GetWeaponsQuery = {
  __typename?: "Query";
  weaponStories?: {
    __typename?: "WeaponStoryEntityResponseCollection";
    data: Array<{
      __typename?: "WeaponStoryEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WeaponStory";
        slug: string;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        type?: {
          __typename?: "WeaponStoryTypeEntityResponse";
          data?: {
            __typename?: "WeaponStoryTypeEntity";
            attributes?: { __typename?: "WeaponStoryType"; slug: string } | null;
          } | null;
        } | null;
        name?: Array<{
          __typename?: "ComponentTranslationsWeaponStory";
          id: string;
          name?: string | null;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
        } | null> | null;
        stories?: Array<{
          __typename?: "ComponentCollectionsComponentWeaponStory";
          id: string;
          categories?: {
            __typename?: "CategoryRelationResponseCollection";
            data: Array<{
              __typename?: "CategoryEntity";
              attributes?: { __typename?: "Category"; slug: string } | null;
            }>;
          } | null;
          translations?: Array<{
            __typename?: "ComponentTranslationsWeaponStoryStory";
            description?: string | null;
            level_1?: string | null;
            level_2?: string | null;
            level_3?: string | null;
            level_4?: string | null;
            status: Enum_Componenttranslationsweaponstorystory_Status;
            language?: {
              __typename?: "LanguageEntityResponse";
              data?: {
                __typename?: "LanguageEntity";
                attributes?: { __typename?: "Language"; code: string } | null;
              } | null;
            } | null;
          } | null> | null;
        } | null> | null;
      } | null;
    }>;
  } | null;
};

export type GetWikiPageQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
}>;

export type GetWikiPageQuery = {
  __typename?: "Query";
  wikiPage?: {
    __typename?: "WikiPageEntityResponse";
    data?: {
      __typename?: "WikiPageEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WikiPage";
        slug: string;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        definitions?: Array<{
          __typename?: "ComponentWikiSpecializationGlossaryItem";
          translations?: Array<{
            __typename?: "ComponentTranslationsGlossaryDefinition";
            definition?: string | null;
            language?: {
              __typename?: "LanguageEntityResponse";
              data?: {
                __typename?: "LanguageEntity";
                attributes?: { __typename?: "Language"; code: string } | null;
              } | null;
            } | null;
          } | null> | null;
        } | null> | null;
        tags?: {
          __typename?: "WikiPagesTagRelationResponseCollection";
          data: Array<{
            __typename?: "WikiPagesTagEntity";
            attributes?: { __typename?: "WikiPagesTag"; slug: string } | null;
          }>;
        } | null;
        translations?: Array<{
          __typename?: "ComponentTranslationsWiki";
          title: string;
          summary?: string | null;
          aliases?: Array<{
            __typename?: "ComponentCollectionsComponentAliases";
            alias: string;
          } | null> | null;
          body?: { __typename?: "ComponentCollectionsComponentBody"; body: string } | null;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetWikiPagesQueryVariables = Exact<{ [key: string]: never }>;

export type GetWikiPagesQuery = {
  __typename?: "Query";
  wikiPages?: {
    __typename?: "WikiPageEntityResponseCollection";
    data: Array<{
      __typename?: "WikiPageEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WikiPage";
        slug: string;
        thumbnail?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              caption?: string | null;
              width?: number | null;
              height?: number | null;
              url: string;
            } | null;
          } | null;
        } | null;
        categories?: {
          __typename?: "CategoryRelationResponseCollection";
          data: Array<{
            __typename?: "CategoryEntity";
            attributes?: { __typename?: "Category"; slug: string } | null;
          }>;
        } | null;
        definitions?: Array<{
          __typename?: "ComponentWikiSpecializationGlossaryItem";
          translations?: Array<{
            __typename?: "ComponentTranslationsGlossaryDefinition";
            definition?: string | null;
            language?: {
              __typename?: "LanguageEntityResponse";
              data?: {
                __typename?: "LanguageEntity";
                attributes?: { __typename?: "Language"; code: string } | null;
              } | null;
            } | null;
          } | null> | null;
        } | null> | null;
        tags?: {
          __typename?: "WikiPagesTagRelationResponseCollection";
          data: Array<{
            __typename?: "WikiPagesTagEntity";
            attributes?: { __typename?: "WikiPagesTag"; slug: string } | null;
          }>;
        } | null;
        translations?: Array<{
          __typename?: "ComponentTranslationsWiki";
          title: string;
          summary?: string | null;
          aliases?: Array<{
            __typename?: "ComponentCollectionsComponentAliases";
            alias: string;
          } | null> | null;
          body?: { __typename?: "ComponentCollectionsComponentBody"; body: string } | null;
          language?: {
            __typename?: "LanguageEntityResponse";
            data?: {
              __typename?: "LanguageEntity";
              attributes?: { __typename?: "Language"; code: string } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
    }>;
  } | null;
};

export type DatePickerFragment = {
  __typename?: "ComponentBasicsDatepicker";
  year?: number | null;
  month?: number | null;
  day?: number | null;
};

export type PricePickerFragment = {
  __typename?: "ComponentBasicsPrice";
  amount?: number | null;
  currency?: {
    __typename?: "CurrencyEntityResponse";
    data?: {
      __typename?: "CurrencyEntity";
      attributes?: {
        __typename?: "Currency";
        symbol: string;
        code: string;
        rate_to_usd: number;
      } | null;
    } | null;
  } | null;
};

export type UploadImageFragment = {
  __typename?: "UploadFile";
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  url: string;
};

export const UploadImageFragmentDoc = gql`
  fragment uploadImage on UploadFile {
    name
    alternativeText
    caption
    width
    height
    url
  }
`;
export const ContentAttributesFragmentDoc = gql`
  fragment contentAttributes on Content {
    slug
    updatedAt
    translations(pagination: { limit: -1 }) {
      pre_title
      title
      subtitle
      description
      language {
        data {
          attributes {
            code
          }
        }
      }
      text_set {
        text
      }
    }
    categories(pagination: { limit: -1 }) {
      data {
        attributes {
          slug
        }
      }
    }
    type {
      data {
        attributes {
          slug
        }
      }
    }
    thumbnail {
      data {
        attributes {
          ...uploadImage
        }
      }
    }
  }
  ${UploadImageFragmentDoc}
`;
export const DatePickerFragmentDoc = gql`
  fragment datePicker on ComponentBasicsDatepicker {
    year
    month
    day
  }
`;
export const PricePickerFragmentDoc = gql`
  fragment pricePicker on ComponentBasicsPrice {
    amount
    currency {
      data {
        attributes {
          symbol
          code
          rate_to_usd
        }
      }
    }
  }
`;
export const LibraryItemAttributesFragmentDoc = gql`
  fragment libraryItemAttributes on LibraryItem {
    title
    subtitle
    slug
    root_item
    primary
    descriptions(pagination: { limit: -1 }) {
      description
      language {
        data {
          attributes {
            code
          }
        }
      }
    }
    thumbnail {
      data {
        attributes {
          ...uploadImage
        }
      }
    }
    release_date {
      ...datePicker
    }
    price {
      ...pricePicker
    }
    categories(pagination: { limit: -1 }) {
      data {
        attributes {
          slug
        }
      }
    }
    metadata {
      __typename
      ... on ComponentMetadataBooks {
        subtype {
          data {
            attributes {
              slug
            }
          }
        }
      }
      ... on ComponentMetadataGame {
        platform {
          data {
            attributes {
              slug
            }
          }
        }
      }
      ... on ComponentMetadataVideo {
        subtype {
          data {
            attributes {
              slug
            }
          }
        }
      }
      ... on ComponentMetadataAudio {
        subtype {
          data {
            attributes {
              slug
            }
          }
        }
      }
      ... on ComponentMetadataGroup {
        subtype {
          data {
            attributes {
              slug
            }
          }
        }
        subitems_type {
          data {
            attributes {
              slug
            }
          }
        }
      }
    }
  }
  ${UploadImageFragmentDoc}
  ${DatePickerFragmentDoc}
  ${PricePickerFragmentDoc}
`;
export const PostAttributesFragmentDoc = gql`
  fragment postAttributes on Post {
    slug
    hidden
    date {
      ...datePicker
    }
    categories(pagination: { limit: -1 }) {
      data {
        attributes {
          slug
        }
      }
    }
    thumbnail {
      data {
        attributes {
          ...uploadImage
        }
      }
    }
    translations(pagination: { limit: -1 }) {
      language {
        data {
          attributes {
            code
          }
        }
      }
      title
      excerpt
      body
      thumbnail {
        data {
          attributes {
            ...uploadImage
          }
        }
      }
    }
  }
  ${DatePickerFragmentDoc}
  ${UploadImageFragmentDoc}
`;
export const VideoAttributesFragmentDoc = gql`
  fragment videoAttributes on Video {
    uid
    title
    description
    published_date {
      year
      month
      day
    }
    views
    channel {
      data {
        attributes {
          title
          uid
        }
      }
    }
    gone
    duration
  }
`;
export const WeaponAttributesFragmentDoc = gql`
  fragment weaponAttributes on WeaponStory {
    thumbnail {
      data {
        attributes {
          ...uploadImage
        }
      }
    }
    type {
      data {
        attributes {
          slug
        }
      }
    }
    name(pagination: { limit: -1 }) {
      id
      name
      language {
        data {
          attributes {
            code
          }
        }
      }
    }
    slug
    stories(pagination: { limit: -1 }) {
      id
      categories(pagination: { limit: -1 }) {
        data {
          attributes {
            slug
          }
        }
      }
      translations(pagination: { limit: -1 }) {
        description
        level_1
        level_2
        level_3
        level_4
        status
        language {
          data {
            attributes {
              code
            }
          }
        }
      }
    }
  }
  ${UploadImageFragmentDoc}
`;
export const WikiPageAttributesFragmentDoc = gql`
  fragment wikiPageAttributes on WikiPage {
    slug
    thumbnail {
      data {
        attributes {
          ...uploadImage
        }
      }
    }
    categories(pagination: { limit: -1 }) {
      data {
        attributes {
          slug
        }
      }
    }
    definitions(pagination: { limit: -1 }) {
      translations {
        language {
          data {
            attributes {
              code
            }
          }
        }
        definition
      }
    }
    tags(pagination: { limit: -1 }) {
      data {
        attributes {
          slug
        }
      }
    }
    translations(pagination: { limit: -1 }) {
      title
      aliases {
        alias
      }
      body {
        body
      }
      summary
      language {
        data {
          attributes {
            code
          }
        }
      }
    }
  }
  ${UploadImageFragmentDoc}
`;
export const GetContentDocument = gql`
  query getContent($id: ID) {
    content(id: $id) {
      data {
        id
        attributes {
          ...contentAttributes
        }
      }
    }
  }
  ${ContentAttributesFragmentDoc}
`;
export const GetContentsDocument = gql`
  query getContents {
    contents(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          ...contentAttributes
        }
      }
    }
  }
  ${ContentAttributesFragmentDoc}
`;
export const GetLibraryItemDocument = gql`
  query getLibraryItem($id: ID) {
    libraryItem(id: $id) {
      data {
        id
        attributes {
          ...libraryItemAttributes
        }
      }
    }
  }
  ${LibraryItemAttributesFragmentDoc}
`;
export const GetLibraryItemsDocument = gql`
  query getLibraryItems {
    libraryItems(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          ...libraryItemAttributes
        }
      }
    }
  }
  ${LibraryItemAttributesFragmentDoc}
`;
export const GetPostDocument = gql`
  query getPost($id: ID) {
    post(id: $id) {
      data {
        id
        attributes {
          ...postAttributes
        }
      }
    }
  }
  ${PostAttributesFragmentDoc}
`;
export const GetPostsDocument = gql`
  query getPosts {
    posts(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          ...postAttributes
        }
      }
    }
  }
  ${PostAttributesFragmentDoc}
`;
export const GetVideoDocument = gql`
  query getVideo($id: ID) {
    video(id: $id) {
      data {
        id
        attributes {
          ...videoAttributes
        }
      }
    }
  }
  ${VideoAttributesFragmentDoc}
`;
export const GetVideosDocument = gql`
  query getVideos {
    videos(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          ...videoAttributes
        }
      }
    }
  }
  ${VideoAttributesFragmentDoc}
`;
export const GetWeaponDocument = gql`
  query getWeapon($id: ID) {
    weaponStory(id: $id) {
      data {
        id
        attributes {
          ...weaponAttributes
        }
      }
    }
  }
  ${WeaponAttributesFragmentDoc}
`;
export const GetWeaponsDocument = gql`
  query getWeapons {
    weaponStories(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          ...weaponAttributes
        }
      }
    }
  }
  ${WeaponAttributesFragmentDoc}
`;
export const GetWikiPageDocument = gql`
  query getWikiPage($id: ID) {
    wikiPage(id: $id) {
      data {
        id
        attributes {
          ...wikiPageAttributes
        }
      }
    }
  }
  ${WikiPageAttributesFragmentDoc}
`;
export const GetWikiPagesDocument = gql`
  query getWikiPages {
    wikiPages(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          ...wikiPageAttributes
        }
      }
    }
  }
  ${WikiPageAttributesFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getContent(
      variables?: GetContentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetContentQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetContentQuery>(GetContentDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getContent",
        "query"
      );
    },
    getContents(
      variables?: GetContentsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetContentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetContentsQuery>(GetContentsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getContents",
        "query"
      );
    },
    getLibraryItem(
      variables?: GetLibraryItemQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetLibraryItemQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetLibraryItemQuery>(GetLibraryItemDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getLibraryItem",
        "query"
      );
    },
    getLibraryItems(
      variables?: GetLibraryItemsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetLibraryItemsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetLibraryItemsQuery>(GetLibraryItemsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getLibraryItems",
        "query"
      );
    },
    getPost(
      variables?: GetPostQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetPostQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPostQuery>(GetPostDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getPost",
        "query"
      );
    },
    getPosts(
      variables?: GetPostsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetPostsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPostsQuery>(GetPostsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getPosts",
        "query"
      );
    },
    getVideo(
      variables?: GetVideoQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetVideoQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetVideoQuery>(GetVideoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getVideo",
        "query"
      );
    },
    getVideos(
      variables?: GetVideosQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetVideosQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetVideosQuery>(GetVideosDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getVideos",
        "query"
      );
    },
    getWeapon(
      variables?: GetWeaponQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetWeaponQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetWeaponQuery>(GetWeaponDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getWeapon",
        "query"
      );
    },
    getWeapons(
      variables?: GetWeaponsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetWeaponsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetWeaponsQuery>(GetWeaponsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getWeapons",
        "query"
      );
    },
    getWikiPage(
      variables?: GetWikiPageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetWikiPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetWikiPageQuery>(GetWikiPageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getWikiPage",
        "query"
      );
    },
    getWikiPages(
      variables?: GetWikiPagesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetWikiPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetWikiPagesQuery>(GetWikiPagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getWikiPages",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
