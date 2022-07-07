import { useCallback, useEffect, useState } from "react";
import { breaks } from "../../design.config";

const useMediaQuery = (query: string): boolean => {
  const getMatches = useCallback((): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }, [query]);

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const handleChange = () => {
      setMatches(getMatches());
    };

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [getMatches, query]);

  return matches;
};

// ts-unused-exports:disable-next-line
export const useMediaThin = (): boolean => useMediaQuery(breaks.thin.raw);

export const useMediaMobile = (): boolean => useMediaQuery(breaks.mobile.raw);

export const useMediaDesktop = (): boolean => useMediaQuery(breaks.desktop.raw);

export const useMediaHoverable = (): boolean => useMediaQuery("(hover: hover)");

export const usePrefersDarkMode = (): boolean =>
  useMediaQuery("(prefers-color-scheme: dark)");
