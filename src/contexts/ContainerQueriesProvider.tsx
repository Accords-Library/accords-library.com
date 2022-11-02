import { atom, Getter } from "jotai";
import { atomPairing, useAtomSetter } from "helpers/atoms";
import { useOnResize } from "hooks/useOnResize";
import { Ids } from "types/ids";
import { settings } from "contexts/atoms";

type Size =
  | "2xl"
  | "2xs"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "lg"
  | "md"
  | "sm"
  | "xl"
  | "xs";

const sizes: Record<Size, number> = {
  "2xl": 42,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
  "6xl": 72,
  "7xl": 80,
  lg: 32,
  md: 28,
  sm: 24,
  xl: 36,
  xs: 19,
  "2xs": 16,
};

const isAtLeastContainerQuery = (width: number, size: Size, fontSize: number): boolean =>
  width >= sizes[size] * 16 * fontSize;

const screenWidth = atomPairing(atom(0));
const contentPanelWidth = atomPairing(atom(0));
const subPanelWidth = atomPairing(atom(0));

const screenGetter = (get: Getter, size: Size) =>
  isAtLeastContainerQuery(get(screenWidth[0]), size, get(settings.fontSize[0]));

const isScreenAtLeast2xs = atom((get) => screenGetter(get, "2xs"));
const isScreenAtLeastXs = atom((get) => screenGetter(get, "xs"));
const isScreenAtLeastSm = atom((get) => screenGetter(get, "sm"));
const isScreenAtLeastMd = atom((get) => screenGetter(get, "md"));
const isScreenAtLeastLg = atom((get) => screenGetter(get, "lg"));
const isScreenAtLeastXl = atom((get) => screenGetter(get, "xl"));
const isScreenAtLeast2xl = atom((get) => screenGetter(get, "2xl"));
const isScreenAtLeast3xl = atom((get) => screenGetter(get, "3xl"));
const isScreenAtLeast4xl = atom((get) => screenGetter(get, "4xl"));
const isScreenAtLeast5xl = atom((get) => screenGetter(get, "5xl"));
const isScreenAtLeast6xl = atom((get) => screenGetter(get, "6xl"));
const isScreenAtLeast7xl = atom((get) => screenGetter(get, "7xl"));

const is1ColumnLayout = atom((get) => !get(isScreenAtLeast5xl));
const is3ColumnsLayout = atom((get) => get(isScreenAtLeast5xl));

const contentPanelGetter = (get: Getter, size: Size) =>
  isAtLeastContainerQuery(get(contentPanelWidth[0]), size, get(settings.fontSize[0]));

const isContentPanelAtLeast2xs = atom((get) => contentPanelGetter(get, "2xs"));
const isContentPanelAtLeastXs = atom((get) => contentPanelGetter(get, "xs"));
const isContentPanelAtLeastSm = atom((get) => contentPanelGetter(get, "sm"));
const isContentPanelAtLeastMd = atom((get) => contentPanelGetter(get, "md"));
const isContentPanelAtLeastLg = atom((get) => contentPanelGetter(get, "lg"));
const isContentPanelAtLeastXl = atom((get) => contentPanelGetter(get, "xl"));
const isContentPanelAtLeast2xl = atom((get) => contentPanelGetter(get, "2xl"));
const isContentPanelAtLeast3xl = atom((get) => contentPanelGetter(get, "3xl"));
const isContentPanelAtLeast4xl = atom((get) => contentPanelGetter(get, "4xl"));
const isContentPanelAtLeast5xl = atom((get) => contentPanelGetter(get, "5xl"));
const isContentPanelAtLeast6xl = atom((get) => contentPanelGetter(get, "6xl"));
const isContentPanelAtLeast7xl = atom((get) => contentPanelGetter(get, "7xl"));

const subPanelGetter = (get: Getter, size: Size) =>
  isAtLeastContainerQuery(get(subPanelWidth[0]), size, get(settings.fontSize[0]));

const isSubPanelAtLeast2xs = atom((get) => subPanelGetter(get, "2xs"));
const isSubPanelAtLeastXs = atom((get) => subPanelGetter(get, "xs"));
const isSubPanelAtLeastSm = atom((get) => subPanelGetter(get, "sm"));
const isSubPanelAtLeastMd = atom((get) => subPanelGetter(get, "md"));
const isSubPanelAtLeastLg = atom((get) => subPanelGetter(get, "lg"));
const isSubPanelAtLeastXl = atom((get) => subPanelGetter(get, "xl"));
const isSubPanelAtLeast2xl = atom((get) => subPanelGetter(get, "2xl"));
const isSubPanelAtLeast3xl = atom((get) => subPanelGetter(get, "3xl"));
const isSubPanelAtLeast4xl = atom((get) => subPanelGetter(get, "4xl"));
const isSubPanelAtLeast5xl = atom((get) => subPanelGetter(get, "5xl"));
const isSubPanelAtLeast6xl = atom((get) => subPanelGetter(get, "6xl"));
const isSubPanelAtLeast7xl = atom((get) => subPanelGetter(get, "7xl"));

export const containerQueries = {
  is1ColumnLayout,
  is3ColumnsLayout,

  isScreenAtLeast2xs,
  isScreenAtLeastXs,
  isScreenAtLeastSm,
  isScreenAtLeastMd,
  isScreenAtLeastLg,
  isScreenAtLeastXl,
  isScreenAtLeast2xl,
  isScreenAtLeast3xl,
  isScreenAtLeast4xl,
  isScreenAtLeast5xl,
  isScreenAtLeast6xl,
  isScreenAtLeast7xl,

  isContentPanelAtLeast2xs,
  isContentPanelAtLeastXs,
  isContentPanelAtLeastSm,
  isContentPanelAtLeastMd,
  isContentPanelAtLeastLg,
  isContentPanelAtLeastXl,
  isContentPanelAtLeast2xl,
  isContentPanelAtLeast3xl,
  isContentPanelAtLeast4xl,
  isContentPanelAtLeast5xl,
  isContentPanelAtLeast6xl,
  isContentPanelAtLeast7xl,

  isSubPanelAtLeast2xs,
  isSubPanelAtLeastXs,
  isSubPanelAtLeastSm,
  isSubPanelAtLeastMd,
  isSubPanelAtLeastLg,
  isSubPanelAtLeastXl,
  isSubPanelAtLeast2xl,
  isSubPanelAtLeast3xl,
  isSubPanelAtLeast4xl,
  isSubPanelAtLeast5xl,
  isSubPanelAtLeast6xl,
  isSubPanelAtLeast7xl,
};

export const ContainerQueriesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const setScreenWidth = useAtomSetter(screenWidth);
  const setContentPanelWidth = useAtomSetter(contentPanelWidth);
  const setSubPanelWidth = useAtomSetter(subPanelWidth);

  useOnResize(Ids.Body, (width) => setScreenWidth(width));
  useOnResize(Ids.ContentPanel, (width) => setContentPanelWidth(width));
  useOnResize(Ids.SubPanel, (width) => setSubPanelWidth(width));

  return <>{children}</>;
};
