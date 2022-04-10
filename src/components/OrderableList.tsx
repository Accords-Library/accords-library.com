import { arrayMove } from "queries/helpers";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  items: Map<string, string>;
  onChange?: (items: Map<string, string>) => void;
}

export default function LanguageSwitcher(props: Props): JSX.Element {
  const [items, setItems] = useState<Map<string, string>>(props.items);

  useEffect(() => {
    props.onChange?.(items);
  }, [items]);

  return (
    <div className="grid gap-2">
      {[...items].map(([key, value], index) => (
        <>
          {index === 0 ? (
            <p>Primary language</p>
          ) : index === 1 ? (
            <p>Secondary languages</p>
          ) : (
            ""
          )}
          <div
            onDragStart={(event) => {
              const source = event.target as HTMLElement;
              const sourceIndex = source.parentElement
                ? Array.from(source.parentElement.children)
                    .filter((element) => element.tagName === "DIV")
                    .indexOf(source)
                : -1;
              event.dataTransfer.setData("text", sourceIndex.toString());
            }}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={(event) => {
              event.preventDefault();
              const target = event.target as HTMLElement;
              const targetIndex = target.parentElement
                ? Array.from(target.parentElement.children)
                    .filter((element) => element.tagName === "DIV")
                    .indexOf(target)
                : -1;
              const sourceIndex = parseInt(
                event.dataTransfer.getData("text"),
                10
              );
              const newItems = arrayMove([...items], sourceIndex, targetIndex);
              setItems(new Map(newItems));
            }}
            className="grid place-content-center place-items-center 
            border-[1px] transition-all hover:text-light hover:bg-dark 
            hover:drop-shadow-shade-lg border-dark bg-light text-dark 
            rounded-full px-4 pt-[0.4rem] pb-[0.5rem] cursor-grab select-none"
            key={key}
            draggable
          >
            {value}
          </div>
        </>
      ))}
    </div>
  );
}
