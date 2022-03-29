import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import LibraryContentPreview from "components/Library/LibraryContentPreview";
import PanelHeader from "components/PanelComponents/PanelHeader";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import Select from "components/Select";
import { getContents } from "graphql/operations";
import {
  GetContentsQuery,
  GetWebsiteInterfaceQuery,
} from "graphql/operations-types";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { prettyinlineTitle, prettySlug } from "queries/helpers";
import { useEffect, useState } from "react";

interface ContentsProps extends AppStaticProps {
  contents: GetContentsQuery["contents"]["data"];
}

type GroupContentItems = Map<string, GetContentsQuery["contents"]["data"]>;

export default function Contents(props: ContentsProps): JSX.Element {
  const { langui, contents } = props;

  const [groupingMethod, setGroupingMethod] = useState<number>(-1);

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
          options={[langui.category, langui.type]}
          state={groupingMethod}
          setState={setGroupingMethod}
          allowEmpty
        />
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
                      ? langui.result.toLowerCase()
                      : langui.results.toLowerCase()
                  }`}</Chip>
                </h2>
              )}
              <div
                key={`items${name}`}
                className="grid gap-8 items-end grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))]"
              >
                {items.map((item) => (
                  <LibraryContentPreview key={item.id} item={item.attributes} />
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
): Promise<{ notFound: boolean } | { props: ContentsProps }> {
  const contents = (
    await getContents({
      language_code: context.locale ?? "en",
    })
  ).contents.data;

  contents.sort((a, b) => {
    const titleA =
      a.attributes.titles.length > 0
        ? prettyinlineTitle(
            a.attributes.titles[0].pre_title,
            a.attributes.titles[0].title,
            a.attributes.titles[0].subtitle
          )
        : a.attributes.slug;
    const titleB =
      b.attributes.titles.length > 0
        ? prettyinlineTitle(
            b.attributes.titles[0].pre_title,
            b.attributes.titles[0].title,
            b.attributes.titles[0].subtitle
          )
        : b.attributes.slug;
    return titleA.localeCompare(titleB);
  });

  const props: ContentsProps = {
    ...(await getAppStaticProps(context)),
    contents: contents,
  };
  return {
    props: props,
  };
}

function getGroups(
  langui: GetWebsiteInterfaceQuery["websiteInterfaces"]["data"][number]["attributes"],
  groupByType: number,
  items: ContentsProps["contents"]
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
        if (item.attributes.categories.data.length === 0) {
          group.get(langui.no_category)?.push(item);
        } else {
          item.attributes.categories.data.map((category) => {
            group.get(category.attributes.name)?.push(item);
          });
        }
      });
      return group;
    }

    case 1: {
      const group: GroupContentItems = new Map();
      items.map((item) => {
        const type =
          item.attributes.type.data.attributes.titles.length > 0
            ? item.attributes.type.data.attributes.titles[0].title
            : prettySlug(item.attributes.type.data.attributes.slug);

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
