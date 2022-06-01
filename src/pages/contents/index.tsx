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
import { PreviewCard, TranslatedPreviewCard } from "components/PreviewCard";
import { GetContentsQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { prettyinlineTitle, prettySlug } from "helpers/formatters";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { Fragment, useEffect, useState } from "react";
import { Icon } from "components/Ico";
import { WithLabel } from "components/Inputs/WithLabel";
import { Button } from "components/Inputs/Button";
import { TextInput } from "components/Inputs/TextInput";

interface Props extends AppStaticProps {
  contents: NonNullable<GetContentsQuery["contents"]>["data"];
}

type GroupContentItems = Map<string, Immutable<Props["contents"]>>;

const defaultFiltersState = {
  groupingMethod: -1,
  keepInfoVisible: false,
  combineRelatedContent: true,
  searchName: "",
};

export default function Contents(props: Immutable<Props>): JSX.Element {
  const { langui, contents, languages } = props;

  const [groupingMethod, setGroupingMethod] = useState<number>(
    defaultFiltersState.groupingMethod
  );
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    defaultFiltersState.keepInfoVisible
  );
  const [combineRelatedContent, setCombineRelatedContent] = useState(
    defaultFiltersState.combineRelatedContent
  );
  const [searchName, setSearchName] = useState(defaultFiltersState.searchName);

  const [effectiveCombineRelatedContent, setEffectiveCombineRelatedContent] =
    useState(true);

  const [filteredItems, setFilteredItems] = useState(
    filterContents(contents, combineRelatedContent, searchName)
  );

  const [groups, setGroups] = useState<GroupContentItems>(
    getGroups(langui, groupingMethod, filteredItems)
  );

  useEffect(() => {
    if (searchName.length > 1) {
      setEffectiveCombineRelatedContent(false);
    } else {
      setEffectiveCombineRelatedContent(combineRelatedContent);
    }
    setFilteredItems(
      filterContents(contents, effectiveCombineRelatedContent, searchName)
    );
  }, [
    effectiveCombineRelatedContent,
    contents,
    searchName,
    combineRelatedContent,
  ]);

  useEffect(() => {
    setGroups(getGroups(langui, groupingMethod, filteredItems));
  }, [langui, groupingMethod, filteredItems]);

  const subPanel = (
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

      <WithLabel
        label={langui.always_show_info}
        input={<Switch setState={setKeepInfoVisible} state={keepInfoVisible} />}
      />

      {/* TODO: Add to Langui */}
      <Button
        className="mt-8"
        text={"Reset all filters"}
        icon={Icon.Replay}
        onClick={() => {
          setSearchName(defaultFiltersState.searchName);
          setGroupingMethod(defaultFiltersState.groupingMethod);
          setKeepInfoVisible(defaultFiltersState.keepInfoVisible);
          setCombineRelatedContent(defaultFiltersState.combineRelatedContent);
        }}
      />
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Large}>
      {[...groups].map(([name, items]) => (
        <Fragment key={name}>
          {items.length > 0 && (
            <Fragment>
              {name && (
                <h2
                  key={`h2${name}`}
                  className="flex flex-row place-items-center gap-2
                  pb-2 pt-10 text-2xl first-of-type:pt-0"
                >
                  {name}
                  <Chip>{`${items.reduce((currentSum, item) => {
                    if (effectiveCombineRelatedContent) {
                      if (item.attributes?.group?.data?.attributes?.combine) {
                        return (
                          currentSum +
                          (item.attributes.group.data.attributes.contents?.data
                            .length ?? 1)
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
                key={`items${name}`}
                className="grid grid-cols-2 items-end gap-8
                desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] mobile:gap-4"
              >
                {items.map((item) => (
                  <Fragment key={item.id}>
                    {item.attributes && (
                      <TranslatedPreviewCard
                        href={`/contents/${item.attributes.slug}`}
                        translations={item.attributes.translations?.map(
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
                        thumbnail={item.attributes.thumbnail?.data?.attributes}
                        thumbnailAspectRatio="3/2"
                        stackNumber={
                          effectiveCombineRelatedContent &&
                          item.attributes.group?.data?.attributes?.combine
                            ? item.attributes.group.data.attributes.contents
                                ?.data.length
                            : 0
                        }
                        topChips={
                          item.attributes.type?.data?.attributes
                            ? [
                                item.attributes.type.data.attributes.titles?.[0]
                                  ? item.attributes.type.data.attributes
                                      .titles[0]?.title
                                  : prettySlug(
                                      item.attributes.type.data.attributes.slug
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
          )}
        </Fragment>
      ))}
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle={langui.contents}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const contents = await sdk.getContents({
    language_code: context.locale ?? "en",
  });
  if (!contents.contents) return { notFound: true };
  contents.contents.data.sort((a, b) => {
    const titleA = a.attributes?.translations?.[0]
      ? prettyinlineTitle(
          a.attributes.translations[0].pre_title,
          a.attributes.translations[0].title,
          a.attributes.translations[0].subtitle
        )
      : a.attributes?.slug ?? "";
    const titleB = b.attributes?.translations?.[0]
      ? prettyinlineTitle(
          b.attributes.translations[0].pre_title,
          b.attributes.translations[0].title,
          b.attributes.translations[0].subtitle
        )
      : b.attributes?.slug ?? "";
    return titleA.localeCompare(titleB);
  });

  const props: Props = {
    ...(await getAppStaticProps(context)),
    contents: contents.contents.data,
  };
  return {
    props: props,
  };
}

function getGroups(
  langui: AppStaticProps["langui"],
  groupByType: number,
  items: Immutable<Props["contents"]>
): GroupContentItems {
  switch (groupByType) {
    case 0: {
      const group = new Map();
      group.set("Drakengard 1", []);
      group.set("Drakengard 1.3", []);
      group.set("Drakengard 2", []);
      group.set("Drakengard 3", []);
      group.set("Drakengard 4", []);
      group.set("NieR Gestalt", []);
      group.set("NieR Replicant", []);
      group.set("NieR Replicant ver.1.22474487139...", []);
      group.set("NieR:Automata", []);
      group.set("NieR Re[in]carnation", []);
      group.set("SINoALICE", []);
      group.set("Voice of Cards", []);
      group.set("Final Fantasy XIV", []);
      group.set("Thou Shalt Not Die", []);
      group.set("Bakuken", []);
      group.set("YoRHa", []);
      group.set("YoRHa Boys", []);
      group.set(langui.no_category, []);

      items.map((item) => {
        if (item.attributes?.categories?.data.length === 0) {
          group.get(langui.no_category)?.push(item);
        } else {
          item.attributes?.categories?.data.map((category) => {
            group.get(category.attributes?.name)?.push(item);
          });
        }
      });
      return group;
    }

    case 1: {
      const group = new Map();
      items.map((item) => {
        const type =
          item.attributes?.type?.data?.attributes?.titles?.[0]?.title ??
          item.attributes?.type?.data?.attributes?.slug
            ? prettySlug(item.attributes.type.data.attributes.slug)
            : langui.no_type;
        if (!group.has(type)) group.set(type, []);
        group.get(type)?.push(item);
      });
      return group;
    }

    default: {
      const group: GroupContentItems = new Map();
      group.set("", items);
      return group;
    }
  }
}

function filterContents(
  contents: Immutable<Props["contents"]>,
  combineRelatedContent: boolean,
  searchName: string
): Immutable<Props["contents"]> {
  return contents.filter((content) => {
    if (
      combineRelatedContent &&
      content.attributes?.group?.data?.attributes?.combine &&
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
}
