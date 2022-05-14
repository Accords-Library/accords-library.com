import { arrayMove } from "helpers/others";
import { Immutable } from "helpers/types";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  items: Map<string, string>;
  onChange?: (items: Map<string, string>) => void;
}

export function OrderableList(props: Immutable<Props>): JSX.Element {
  const [items, setItems] = useState<Map<string, string>>(props.items);

  useEffect(() => {
    props.onChange?.(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function updateOrder(sourceIndex: number, targetIndex: number) {
    const newItems = arrayMove([...items], sourceIndex, targetIndex);
    setItems(new Map(newItems));
  }

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
              updateOrder(sourceIndex, targetIndex);
            }}
            className="grid grid-cols-[auto_1fr] place-content-center 
            border-[1px] transition-all hover:text-light hover:bg-dark 
            hover:drop-shadow-shade-lg border-dark bg-light text-dark 
            rounded-full cursor-grab select-none px-1 py-2 pr-4 gap-2"
            key={key}
            draggable
          >
            <div className="grid grid-rows-[.8em_.8em] place-items-center">
              {index > 0 && (
                <span
                  className="material-icons cursor-pointer row-start-1"
                  onClick={() => {
                    updateOrder(index, index - 1);
                  }}
                >
                  arrow_drop_up
                </span>
              )}
              {index < items.size - 1 && (
                <span
                  className="material-icons cursor-pointer row-start-2"
                  onClick={() => {
                    updateOrder(index, index + 1);
                  }}
                >
                  arrow_drop_down
                </span>
              )}
            </div>
            {value}
          </div>
        </>
      ))}
    </div>
  );
}
