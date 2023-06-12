import { useRef } from "react";
import { Button, TranslatedButton } from "components/Inputs/Button";
import { atoms } from "contexts/atoms";
import { ParentFolderPreviewFragment } from "graphql/generated";
import { useAtomSetter } from "helpers/atoms";
import { useScrollRightOnChange } from "hooks/useScrollOnChange";
import { Ids } from "types/ids";
import { filterHasAttributes } from "helpers/asserts";
import { prettySlug } from "helpers/formatters";
import { Ico } from "components/Ico";

interface Props {
  path: ParentFolderPreviewFragment[];
}

export const FolderPath = ({ path }: Props): JSX.Element => {
  useScrollRightOnChange(Ids.ContentsFolderPath, [path]);
  const setMenuGesturesEnabled = useAtomSetter(atoms.layout.menuGesturesEnabled);
  const gestureReenableTimeout = useRef<NodeJS.Timeout>();

  return (
    <div className="grid">
      <div
        id={Ids.ContentsFolderPath}
        onPointerEnter={() => {
          if (gestureReenableTimeout.current) clearTimeout(gestureReenableTimeout.current);
          setMenuGesturesEnabled(false);
        }}
        onPointerLeave={() => {
          gestureReenableTimeout.current = setTimeout(() => setMenuGesturesEnabled(true), 500);
        }}
        className={`-mx-4 flex place-items-center justify-start gap-x-1 gap-y-4
          overflow-x-auto px-4 pb-10 scrollbar-none`}>
        {path.map((pathFolder, index) => (
          <>
            {pathFolder.slug === "root" ? (
              <Button href="/contents" icon="home" active={index === path.length - 1} />
            ) : (
              <TranslatedButton
                className="w-max"
                href={`/contents/folder/${pathFolder.slug}`}
                translations={filterHasAttributes(pathFolder.titles, [
                  "language.data.attributes.code",
                ]).map((title) => ({
                  language: title.language.data.attributes.code,
                  text: title.title,
                }))}
                fallback={{
                  text: prettySlug(pathFolder.slug),
                }}
                active={index === path.length - 1}
              />
            )}
            {index < path.length - 1 && <Ico icon="chevron_right" />}
          </>
        ))}
      </div>
    </div>
  );
};
