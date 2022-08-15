import { useMediaQuery } from "usehooks-ts";
import { breaks } from "../../design.config";

// ts-unused-exports:disable-next-line
export const useMediaThin = (): boolean => useMediaQuery(breaks.thin.raw);

export const useMediaMobile = (): boolean => useMediaQuery(breaks.mobile.raw);

export const useMediaDesktop = (): boolean => useMediaQuery(breaks.desktop.raw);

export const useMediaHoverable = (): boolean => useMediaQuery("(hover: hover)");

export const usePrefersDarkMode = (): boolean =>
  useMediaQuery("(prefers-color-scheme: dark)");
