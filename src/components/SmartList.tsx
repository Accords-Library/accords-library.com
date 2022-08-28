import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import naturalCompare from "string-natural-compare";
import { Chip } from "./Chip";
import { PageSelector } from "./Inputs/PageSelector";
import { Ico, Icon } from "./Ico";
import { cJoin } from "helpers/className";
import { isDefined, isDefinedAndNotEmpty } from "helpers/others";
import { useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { useIs3ColumnsLayout } from "hooks/useContainerQuery";
import { useAppLayout } from "contexts/AppLayoutContext";
import { Ids } from "types/ids";

interface Group<T> {
  name: string;
  items: T[];
  totalCount: number;
}

const defaultGroupSortingFunction = <T,>(a: Group<T>, b: Group<T>) =>
  naturalCompare(a.name, b.name);
const defaultGroupCountingFunction = () => 1;
const defaultFilteringFunction = () => true;
const defaultSortingFunction = () => 0;
const defaultGroupingFunction = () => [""];

interface Props<T> {
  // Items
  items: T[];
  getItemId: (item: T) => string;
  renderItem: (props: { item: T }) => JSX.Element;
  renderWhenEmpty?: () => JSX.Element;
  // Pagination
  paginationItemPerPage?: number;
  paginationSelectorTop?: boolean;
  paginationSelectorBottom?: boolean;
  paginationScroolTop?: boolean;
  // Searching
  searchingTerm?: string;
  searchingBy?: (item: T) => string;
  searchingCaseInsensitive?: boolean;
  // Grouping
  groupingFunction?: (item: T) => string[];
  groupSortingFunction?: (a: Group<T>, b: Group<T>) => number;
  groupCountingFunction?: (item: T) => number;
  // Filtering
  filteringFunction?: (item: T) => boolean;
  // Sorting
  sortingFunction?: (a: T, b: T) => number;
  // Other
  className?: string;
}

export const SmartList = <T,>({
  items,
  getItemId,
  renderItem: RenderItem,
  renderWhenEmpty: RenderWhenEmpty,
  paginationItemPerPage = Infinity,
  paginationSelectorTop = true,
  paginationSelectorBottom = true,
  paginationScroolTop = true,
  searchingTerm,
  searchingBy,
  searchingCaseInsensitive = true,
  groupingFunction = defaultGroupingFunction,
  groupSortingFunction = defaultGroupSortingFunction,
  groupCountingFunction = defaultGroupCountingFunction,
  filteringFunction = defaultFilteringFunction,
  sortingFunction = defaultSortingFunction,
  className,
}: Props<T>): JSX.Element => {
  const [page, setPage] = useState(0);
  const { langui } = useAppLayout();
  useScrollTopOnChange(Ids.ContentPanel, [page], paginationScroolTop);
  useEffect(() => setPage(0), [searchingTerm, groupingFunction, groupSortingFunction, items]);

  const searchFilter = useCallback(() => {
    if (isDefinedAndNotEmpty(searchingTerm) && isDefined(searchingBy)) {
      if (searchingCaseInsensitive) {
        return items.filter((item) =>
          searchingBy(item).toLowerCase().includes(searchingTerm.toLowerCase())
        );
      }
      return items.filter((item) => searchingBy(item).includes(searchingTerm));
    }
    return items;
  }, [items, searchingBy, searchingCaseInsensitive, searchingTerm]);

  const filteredItems = useMemo(() => {
    const filteredBySearch = searchFilter();
    return filteredBySearch.filter(filteringFunction);
  }, [filteringFunction, searchFilter]);

  const sortedItem = useMemo(
    () => filteredItems.sort(sortingFunction),
    [filteredItems, sortingFunction]
  );

  const groups = useMemo(() => {
    const memo: Group<T>[] = [];

    sortedItem.forEach((item) => {
      groupingFunction(item).forEach((category) => {
        const index = memo.findIndex((group) => group.name === category);
        if (index === -1) {
          memo.push({
            name: category,
            items: [item],
            totalCount: groupCountingFunction(item),
          });
        } else {
          memo[index].items.push(item);
          memo[index].totalCount += groupCountingFunction(item);
        }
      });
    });
    return memo.sort(groupSortingFunction);
  }, [groupCountingFunction, groupSortingFunction, groupingFunction, sortedItem]);

  const pages = useMemo(() => {
    const memo: Group<T>[][] = [];
    let currentPage: Group<T>[] = [];
    let remainingSlots = paginationItemPerPage;
    let loopSafeguard = 1000;

    const newPage = () => {
      memo.push(currentPage);
      currentPage = [];
      remainingSlots = paginationItemPerPage;
    };

    for (const group of groups) {
      let remainingItems = group.items.length;
      while (remainingItems > 0 && loopSafeguard >= 0) {
        loopSafeguard--;
        const currentIndex = group.items.length - remainingItems;

        if (
          remainingSlots <= 0 ||
          (currentIndex === 0 &&
            remainingItems > remainingSlots &&
            remainingItems <= paginationItemPerPage)
        ) {
          newPage();
        }

        const slicedGroup: Group<T> = {
          name: group.name,
          items: group.items.slice(currentIndex, currentIndex + remainingSlots),
          totalCount: group.totalCount,
        };

        remainingItems -= slicedGroup.items.length;
        remainingSlots -= slicedGroup.items.length;
        currentPage.push(slicedGroup);
      }
    }

    if (currentPage.length > 0) {
      newPage();
    }

    return memo;
  }, [groups, paginationItemPerPage]);

  return (
    <>
      {pages.length > 1 && paginationSelectorTop && (
        <PageSelector className="mb-12" page={page} pagesCount={pages.length} onChange={setPage} />
      )}

      <div className="mb-8">
        {pages[page]?.length > 0 ? (
          pages[page]?.map(
            (group) =>
              group.items.length > 0 && (
                <Fragment key={group.name}>
                  {group.name.length > 0 && (
                    <h2
                      className="flex flex-row place-items-center gap-2 pb-2 pt-10 text-2xl
                      first-of-type:pt-0">
                      {group.name}
                      <Chip
                        text={`${group.totalCount} ${
                          group.items.length <= 1
                            ? langui.result?.toLowerCase() ?? ""
                            : langui.results?.toLowerCase() ?? ""
                        }`}
                      />
                    </h2>
                  )}
                  <div
                    className={cJoin(
                      `grid items-start gap-8 border-b-[3px] border-dotted pb-12
                      last-of-type:border-0`,
                      className
                    )}>
                    {group.items.map((item) => (
                      <RenderItem item={item} key={getItemId(item)} />
                    ))}
                  </div>
                </Fragment>
              )
          )
        ) : isDefined(RenderWhenEmpty) ? (
          <RenderWhenEmpty />
        ) : (
          <DefaultRenderWhenEmpty />
        )}
      </div>

      {pages.length > 1 && paginationSelectorBottom && (
        <PageSelector className="mb-12" page={page} pagesCount={pages.length} onChange={setPage} />
      )}
    </>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

const DefaultRenderWhenEmpty = () => {
  const is3ColumnsLayout = useIs3ColumnsLayout();
  const { langui } = useAppLayout();
  return (
    <div className="grid h-full place-content-center">
      <div
        className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40">
        {is3ColumnsLayout && <Ico icon={Icon.ChevronLeft} className="!text-[300%]" />}
        <p className="max-w-xs text-2xl">{langui.no_results_message}</p>
        {!is3ColumnsLayout && <Ico icon={Icon.ChevronRight} className="!text-[300%]" />}
      </div>
    </div>
  );
};
