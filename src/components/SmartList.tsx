import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Chip } from "./Chip";
import { PageSelector } from "./Inputs/PageSelector";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { cJoin } from "helpers/className";
import { isDefined, isDefinedAndNotEmpty, iterateMap } from "helpers/others";
import { AnchorIds, useScrollTopOnChange } from "hooks/useScrollTopOnChange";

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
  groupSortingFunction?: (a: string, b: string) => number;
  // Filtering
  filteringFunction?: (item: T) => boolean;
  // Sorting
  sortingFunction?: (a: T, b: T) => number;
  // Other
  className?: string;
  langui: AppStaticProps["langui"];
}

export const SmartList = <T,>({
  items,
  getItemId,
  renderItem: RenderItem,
  renderWhenEmpty: RenderWhenEmpty,
  paginationItemPerPage = 0,
  paginationSelectorTop = true,
  paginationSelectorBottom = true,
  paginationScroolTop = true,
  searchingTerm,
  searchingBy,
  searchingCaseInsensitive = true,
  groupingFunction = () => [""],
  groupSortingFunction = (a, b) => a.localeCompare(b),
  filteringFunction = () => true,
  sortingFunction = () => 0,
  className,
  langui,
}: Props<T>): JSX.Element => {
  const [page, setPage] = useState(0);
  useScrollTopOnChange(AnchorIds.ContentPanel, [page], paginationScroolTop);

  type Group = Map<string, T[]>;

  useEffect(() => setPage(0), [searchingTerm]);

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

  const paginatedItems = useMemo(() => {
    if (paginationItemPerPage > 0) {
      const memo = [];
      for (
        let index = 0;
        paginationItemPerPage * index < sortedItem.length;
        index++
      ) {
        memo.push(
          sortedItem.slice(
            index * paginationItemPerPage,
            (index + 1) * paginationItemPerPage
          )
        );
      }
      return memo;
    }
    return [sortedItem];
  }, [paginationItemPerPage, sortedItem]);

  const groupedList = useMemo(() => {
    const groups: Group = new Map();
    paginatedItems[page]?.forEach((item) => {
      groupingFunction(item).forEach((category) => {
        if (groups.has(category)) {
          groups.get(category)?.push(item);
        } else {
          groups.set(category, [item]);
        }
      });
    });
    return groups;
  }, [groupingFunction, page, paginatedItems]);

  const pageCount = useMemo(
    () =>
      paginationItemPerPage > 0
        ? Math.floor(filteredItems.length / paginationItemPerPage)
        : 1,
    [paginationItemPerPage, filteredItems.length]
  );

  return (
    <>
      {pageCount > 1 && paginationSelectorTop && (
        <PageSelector
          maxPage={pageCount}
          page={page}
          setPage={setPage}
          className="mb-12"
        />
      )}

      {groupedList.size > 0
        ? iterateMap(
            groupedList,
            (name, groupItems) =>
              groupItems.length > 0 && (
                <Fragment key={name}>
                  {name.length > 0 && (
                    <h2
                      className="flex flex-row place-items-center gap-2 pb-2 pt-10 text-2xl
                first-of-type:pt-0"
                    >
                      {name}
                      <Chip>{`${groupItems.length} ${
                        groupItems.length <= 1
                          ? langui.result?.toLowerCase() ?? ""
                          : langui.results?.toLowerCase() ?? ""
                      }`}</Chip>
                    </h2>
                  )}
                  <div
                    className={cJoin(
                      `grid items-start gap-8 border-b-[3px] border-dotted pb-12
                      last-of-type:border-0 mobile:gap-4`,
                      className
                    )}
                  >
                    {groupItems.map((item) => (
                      <RenderItem item={item} key={getItemId(item)} />
                    ))}
                  </div>
                </Fragment>
              ),
            ([a], [b]) => groupSortingFunction(a, b)
          )
        : isDefined(RenderWhenEmpty) && <RenderWhenEmpty />}

      {pageCount > 1 && paginationSelectorBottom && (
        <PageSelector
          maxPage={pageCount}
          page={page}
          setPage={setPage}
          className="mt-12"
        />
      )}
    </>
  );
};
