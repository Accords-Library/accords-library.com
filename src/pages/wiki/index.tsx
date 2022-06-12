import { AppLayout } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { Icon } from "components/Ico";
import { getReadySdk } from "graphql/sdk";
import { GetWikiPagesPreviewsQuery } from "graphql/generated";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { Fragment, useEffect, useState } from "react";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { useMediaHoverable } from "hooks/useMediaQuery";

interface Props extends AppStaticProps {
  pages: NonNullable<GetWikiPagesPreviewsQuery["wikiPages"]>["data"];
}

const defaultFiltersState = {
  searchName: "",
  keepInfoVisible: true,
};

export default function Wiki(props: Immutable<Props>): JSX.Element {
  const { langui, languages } = props;
  const pages = sortPages(props.pages);
  const hoverable = useMediaHoverable();

  const [searchName, setSearchName] = useState(defaultFiltersState.searchName);
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    defaultFiltersState.keepInfoVisible
  );

  const [filteredPages, setFilteredPages] = useState(
    filterPages(pages, searchName)
  );

  useEffect(() => {
    setFilteredPages(filterPages(pages, searchName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon={Icon.TravelExplore}
        title={langui.wiki}
        description={langui.wiki_description}
      />

      <TextInput
        className="mb-6 w-full"
        placeholder={langui.search_title ?? undefined}
        state={searchName}
        setState={setSearchName}
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
          setSearchName(defaultFiltersState.searchName);
          setKeepInfoVisible(defaultFiltersState.keepInfoVisible);
        }}
      />
      <HorizontalLine />

      {/* TODO: Langui */}
      <p className="mb-4 font-headers text-xl">Special Pages</p>

      <NavOption title={langui.chronology} url="/wiki/chronology" border />
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Large}>
      <div
        className="grid grid-cols-2 items-end gap-8
        desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))] mobile:gap-4"
      >
        {filteredPages.map((page) => (
          <Fragment key={page.id}>
            {page.attributes && (
              <TranslatedPreviewCard
                href={`/wiki/${page.attributes.slug}`}
                translations={page.attributes.translations?.map(
                  (translation) => ({
                    title: translation?.title,
                    description: translation?.summary,
                    language: translation?.language?.data?.attributes?.code,
                  })
                )}
                thumbnail={page.attributes.thumbnail?.data?.attributes}
                thumbnailAspectRatio={"4/3"}
                thumbnailRounded
                thumbnailForceAspectRatio
                languages={languages}
                slug={page.attributes.slug}
                keepInfoVisible={keepInfoVisible}
                bottomChips={page.attributes.categories?.data.map(
                  (category) => category.attributes?.short ?? ""
                )}
              />
            )}
          </Fragment>
        ))}
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={langui.wiki}
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
  const pages = await sdk.getWikiPagesPreviews({});
  if (!pages.wikiPages?.data) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    pages: pages.wikiPages.data,
  };
  return {
    props: props,
  };
}

function sortPages(
  pages: Immutable<Props["pages"]>
): Immutable<Props["pages"]> {
  const sortedPages = [...pages] as Props["pages"];
  sortedPages.sort((a, b) => {
    const slugA = a.attributes?.slug ?? "";
    const slugB = b.attributes?.slug ?? "";
    return slugA.localeCompare(slugB);
  });
  return sortedPages as Immutable<Props["pages"]>;
}

function filterPages(posts: Immutable<Props["pages"]>, searchName: string) {
  return [...posts].filter((post) => {
    if (searchName.length > 1) {
      if (
        post.attributes?.translations?.[0]?.title
          .toLowerCase()
          .includes(searchName.toLowerCase())
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
}
