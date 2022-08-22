import { useAppLayout } from "contexts/AppLayoutContext";

type MediaQuery = { value: number; unit: "px" | "rem"; rule: "max" | "min" };

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
  xs: 20,
  "2xs": 16,
};

export const useIsScreenAtLeast = (size: Size): boolean => {
  const { screenWidth } = useAppLayout();
  return useApplyContainerQuery(screenWidth, {
    value: sizes[size],
    unit: "rem",
    rule: "min",
  });
};

// ts-unused-exports:disable-next-line
export const useIsScreenNoMoreThan = (size: Size): boolean => {
  const { screenWidth } = useAppLayout();
  return useApplyContainerQuery(screenWidth, {
    value: sizes[size],
    unit: "rem",
    rule: "max",
  });
};

export const useIsContentPanelAtLeast = (size: Size): boolean => {
  const { contentPanelWidth } = useAppLayout();
  return useApplyContainerQuery(contentPanelWidth, {
    value: sizes[size],
    unit: "rem",
    rule: "min",
  });
};

export const useIsContentPanelNoMoreThan = (size: Size): boolean => {
  const { contentPanelWidth } = useAppLayout();
  return useApplyContainerQuery(contentPanelWidth, {
    value: sizes[size],
    unit: "rem",
    rule: "max",
  });
};

export const useIsSubPanelAtLeast = (size: Size): boolean => {
  const { subPanelWidth } = useAppLayout();
  return useApplyContainerQuery(subPanelWidth, {
    value: sizes[size],
    unit: "rem",
    rule: "min",
  });
};

// ts-unused-exports:disable-next-line
export const useIsSubPanelNoMoreThan = (size: Size): boolean => {
  const { subPanelWidth } = useAppLayout();
  return useApplyContainerQuery(subPanelWidth, {
    value: sizes[size],
    unit: "rem",
    rule: "max",
  });
};

export const useIs3ColumnsLayout = (): boolean => {
  const { screenWidth } = useAppLayout();
  return useApplyContainerQuery(screenWidth, {
    value: sizes["5xl"],
    unit: "rem",
    rule: "min",
  });
};

export const useIs1ColumnLayout = (): boolean => {
  const { screenWidth } = useAppLayout();
  return useApplyContainerQuery(screenWidth, {
    value: sizes["5xl"],
    unit: "rem",
    rule: "max",
  });
};

const useApplyContainerQuery = (width: number, query: MediaQuery) => {
  const { fontSize } = useAppLayout();
  const breakpoint = query.value * (query.unit === "rem" ? 16 : 1) * fontSize;
  return query.rule === "min" ? width >= breakpoint : width < breakpoint;
};
