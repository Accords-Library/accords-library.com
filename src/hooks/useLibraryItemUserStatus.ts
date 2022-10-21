import { useLocalStorage } from "usehooks-ts";
import { LibraryItemUserStatus } from "types/types";

export const useLibraryItemUserStatus = (): {
  libraryItemUserStatus: Record<string, LibraryItemUserStatus>;
  setLibraryItemUserStatus: React.Dispatch<
    React.SetStateAction<Record<string, LibraryItemUserStatus>>
  >;
} => {
  const [libraryItemUserStatus, setLibraryItemUserStatus] = useLocalStorage(
    "libraryItemUserStatus",
    {}
  );
  return { libraryItemUserStatus, setLibraryItemUserStatus };
};
