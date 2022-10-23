import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useUserSettings } from "./UserSettingsContext";
import { useOnResize } from "hooks/useOnResize";
import { Ids } from "types/ids";
import { RequiredNonNullable } from "types/types";

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

type ContainerQueriesContainers = "contentPanel" | "screen" | "subPanel";

type ContainerQueriesKeys =
  | "is1ColumnLayout"
  | "is3ColumnsLayout"
  | `is${Capitalize<ContainerQueriesContainers>}AtLeast${Capitalize<Size>}`;

type ContainerQueriesState = Record<ContainerQueriesKeys, boolean>;

const initialState: RequiredNonNullable<ContainerQueriesState> = {
  is1ColumnLayout: false,
  is3ColumnsLayout: false,
  isContentPanelAtLeast2xl: false,
  isContentPanelAtLeast2xs: false,
  isContentPanelAtLeast3xl: false,
  isContentPanelAtLeast4xl: false,
  isContentPanelAtLeast5xl: false,
  isContentPanelAtLeast6xl: false,
  isContentPanelAtLeast7xl: false,
  isContentPanelAtLeastLg: false,
  isContentPanelAtLeastMd: false,
  isContentPanelAtLeastSm: false,
  isContentPanelAtLeastXl: false,
  isContentPanelAtLeastXs: false,
  isScreenAtLeast2xl: false,
  isScreenAtLeast2xs: false,
  isScreenAtLeast3xl: false,
  isScreenAtLeast4xl: false,
  isScreenAtLeast5xl: false,
  isScreenAtLeast6xl: false,
  isScreenAtLeast7xl: false,
  isScreenAtLeastLg: false,
  isScreenAtLeastMd: false,
  isScreenAtLeastSm: false,
  isScreenAtLeastXl: false,
  isScreenAtLeastXs: false,
  isSubPanelAtLeast2xl: false,
  isSubPanelAtLeast2xs: false,
  isSubPanelAtLeast3xl: false,
  isSubPanelAtLeast4xl: false,
  isSubPanelAtLeast5xl: false,
  isSubPanelAtLeast6xl: false,
  isSubPanelAtLeast7xl: false,
  isSubPanelAtLeastLg: false,
  isSubPanelAtLeastMd: false,
  isSubPanelAtLeastSm: false,
  isSubPanelAtLeastXl: false,
  isSubPanelAtLeastXs: false,
};

const ContainerQueriesContext = createContext<ContainerQueriesState>(initialState);

export const useContainerQueries = (): ContainerQueriesState => useContext(ContainerQueriesContext);

interface Props {
  children: ReactNode;
}

export const ContainerQueriesContextProvider = ({ children }: Props): JSX.Element => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [contentPanelWidth, setContentPanelWidth] = useState(0);
  const [subPanelWidth, setSubPanelWidth] = useState(0);

  useOnResize(Ids.Body, (width) => setScreenWidth(width));
  useOnResize(Ids.ContentPanel, (width) => setContentPanelWidth(width));
  useOnResize(Ids.SubPanel, (width) => setSubPanelWidth(width));

  const { fontSize } = useUserSettings();

  const screenAtLeasts = useMemo(
    () => ({
      isScreenAtLeast2xs: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("2xs")
      ),
      isScreenAtLeastXs: applyContainerQuery(fontSize, screenWidth, createAtLeastMediaQuery("xs")),
      isScreenAtLeastSm: applyContainerQuery(fontSize, screenWidth, createAtLeastMediaQuery("sm")),
      isScreenAtLeastMd: applyContainerQuery(fontSize, screenWidth, createAtLeastMediaQuery("md")),
      isScreenAtLeastLg: applyContainerQuery(fontSize, screenWidth, createAtLeastMediaQuery("lg")),
      isScreenAtLeastXl: applyContainerQuery(fontSize, screenWidth, createAtLeastMediaQuery("xl")),
      isScreenAtLeast2xl: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("2xl")
      ),
      isScreenAtLeast3xl: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("3xl")
      ),
      isScreenAtLeast4xl: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("4xl")
      ),
      isScreenAtLeast5xl: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("5xl")
      ),
      isScreenAtLeast6xl: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("6xl")
      ),
      isScreenAtLeast7xl: applyContainerQuery(
        fontSize,
        screenWidth,
        createAtLeastMediaQuery("7xl")
      ),
    }),
    [screenWidth, fontSize]
  );

  const columnLayouts = useMemo(
    () => ({
      is1ColumnLayout: !screenAtLeasts.isScreenAtLeast5xl,
      is3ColumnsLayout: screenAtLeasts.isScreenAtLeast5xl,
    }),
    [screenAtLeasts.isScreenAtLeast5xl]
  );

  const subPanelAtLeasts = useMemo(
    () => ({
      isSubPanelAtLeast2xs: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("2xs")
      ),
      isSubPanelAtLeastXs: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("xs")
      ),
      isSubPanelAtLeastSm: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("sm")
      ),
      isSubPanelAtLeastMd: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("md")
      ),
      isSubPanelAtLeastLg: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("lg")
      ),
      isSubPanelAtLeastXl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("xl")
      ),
      isSubPanelAtLeast2xl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("2xl")
      ),
      isSubPanelAtLeast3xl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("3xl")
      ),
      isSubPanelAtLeast4xl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("4xl")
      ),
      isSubPanelAtLeast5xl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("5xl")
      ),
      isSubPanelAtLeast6xl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("6xl")
      ),
      isSubPanelAtLeast7xl: applyContainerQuery(
        fontSize,
        subPanelWidth,
        createAtLeastMediaQuery("7xl")
      ),
    }),
    [subPanelWidth, fontSize]
  );

  const contentPanelAtLeasts = useMemo(
    () => ({
      isContentPanelAtLeast2xs: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("2xs")
      ),
      isContentPanelAtLeastXs: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("xs")
      ),
      isContentPanelAtLeastSm: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("sm")
      ),
      isContentPanelAtLeastMd: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("md")
      ),
      isContentPanelAtLeastLg: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("lg")
      ),
      isContentPanelAtLeastXl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("xl")
      ),
      isContentPanelAtLeast2xl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("2xl")
      ),
      isContentPanelAtLeast3xl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("3xl")
      ),
      isContentPanelAtLeast4xl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("4xl")
      ),
      isContentPanelAtLeast5xl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("5xl")
      ),
      isContentPanelAtLeast6xl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("6xl")
      ),
      isContentPanelAtLeast7xl: applyContainerQuery(
        fontSize,
        contentPanelWidth,
        createAtLeastMediaQuery("7xl")
      ),
    }),
    [contentPanelWidth, fontSize]
  );

  return (
    <ContainerQueriesContext.Provider
      value={{
        ...screenAtLeasts,
        ...contentPanelAtLeasts,
        ...subPanelAtLeasts,
        ...columnLayouts,
      }}>
      {children}
    </ContainerQueriesContext.Provider>
  );
};

type MediaQuery = { value: number; unit: "px" | "rem"; rule: "max" | "min" };

const createAtLeastMediaQuery = (size: Size): MediaQuery => ({
  value: sizes[size],
  unit: "rem",
  rule: "min",
});

const applyContainerQuery = (fontSize: number, width: number, query: MediaQuery): boolean => {
  const breakpoint = query.value * (query.unit === "rem" ? 16 : 1) * fontSize;
  return query.rule === "min" ? width >= breakpoint : width < breakpoint;
};
