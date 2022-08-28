import { useMediaQuery } from "usehooks-ts";

export const useDeviceSupportsHover = (): boolean => useMediaQuery("(hover: hover)");

export const usePrefersDarkMode = (): boolean => useMediaQuery("(prefers-color-scheme: dark)");
