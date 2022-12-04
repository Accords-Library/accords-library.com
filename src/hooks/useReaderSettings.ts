import { Dispatch, SetStateAction, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ImageQuality } from "helpers/img";

export interface FilterSettings {
  paperTexture: boolean;
  bookFold: boolean;
  lighting: boolean;
  teint: number;
  dropShadow: boolean;
}

interface ReaderSettings extends FilterSettings {
  pageQuality: ImageQuality;
  isSidePagesEnabled: boolean;
}

const DEFAULT_READER_SETTINGS: ReaderSettings = {
  bookFold: true,
  lighting: true,
  paperTexture: true,
  teint: 0.1,
  dropShadow: true,
  pageQuality: ImageQuality.Large,
  isSidePagesEnabled: true,
};

export const useReaderSettings = (): {
  filterSettings: FilterSettings;
  isSidePagesEnabled: ReaderSettings["isSidePagesEnabled"];
  pageQuality: ReaderSettings["pageQuality"];
  toggleBookFold: () => void;
  toggleLighting: () => void;
  togglePaperTexture: () => void;
  toggleDropShadow: () => void;
  toggleIsSidePagesEnabled: () => void;
  setPageQuality: Dispatch<SetStateAction<ImageQuality>>;
  setTeint: Dispatch<SetStateAction<number>>;
  resetReaderSettings: () => void;
} => {
  const [bookFold, setBookFold] = useLocalStorage(
    "readerBookFold",
    DEFAULT_READER_SETTINGS.bookFold
  );
  const [lighting, setLighting] = useLocalStorage(
    "readerLighting",
    DEFAULT_READER_SETTINGS.lighting
  );
  const [paperTexture, setPaperTexture] = useLocalStorage(
    "readerPaperTexture",
    DEFAULT_READER_SETTINGS.paperTexture
  );
  const [teint, setTeint] = useLocalStorage("readerTeint", DEFAULT_READER_SETTINGS.teint);
  const [dropShadow, setDropShadow] = useLocalStorage(
    "readerDropShadow",
    DEFAULT_READER_SETTINGS.dropShadow
  );
  const [isSidePagesEnabled, setIsSidePagesEnabled] = useLocalStorage(
    "readerIsSidePagesEnabled",
    DEFAULT_READER_SETTINGS.isSidePagesEnabled
  );
  const [pageQuality, setPageQuality] = useLocalStorage(
    "readerPageQuality",
    DEFAULT_READER_SETTINGS.pageQuality
  );

  const toggleBookFold = useCallback(() => setBookFold((current) => !current), [setBookFold]);
  const toggleLighting = useCallback(() => setLighting((current) => !current), [setLighting]);
  const togglePaperTexture = useCallback(
    () => setPaperTexture((current) => !current),
    [setPaperTexture]
  );
  const toggleDropShadow = useCallback(() => setDropShadow((current) => !current), [setDropShadow]);
  const toggleIsSidePagesEnabled = useCallback(
    () => setIsSidePagesEnabled((current) => !current),
    [setIsSidePagesEnabled]
  );

  const resetReaderSettings = useCallback(() => {
    setBookFold(DEFAULT_READER_SETTINGS.bookFold);
    setLighting(DEFAULT_READER_SETTINGS.lighting);
    setPaperTexture(DEFAULT_READER_SETTINGS.paperTexture);
    setTeint(DEFAULT_READER_SETTINGS.teint);
    setDropShadow(DEFAULT_READER_SETTINGS.dropShadow);
    setIsSidePagesEnabled(DEFAULT_READER_SETTINGS.isSidePagesEnabled);
    setPageQuality(DEFAULT_READER_SETTINGS.pageQuality);
  }, [
    setBookFold,
    setDropShadow,
    setIsSidePagesEnabled,
    setLighting,
    setPageQuality,
    setPaperTexture,
    setTeint,
  ]);

  return {
    filterSettings: { bookFold, lighting, paperTexture, teint, dropShadow },
    isSidePagesEnabled,
    pageQuality,
    toggleBookFold,
    toggleLighting,
    togglePaperTexture,
    toggleDropShadow,
    toggleIsSidePagesEnabled,
    setPageQuality,
    setTeint,
    resetReaderSettings,
  };
};
