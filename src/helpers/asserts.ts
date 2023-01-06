type JoinDot<K extends string, P extends string> = `${K}${"" extends K ? "" : "."}${P}`;

type PathDot<T, Acc extends string = ""> = T extends object
  ? {
      [K in keyof T]: K extends string ? JoinDot<Acc, K> | PathDot<T[K], JoinDot<Acc, K>> : never;
    }[keyof T]
  : Acc;

type PathHead<T extends unknown[]> = T extends [infer head]
  ? head
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends [infer head, ...infer rest]
  ? head
  : "";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PathRest<T extends unknown[]> = T extends [infer head, ...infer rest]
  ? rest extends []
    ? never
    : rest
  : never;

type PathLast<T extends unknown[]> = T["length"] extends 1 ? true : false;

type Recursive<T, Path extends unknown[]> = PathHead<Path> extends keyof T
  ? Omit<T, PathHead<Path>> & {
      [P in PathHead<Path>]-?: PathLast<Path> extends true
        ? NonNullable<T[P]>
        : Recursive<NonNullable<T[P]>, PathRest<Path>>;
    }
  : T;

type Split<Str, Acc extends string[] = []> = Str extends `${infer Head}.${infer Rest}`
  ? Split<Rest, [...Acc, Head]>
  : Str extends `${infer Last}`
  ? [...Acc, Last]
  : never;

type SelectiveNonNullable<T, P extends PathDot<T>> = Recursive<NonNullable<T>, Split<P>>;

export const isDefined = <T>(t: T): t is NonNullable<T> => t !== null && t !== undefined;

export const isUndefined = <T>(t: T | null | undefined): t is null | undefined => !isDefined(t);

export const isDefinedAndNotEmpty = (string: string | null | undefined): string is string =>
  isDefined(string) && string.length > 0;

export const filterDefined = <T>(t: T[] | null | undefined): NonNullable<T>[] =>
  isUndefined(t) ? [] : (t.filter((item) => isDefined(item)) as NonNullable<T>[]);

export const filterHasAttributes = <T, P extends PathDot<T>>(
  t: T[] | null | undefined,
  paths: readonly P[]
): SelectiveNonNullable<T, typeof paths[number]>[] =>
  isDefined(t)
    ? (t.filter((item) => hasAttributes(item, paths)) as unknown as SelectiveNonNullable<
        T,
        typeof paths[number]
      >[])
    : [];

const hasAttributes = <T>(item: T, paths: readonly PathDot<T>[]): boolean =>
  isDefined(item) && paths.every((path) => hasAttribute(item, path));

const hasAttribute = <T>(item: T, path: string): boolean => {
  if (isDefined(item)) {
    const [head, ...rest] = path.split(".");
    if (isDefined(head) && Object.keys(item).includes(head)) {
      const attribute = head as keyof T;
      if (isDefined(item[attribute])) {
        if (rest.length > 0) {
          return hasAttribute(item[attribute], rest.join("."));
        }
        return true;
      }
    }
  }
  return false;
};
