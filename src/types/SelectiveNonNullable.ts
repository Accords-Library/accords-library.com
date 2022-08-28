/* eslint-disable @typescript-eslint/no-unused-vars */

type JoinDot<K extends string, P extends string> = `${K}${"" extends K
  ? ""
  : "."}${P}`;

export type PathDot<T, Acc extends string = ""> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? JoinDot<Acc, K> | PathDot<T[K], JoinDot<Acc, K>>
        : never;
    }[keyof T]
  : Acc;

type PathHead<T extends unknown[]> = T extends [infer head]
  ? head
  : T extends [infer head, ...infer rest]
  ? head
  : "";

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

type Split<
  Str,
  Acc extends string[] = []
> = Str extends `${infer Head}.${infer Rest}`
  ? Split<Rest, [...Acc, Head]>
  : Str extends `${infer Last}`
  ? [...Acc, Last]
  : never;

export type SelectiveNonNullable<T, P extends PathDot<T>> = Recursive<
  NonNullable<T>,
  Split<P>
>;
