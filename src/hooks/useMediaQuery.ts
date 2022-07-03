import { useEffect, useState } from "react";
import { breaks } from "../../design.config";

const useMediaQuery = (query: string): boolean => {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const handleChange = () => {
      setMatches(getMatches(query));
    };

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

// ts-unused-exports:disable-next-line
export const useMediaThin = () => useMediaQuery(breaks.thin.raw);

export const useMediaMobile = () => useMediaQuery(breaks.mobile.raw);

export const useMediaDesktop = () => useMediaQuery(breaks.desktop.raw);

export const useMediaHoverable = () => useMediaQuery("(hover: hover)");

export const usePrefersDarkMode = () =>
  useMediaQuery("(prefers-color-scheme: dark)");
