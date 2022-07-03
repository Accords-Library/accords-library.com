import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
import { Select } from "components/Inputs/Select";
import { Switch } from "components/Inputs/Switch";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { SubPanel } from "components/Panels/SubPanel";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";
import { GetStaticProps } from "next";
import { Fragment, useState, useMemo } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { Button } from "components/Inputs/Button";
import { TextInput } from "components/Inputs/TextInput";
import { useMediaHoverable } from "hooks/useMediaQuery";
import {
  filterHasAttributes,
  iterateMap,
  mapRemoveEmptyValues,
} from "helpers/others";
import { ContentPlaceholder } from "components/PanelComponents/ContentPlaceholder";
import { GetContentsQuery } from "graphql/generated";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  groupingMethod: -1,
  keepInfoVisible: false,
  combineRelatedContent: true,
  searchName: "",
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {
  contents: NonNullable<GetContentsQuery["contents"]>["data"];
}

const Contents = ({
  langui,
  contents,
  languages,
  ...otherProps
}: Props): JSX.Element => {
  const hoverable = useMediaHoverable();

  const [groupingMethod, setGroupingMethod] = useState<number>(
    DEFAULT_FILTERS_STATE.groupingMethod
  );
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    DEFAULT_FILTERS_STATE.keepInfoVisible
  );
  const [combineRelatedContent, setCombineRelatedContent] = useState(
    DEFAULT_FILTERS_STATE.combineRelatedContent
  );
  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );

  const effectiveCombineRelatedContent = useMemo(
    () => (searchName.length > 1 ? false : combineRelatedContent),
    [combineRelatedContent, searchName.length]
  );

  const filteredItems = useMemo(
    () => filterContents(contents, effectiveCombineRelatedContent, searchName),
    [effectiveCombineRelatedContent, contents, searchName]
  );

  const groups = useMemo(
    () => getGroups(langui, groupingMethod, filteredItems),
    [langui, groupingMethod, filteredItems]
  );

  const subPanel = useMemo(
    () => (
      <SubPanel>
        <PanelHeader
          icon={Icon.Workspaces}
          title={langui.contents}
          description={langui.contents_description}
        />

        <TextInput
          className="mb-6 w-full"
          placeholder={langui.search_title ?? undefined}
          state={searchName}
          setState={setSearchName}
        />

        <WithLabel
          label={langui.group_by}
          input={
            <Select
              className="w-full"
              options={[langui.category ?? "", langui.type ?? ""]}
              state={groupingMethod}
              setState={setGroupingMethod}
              allowEmpty
            />
          }
        />

        <WithLabel
          label={langui.combine_related_contents}
          disabled={searchName.length > 1}
          input={
            <Switch
              setState={setCombineRelatedContent}
              state={effectiveCombineRelatedContent}
            />
          }
        />

        {hoverable && (
          <WithLabel
            label={langui.always_show_info}
            input={
              <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
            }
          />
        )}

        <Button
          className="mt-8"
          text={langui.reset_all_filters}
          icon={Icon.Replay}
          onClick={() => {
            setSearchName(DEFAULT_FILTERS_STATE.searchName);
            setGroupingMethod(DEFAULT_FILTERS_STATE.groupingMethod);
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
            setCombineRelatedContent(
              DEFAULT_FILTERS_STATE.combineRelatedContent
            );
          }}
        />
      </SubPanel>
    ),
    [
      effectiveCombineRelatedContent,
      groupingMethod,
      hoverable,
      keepInfoVisible,
      langui,
      searchName,
    ]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        {groups.size === 0 && (
          <ContentPlaceholder
            message={langui.no_results_message ?? "No results"}
            icon={Icon.ChevronLeft}
          />
        )}
        {iterateMap(
          groups,
          (name, items, index) =>
            items.length > 0 && (
              <Fragment key={index}>
                {name && (
                  <h2
                    className="flex flex-row place-items-center gap-2 pb-2 pt-10 text-2xl
                first-of-type:pt-0"
                  >
                    {name}
                    <Chip>{`${items.reduce((currentSum, item) => {
                      if (effectiveCombineRelatedContent) {
                        if (
                          item.attributes?.group?.data?.attributes?.combine ===
                          true
                        ) {
                          return (
                            currentSum +
                            (item.attributes.group.data.attributes.contents
                              ?.data.length ?? 1)
                          );
                        }
                      }
                      return currentSum + 1;
                    }, 0)} ${
                      items.length <= 1
                        ? langui.result?.toLowerCase() ?? ""
                        : langui.results?.toLowerCase() ?? ""
                    }`}</Chip>
                  </h2>
                )}

                <div
                  className="grid grid-cols-2 items-end gap-8
                desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] mobile:gap-4"
                >
                  {filterHasAttributes(items).map((item) => (
                    <Fragment key={item.id}>
                      {item.attributes.translations && (
                        <TranslatedPreviewCard
                          href={`/contents/${item.attributes.slug}`}
                          translations={item.attributes.translations.map(
                            (translation) => ({
                              pre_title: translation?.pre_title,
                              title: translation?.title,
                              subtitle: translation?.subtitle,
                              language:
                                translation?.language?.data?.attributes?.code,
                            })
                          )}
                          slug={item.attributes.slug}
                          languages={languages}
                          thumbnail={
                            item.attributes.thumbnail?.data?.attributes
                          }
                          thumbnailAspectRatio="3/2"
                          thumbnailForceAspectRatio
                          stackNumber={
                            effectiveCombineRelatedContent &&
                            item.attributes.group?.data?.attributes?.combine ===
                              true
                              ? item.attributes.group.data.attributes.contents
                                  ?.data.length
                              : 0
                          }
                          topChips={
                            item.attributes.type?.data?.attributes
                              ? [
                                  item.attributes.type.data.attributes
                                    .titles?.[0]
                                    ? item.attributes.type.data.attributes
                                        .titles[0]?.title
                                    : prettySlug(
                                        item.attributes.type.data.attributes
                                          .slug
                                      ),
                                ]
                              : undefined
                          }
                          bottomChips={item.attributes.categories?.data.map(
                            (category) => category.attributes?.short ?? ""
                          )}
                          keepInfoVisible={keepInfoVisible}
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            )
        )}
      </ContentPanel>
    ),
    [effectiveCombineRelatedContent, groups, keepInfoVisible, languages, langui]
  );

  return (
    <AppLayout
      navTitle={langui.contents}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Contents;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const contents = await sdk.getContents({
    language_code: context.locale ?? "en",
  });
  if (!contents.contents) return { notFound: true };
  contents.contents.data.sort((a, b) => {
    const titleA = a.attributes?.slug ?? "";
    const titleB = b.attributes?.slug ?? "";
    return titleA.localeCompare(titleB);
  });

  const props: Props = {
    ...(await getAppStaticProps(context)),
    contents: contents.contents.data,
  };
  return {
    props: props,
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

type GroupContentItems = Map<string, Props["contents"]>;

export const getGroups = (
  langui: AppStaticProps["langui"],
  groupByType: number,
  items: Props["contents"]
): GroupContentItems => {
  const groups: GroupContentItems = new Map();

  switch (groupByType) {
    case 0: {
      const noCategory = langui.no_category ?? "No category";
      groups.set("Drakengard 1", []);
      groups.set("Drakengard 1.3", []);
      groups.set("Drakengard 2", []);
      groups.set("Drakengard 3", []);
      groups.set("Drakengard 4", []);
      groups.set("NieR Gestalt", []);
      groups.set("NieR Replicant", []);
      groups.set("NieR Replicant ver.1.22474487139...", []);
      groups.set("NieR:Automata", []);
      groups.set("NieR Re[in]carnation", []);
      groups.set("SINoALICE", []);
      groups.set("Voice of Cards", []);
      groups.set("Final Fantasy XIV", []);
      groups.set("Thou Shalt Not Die", []);
      groups.set("Bakuken", []);
      groups.set("YoRHa", []);
      groups.set("YoRHa Boys", []);
      groups.set(noCategory, []);

      items.map((item) => {
        if (item.attributes?.categories?.data.length === 0) {
          groups.get(noCategory)?.push(item);
        } else {
          item.attributes?.categories?.data.map((category) => {
            groups.get(category.attributes?.name ?? noCategory)?.push(item);
          });
        }
      });
      break;
    }

    case 1: {
      items.map((item) => {
        const noType = langui.no_type ?? "No type";
        const type =
          item.attributes?.type?.data?.attributes?.titles?.[0]?.title ??
          item.attributes?.type?.data?.attributes?.slug
            ? prettySlug(item.attributes.type.data.attributes.slug)
            : langui.no_type;
        if (!groups.has(type ?? noType)) groups.set(type ?? noType, []);
        groups.get(type ?? noType)?.push(item);
      });
      break;
    }

    default: {
      groups.set("", items);
    }
  }
  return mapRemoveEmptyValues(groups);
};

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const filterContents = (
  contents: Props["contents"],
  combineRelatedContent: boolean,
  searchName: string
): Props["contents"] =>
  contents.filter((content) => {
    if (
      combineRelatedContent &&
      content.attributes?.group?.data?.attributes?.combine === true &&
      content.attributes.group.data.attributes.contents?.data[0].id !==
        content.id
    ) {
      return false;
    }
    if (searchName.length > 1) {
      if (
        content.attributes?.translations?.find((translation) =>
          prettyinlineTitle(
            translation?.pre_title,
            translation?.title,
            translation?.subtitle
          )
            .toLowerCase()
            .includes(searchName.toLowerCase())
        )
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
