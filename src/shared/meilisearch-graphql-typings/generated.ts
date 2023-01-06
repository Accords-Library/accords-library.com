import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  LibraryItemMetadataDynamicZoneInput: any;
  RangedContentRangeDynamicZoneInput: any;
  Time: any;
  Upload: any;
};

export type AudioSubtype = {
  __typename?: "AudioSubtype";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AudioSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AudioSubtypeEntity = {
  __typename?: "AudioSubtypeEntity";
  attributes?: Maybe<AudioSubtype>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]>;
  containsi?: InputMaybe<Scalars["Boolean"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]>;
  eq?: InputMaybe<Scalars["Boolean"]>;
  eqi?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  ne?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]>;
};

export type Category = {
  __typename?: "Category";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  series?: Maybe<Enum_Category_Series>;
  short: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CategoryEntity = {
  __typename?: "CategoryEntity";
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars["ID"]>;
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
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  series?: InputMaybe<StringFilterInput>;
  short?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars["String"]>;
  series?: InputMaybe<Enum_Category_Series>;
  short?: InputMaybe<Scalars["String"]>;
};

export type CategoryRelationResponseCollection = {
  __typename?: "CategoryRelationResponseCollection";
  data: Array<CategoryEntity>;
};

export type Chronicle = {
  __typename?: "Chronicle";
  chapter?: Maybe<ChroniclesChapterEntityResponse>;
  contents?: Maybe<ContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  date_end: ComponentBasicsDatepicker;
  date_start: ComponentBasicsDatepicker;
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronicles>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ChronicleContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronicleTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChroniclesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronicleEntity = {
  __typename?: "ChronicleEntity";
  attributes?: Maybe<Chronicle>;
  id?: Maybe<Scalars["ID"]>;
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
  chapter?: InputMaybe<Scalars["ID"]>;
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  date_end?: InputMaybe<ComponentBasicsDatepickerInput>;
  date_start?: InputMaybe<ComponentBasicsDatepickerInput>;
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsChroniclesInput>>>;
};

export type ChronicleRelationResponseCollection = {
  __typename?: "ChronicleRelationResponseCollection";
  data: Array<ChronicleEntity>;
};

export type ChroniclesChapter = {
  __typename?: "ChroniclesChapter";
  chronicles?: Maybe<ChronicleRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ChroniclesChapterChroniclesArgs = {
  filters?: InputMaybe<ChronicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChroniclesChapterTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChroniclesChapterEntity = {
  __typename?: "ChroniclesChapterEntity";
  attributes?: Maybe<ChroniclesChapter>;
  id?: Maybe<Scalars["ID"]>;
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
  chronicles?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slug?: InputMaybe<Scalars["String"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type ChronologyEra = {
  __typename?: "ChronologyEra";
  createdAt?: Maybe<Scalars["DateTime"]>;
  ending_year: Scalars["Int"];
  slug: Scalars["String"];
  starting_year: Scalars["Int"];
  title?: Maybe<Array<Maybe<ComponentTranslationsChronologyEra>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ChronologyEraTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyEraFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronologyEraEntity = {
  __typename?: "ChronologyEraEntity";
  attributes?: Maybe<ChronologyEra>;
  id?: Maybe<Scalars["ID"]>;
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
  ending_year?: InputMaybe<Scalars["Int"]>;
  slug?: InputMaybe<Scalars["String"]>;
  starting_year?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyEraInput>>>;
};

export type ChronologyItem = {
  __typename?: "ChronologyItem";
  createdAt?: Maybe<Scalars["DateTime"]>;
  day?: Maybe<Scalars["Int"]>;
  displayed_date?: Maybe<Scalars["String"]>;
  events?: Maybe<Array<Maybe<ComponentCollectionsComponentEvent>>>;
  month?: Maybe<Scalars["Int"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  wiki_pages?: Maybe<WikiPageRelationResponseCollection>;
  year: Scalars["Int"];
};

export type ChronologyItemEventsArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronologyItemWiki_PagesArgs = {
  filters?: InputMaybe<WikiPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ChronologyItemEntity = {
  __typename?: "ChronologyItemEntity";
  attributes?: Maybe<ChronologyItem>;
  id?: Maybe<Scalars["ID"]>;
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
  day?: InputMaybe<Scalars["Int"]>;
  displayed_date?: InputMaybe<Scalars["String"]>;
  events?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentEventInput>>>;
  month?: InputMaybe<Scalars["Int"]>;
  wiki_pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  year?: InputMaybe<Scalars["Int"]>;
};

export type ChronologyItemRelationResponseCollection = {
  __typename?: "ChronologyItemRelationResponseCollection";
  data: Array<ChronologyItemEntity>;
};

export type ComponentBasicsCredits = {
  __typename?: "ComponentBasicsCredits";
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  footnotes?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
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

export type ComponentBasicsCreditsSubbersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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

export type ComponentBasicsCreditsTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBasicsDatepicker = {
  __typename?: "ComponentBasicsDatepicker";
  day?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  month?: Maybe<Scalars["Int"]>;
  year?: Maybe<Scalars["Int"]>;
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
  day?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["ID"]>;
  month?: InputMaybe<Scalars["Int"]>;
  year?: InputMaybe<Scalars["Int"]>;
};

export type ComponentBasicsFileSize = {
  __typename?: "ComponentBasicsFileSize";
  id: Scalars["ID"];
  size: Scalars["Float"];
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
  id?: InputMaybe<Scalars["ID"]>;
  size?: InputMaybe<Scalars["Float"]>;
  unit?: InputMaybe<Enum_Componentbasicsfilesize_Unit>;
};

export type ComponentBasicsPrice = {
  __typename?: "ComponentBasicsPrice";
  amount?: Maybe<Scalars["Float"]>;
  currency?: Maybe<CurrencyEntityResponse>;
  id: Scalars["ID"];
};

export type ComponentBasicsPriceFiltersInput = {
  amount?: InputMaybe<FloatFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsPriceFiltersInput>>>;
  currency?: InputMaybe<CurrencyFiltersInput>;
  not?: InputMaybe<ComponentBasicsPriceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsPriceFiltersInput>>>;
};

export type ComponentBasicsPriceInput = {
  amount?: InputMaybe<Scalars["Float"]>;
  currency?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentBasicsSize = {
  __typename?: "ComponentBasicsSize";
  height?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  thickness?: Maybe<Scalars["Int"]>;
  width?: Maybe<Scalars["Int"]>;
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
  height?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["ID"]>;
  thickness?: InputMaybe<Scalars["Int"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type ComponentBasicsUrl = {
  __typename?: "ComponentBasicsUrl";
  id: Scalars["ID"];
  url?: Maybe<Scalars["String"]>;
};

export type ComponentBasicsUrlFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBasicsUrlFiltersInput>>>;
  not?: InputMaybe<ComponentBasicsUrlFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBasicsUrlFiltersInput>>>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBasicsUrlInput = {
  id?: InputMaybe<Scalars["ID"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type ComponentCollectionsComponentAliases = {
  __typename?: "ComponentCollectionsComponentAliases";
  alias: Scalars["String"];
  id: Scalars["ID"];
};

export type ComponentCollectionsComponentAliasesFiltersInput = {
  alias?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>>>;
};

export type ComponentCollectionsComponentAliasesInput = {
  alias?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ComponentCollectionsComponentBody = {
  __typename?: "ComponentCollectionsComponentBody";
  authors?: Maybe<RecorderRelationResponseCollection>;
  body: Scalars["String"];
  id: Scalars["ID"];
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentcollectionscomponentbody_Status;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentCollectionsComponentBodyAuthorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentBodyProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentBodyTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  authors?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  body?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componentcollectionscomponentbody_Status>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentCollectionsComponentDefinition = {
  __typename?: "ComponentCollectionsComponentDefinition";
  definition: Scalars["String"];
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentcollectionscomponentdefinition_Status;
};

export type ComponentCollectionsComponentEvent = {
  __typename?: "ComponentCollectionsComponentEvent";
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronologyItem>>>;
};

export type ComponentCollectionsComponentEventTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentEventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentEventFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentEventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentEventFiltersInput>>>;
  source?: InputMaybe<SourceFiltersInput>;
  translations?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
};

export type ComponentCollectionsComponentEventInput = {
  id?: InputMaybe<Scalars["ID"]>;
  source?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsChronologyItemInput>>>;
};

export type ComponentCollectionsComponentGlossaryDefinition = {
  __typename?: "ComponentCollectionsComponentGlossaryDefinition";
  categories?: Maybe<CategoryRelationResponseCollection>;
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsGlossaryDefinition>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentGlossaryDefinitionTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id?: InputMaybe<Scalars["ID"]>;
  source?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionInput>>>;
};

export type ComponentCollectionsComponentLibraryCover = {
  __typename?: "ComponentCollectionsComponentLibraryCover";
  back?: Maybe<UploadFileEntityResponse>;
  front?: Maybe<UploadFileEntityResponse>;
  full?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"];
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
  back?: InputMaybe<Scalars["ID"]>;
  front?: InputMaybe<Scalars["ID"]>;
  full?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
  inside_back?: InputMaybe<Scalars["ID"]>;
  inside_front?: InputMaybe<Scalars["ID"]>;
  inside_full?: InputMaybe<Scalars["ID"]>;
  spine?: InputMaybe<Scalars["ID"]>;
};

export type ComponentCollectionsComponentLibraryDustJacket = {
  __typename?: "ComponentCollectionsComponentLibraryDustJacket";
  back?: Maybe<UploadFileEntityResponse>;
  flap_back?: Maybe<UploadFileEntityResponse>;
  flap_front?: Maybe<UploadFileEntityResponse>;
  front?: Maybe<UploadFileEntityResponse>;
  full?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"];
  inside_full?: Maybe<UploadFileEntityResponse>;
  spine?: Maybe<UploadFileEntityResponse>;
};

export type ComponentCollectionsComponentLibraryDustJacketFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryDustJacketFiltersInput>>>;
};

export type ComponentCollectionsComponentLibraryDustJacketInput = {
  back?: InputMaybe<Scalars["ID"]>;
  flap_back?: InputMaybe<Scalars["ID"]>;
  flap_front?: InputMaybe<Scalars["ID"]>;
  front?: InputMaybe<Scalars["ID"]>;
  full?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
  inside_full?: InputMaybe<Scalars["ID"]>;
  spine?: InputMaybe<Scalars["ID"]>;
};

export type ComponentCollectionsComponentLibraryImages = {
  __typename?: "ComponentCollectionsComponentLibraryImages";
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  cover?: Maybe<ComponentCollectionsComponentLibraryCover>;
  dust_jacket?: Maybe<ComponentCollectionsComponentLibraryDustJacket>;
  id: Scalars["ID"];
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
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentLibraryImagesScannersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentLibraryImagesTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  cleaners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cover?: InputMaybe<ComponentCollectionsComponentLibraryCoverInput>;
  dust_jacket?: InputMaybe<ComponentCollectionsComponentLibraryDustJacketInput>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  obi_belt?: InputMaybe<ComponentCollectionsComponentLibraryObiBeltInput>;
  scanners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componentcollectionscomponentlibraryimages_Status>;
  typesetters?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentCollectionsComponentLibraryObiBelt = {
  __typename?: "ComponentCollectionsComponentLibraryObiBelt";
  back?: Maybe<UploadFileEntityResponse>;
  flap_back?: Maybe<UploadFileEntityResponse>;
  flap_front?: Maybe<UploadFileEntityResponse>;
  front?: Maybe<UploadFileEntityResponse>;
  full?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"];
  inside_full?: Maybe<UploadFileEntityResponse>;
  spine?: Maybe<UploadFileEntityResponse>;
};

export type ComponentCollectionsComponentLibraryObiBeltFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>>>;
  not?: InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryObiBeltFiltersInput>>>;
};

export type ComponentCollectionsComponentLibraryObiBeltInput = {
  back?: InputMaybe<Scalars["ID"]>;
  flap_back?: InputMaybe<Scalars["ID"]>;
  flap_front?: InputMaybe<Scalars["ID"]>;
  front?: InputMaybe<Scalars["ID"]>;
  full?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
  inside_full?: InputMaybe<Scalars["ID"]>;
  spine?: InputMaybe<Scalars["ID"]>;
};

export type ComponentCollectionsComponentTitles = {
  __typename?: "ComponentCollectionsComponentTitles";
  id: Scalars["ID"];
  title: Scalars["String"];
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
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryStory>>>;
};

export type ComponentCollectionsComponentWeaponStoryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentCollectionsComponentWeaponStoryTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id?: InputMaybe<Scalars["ID"]>;
  source?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryStoryInput>>>;
};

export type ComponentCollectionsComponentWikiDefinition = {
  __typename?: "ComponentCollectionsComponentWikiDefinition";
  categories?: Maybe<CategoryRelationResponseCollection>;
  definition?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
};

export type ComponentCollectionsComponentWikiDefinitionCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataAudio = {
  __typename?: "ComponentMetadataAudio";
  id: Scalars["ID"];
  subtype?: Maybe<AudioSubtypeEntityResponse>;
};

export type ComponentMetadataBooks = {
  __typename?: "ComponentMetadataBooks";
  binding_type?: Maybe<Enum_Componentmetadatabooks_Binding_Type>;
  id: Scalars["ID"];
  languages?: Maybe<LanguageRelationResponseCollection>;
  page_count?: Maybe<Scalars["Int"]>;
  page_order: Enum_Componentmetadatabooks_Page_Order;
  subtype?: Maybe<TextualSubtypeEntityResponse>;
};

export type ComponentMetadataBooksLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGame = {
  __typename?: "ComponentMetadataGame";
  audio_languages?: Maybe<LanguageRelationResponseCollection>;
  demo: Scalars["Boolean"];
  id: Scalars["ID"];
  interface_languages?: Maybe<LanguageRelationResponseCollection>;
  platforms?: Maybe<GamePlatformRelationResponseCollection>;
  sub_languages?: Maybe<LanguageRelationResponseCollection>;
};

export type ComponentMetadataGameAudio_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGameInterface_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGamePlatformsArgs = {
  filters?: InputMaybe<GamePlatformFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGameSub_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentMetadataGroup = {
  __typename?: "ComponentMetadataGroup";
  id: Scalars["ID"];
  subitems_type?: Maybe<MetadataTypeEntityResponse>;
  subtype?: Maybe<GroupSubtypeEntityResponse>;
};

export type ComponentMetadataMerch = {
  __typename?: "ComponentMetadataMerch";
  id: Scalars["ID"];
  merch_item?: Maybe<MerchItemEntityResponse>;
};

export type ComponentMetadataOther = {
  __typename?: "ComponentMetadataOther";
  id: Scalars["ID"];
};

export type ComponentMetadataVideo = {
  __typename?: "ComponentMetadataVideo";
  id: Scalars["ID"];
  subtype?: Maybe<VideoSubtypeEntityResponse>;
};

export type ComponentPageBuilderGallery = {
  __typename?: "ComponentPageBuilderGallery";
  gallery?: Maybe<UploadFileRelationResponseCollection>;
  id: Scalars["ID"];
};

export type ComponentPageBuilderGalleryGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentPageBuilderGrid = {
  __typename?: "ComponentPageBuilderGrid";
  column_count: Scalars["Int"];
  id: Scalars["ID"];
};

export type ComponentPageBuilderTabs = {
  __typename?: "ComponentPageBuilderTabs";
  id: Scalars["ID"];
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
  ending_page: Scalars["Int"];
  id: Scalars["ID"];
  starting_page: Scalars["Int"];
};

export type ComponentRangeTimeRange = {
  __typename?: "ComponentRangeTimeRange";
  ending_time?: Maybe<Scalars["Time"]>;
  id: Scalars["ID"];
  starting_time?: Maybe<Scalars["Time"]>;
};

export type ComponentSetsAudioSet = {
  __typename?: "ComponentSetsAudioSet";
  audiofile?: Maybe<UploadFileRelationResponseCollection>;
  dubbers?: Maybe<RecorderEntityResponse>;
  id: Scalars["ID"];
  notes?: Maybe<Scalars["String"]>;
  source_language?: Maybe<LanguageEntityResponse>;
  status?: Maybe<Enum_Componentsetsaudioset_Status>;
};

export type ComponentSetsAudioSetAudiofileArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  audiofile?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  dubbers?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
  notes?: InputMaybe<Scalars["String"]>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componentsetsaudioset_Status>;
};

export type ComponentSetsScanSet = {
  __typename?: "ComponentSetsScanSet";
  cleaners?: Maybe<RecorderRelationResponseCollection>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  notes?: Maybe<Scalars["String"]>;
  pages?: Maybe<UploadFileRelationResponseCollection>;
  scanners?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetsscanset_Status;
  typesetters?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsScanSetCleanersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsScanSetPagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsScanSetScannersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsScanSetTypesettersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  cleaners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  notes?: InputMaybe<Scalars["String"]>;
  pages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  scanners?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componentsetsscanset_Status>;
  typesetters?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentSetsTextSet = {
  __typename?: "ComponentSetsTextSet";
  id: Scalars["ID"];
  notes?: Maybe<Scalars["String"]>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetstextset_Status;
  text?: Maybe<Scalars["String"]>;
  transcribers?: Maybe<RecorderRelationResponseCollection>;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsTextSetProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsTextSetTranscribersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsTextSetTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  id?: InputMaybe<Scalars["ID"]>;
  notes?: InputMaybe<Scalars["String"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componentsetstextset_Status>;
  text?: InputMaybe<Scalars["String"]>;
  transcribers?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentSetsVideoSet = {
  __typename?: "ComponentSetsVideoSet";
  id: Scalars["ID"];
  notes?: Maybe<Scalars["String"]>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetsvideoset_Status;
  subbers?: Maybe<RecorderEntityResponse>;
  subfile?: Maybe<UploadFileEntityResponse>;
  video_url?: Maybe<Scalars["String"]>;
};

export type ComponentSetsVideoSetFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSetsVideoSetFiltersInput>>>;
  not?: InputMaybe<ComponentSetsVideoSetFiltersInput>;
  notes?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentSetsVideoSetFiltersInput>>>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  subbers?: InputMaybe<RecorderFiltersInput>;
  video_url?: InputMaybe<StringFilterInput>;
};

export type ComponentSetsVideoSetInput = {
  id?: InputMaybe<Scalars["ID"]>;
  notes?: InputMaybe<Scalars["String"]>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componentsetsvideoset_Status>;
  subbers?: InputMaybe<Scalars["ID"]>;
  subfile?: InputMaybe<Scalars["ID"]>;
  video_url?: InputMaybe<Scalars["String"]>;
};

export type ComponentSetsWikiSet = {
  __typename?: "ComponentSetsWikiSet";
  body?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componentsetswikiset_Status;
  summary?: Maybe<Scalars["String"]>;
  titles?: Maybe<Array<Maybe<ComponentCollectionsComponentTitles>>>;
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentSetsWikiSetProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsWikiSetTitlesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentTitlesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSetsWikiSetTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentSourceUrlSource = {
  __typename?: "ComponentSourceUrlSource";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"];
  note?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type ComponentTranslationsAudioSets = {
  __typename?: "ComponentTranslationsAudioSets";
  audiofile: UploadFileEntityResponse;
  credits: ComponentBasicsCredits;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsaudiosets_Status;
};

export type ComponentTranslationsBio = {
  __typename?: "ComponentTranslationsBio";
  bio?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
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
  bio?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsChronicles = {
  __typename?: "ComponentTranslationsChronicles";
  body?: Maybe<ComponentCollectionsComponentBody>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  summary?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
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
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  summary?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsChronologyEra = {
  __typename?: "ComponentTranslationsChronologyEra";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  title: Scalars["String"];
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
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsChronologyItem = {
  __typename?: "ComponentTranslationsChronologyItem";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  note?: Maybe<Scalars["String"]>;
  status: Enum_Componenttranslationschronologyitem_Status;
  title?: Maybe<Scalars["String"]>;
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
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  note?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Componenttranslationschronologyitem_Status>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsGlossaryDefinition = {
  __typename?: "ComponentTranslationsGlossaryDefinition";
  definition?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsglossarydefinition_Status;
};

export type ComponentTranslationsGlossaryDefinitionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>>>;
  definition?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>>>;
  source_language?: InputMaybe<LanguageFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsGlossaryDefinitionInput = {
  definition?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componenttranslationsglossarydefinition_Status>;
};

export type ComponentTranslationsGlossaryItem = {
  __typename?: "ComponentTranslationsGlossaryItem";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  title?: Maybe<Scalars["String"]>;
};

export type ComponentTranslationsGlossaryItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsGlossaryItemInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsLibraryContent = {
  __typename?: "ComponentTranslationsLibraryContent";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  title?: Maybe<Scalars["String"]>;
};

export type ComponentTranslationsLibraryItems = {
  __typename?: "ComponentTranslationsLibraryItems";
  description: Scalars["String"];
  id: Scalars["ID"];
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
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
};

export type ComponentTranslationsPosts = {
  __typename?: "ComponentTranslationsPosts";
  body?: Maybe<Scalars["String"]>;
  excerpt?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  proofreaders?: Maybe<RecorderRelationResponseCollection>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsposts_Status;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars["String"];
  translators?: Maybe<RecorderRelationResponseCollection>;
};

export type ComponentTranslationsPostsProofreadersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentTranslationsPostsTranslatorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  body?: InputMaybe<Scalars["String"]>;
  excerpt?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  proofreaders?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  source_language?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Componenttranslationsposts_Status>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  translators?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ComponentTranslationsScanSet = {
  __typename?: "ComponentTranslationsScanSet";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  pages: UploadFileRelationResponseCollection;
  status: Enum_Componenttranslationsscanset_Status;
};

export type ComponentTranslationsScanSetPagesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentTranslationsSimpleTitle = {
  __typename?: "ComponentTranslationsSimpleTitle";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  title: Scalars["String"];
};

export type ComponentTranslationsSimpleTitleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  not?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentTranslationsSimpleTitleInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsTextSet = {
  __typename?: "ComponentTranslationsTextSet";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationstextset_Status;
  text?: Maybe<Scalars["String"]>;
};

export type ComponentTranslationsTitle = {
  __typename?: "ComponentTranslationsTitle";
  audio_set?: Maybe<ComponentSetsAudioSet>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  pre_title?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
  text_set?: Maybe<ComponentSetsTextSet>;
  title: Scalars["String"];
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
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  pre_title?: InputMaybe<Scalars["String"]>;
  subtitle?: InputMaybe<Scalars["String"]>;
  text_set?: InputMaybe<ComponentSetsTextSetInput>;
  title?: InputMaybe<Scalars["String"]>;
  video_set?: InputMaybe<ComponentSetsVideoSetInput>;
};

export type ComponentTranslationsVideoSets = {
  __typename?: "ComponentTranslationsVideoSets";
  credits: ComponentBasicsCredits;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationsvideosets_Status;
  subfile?: Maybe<UploadFileEntityResponse>;
  video_embed?: Maybe<Scalars["String"]>;
  video_url: Scalars["String"];
};

export type ComponentTranslationsWeaponStory = {
  __typename?: "ComponentTranslationsWeaponStory";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  name?: Maybe<Scalars["String"]>;
};

export type ComponentTranslationsWeaponStoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryFiltersInput>>>;
};

export type ComponentTranslationsWeaponStoryInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsWeaponStoryStory = {
  __typename?: "ComponentTranslationsWeaponStoryStory";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  level_1?: Maybe<Scalars["String"]>;
  level_2?: Maybe<Scalars["String"]>;
  level_3?: Maybe<Scalars["String"]>;
  level_4?: Maybe<Scalars["String"]>;
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
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  level_1?: InputMaybe<Scalars["String"]>;
  level_2?: InputMaybe<Scalars["String"]>;
  level_3?: InputMaybe<Scalars["String"]>;
  level_4?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Componenttranslationsweaponstorystory_Status>;
};

export type ComponentTranslationsWeaponStoryType = {
  __typename?: "ComponentTranslationsWeaponStoryType";
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  name?: Maybe<Scalars["String"]>;
};

export type ComponentTranslationsWeaponStoryTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>>>;
  language?: InputMaybe<LanguageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>>>;
};

export type ComponentTranslationsWeaponStoryTypeInput = {
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsWebArchives = {
  __typename?: "ComponentTranslationsWebArchives";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  notes?: Maybe<Scalars["String"]>;
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
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  notes?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsWiki = {
  __typename?: "ComponentTranslationsWiki";
  aliases?: Maybe<Array<Maybe<ComponentCollectionsComponentAliases>>>;
  body?: Maybe<ComponentCollectionsComponentBody>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  summary?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type ComponentTranslationsWikiAliasesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentAliasesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  id?: InputMaybe<Scalars["ID"]>;
  language?: InputMaybe<Scalars["ID"]>;
  summary?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentTranslationsWikiPost = {
  __typename?: "ComponentTranslationsWikiPost";
  body?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  language?: Maybe<LanguageEntityResponse>;
  source_language?: Maybe<LanguageEntityResponse>;
  status: Enum_Componenttranslationswikipost_Status;
  summary?: Maybe<Scalars["String"]>;
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
  displayed_date?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsChronologyItem>>>;
};

export type ComponentWikiSpecializationChronologyTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentWikiSpecializationGlossaryItem = {
  __typename?: "ComponentWikiSpecializationGlossaryItem";
  categories?: Maybe<CategoryRelationResponseCollection>;
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsGlossaryDefinition>>>;
};

export type ComponentWikiSpecializationGlossaryItemCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentWikiSpecializationGlossaryItemTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id?: InputMaybe<Scalars["ID"]>;
  source?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryDefinitionInput>>>;
};

export type ComponentWikiSpecializationPost = {
  __typename?: "ComponentWikiSpecializationPost";
  authors?: Maybe<RecorderRelationResponseCollection>;
  id: Scalars["ID"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsWikiPost>>>;
};

export type ComponentWikiSpecializationPostAuthorsArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentWikiSpecializationPostTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWikiPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentWikiSpecializationWeapon = {
  __typename?: "ComponentWikiSpecializationWeapon";
  id: Scalars["ID"];
  source?: Maybe<SourceEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryStory>>>;
};

export type ComponentWikiSpecializationWeaponTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type Content = {
  __typename?: "Content";
  categories?: Maybe<CategoryRelationResponseCollection>;
  chronicles?: Maybe<ChronicleRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  folder?: Maybe<ContentsFolderEntityResponse>;
  ranged_contents?: Maybe<RangedContentRelationResponseCollection>;
  slug: Scalars["String"];
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsTitle>>>;
  type?: Maybe<ContentTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContentCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentChroniclesArgs = {
  filters?: InputMaybe<ChronicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentRanged_ContentsArgs = {
  filters?: InputMaybe<RangedContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentEntity = {
  __typename?: "ContentEntity";
  attributes?: Maybe<Content>;
  id?: Maybe<Scalars["ID"]>;
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
  not?: InputMaybe<ContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContentFiltersInput>>>;
  ranged_contents?: InputMaybe<RangedContentFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  translations?: InputMaybe<ComponentTranslationsTitleFiltersInput>;
  type?: InputMaybe<ContentTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  chronicles?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  folder?: InputMaybe<Scalars["ID"]>;
  ranged_contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slug?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsTitleInput>>>;
  type?: InputMaybe<Scalars["ID"]>;
};

export type ContentRelationResponseCollection = {
  __typename?: "ContentRelationResponseCollection";
  data: Array<ContentEntity>;
};

export type ContentType = {
  __typename?: "ContentType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContentTypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentTypeEntity = {
  __typename?: "ContentTypeEntity";
  attributes?: Maybe<ContentType>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type ContentsFolder = {
  __typename?: "ContentsFolder";
  contents?: Maybe<ContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  parent_folder?: Maybe<ContentsFolderEntityResponse>;
  sequence: Scalars["Boolean"];
  slug: Scalars["String"];
  subfolders?: Maybe<ContentsFolderRelationResponseCollection>;
  titles: Array<Maybe<ComponentTranslationsSimpleTitle>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContentsFolderContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentsFolderSubfoldersArgs = {
  filters?: InputMaybe<ContentsFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentsFolderTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContentsFolderEntity = {
  __typename?: "ContentsFolderEntity";
  attributes?: Maybe<ContentsFolder>;
  id?: Maybe<Scalars["ID"]>;
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
  sequence?: InputMaybe<BooleanFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  subfolders?: InputMaybe<ContentsFolderFiltersInput>;
  titles?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContentsFolderInput = {
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  parent_folder?: InputMaybe<Scalars["ID"]>;
  sequence?: InputMaybe<Scalars["Boolean"]>;
  slug?: InputMaybe<Scalars["String"]>;
  subfolders?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type ContentsFolderRelationResponseCollection = {
  __typename?: "ContentsFolderRelationResponseCollection";
  data: Array<ContentsFolderEntity>;
};

export type Currency = {
  __typename?: "Currency";
  code: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  display_decimals: Scalars["Boolean"];
  rate_to_usd: Scalars["Float"];
  symbol: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CurrencyEntity = {
  __typename?: "CurrencyEntity";
  attributes?: Maybe<Currency>;
  id?: Maybe<Scalars["ID"]>;
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
  code?: InputMaybe<Scalars["String"]>;
  display_decimals?: InputMaybe<Scalars["Boolean"]>;
  rate_to_usd?: InputMaybe<Scalars["Float"]>;
  symbol?: InputMaybe<Scalars["String"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]>;
  containsi?: InputMaybe<Scalars["DateTime"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]>;
  eq?: InputMaybe<Scalars["DateTime"]>;
  eqi?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  ne?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]>;
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
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  contains?: InputMaybe<Scalars["Float"]>;
  containsi?: InputMaybe<Scalars["Float"]>;
  endsWith?: InputMaybe<Scalars["Float"]>;
  eq?: InputMaybe<Scalars["Float"]>;
  eqi?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  ne?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]>;
  notContainsi?: InputMaybe<Scalars["Float"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]>;
};

export type GamePlatform = {
  __typename?: "GamePlatform";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  short: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GamePlatformEntity = {
  __typename?: "GamePlatformEntity";
  attributes?: Maybe<GamePlatform>;
  id?: Maybe<Scalars["ID"]>;
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
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<GamePlatformFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<GamePlatformFiltersInput>>>;
  short?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type GamePlatformInput = {
  name?: InputMaybe<Scalars["String"]>;
  short?: InputMaybe<Scalars["String"]>;
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
  | ComponentSetsVideoSet
  | ComponentSetsWikiSet
  | ComponentSourceUrlSource
  | ComponentTranslationsAudioSets
  | ComponentTranslationsBio
  | ComponentTranslationsChronicles
  | ComponentTranslationsChronologyEra
  | ComponentTranslationsChronologyItem
  | ComponentTranslationsGlossaryDefinition
  | ComponentTranslationsGlossaryItem
  | ComponentTranslationsLibraryContent
  | ComponentTranslationsLibraryItems
  | ComponentTranslationsPosts
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  definitions?: Maybe<Array<Maybe<ComponentCollectionsComponentGlossaryDefinition>>>;
  slug: Scalars["String"];
  title?: Maybe<Array<Maybe<ComponentTranslationsGlossaryItem>>>;
  type?: Maybe<GlossaryItemTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GlossaryItemDefinitionsArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentGlossaryDefinitionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type GlossaryItemTitleArgs = {
  filters?: InputMaybe<ComponentTranslationsGlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type GlossaryItemEntity = {
  __typename?: "GlossaryItemEntity";
  attributes?: Maybe<GlossaryItem>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Array<InputMaybe<ComponentTranslationsGlossaryItemInput>>>;
  type?: InputMaybe<Scalars["ID"]>;
};

export type GlossaryItemType = {
  __typename?: "GlossaryItemType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  type: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GlossaryItemTypeEntity = {
  __typename?: "GlossaryItemTypeEntity";
  attributes?: Maybe<GlossaryItemType>;
  id?: Maybe<Scalars["ID"]>;
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
  type?: InputMaybe<Scalars["String"]>;
};

export type GroupSubtype = {
  __typename?: "GroupSubtype";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GroupSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type GroupSubtypeEntity = {
  __typename?: "GroupSubtypeEntity";
  attributes?: Maybe<GroupSubtype>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contains?: InputMaybe<Scalars["ID"]>;
  containsi?: InputMaybe<Scalars["ID"]>;
  endsWith?: InputMaybe<Scalars["ID"]>;
  eq?: InputMaybe<Scalars["ID"]>;
  eqi?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  gte?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  lt?: InputMaybe<Scalars["ID"]>;
  lte?: InputMaybe<Scalars["ID"]>;
  ne?: InputMaybe<Scalars["ID"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]>;
  notContainsi?: InputMaybe<Scalars["ID"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  contains?: InputMaybe<Scalars["Int"]>;
  containsi?: InputMaybe<Scalars["Int"]>;
  endsWith?: InputMaybe<Scalars["Int"]>;
  eq?: InputMaybe<Scalars["Int"]>;
  eqi?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  ne?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]>;
  notContainsi?: InputMaybe<Scalars["Int"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  contains?: InputMaybe<Scalars["JSON"]>;
  containsi?: InputMaybe<Scalars["JSON"]>;
  endsWith?: InputMaybe<Scalars["JSON"]>;
  eq?: InputMaybe<Scalars["JSON"]>;
  eqi?: InputMaybe<Scalars["JSON"]>;
  gt?: InputMaybe<Scalars["JSON"]>;
  gte?: InputMaybe<Scalars["JSON"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  lt?: InputMaybe<Scalars["JSON"]>;
  lte?: InputMaybe<Scalars["JSON"]>;
  ne?: InputMaybe<Scalars["JSON"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]>;
};

export type Language = {
  __typename?: "Language";
  code: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  localized_name: Scalars["String"];
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LanguageEntity = {
  __typename?: "LanguageEntity";
  attributes?: Maybe<Language>;
  id?: Maybe<Scalars["ID"]>;
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
  code?: InputMaybe<Scalars["String"]>;
  localized_name?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type LanguageRelationResponseCollection = {
  __typename?: "LanguageRelationResponseCollection";
  data: Array<LanguageEntity>;
};

export type LibraryItem = {
  __typename?: "LibraryItem";
  categories?: Maybe<CategoryRelationResponseCollection>;
  contents?: Maybe<RangedContentRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  descriptions?: Maybe<Array<Maybe<ComponentTranslationsLibraryItems>>>;
  digital: Scalars["Boolean"];
  gallery?: Maybe<UploadFileRelationResponseCollection>;
  images?: Maybe<Array<Maybe<ComponentCollectionsComponentLibraryImages>>>;
  metadata?: Maybe<Array<Maybe<LibraryItemMetadataDynamicZone>>>;
  price?: Maybe<ComponentBasicsPrice>;
  primary: Scalars["Boolean"];
  release_date?: Maybe<ComponentBasicsDatepicker>;
  root_item: Scalars["Boolean"];
  size?: Maybe<ComponentBasicsSize>;
  slug: Scalars["String"];
  subitem_of?: Maybe<LibraryItemRelationResponseCollection>;
  subitems?: Maybe<LibraryItemRelationResponseCollection>;
  submerchs?: Maybe<MerchItemRelationResponseCollection>;
  subtitle?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  urls?: Maybe<Array<Maybe<ComponentBasicsUrl>>>;
};

export type LibraryItemCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemContentsArgs = {
  filters?: InputMaybe<RangedContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemDescriptionsArgs = {
  filters?: InputMaybe<ComponentTranslationsLibraryItemsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemImagesArgs = {
  filters?: InputMaybe<ComponentCollectionsComponentLibraryImagesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemSubitem_OfArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemSubitemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemSubmerchsArgs = {
  filters?: InputMaybe<MerchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemUrlsArgs = {
  filters?: InputMaybe<ComponentBasicsUrlFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type LibraryItemEntity = {
  __typename?: "LibraryItemEntity";
  attributes?: Maybe<LibraryItem>;
  id?: Maybe<Scalars["ID"]>;
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
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  descriptions?: InputMaybe<Array<InputMaybe<ComponentTranslationsLibraryItemsInput>>>;
  digital?: InputMaybe<Scalars["Boolean"]>;
  gallery?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  images?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentLibraryImagesInput>>>;
  metadata?: InputMaybe<Array<Scalars["LibraryItemMetadataDynamicZoneInput"]>>;
  price?: InputMaybe<ComponentBasicsPriceInput>;
  primary?: InputMaybe<Scalars["Boolean"]>;
  release_date?: InputMaybe<ComponentBasicsDatepickerInput>;
  root_item?: InputMaybe<Scalars["Boolean"]>;
  size?: InputMaybe<ComponentBasicsSizeInput>;
  slug?: InputMaybe<Scalars["String"]>;
  subitem_of?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  subitems?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  submerchs?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  subtitle?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  library_items?: Maybe<LibraryItemRelationResponseCollection>;
  slug: Scalars["String"];
  subtitle?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MerchItemLibrary_ItemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MerchItemEntity = {
  __typename?: "MerchItemEntity";
  attributes?: Maybe<MerchItem>;
  id?: Maybe<Scalars["ID"]>;
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
  library_items?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slug?: InputMaybe<Scalars["String"]>;
  subtitle?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MerchItemRelationResponseCollection = {
  __typename?: "MerchItemRelationResponseCollection";
  data: Array<MerchItemEntity>;
};

export type MetadataType = {
  __typename?: "MetadataType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MetadataTypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MetadataTypeEntity = {
  __typename?: "MetadataTypeEntity";
  attributes?: Maybe<MetadataType>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
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
  id: Scalars["ID"];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChronicleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChroniclesChapterArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChronologyEraArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChronologyItemArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContentTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContentsFolderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCurrencyArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteGamePlatformArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteGlossaryItemArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteGlossaryItemTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteGroupSubtypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteLanguageArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteLibraryItemArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMerchItemArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMetadataTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRangedContentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRecorderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteSourceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTextualSubtypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteVideoArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteVideoChannelArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteVideoSubtypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWeaponStoryArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWeaponStoryGroupArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWeaponStoryTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWebArchiveArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWebsiteInterfaceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWikiPageArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWikiPagesTagArgs = {
  id: Scalars["ID"];
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  files: Array<InputMaybe<Scalars["Upload"]>>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateAudioSubtypeArgs = {
  data: AudioSubtypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars["ID"];
};

export type MutationUpdateChronicleArgs = {
  data: ChronicleInput;
  id: Scalars["ID"];
};

export type MutationUpdateChroniclesChapterArgs = {
  data: ChroniclesChapterInput;
  id: Scalars["ID"];
};

export type MutationUpdateChronologyEraArgs = {
  data: ChronologyEraInput;
  id: Scalars["ID"];
};

export type MutationUpdateChronologyItemArgs = {
  data: ChronologyItemInput;
  id: Scalars["ID"];
};

export type MutationUpdateContentArgs = {
  data: ContentInput;
  id: Scalars["ID"];
};

export type MutationUpdateContentTypeArgs = {
  data: ContentTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateContentsFolderArgs = {
  data: ContentsFolderInput;
  id: Scalars["ID"];
};

export type MutationUpdateCurrencyArgs = {
  data: CurrencyInput;
  id: Scalars["ID"];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateGamePlatformArgs = {
  data: GamePlatformInput;
  id: Scalars["ID"];
};

export type MutationUpdateGlossaryItemArgs = {
  data: GlossaryItemInput;
  id: Scalars["ID"];
};

export type MutationUpdateGlossaryItemTypeArgs = {
  data: GlossaryItemTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateGroupSubtypeArgs = {
  data: GroupSubtypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateLanguageArgs = {
  data: LanguageInput;
  id: Scalars["ID"];
};

export type MutationUpdateLibraryItemArgs = {
  data: LibraryItemInput;
  id: Scalars["ID"];
};

export type MutationUpdateMerchItemArgs = {
  data: MerchItemInput;
  id: Scalars["ID"];
};

export type MutationUpdateMetadataTypeArgs = {
  data: MetadataTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdatePostArgs = {
  data: PostInput;
  id: Scalars["ID"];
};

export type MutationUpdateRangedContentArgs = {
  data: RangedContentInput;
  id: Scalars["ID"];
};

export type MutationUpdateRecorderArgs = {
  data: RecorderInput;
  id: Scalars["ID"];
};

export type MutationUpdateSourceArgs = {
  data: SourceInput;
  id: Scalars["ID"];
};

export type MutationUpdateTextualSubtypeArgs = {
  data: TextualSubtypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars["ID"];
};

export type MutationUpdateVideoArgs = {
  data: VideoInput;
  id: Scalars["ID"];
};

export type MutationUpdateVideoChannelArgs = {
  data: VideoChannelInput;
  id: Scalars["ID"];
};

export type MutationUpdateVideoSubtypeArgs = {
  data: VideoSubtypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateWeaponStoryArgs = {
  data: WeaponStoryInput;
  id: Scalars["ID"];
};

export type MutationUpdateWeaponStoryGroupArgs = {
  data: WeaponStoryGroupInput;
  id: Scalars["ID"];
};

export type MutationUpdateWeaponStoryTypeArgs = {
  data: WeaponStoryTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateWebArchiveArgs = {
  data: WebArchiveInput;
  id: Scalars["ID"];
};

export type MutationUpdateWebsiteInterfaceArgs = {
  data: WebsiteInterfaceInput;
  id: Scalars["ID"];
};

export type MutationUpdateWikiPageArgs = {
  data: WikiPageInput;
  id: Scalars["ID"];
};

export type MutationUpdateWikiPagesTagArgs = {
  data: WikiPagesTagInput;
  id: Scalars["ID"];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"];
  pageCount: Scalars["Int"];
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

export type Post = {
  __typename?: "Post";
  authors?: Maybe<RecorderRelationResponseCollection>;
  categories?: Maybe<CategoryRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  date: ComponentBasicsDatepicker;
  hidden: Scalars["Boolean"];
  slug: Scalars["String"];
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsPosts>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
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
  attributes?: Maybe<Post>;
  id?: Maybe<Scalars["ID"]>;
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
  authors?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  date?: InputMaybe<ComponentBasicsDatepickerInput>;
  hidden?: InputMaybe<Scalars["Boolean"]>;
  slug?: InputMaybe<Scalars["String"]>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
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
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAudioSubtypesArgs = {
  filters?: InputMaybe<AudioSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryChronicleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryChroniclesArgs = {
  filters?: InputMaybe<ChronicleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryChroniclesChapterArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryChroniclesChaptersArgs = {
  filters?: InputMaybe<ChroniclesChapterFiltersInput>;
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

export type QueryContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContentTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContentTypesArgs = {
  filters?: InputMaybe<ContentTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContentsArgs = {
  filters?: InputMaybe<ContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContentsFolderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContentsFoldersArgs = {
  filters?: InputMaybe<ContentsFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCurrenciesArgs = {
  filters?: InputMaybe<CurrencyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCurrencyArgs = {
  id?: InputMaybe<Scalars["ID"]>;
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

export type QueryGlossaryItemTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGlossaryItemTypesArgs = {
  filters?: InputMaybe<GlossaryItemTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGlossaryItemsArgs = {
  filters?: InputMaybe<GlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGroupSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryGroupSubtypesArgs = {
  filters?: InputMaybe<GroupSubtypeFiltersInput>;
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

export type QueryLibraryItemArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLibraryItemsArgs = {
  filters?: InputMaybe<LibraryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryMerchItemArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMerchItemsArgs = {
  filters?: InputMaybe<MerchItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryMetadataTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMetadataTypesArgs = {
  filters?: InputMaybe<MetadataTypeFiltersInput>;
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
};

export type QueryRangedContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRangedContentsArgs = {
  filters?: InputMaybe<RangedContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRecorderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRecordersArgs = {
  filters?: InputMaybe<RecorderFiltersInput>;
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

export type QueryTextualSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTextualSubtypesArgs = {
  filters?: InputMaybe<TextualSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryVideoArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryVideoChannelArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryVideoChannelsArgs = {
  filters?: InputMaybe<VideoChannelFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryVideoSubtypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryVideoSubtypesArgs = {
  filters?: InputMaybe<VideoSubtypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryVideosArgs = {
  filters?: InputMaybe<VideoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWeaponStoriesArgs = {
  filters?: InputMaybe<WeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWeaponStoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
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

export type QueryWebArchiveArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWebArchivesArgs = {
  filters?: InputMaybe<WebArchiveFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWebsiteInterfaceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWebsiteInterfacesArgs = {
  filters?: InputMaybe<WebsiteInterfaceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWikiPageArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWikiPagesArgs = {
  filters?: InputMaybe<WikiPageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWikiPagesTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWikiPagesTagsArgs = {
  filters?: InputMaybe<WikiPagesTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RangedContent = {
  __typename?: "RangedContent";
  content?: Maybe<ContentEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  library_item?: Maybe<LibraryItemEntityResponse>;
  range: Array<Maybe<RangedContentRangeDynamicZone>>;
  scan_set?: Maybe<Array<Maybe<ComponentSetsScanSet>>>;
  slug: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RangedContentScan_SetArgs = {
  filters?: InputMaybe<ComponentSetsScanSetFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RangedContentEntity = {
  __typename?: "RangedContentEntity";
  attributes?: Maybe<RangedContent>;
  id?: Maybe<Scalars["ID"]>;
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
  content?: InputMaybe<Scalars["ID"]>;
  library_item?: InputMaybe<Scalars["ID"]>;
  range?: InputMaybe<Array<Scalars["RangedContentRangeDynamicZoneInput"]>>;
  scan_set?: InputMaybe<Array<InputMaybe<ComponentSetsScanSetInput>>>;
  slug?: InputMaybe<Scalars["String"]>;
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
  anonymize: Scalars["Boolean"];
  anonymous_code: Scalars["String"];
  avatar?: Maybe<UploadFileEntityResponse>;
  bio?: Maybe<Array<Maybe<ComponentTranslationsBio>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  languages?: Maybe<LanguageRelationResponseCollection>;
  pronouns?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  username: Scalars["String"];
};

export type RecorderBioArgs = {
  filters?: InputMaybe<ComponentTranslationsBioFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecorderLanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecorderEntity = {
  __typename?: "RecorderEntity";
  attributes?: Maybe<Recorder>;
  id?: Maybe<Scalars["ID"]>;
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
  anonymize?: InputMaybe<Scalars["Boolean"]>;
  anonymous_code?: InputMaybe<Scalars["String"]>;
  avatar?: InputMaybe<Scalars["ID"]>;
  bio?: InputMaybe<Array<InputMaybe<ComponentTranslationsBioInput>>>;
  languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  pronouns?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type RecorderRelationResponseCollection = {
  __typename?: "RecorderRelationResponseCollection";
  data: Array<RecorderEntity>;
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export type Source = {
  __typename?: "Source";
  content?: Maybe<ContentEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  ranged_content?: Maybe<RangedContentEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type SourceEntity = {
  __typename?: "SourceEntity";
  attributes?: Maybe<Source>;
  id?: Maybe<Scalars["ID"]>;
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
  content?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  ranged_content?: InputMaybe<Scalars["ID"]>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  contains?: InputMaybe<Scalars["String"]>;
  containsi?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  eq?: InputMaybe<Scalars["String"]>;
  eqi?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  ne?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]>;
  notContainsi?: InputMaybe<Scalars["String"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type TextualSubtype = {
  __typename?: "TextualSubtype";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TextualSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TextualSubtypeEntity = {
  __typename?: "TextualSubtypeEntity";
  attributes?: Maybe<TextualSubtype>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  ext?: Maybe<Scalars["String"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  height?: Maybe<Scalars["Int"]>;
  mime: Scalars["String"];
  name: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars["ID"]>;
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
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  ext?: InputMaybe<Scalars["String"]>;
  folder?: InputMaybe<Scalars["ID"]>;
  folderPath?: InputMaybe<Scalars["String"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["Int"]>;
  mime?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
  size?: InputMaybe<Scalars["Float"]>;
  url?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: "UploadFolder";
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars["String"];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars["String"];
  pathId: Scalars["Int"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderEntity = {
  __typename?: "UploadFolderEntity";
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars["ID"]>;
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
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  parent?: InputMaybe<Scalars["ID"]>;
  path?: InputMaybe<Scalars["String"]>;
  pathId?: InputMaybe<Scalars["Int"]>;
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  duration: Scalars["Int"];
  gone: Scalars["Boolean"];
  height: Scalars["Int"];
  likes: Scalars["Int"];
  live_chat: Scalars["Boolean"];
  published_date: ComponentBasicsDatepicker;
  source?: Maybe<Enum_Video_Source>;
  sub_languages?: Maybe<LanguageRelationResponseCollection>;
  title: Scalars["String"];
  uid: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  views: Scalars["Int"];
  width: Scalars["Int"];
};

export type VideoAudio_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoSub_LanguagesArgs = {
  filters?: InputMaybe<LanguageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoChannel = {
  __typename?: "VideoChannel";
  createdAt?: Maybe<Scalars["DateTime"]>;
  subscribers: Scalars["Int"];
  title: Scalars["String"];
  uid: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  videos?: Maybe<VideoRelationResponseCollection>;
};

export type VideoChannelVideosArgs = {
  filters?: InputMaybe<VideoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoChannelEntity = {
  __typename?: "VideoChannelEntity";
  attributes?: Maybe<VideoChannel>;
  id?: Maybe<Scalars["ID"]>;
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
  subscribers?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
  uid?: InputMaybe<Scalars["String"]>;
  videos?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type VideoEntity = {
  __typename?: "VideoEntity";
  attributes?: Maybe<Video>;
  id?: Maybe<Scalars["ID"]>;
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
  audio_languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  channel?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  duration?: InputMaybe<Scalars["Int"]>;
  gone?: InputMaybe<Scalars["Boolean"]>;
  height?: InputMaybe<Scalars["Int"]>;
  likes?: InputMaybe<Scalars["Int"]>;
  live_chat?: InputMaybe<Scalars["Boolean"]>;
  published_date?: InputMaybe<ComponentBasicsDatepickerInput>;
  source?: InputMaybe<Enum_Video_Source>;
  sub_languages?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  uid?: InputMaybe<Scalars["String"]>;
  views?: InputMaybe<Scalars["Int"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type VideoRelationResponseCollection = {
  __typename?: "VideoRelationResponseCollection";
  data: Array<VideoEntity>;
};

export type VideoSubtype = {
  __typename?: "VideoSubtype";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type VideoSubtypeTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type VideoSubtypeEntity = {
  __typename?: "VideoSubtypeEntity";
  attributes?: Maybe<VideoSubtype>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  titles?: InputMaybe<Array<InputMaybe<ComponentTranslationsSimpleTitleInput>>>;
};

export type WeaponStory = {
  __typename?: "WeaponStory";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Array<Maybe<ComponentTranslationsWeaponStory>>>;
  slug?: Maybe<Scalars["String"]>;
  stories?: Maybe<Array<Maybe<ComponentCollectionsComponentWeaponStory>>>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  type?: Maybe<WeaponStoryTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  weapon_group?: Maybe<WeaponStoryGroupEntityResponse>;
  wiki_page?: Maybe<WikiPageEntityResponse>;
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
  attributes?: Maybe<WeaponStory>;
  id?: Maybe<Scalars["ID"]>;
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  weapons?: Maybe<WeaponStoryRelationResponseCollection>;
};

export type WeaponStoryGroupWeaponsArgs = {
  filters?: InputMaybe<WeaponStoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WeaponStoryGroupEntity = {
  __typename?: "WeaponStoryGroupEntity";
  attributes?: Maybe<WeaponStoryGroup>;
  id?: Maybe<Scalars["ID"]>;
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
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weapons?: InputMaybe<WeaponStoryFiltersInput>;
};

export type WeaponStoryGroupInput = {
  slug?: InputMaybe<Scalars["String"]>;
  weapons?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type WeaponStoryInput = {
  name?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryInput>>>;
  slug?: InputMaybe<Scalars["String"]>;
  stories?: InputMaybe<Array<InputMaybe<ComponentCollectionsComponentWeaponStoryInput>>>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  type?: InputMaybe<Scalars["ID"]>;
  weapon_group?: InputMaybe<Scalars["ID"]>;
  wiki_page?: InputMaybe<Scalars["ID"]>;
};

export type WeaponStoryRelationResponseCollection = {
  __typename?: "WeaponStoryRelationResponseCollection";
  data: Array<WeaponStoryEntity>;
};

export type WeaponStoryType = {
  __typename?: "WeaponStoryType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  translations?: Maybe<Array<Maybe<ComponentTranslationsWeaponStoryType>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type WeaponStoryTypeTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWeaponStoryTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WeaponStoryTypeEntity = {
  __typename?: "WeaponStoryTypeEntity";
  attributes?: Maybe<WeaponStoryType>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsWeaponStoryTypeInput>>>;
};

export type WebArchive = {
  __typename?: "WebArchive";
  author?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  date: ComponentBasicsDatepicker;
  descriptions?: Maybe<Array<Maybe<ComponentTranslationsWebArchives>>>;
  format: Enum_Webarchive_Format;
  num_pages?: Maybe<Scalars["Int"]>;
  size: ComponentBasicsFileSize;
  source_url: Scalars["String"];
  still_online: Scalars["Boolean"];
  type: Enum_Webarchive_Type;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type WebArchiveDescriptionsArgs = {
  filters?: InputMaybe<ComponentTranslationsWebArchivesFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WebArchiveEntity = {
  __typename?: "WebArchiveEntity";
  attributes?: Maybe<WebArchive>;
  id?: Maybe<Scalars["ID"]>;
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
  author?: InputMaybe<Scalars["String"]>;
  date?: InputMaybe<ComponentBasicsDatepickerInput>;
  descriptions?: InputMaybe<Array<InputMaybe<ComponentTranslationsWebArchivesInput>>>;
  format?: InputMaybe<Enum_Webarchive_Format>;
  num_pages?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<ComponentBasicsFileSizeInput>;
  source_url?: InputMaybe<Scalars["String"]>;
  still_online?: InputMaybe<Scalars["Boolean"]>;
  type?: InputMaybe<Enum_Webarchive_Type>;
};

export type WebsiteInterface = {
  __typename?: "WebsiteInterface";
  about_us?: Maybe<Scalars["String"]>;
  about_us_description?: Maybe<Scalars["String"]>;
  accords_handbook?: Maybe<Scalars["String"]>;
  all?: Maybe<Scalars["String"]>;
  always_show_info?: Maybe<Scalars["String"]>;
  anchor_link_copied?: Maybe<Scalars["String"]>;
  archives?: Maybe<Scalars["String"]>;
  archives_description?: Maybe<Scalars["String"]>;
  audio?: Maybe<Scalars["String"]>;
  auto?: Maybe<Scalars["String"]>;
  available_at?: Maybe<Scalars["String"]>;
  back_matter?: Maybe<Scalars["String"]>;
  binding?: Maybe<Scalars["String"]>;
  book_fold?: Maybe<Scalars["String"]>;
  calculated?: Maybe<Scalars["String"]>;
  categories?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  change_language?: Maybe<Scalars["String"]>;
  channel?: Maybe<Scalars["String"]>;
  chronicles?: Maybe<Scalars["String"]>;
  chronicles_description?: Maybe<Scalars["String"]>;
  chronicles_short_description?: Maybe<Scalars["String"]>;
  chronology?: Maybe<Scalars["String"]>;
  cleaners?: Maybe<Scalars["String"]>;
  combine_related_contents?: Maybe<Scalars["String"]>;
  contact_us?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  content_is_not_available?: Maybe<Scalars["String"]>;
  contents?: Maybe<Scalars["String"]>;
  contents_description?: Maybe<Scalars["String"]>;
  contents_short_description?: Maybe<Scalars["String"]>;
  copy_anchor_link?: Maybe<Scalars["String"]>;
  copyright_notice?: Maybe<Scalars["String"]>;
  cover?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  currency?: Maybe<Scalars["String"]>;
  dark?: Maybe<Scalars["String"]>;
  default_description?: Maybe<Scalars["String"]>;
  definition?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  details?: Maybe<Scalars["String"]>;
  display_all_items?: Maybe<Scalars["String"]>;
  done?: Maybe<Scalars["String"]>;
  double_page_view?: Maybe<Scalars["String"]>;
  draft?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  email_gdpr_notice?: Maybe<Scalars["String"]>;
  empty_folder_message?: Maybe<Scalars["String"]>;
  folders?: Maybe<Scalars["String"]>;
  followup_content?: Maybe<Scalars["String"]>;
  font?: Maybe<Scalars["String"]>;
  font_size?: Maybe<Scalars["String"]>;
  front_matter?: Maybe<Scalars["String"]>;
  gallery?: Maybe<Scalars["String"]>;
  gallery_description?: Maybe<Scalars["String"]>;
  game?: Maybe<Scalars["String"]>;
  group?: Maybe<Scalars["String"]>;
  group_by?: Maybe<Scalars["String"]>;
  hardcover?: Maybe<Scalars["String"]>;
  have_it?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["String"]>;
  incomplete?: Maybe<Scalars["String"]>;
  item?: Maybe<Scalars["String"]>;
  item_not_available?: Maybe<Scalars["String"]>;
  items?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["String"]>;
  language_switch_message?: Maybe<Scalars["String"]>;
  languages?: Maybe<Scalars["String"]>;
  least_popular?: Maybe<Scalars["String"]>;
  left_to_right?: Maybe<Scalars["String"]>;
  legality?: Maybe<Scalars["String"]>;
  library?: Maybe<Scalars["String"]>;
  library_description?: Maybe<Scalars["String"]>;
  library_short_description?: Maybe<Scalars["String"]>;
  licensing_notice?: Maybe<Scalars["String"]>;
  light?: Maybe<Scalars["String"]>;
  lighting?: Maybe<Scalars["String"]>;
  listen_content?: Maybe<Scalars["String"]>;
  longest?: Maybe<Scalars["String"]>;
  members?: Maybe<Scalars["String"]>;
  merch?: Maybe<Scalars["String"]>;
  merch_description?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
  most_popular?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  newest?: Maybe<Scalars["String"]>;
  news?: Maybe<Scalars["String"]>;
  news_description?: Maybe<Scalars["String"]>;
  night_reader?: Maybe<Scalars["String"]>;
  no_category?: Maybe<Scalars["String"]>;
  no_results_message?: Maybe<Scalars["String"]>;
  no_source_warning?: Maybe<Scalars["String"]>;
  no_type?: Maybe<Scalars["String"]>;
  no_year?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
  oldest?: Maybe<Scalars["String"]>;
  only_display_items_i_have?: Maybe<Scalars["String"]>;
  only_display_items_i_want?: Maybe<Scalars["String"]>;
  only_display_unmarked_items?: Maybe<Scalars["String"]>;
  only_unavailable_videos?: Maybe<Scalars["String"]>;
  open_content?: Maybe<Scalars["String"]>;
  open_search?: Maybe<Scalars["String"]>;
  open_settings?: Maybe<Scalars["String"]>;
  order_by?: Maybe<Scalars["String"]>;
  other?: Maybe<Scalars["String"]>;
  page?: Maybe<Scalars["String"]>;
  page_not_found?: Maybe<Scalars["String"]>;
  page_order?: Maybe<Scalars["String"]>;
  pages?: Maybe<Scalars["String"]>;
  paper_texture?: Maybe<Scalars["String"]>;
  paperback?: Maybe<Scalars["String"]>;
  player_name?: Maybe<Scalars["String"]>;
  previous_content?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
  primary_language?: Maybe<Scalars["String"]>;
  pronouns?: Maybe<Scalars["String"]>;
  proofreaders?: Maybe<Scalars["String"]>;
  quality?: Maybe<Scalars["String"]>;
  read_content?: Maybe<Scalars["String"]>;
  reading_layout?: Maybe<Scalars["String"]>;
  release_date?: Maybe<Scalars["String"]>;
  release_year?: Maybe<Scalars["String"]>;
  reset_all_filters?: Maybe<Scalars["String"]>;
  reset_all_options?: Maybe<Scalars["String"]>;
  response_email_success?: Maybe<Scalars["String"]>;
  response_invalid_code?: Maybe<Scalars["String"]>;
  response_invalid_email?: Maybe<Scalars["String"]>;
  result?: Maybe<Scalars["String"]>;
  results?: Maybe<Scalars["String"]>;
  return_to?: Maybe<Scalars["String"]>;
  review?: Maybe<Scalars["String"]>;
  right_to_left?: Maybe<Scalars["String"]>;
  scan?: Maybe<Scalars["String"]>;
  scanlation?: Maybe<Scalars["String"]>;
  scanners?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  search_title?: Maybe<Scalars["String"]>;
  secondary_language?: Maybe<Scalars["String"]>;
  select_language?: Maybe<Scalars["String"]>;
  select_option_sidebar?: Maybe<Scalars["String"]>;
  send?: Maybe<Scalars["String"]>;
  settings?: Maybe<Scalars["String"]>;
  shadow?: Maybe<Scalars["String"]>;
  sharing_policy?: Maybe<Scalars["String"]>;
  shortest?: Maybe<Scalars["String"]>;
  show_primary_items?: Maybe<Scalars["String"]>;
  show_secondary_items?: Maybe<Scalars["String"]>;
  show_subitems?: Maybe<Scalars["String"]>;
  side_pages?: Maybe<Scalars["String"]>;
  single_page_view?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  source_language?: Maybe<Scalars["String"]>;
  special_pages?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  status_done?: Maybe<Scalars["String"]>;
  status_draft?: Maybe<Scalars["String"]>;
  status_incomplete?: Maybe<Scalars["String"]>;
  status_review?: Maybe<Scalars["String"]>;
  subitem?: Maybe<Scalars["String"]>;
  subitem_of?: Maybe<Scalars["String"]>;
  subitems?: Maybe<Scalars["String"]>;
  subscribers?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  switch_to_folder_view?: Maybe<Scalars["String"]>;
  switch_to_grid_view?: Maybe<Scalars["String"]>;
  table_of_contents?: Maybe<Scalars["String"]>;
  tags?: Maybe<Scalars["String"]>;
  textual?: Maybe<Scalars["String"]>;
  theme?: Maybe<Scalars["String"]>;
  thickness?: Maybe<Scalars["String"]>;
  transcribers?: Maybe<Scalars["String"]>;
  transcript_notice?: Maybe<Scalars["String"]>;
  translation_notice?: Maybe<Scalars["String"]>;
  translators?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  type_information?: Maybe<Scalars["String"]>;
  typesetters?: Maybe<Scalars["String"]>;
  ui_language?: Maybe<LanguageEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  variant?: Maybe<Scalars["String"]>;
  variant_of?: Maybe<Scalars["String"]>;
  variants?: Maybe<Scalars["String"]>;
  video?: Maybe<Scalars["String"]>;
  videos?: Maybe<Scalars["String"]>;
  view_on?: Maybe<Scalars["String"]>;
  view_scans?: Maybe<Scalars["String"]>;
  want_it?: Maybe<Scalars["String"]>;
  watch_content?: Maybe<Scalars["String"]>;
  width?: Maybe<Scalars["String"]>;
  wiki?: Maybe<Scalars["String"]>;
  wiki_description?: Maybe<Scalars["String"]>;
  wiki_short_description?: Maybe<Scalars["String"]>;
};

export type WebsiteInterfaceEntity = {
  __typename?: "WebsiteInterfaceEntity";
  attributes?: Maybe<WebsiteInterface>;
  id?: Maybe<Scalars["ID"]>;
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
  auto?: InputMaybe<StringFilterInput>;
  available_at?: InputMaybe<StringFilterInput>;
  back_matter?: InputMaybe<StringFilterInput>;
  binding?: InputMaybe<StringFilterInput>;
  book_fold?: InputMaybe<StringFilterInput>;
  calculated?: InputMaybe<StringFilterInput>;
  categories?: InputMaybe<StringFilterInput>;
  category?: InputMaybe<StringFilterInput>;
  change_language?: InputMaybe<StringFilterInput>;
  channel?: InputMaybe<StringFilterInput>;
  chronicles?: InputMaybe<StringFilterInput>;
  chronicles_description?: InputMaybe<StringFilterInput>;
  chronicles_short_description?: InputMaybe<StringFilterInput>;
  chronology?: InputMaybe<StringFilterInput>;
  cleaners?: InputMaybe<StringFilterInput>;
  combine_related_contents?: InputMaybe<StringFilterInput>;
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
  default_description?: InputMaybe<StringFilterInput>;
  definition?: InputMaybe<StringFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  details?: InputMaybe<StringFilterInput>;
  display_all_items?: InputMaybe<StringFilterInput>;
  done?: InputMaybe<StringFilterInput>;
  double_page_view?: InputMaybe<StringFilterInput>;
  draft?: InputMaybe<StringFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  email_gdpr_notice?: InputMaybe<StringFilterInput>;
  empty_folder_message?: InputMaybe<StringFilterInput>;
  folders?: InputMaybe<StringFilterInput>;
  followup_content?: InputMaybe<StringFilterInput>;
  font?: InputMaybe<StringFilterInput>;
  font_size?: InputMaybe<StringFilterInput>;
  front_matter?: InputMaybe<StringFilterInput>;
  gallery?: InputMaybe<StringFilterInput>;
  gallery_description?: InputMaybe<StringFilterInput>;
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
  items?: InputMaybe<StringFilterInput>;
  language?: InputMaybe<StringFilterInput>;
  language_switch_message?: InputMaybe<StringFilterInput>;
  languages?: InputMaybe<StringFilterInput>;
  least_popular?: InputMaybe<StringFilterInput>;
  left_to_right?: InputMaybe<StringFilterInput>;
  legality?: InputMaybe<StringFilterInput>;
  library?: InputMaybe<StringFilterInput>;
  library_description?: InputMaybe<StringFilterInput>;
  library_short_description?: InputMaybe<StringFilterInput>;
  licensing_notice?: InputMaybe<StringFilterInput>;
  light?: InputMaybe<StringFilterInput>;
  lighting?: InputMaybe<StringFilterInput>;
  listen_content?: InputMaybe<StringFilterInput>;
  longest?: InputMaybe<StringFilterInput>;
  members?: InputMaybe<StringFilterInput>;
  merch?: InputMaybe<StringFilterInput>;
  merch_description?: InputMaybe<StringFilterInput>;
  message?: InputMaybe<StringFilterInput>;
  most_popular?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  newest?: InputMaybe<StringFilterInput>;
  news?: InputMaybe<StringFilterInput>;
  news_description?: InputMaybe<StringFilterInput>;
  night_reader?: InputMaybe<StringFilterInput>;
  no_category?: InputMaybe<StringFilterInput>;
  no_results_message?: InputMaybe<StringFilterInput>;
  no_source_warning?: InputMaybe<StringFilterInput>;
  no_type?: InputMaybe<StringFilterInput>;
  no_year?: InputMaybe<StringFilterInput>;
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
  pages?: InputMaybe<StringFilterInput>;
  paper_texture?: InputMaybe<StringFilterInput>;
  paperback?: InputMaybe<StringFilterInput>;
  player_name?: InputMaybe<StringFilterInput>;
  previous_content?: InputMaybe<StringFilterInput>;
  price?: InputMaybe<StringFilterInput>;
  primary_language?: InputMaybe<StringFilterInput>;
  pronouns?: InputMaybe<StringFilterInput>;
  proofreaders?: InputMaybe<StringFilterInput>;
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
  result?: InputMaybe<StringFilterInput>;
  results?: InputMaybe<StringFilterInput>;
  return_to?: InputMaybe<StringFilterInput>;
  review?: InputMaybe<StringFilterInput>;
  right_to_left?: InputMaybe<StringFilterInput>;
  scan?: InputMaybe<StringFilterInput>;
  scanlation?: InputMaybe<StringFilterInput>;
  scanners?: InputMaybe<StringFilterInput>;
  search?: InputMaybe<StringFilterInput>;
  search_title?: InputMaybe<StringFilterInput>;
  secondary_language?: InputMaybe<StringFilterInput>;
  select_language?: InputMaybe<StringFilterInput>;
  select_option_sidebar?: InputMaybe<StringFilterInput>;
  send?: InputMaybe<StringFilterInput>;
  settings?: InputMaybe<StringFilterInput>;
  shadow?: InputMaybe<StringFilterInput>;
  sharing_policy?: InputMaybe<StringFilterInput>;
  shortest?: InputMaybe<StringFilterInput>;
  show_primary_items?: InputMaybe<StringFilterInput>;
  show_secondary_items?: InputMaybe<StringFilterInput>;
  show_subitems?: InputMaybe<StringFilterInput>;
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
  subitem?: InputMaybe<StringFilterInput>;
  subitem_of?: InputMaybe<StringFilterInput>;
  subitems?: InputMaybe<StringFilterInput>;
  subscribers?: InputMaybe<StringFilterInput>;
  summary?: InputMaybe<StringFilterInput>;
  switch_to_folder_view?: InputMaybe<StringFilterInput>;
  switch_to_grid_view?: InputMaybe<StringFilterInput>;
  table_of_contents?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<StringFilterInput>;
  textual?: InputMaybe<StringFilterInput>;
  theme?: InputMaybe<StringFilterInput>;
  thickness?: InputMaybe<StringFilterInput>;
  transcribers?: InputMaybe<StringFilterInput>;
  transcript_notice?: InputMaybe<StringFilterInput>;
  translation_notice?: InputMaybe<StringFilterInput>;
  translators?: InputMaybe<StringFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  type_information?: InputMaybe<StringFilterInput>;
  typesetters?: InputMaybe<StringFilterInput>;
  ui_language?: InputMaybe<LanguageFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  variant?: InputMaybe<StringFilterInput>;
  variant_of?: InputMaybe<StringFilterInput>;
  variants?: InputMaybe<StringFilterInput>;
  video?: InputMaybe<StringFilterInput>;
  videos?: InputMaybe<StringFilterInput>;
  view_on?: InputMaybe<StringFilterInput>;
  view_scans?: InputMaybe<StringFilterInput>;
  want_it?: InputMaybe<StringFilterInput>;
  watch_content?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<StringFilterInput>;
  wiki?: InputMaybe<StringFilterInput>;
  wiki_description?: InputMaybe<StringFilterInput>;
  wiki_short_description?: InputMaybe<StringFilterInput>;
};

export type WebsiteInterfaceInput = {
  about_us?: InputMaybe<Scalars["String"]>;
  about_us_description?: InputMaybe<Scalars["String"]>;
  accords_handbook?: InputMaybe<Scalars["String"]>;
  all?: InputMaybe<Scalars["String"]>;
  always_show_info?: InputMaybe<Scalars["String"]>;
  anchor_link_copied?: InputMaybe<Scalars["String"]>;
  archives?: InputMaybe<Scalars["String"]>;
  archives_description?: InputMaybe<Scalars["String"]>;
  audio?: InputMaybe<Scalars["String"]>;
  auto?: InputMaybe<Scalars["String"]>;
  available_at?: InputMaybe<Scalars["String"]>;
  back_matter?: InputMaybe<Scalars["String"]>;
  binding?: InputMaybe<Scalars["String"]>;
  book_fold?: InputMaybe<Scalars["String"]>;
  calculated?: InputMaybe<Scalars["String"]>;
  categories?: InputMaybe<Scalars["String"]>;
  category?: InputMaybe<Scalars["String"]>;
  change_language?: InputMaybe<Scalars["String"]>;
  channel?: InputMaybe<Scalars["String"]>;
  chronicles?: InputMaybe<Scalars["String"]>;
  chronicles_description?: InputMaybe<Scalars["String"]>;
  chronicles_short_description?: InputMaybe<Scalars["String"]>;
  chronology?: InputMaybe<Scalars["String"]>;
  cleaners?: InputMaybe<Scalars["String"]>;
  combine_related_contents?: InputMaybe<Scalars["String"]>;
  contact_us?: InputMaybe<Scalars["String"]>;
  content?: InputMaybe<Scalars["String"]>;
  content_is_not_available?: InputMaybe<Scalars["String"]>;
  contents?: InputMaybe<Scalars["String"]>;
  contents_description?: InputMaybe<Scalars["String"]>;
  contents_short_description?: InputMaybe<Scalars["String"]>;
  copy_anchor_link?: InputMaybe<Scalars["String"]>;
  copyright_notice?: InputMaybe<Scalars["String"]>;
  cover?: InputMaybe<Scalars["String"]>;
  currency?: InputMaybe<Scalars["String"]>;
  dark?: InputMaybe<Scalars["String"]>;
  default_description?: InputMaybe<Scalars["String"]>;
  definition?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  details?: InputMaybe<Scalars["String"]>;
  display_all_items?: InputMaybe<Scalars["String"]>;
  done?: InputMaybe<Scalars["String"]>;
  double_page_view?: InputMaybe<Scalars["String"]>;
  draft?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  email_gdpr_notice?: InputMaybe<Scalars["String"]>;
  empty_folder_message?: InputMaybe<Scalars["String"]>;
  folders?: InputMaybe<Scalars["String"]>;
  followup_content?: InputMaybe<Scalars["String"]>;
  font?: InputMaybe<Scalars["String"]>;
  font_size?: InputMaybe<Scalars["String"]>;
  front_matter?: InputMaybe<Scalars["String"]>;
  gallery?: InputMaybe<Scalars["String"]>;
  gallery_description?: InputMaybe<Scalars["String"]>;
  game?: InputMaybe<Scalars["String"]>;
  group?: InputMaybe<Scalars["String"]>;
  group_by?: InputMaybe<Scalars["String"]>;
  hardcover?: InputMaybe<Scalars["String"]>;
  have_it?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["String"]>;
  incomplete?: InputMaybe<Scalars["String"]>;
  item?: InputMaybe<Scalars["String"]>;
  item_not_available?: InputMaybe<Scalars["String"]>;
  items?: InputMaybe<Scalars["String"]>;
  language?: InputMaybe<Scalars["String"]>;
  language_switch_message?: InputMaybe<Scalars["String"]>;
  languages?: InputMaybe<Scalars["String"]>;
  least_popular?: InputMaybe<Scalars["String"]>;
  left_to_right?: InputMaybe<Scalars["String"]>;
  legality?: InputMaybe<Scalars["String"]>;
  library?: InputMaybe<Scalars["String"]>;
  library_description?: InputMaybe<Scalars["String"]>;
  library_short_description?: InputMaybe<Scalars["String"]>;
  licensing_notice?: InputMaybe<Scalars["String"]>;
  light?: InputMaybe<Scalars["String"]>;
  lighting?: InputMaybe<Scalars["String"]>;
  listen_content?: InputMaybe<Scalars["String"]>;
  longest?: InputMaybe<Scalars["String"]>;
  members?: InputMaybe<Scalars["String"]>;
  merch?: InputMaybe<Scalars["String"]>;
  merch_description?: InputMaybe<Scalars["String"]>;
  message?: InputMaybe<Scalars["String"]>;
  most_popular?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  newest?: InputMaybe<Scalars["String"]>;
  news?: InputMaybe<Scalars["String"]>;
  news_description?: InputMaybe<Scalars["String"]>;
  night_reader?: InputMaybe<Scalars["String"]>;
  no_category?: InputMaybe<Scalars["String"]>;
  no_results_message?: InputMaybe<Scalars["String"]>;
  no_source_warning?: InputMaybe<Scalars["String"]>;
  no_type?: InputMaybe<Scalars["String"]>;
  no_year?: InputMaybe<Scalars["String"]>;
  notes?: InputMaybe<Scalars["String"]>;
  oldest?: InputMaybe<Scalars["String"]>;
  only_display_items_i_have?: InputMaybe<Scalars["String"]>;
  only_display_items_i_want?: InputMaybe<Scalars["String"]>;
  only_display_unmarked_items?: InputMaybe<Scalars["String"]>;
  only_unavailable_videos?: InputMaybe<Scalars["String"]>;
  open_content?: InputMaybe<Scalars["String"]>;
  open_search?: InputMaybe<Scalars["String"]>;
  open_settings?: InputMaybe<Scalars["String"]>;
  order_by?: InputMaybe<Scalars["String"]>;
  other?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["String"]>;
  page_not_found?: InputMaybe<Scalars["String"]>;
  page_order?: InputMaybe<Scalars["String"]>;
  pages?: InputMaybe<Scalars["String"]>;
  paper_texture?: InputMaybe<Scalars["String"]>;
  paperback?: InputMaybe<Scalars["String"]>;
  player_name?: InputMaybe<Scalars["String"]>;
  previous_content?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["String"]>;
  primary_language?: InputMaybe<Scalars["String"]>;
  pronouns?: InputMaybe<Scalars["String"]>;
  proofreaders?: InputMaybe<Scalars["String"]>;
  quality?: InputMaybe<Scalars["String"]>;
  read_content?: InputMaybe<Scalars["String"]>;
  reading_layout?: InputMaybe<Scalars["String"]>;
  release_date?: InputMaybe<Scalars["String"]>;
  release_year?: InputMaybe<Scalars["String"]>;
  reset_all_filters?: InputMaybe<Scalars["String"]>;
  reset_all_options?: InputMaybe<Scalars["String"]>;
  response_email_success?: InputMaybe<Scalars["String"]>;
  response_invalid_code?: InputMaybe<Scalars["String"]>;
  response_invalid_email?: InputMaybe<Scalars["String"]>;
  result?: InputMaybe<Scalars["String"]>;
  results?: InputMaybe<Scalars["String"]>;
  return_to?: InputMaybe<Scalars["String"]>;
  review?: InputMaybe<Scalars["String"]>;
  right_to_left?: InputMaybe<Scalars["String"]>;
  scan?: InputMaybe<Scalars["String"]>;
  scanlation?: InputMaybe<Scalars["String"]>;
  scanners?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
  search_title?: InputMaybe<Scalars["String"]>;
  secondary_language?: InputMaybe<Scalars["String"]>;
  select_language?: InputMaybe<Scalars["String"]>;
  select_option_sidebar?: InputMaybe<Scalars["String"]>;
  send?: InputMaybe<Scalars["String"]>;
  settings?: InputMaybe<Scalars["String"]>;
  shadow?: InputMaybe<Scalars["String"]>;
  sharing_policy?: InputMaybe<Scalars["String"]>;
  shortest?: InputMaybe<Scalars["String"]>;
  show_primary_items?: InputMaybe<Scalars["String"]>;
  show_secondary_items?: InputMaybe<Scalars["String"]>;
  show_subitems?: InputMaybe<Scalars["String"]>;
  side_pages?: InputMaybe<Scalars["String"]>;
  single_page_view?: InputMaybe<Scalars["String"]>;
  size?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  source_language?: InputMaybe<Scalars["String"]>;
  special_pages?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
  status_done?: InputMaybe<Scalars["String"]>;
  status_draft?: InputMaybe<Scalars["String"]>;
  status_incomplete?: InputMaybe<Scalars["String"]>;
  status_review?: InputMaybe<Scalars["String"]>;
  subitem?: InputMaybe<Scalars["String"]>;
  subitem_of?: InputMaybe<Scalars["String"]>;
  subitems?: InputMaybe<Scalars["String"]>;
  subscribers?: InputMaybe<Scalars["String"]>;
  summary?: InputMaybe<Scalars["String"]>;
  switch_to_folder_view?: InputMaybe<Scalars["String"]>;
  switch_to_grid_view?: InputMaybe<Scalars["String"]>;
  table_of_contents?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Scalars["String"]>;
  textual?: InputMaybe<Scalars["String"]>;
  theme?: InputMaybe<Scalars["String"]>;
  thickness?: InputMaybe<Scalars["String"]>;
  transcribers?: InputMaybe<Scalars["String"]>;
  transcript_notice?: InputMaybe<Scalars["String"]>;
  translation_notice?: InputMaybe<Scalars["String"]>;
  translators?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["String"]>;
  type_information?: InputMaybe<Scalars["String"]>;
  typesetters?: InputMaybe<Scalars["String"]>;
  ui_language?: InputMaybe<Scalars["ID"]>;
  variant?: InputMaybe<Scalars["String"]>;
  variant_of?: InputMaybe<Scalars["String"]>;
  variants?: InputMaybe<Scalars["String"]>;
  video?: InputMaybe<Scalars["String"]>;
  videos?: InputMaybe<Scalars["String"]>;
  view_on?: InputMaybe<Scalars["String"]>;
  view_scans?: InputMaybe<Scalars["String"]>;
  want_it?: InputMaybe<Scalars["String"]>;
  watch_content?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["String"]>;
  wiki?: InputMaybe<Scalars["String"]>;
  wiki_description?: InputMaybe<Scalars["String"]>;
  wiki_short_description?: InputMaybe<Scalars["String"]>;
};

export type WikiPage = {
  __typename?: "WikiPage";
  categories?: Maybe<CategoryRelationResponseCollection>;
  chronology_items?: Maybe<ChronologyItemRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  definitions?: Maybe<Array<Maybe<ComponentWikiSpecializationGlossaryItem>>>;
  slug: Scalars["String"];
  tags?: Maybe<WikiPagesTagRelationResponseCollection>;
  thumbnail?: Maybe<UploadFileEntityResponse>;
  translations?: Maybe<Array<Maybe<ComponentTranslationsWiki>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  weapon?: Maybe<WeaponStoryEntityResponse>;
};

export type WikiPageCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WikiPageChronology_ItemsArgs = {
  filters?: InputMaybe<ChronologyItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WikiPageDefinitionsArgs = {
  filters?: InputMaybe<ComponentWikiSpecializationGlossaryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WikiPageTagsArgs = {
  filters?: InputMaybe<WikiPagesTagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WikiPageTranslationsArgs = {
  filters?: InputMaybe<ComponentTranslationsWikiFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WikiPageEntity = {
  __typename?: "WikiPageEntity";
  attributes?: Maybe<WikiPage>;
  id?: Maybe<Scalars["ID"]>;
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
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  chronology_items?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  definitions?: InputMaybe<Array<InputMaybe<ComponentWikiSpecializationGlossaryItemInput>>>;
  slug?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  thumbnail?: InputMaybe<Scalars["ID"]>;
  translations?: InputMaybe<Array<InputMaybe<ComponentTranslationsWikiInput>>>;
  weapon?: InputMaybe<Scalars["ID"]>;
};

export type WikiPageRelationResponseCollection = {
  __typename?: "WikiPageRelationResponseCollection";
  data: Array<WikiPageEntity>;
};

export type WikiPagesTag = {
  __typename?: "WikiPagesTag";
  createdAt?: Maybe<Scalars["DateTime"]>;
  slug: Scalars["String"];
  titles?: Maybe<Array<Maybe<ComponentTranslationsSimpleTitle>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type WikiPagesTagTitlesArgs = {
  filters?: InputMaybe<ComponentTranslationsSimpleTitleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WikiPagesTagEntity = {
  __typename?: "WikiPagesTagEntity";
  attributes?: Maybe<WikiPagesTag>;
  id?: Maybe<Scalars["ID"]>;
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
  slug?: InputMaybe<Scalars["String"]>;
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
      id?: string | null;
      attributes?: { __typename?: "Category"; name: string; short: string } | null;
    }>;
  } | null;
  type?: {
    __typename?: "ContentTypeEntityResponse";
    data?: {
      __typename?: "ContentTypeEntity";
      attributes?: {
        __typename?: "ContentType";
        slug: string;
        titles?: Array<{
          __typename?: "ComponentTranslationsSimpleTitle";
          title: string;
        } | null> | null;
      } | null;
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
      id?: string | null;
      attributes?: { __typename?: "Category"; name: string; short: string } | null;
    }>;
  } | null;
  metadata?: Array<
    | {
        __typename: "ComponentMetadataAudio";
        subtype?: {
          __typename?: "AudioSubtypeEntityResponse";
          data?: {
            __typename?: "AudioSubtypeEntity";
            attributes?: {
              __typename?: "AudioSubtype";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataBooks";
        subtype?: {
          __typename?: "TextualSubtypeEntityResponse";
          data?: {
            __typename?: "TextualSubtypeEntity";
            attributes?: {
              __typename?: "TextualSubtype";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGame";
        platforms?: {
          __typename?: "GamePlatformRelationResponseCollection";
          data: Array<{
            __typename?: "GamePlatformEntity";
            id?: string | null;
            attributes?: { __typename?: "GamePlatform"; short: string } | null;
          }>;
        } | null;
      }
    | {
        __typename: "ComponentMetadataGroup";
        subtype?: {
          __typename?: "GroupSubtypeEntityResponse";
          data?: {
            __typename?: "GroupSubtypeEntity";
            attributes?: {
              __typename?: "GroupSubtype";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
          } | null;
        } | null;
        subitems_type?: {
          __typename?: "MetadataTypeEntityResponse";
          data?: {
            __typename?: "MetadataTypeEntity";
            attributes?: {
              __typename?: "MetadataType";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
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
            attributes?: {
              __typename?: "VideoSubtype";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
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
      id?: string | null;
      attributes?: { __typename?: "Category"; short: string } | null;
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
      id?: string | null;
      attributes?: { __typename?: "Category"; name: string; short: string } | null;
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
      id?: string | null;
      attributes?: {
        __typename?: "WikiPagesTag";
        slug: string;
        titles?: Array<{
          __typename?: "ComponentTranslationsSimpleTitle";
          title: string;
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
  id?: InputMaybe<Scalars["ID"]>;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; name: string; short: string } | null;
          }>;
        } | null;
        type?: {
          __typename?: "ContentTypeEntityResponse";
          data?: {
            __typename?: "ContentTypeEntity";
            attributes?: {
              __typename?: "ContentType";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; name: string; short: string } | null;
          }>;
        } | null;
        type?: {
          __typename?: "ContentTypeEntityResponse";
          data?: {
            __typename?: "ContentTypeEntity";
            attributes?: {
              __typename?: "ContentType";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
              } | null> | null;
            } | null;
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
  id?: InputMaybe<Scalars["ID"]>;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; name: string; short: string } | null;
          }>;
        } | null;
        metadata?: Array<
          | {
              __typename: "ComponentMetadataAudio";
              subtype?: {
                __typename?: "AudioSubtypeEntityResponse";
                data?: {
                  __typename?: "AudioSubtypeEntity";
                  attributes?: {
                    __typename?: "AudioSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataBooks";
              subtype?: {
                __typename?: "TextualSubtypeEntityResponse";
                data?: {
                  __typename?: "TextualSubtypeEntity";
                  attributes?: {
                    __typename?: "TextualSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGame";
              platforms?: {
                __typename?: "GamePlatformRelationResponseCollection";
                data: Array<{
                  __typename?: "GamePlatformEntity";
                  id?: string | null;
                  attributes?: { __typename?: "GamePlatform"; short: string } | null;
                }>;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGroup";
              subtype?: {
                __typename?: "GroupSubtypeEntityResponse";
                data?: {
                  __typename?: "GroupSubtypeEntity";
                  attributes?: {
                    __typename?: "GroupSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
                } | null;
              } | null;
              subitems_type?: {
                __typename?: "MetadataTypeEntityResponse";
                data?: {
                  __typename?: "MetadataTypeEntity";
                  attributes?: {
                    __typename?: "MetadataType";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
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
                  attributes?: {
                    __typename?: "VideoSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; name: string; short: string } | null;
          }>;
        } | null;
        metadata?: Array<
          | {
              __typename: "ComponentMetadataAudio";
              subtype?: {
                __typename?: "AudioSubtypeEntityResponse";
                data?: {
                  __typename?: "AudioSubtypeEntity";
                  attributes?: {
                    __typename?: "AudioSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataBooks";
              subtype?: {
                __typename?: "TextualSubtypeEntityResponse";
                data?: {
                  __typename?: "TextualSubtypeEntity";
                  attributes?: {
                    __typename?: "TextualSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGame";
              platforms?: {
                __typename?: "GamePlatformRelationResponseCollection";
                data: Array<{
                  __typename?: "GamePlatformEntity";
                  id?: string | null;
                  attributes?: { __typename?: "GamePlatform"; short: string } | null;
                }>;
              } | null;
            }
          | {
              __typename: "ComponentMetadataGroup";
              subtype?: {
                __typename?: "GroupSubtypeEntityResponse";
                data?: {
                  __typename?: "GroupSubtypeEntity";
                  attributes?: {
                    __typename?: "GroupSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
                } | null;
              } | null;
              subitems_type?: {
                __typename?: "MetadataTypeEntityResponse";
                data?: {
                  __typename?: "MetadataTypeEntity";
                  attributes?: {
                    __typename?: "MetadataType";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
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
                  attributes?: {
                    __typename?: "VideoSubtype";
                    slug: string;
                    titles?: Array<{
                      __typename?: "ComponentTranslationsSimpleTitle";
                      title: string;
                    } | null> | null;
                  } | null;
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
  id?: InputMaybe<Scalars["ID"]>;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; short: string } | null;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; short: string } | null;
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
  id?: InputMaybe<Scalars["ID"]>;
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

export type GetWikiPageQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; name: string; short: string } | null;
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
            id?: string | null;
            attributes?: {
              __typename?: "WikiPagesTag";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
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
            id?: string | null;
            attributes?: { __typename?: "Category"; name: string; short: string } | null;
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
            id?: string | null;
            attributes?: {
              __typename?: "WikiPagesTag";
              slug: string;
              titles?: Array<{
                __typename?: "ComponentTranslationsSimpleTitle";
                title: string;
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
        id
        attributes {
          name
          short
        }
      }
    }
    type {
      data {
        attributes {
          slug
          titles(filters: { language: { code: { eq: "en" } } }) {
            title
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
        id
        attributes {
          name
          short
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
              titles(filters: { language: { code: { eq: "en" } } }) {
                title
              }
            }
          }
        }
      }
      ... on ComponentMetadataGame {
        platforms(pagination: { limit: -1 }) {
          data {
            id
            attributes {
              short
            }
          }
        }
      }
      ... on ComponentMetadataVideo {
        subtype {
          data {
            attributes {
              slug
              titles(filters: { language: { code: { eq: "en" } } }) {
                title
              }
            }
          }
        }
      }
      ... on ComponentMetadataAudio {
        subtype {
          data {
            attributes {
              slug
              titles(filters: { language: { code: { eq: "en" } } }) {
                title
              }
            }
          }
        }
      }
      ... on ComponentMetadataGroup {
        subtype {
          data {
            attributes {
              slug
              titles(filters: { language: { code: { eq: "en" } } }) {
                title
              }
            }
          }
        }
        subitems_type {
          data {
            attributes {
              slug
              titles(filters: { language: { code: { eq: "en" } } }) {
                title
              }
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
        id
        attributes {
          short
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
        id
        attributes {
          name
          short
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
        id
        attributes {
          slug
          titles(filters: { language: { code: { eq: "en" } } }) {
            language {
              data {
                attributes {
                  code
                }
              }
            }
            title
          }
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
    getWikiPage(
      variables?: GetWikiPageQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
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
      requestHeaders?: Dom.RequestInit["headers"]
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
