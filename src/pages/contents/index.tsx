import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import Select from "components/Inputs/Select";
import Switch from "components/Inputs/Switch";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ThumbnailPreview from "components/PreviewCard";
import { GetContentsQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";
import { useEffect, useState } from "react";
import { prettySlug, prettyinlineTitle } from "helpers/formatters";

interface Props extends AppStaticProps {
  contents: Exclude<GetContentsQuery["contents"], null | undefined>["data"];
}

type GroupContentItems = Map<string, Props["contents"]>;

export default function Contents(props: Props): JSX.Element {
  const { langui, contents } = props;

  const [groupingMethod, setGroupingMethod] = useState<number>(-1);
  const [keepInfoVisible, setKeepInfoVisible] = useState(false);

  const [groups, setGroups] = useState<GroupContentItems>(
    getGroups(langui, groupingMethod, contents)
  );

  useEffect(() => {
    setGroups(getGroups(langui, groupingMethod, contents));
  }, [langui, groupingMethod, contents]);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="workspaces"
        title={langui.contents}
        description={langui.contents_description}
      />

      <div className="flex flex-row gap-2 place-items-center">
        <p className="flex-shrink-0">{langui.group_by}:</p>
        <Select
          className="w-full"
          options={[langui.category ?? "", langui.type ?? ""]}
          state={groupingMethod}
          setState={setGroupingMethod}
          allowEmpty
        />
      </div>

      <div className="flex flex-row gap-2 place-items-center coarse:hidden">
        <p className="flex-shrink-0">{"Always show info"}:</p>
        <Switch setState={setKeepInfoVisible} state={keepInfoVisible} />
      </div>
    </SubPanel>
  );
  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      {[...groups].map(([name, items]) => (
        <>
          {items.length > 0 && (
            <>
              {name && (
                <h2
                  key={`h2${name}`}
                  className="text-2xl pb-2 pt-10 first-of-type:pt-0 flex flex-row place-items-center gap-2"
                >
                  {name}
                  <Chip>{`${items.length} ${
                    items.length <= 1
                      ? langui.result?.toLowerCase() ?? ""
                      : langui.results?.toLowerCase() ?? ""
                  }`}</Chip>
                </h2>
              )}
              <div
                key={`items${name}`}
                className="grid gap-8 items-end grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
              >
                {items.map((item) => (
                  <>
                    {item.attributes && (
                      <ThumbnailPreview
                        key={item.id}
                        href={`/contents/${item.attributes.slug}`}
                        pre_title={item.attributes.titles?.[0]?.pre_title}
                        title={
                          item.attributes.titles?.[0]?.title ??
                          prettySlug(item.attributes.slug)
                        }
                        subtitle={item.attributes.titles?.[0]?.subtitle}
                        thumbnail={item.attributes.thumbnail?.data?.attributes}
                        thumbnailAspectRatio="3/2"
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
                  </>
                ))}
              </div>
            </>
          )}
        </>
      ))}
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle={langui.contents}
      subPanel={subPanel}
      contentPanel={contentPanel}
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
    const titleA = a.attributes?.titles?.[0]
      ? prettyinlineTitle(
          a.attributes.titles[0].pre_title,
          a.attributes.titles[0].title,
          a.attributes.titles[0].subtitle
        )
      : a.attributes?.slug ?? "";
    const titleB = b.attributes?.titles?.[0]
      ? prettyinlineTitle(
          b.attributes.titles[0].pre_title,
          b.attributes.titles[0].title,
          b.attributes.titles[0].subtitle
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
  items: Props["contents"]
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
      const group: GroupContentItems = new Map();
      items.map((item) => {
        const type =
          item.attributes?.type?.data?.attributes?.titles?.[0]?.title ??
          prettySlug(item.attributes?.type?.data?.attributes?.slug);
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
