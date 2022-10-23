import { Fragment, useCallback } from "react";
import { Ico, Icon } from "components/Ico";
import { arrayMove, isDefinedAndNotEmpty } from "helpers/others";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  className?: string;
  items: { code: string; name: string }[];
  insertLabels?: { insertAt: number; name: string }[];
  onChange?: (props: Props["items"]) => void;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const OrderableList = ({ onChange, items, insertLabels }: Props): JSX.Element => {
  const updateOrder = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      console.log("updateOrder");
      onChange?.(arrayMove(items, sourceIndex, targetIndex));
    },
    [items, onChange]
  );

  return (
    <div className="grid gap-2">
      {items.map((item, index) => (
        <Fragment key={index}>
          {insertLabels && isDefinedAndNotEmpty(insertLabels[index]?.name) && (
            <p>{insertLabels[index].name}</p>
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
              const sourceIndex = parseInt(event.dataTransfer.getData("text"), 10);
              updateOrder(sourceIndex, targetIndex);
            }}
            className="grid cursor-grab select-none grid-cols-[auto_1fr] place-content-center gap-2
            rounded-full border border-dark bg-light px-1 py-2 pr-4 text-dark transition-all
            hover:bg-dark hover:text-light hover:drop-shadow-shade-lg"
            draggable>
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
              {index < items.length - 1 && (
                <Ico
                  icon={Icon.ArrowDropDown}
                  className="row-start-2 cursor-pointer"
                  onClick={() => {
                    updateOrder(index, index + 1);
                  }}
                />
              )}
            </div>
            {item.name}
          </div>
        </Fragment>
      ))}
    </div>
  );
};
