import { isDefined } from "./asserts";
import { GetLibraryItemQuery, GetLibraryItemScansQuery } from "graphql/generated";

type SortRangedContentProps =
  | NonNullable<
      NonNullable<GetLibraryItemQuery["libraryItems"]>["data"][number]["attributes"]
    >["contents"]
  | NonNullable<
      NonNullable<GetLibraryItemScansQuery["libraryItems"]>["data"][number]["attributes"]
    >["contents"];

export const sortRangedContent = (contents: SortRangedContentProps): void => {
  contents?.data.sort((a, b) => {
    if (
      a.attributes?.range[0]?.__typename === "ComponentRangePageRange" &&
      b.attributes?.range[0]?.__typename === "ComponentRangePageRange"
    ) {
      return a.attributes.range[0].starting_page - b.attributes.range[0].starting_page;
    }
    return 0;
  });
};

export const iterateMap = <K, V, U>(
  map: Map<K, V>,
  callbackfn: (key: K, value: V, index: number) => U,
  sortingFunction?: (a: [K, V], b: [K, V]) => number
): U[] => {
  const toList = [...map];
  if (isDefined(sortingFunction)) {
    toList.sort(sortingFunction);
  }
  return toList.map(([key, value], index) => callbackfn(key, value, index));
};

export const arrayMove = <T>(arr: T[], sourceIndex: number, targetIndex: number): T[] => {
  const sourceItem = arr.splice(sourceIndex, 1)[0];
  if (isDefined(sourceItem)) {
    arr.splice(targetIndex, 0, sourceItem);
  }
  return arr;
};

export const cartesianProduct = <T, U>(arrayA: T[], arrayB: U[]): [T, U][] => {
  const result: [T, U][] = [];
  arrayA.forEach((a) => arrayB.forEach((b) => result.push([a, b])));
  return result;
};

export const insertInBetweenArray = <T>(elems: T[], elemToInsert: T): T[] => {
  if (elems.length < 2) return elems;
  const elemsCopy = [...elems];
  const lastElem = elemsCopy.pop() as T;

  const result: T[] = [];
  for (const elem of elemsCopy) {
    result.push(elem, elemToInsert);
  }
  result.push(lastElem);

  return result;
};
