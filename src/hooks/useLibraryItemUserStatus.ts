import { useLocalStorage } from "usehooks-ts";
import { Dispatch, SetStateAction } from "react";
import { LibraryItemUserStatus } from "types/types";

export const useLibraryItemUserStatus = (): {
  libraryItemUserStatus: Record<string, LibraryItemUserStatus>;
  setLibraryItemUserStatus: Dispatch<SetStateAction<Record<string, LibraryItemUserStatus>>>;
} => {
  const [libraryItemUserStatus, setLibraryItemUserStatus] = useLocalStorage(
    "libraryItemUserStatus",
    {}
  );
  return { libraryItemUserStatus, setLibraryItemUserStatus };
};
