import { AppLayout } from "components/AppLayout";
import { NavOption } from "components/PanelComponents/NavOption";
import { PanelHeader } from "components/PanelComponents/PanelHeader";
import { SubPanel } from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";

import { GetStaticProps } from "next";
import { Icon } from "components/Ico";
import { getReadySdk } from "graphql/sdk";
import { GetWikiPagesPreviewsQuery } from "graphql/generated";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { Fragment, useMemo, useState } from "react";
import { TranslatedPreviewCard } from "components/PreviewCard";
import { HorizontalLine } from "components/HorizontalLine";
import { Button } from "components/Inputs/Button";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { WithLabel } from "components/Inputs/WithLabel";
import { useMediaHoverable } from "hooks/useMediaQuery";
import { filterHasAttributes } from "helpers/others";
import { ContentPlaceholder } from "components/PanelComponents/ContentPlaceholder";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const DEFAULT_FILTERS_STATE = {
  searchName: "",
  keepInfoVisible: true,
};

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {
  pages: NonNullable<GetWikiPagesPreviewsQuery["wikiPages"]>["data"];
}

const Wiki = ({
  langui,
  languages,
  pages,
  ...otherProps
}: Props): JSX.Element => {
  const hoverable = useMediaHoverable();

  const [searchName, setSearchName] = useState(
    DEFAULT_FILTERS_STATE.searchName
  );
  const [keepInfoVisible, setKeepInfoVisible] = useState(
    DEFAULT_FILTERS_STATE.keepInfoVisible
  );

  const filteredPages = useMemo(
    () => filterPages(pages, searchName),
    [pages, searchName]
  );

  const subPanel = useMemo(
    () => (
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
            setSearchName(DEFAULT_FILTERS_STATE.searchName);
            setKeepInfoVisible(DEFAULT_FILTERS_STATE.keepInfoVisible);
          }}
        />
        <HorizontalLine />

        <p className="mb-4 font-headers text-xl">{langui.special_pages}</p>

        <NavOption title={langui.chronology} url="/wiki/chronology" border />
      </SubPanel>
    ),
    [hoverable, keepInfoVisible, langui, searchName]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <div
          className="grid grid-cols-2 items-end gap-8
        desktop:grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))] mobile:gap-4"
        >
          {filteredPages.length === 0 && (
            <ContentPlaceholder
              message={langui.no_results_message ?? "No results"}
              icon={Icon.ChevronLeft}
            />
          )}
          {filterHasAttributes(filteredPages).map((page) => (
            <Fragment key={page.id}>
              {page.attributes.translations && (
                <TranslatedPreviewCard
                  href={`/wiki/${page.attributes.slug}`}
                  translations={page.attributes.translations.map(
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
    ),
    [filteredPages, keepInfoVisible, languages, langui]
  );

  return (
    <AppLayout
      navTitle={langui.wiki}
      subPanel={subPanel}
      contentPanel={contentPanel}
      subPanelIcon={Icon.Search}
      languages={languages}
      langui={langui}
      {...otherProps}
    />
  );
};
export default Wiki;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const pages = await sdk.getWikiPagesPreviews({});
  if (!pages.wikiPages?.data) return { notFound: true };
  const props: Props = {
    ...(await getAppStaticProps(context)),
    pages: sortPages(pages.wikiPages.data),
  };
  return {
    props: props,
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const sortPages = (pages: Props["pages"]): Props["pages"] =>
  pages.sort((a, b) => {
    const slugA = a.attributes?.slug ?? "";
    const slugB = b.attributes?.slug ?? "";
    return slugA.localeCompare(slugB);
  });

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

const filterPages = (posts: Props["pages"], searchName: string) =>
  posts.filter((post) => {
    if (searchName.length > 1) {
      if (
        post.attributes?.translations?.[0]?.title
          .toLowerCase()
          .includes(searchName.toLowerCase()) === true
      ) {
        return true;
      }
      return false;
    }
    return true;
  });
