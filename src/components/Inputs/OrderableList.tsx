import { Ico, Icon } from "components/Ico";
import { isDefinedAndNotEmpty, iterateMap, mapMoveEntry } from "helpers/others";

import { Fragment, useCallback, useState } from "react";

interface Props {
  className?: string;
  items: Map<string, string>;
  insertLabels?: Map<number, string | null | undefined>;
  onChange?: (items: Map<string, string>) => void;
}

export function OrderableList(props: Props): JSX.Element {
  const { onChange } = props;
  const [items, setItems] = useState<Map<string, string>>(props.items);

  const updateOrder = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      const newItems = mapMoveEntry(items, sourceIndex, targetIndex);
      setItems(newItems);
      onChange?.(newItems);
    },
    [items, onChange]
  );

  return (
    <div className="grid gap-2">
      {iterateMap(items, (key, value, index) => (
        <Fragment key={key}>
          {props.insertLabels &&
            isDefinedAndNotEmpty(props.insertLabels.get(index)) && (
              <p>{props.insertLabels.get(index)}</p>
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
            className="grid cursor-grab select-none grid-cols-[auto_1fr] place-content-center gap-2
            rounded-full border-[1px] border-dark bg-light px-1 py-2 pr-4 text-dark transition-all
            hover:bg-dark hover:text-light hover:drop-shadow-shade-lg"
            draggable
          >
            <div className="grid grid-rows-[.8em_.8em] place-items-center">
              {index > 0 && (
                <Ico
                  icon={Icon.ArrowDropUp}
                  className="row-start-1 cursor-pointer"
                  onClick={() => {
                    updateOrder(index, index - 1);
                  }}
                />
              )}
              {index < items.size - 1 && (
                <Ico
                  icon={Icon.ArrowDropDown}
                  className="row-start-2 cursor-pointer"
                  onClick={() => {
                    updateOrder(index, index + 1);
                  }}
                />
              )}
            </div>
            {value}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
