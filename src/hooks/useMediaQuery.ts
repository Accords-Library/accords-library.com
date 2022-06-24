import { useEffect, useState } from "react";
import { breaks } from "../../design.config";

function useMediaQuery(query: string): boolean {
  function getMatches(query: string): boolean {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

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
}

// ts-unused-exports:disable-next-line
export function useMediaThin() {
  return useMediaQuery(breaks.thin.raw);
}

export function useMediaMobile() {
  return useMediaQuery(breaks.mobile.raw);
}

export function useMediaDesktop() {
  return useMediaQuery(breaks.desktop.raw);
}

export function useMediaHoverable() {
  return useMediaQuery("(hover: hover)");
}

export function usePrefersDarkMode() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
