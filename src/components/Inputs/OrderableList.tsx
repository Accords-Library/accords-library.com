import { Fragment, useCallback } from "react";
import { Ico } from "components/Ico";
import { arrayMove } from "helpers/others";
import { isDefinedAndNotEmpty } from "helpers/asserts";

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

interface InsertedLabelProps {
  label?: string;
}

const InsertedLabel = ({ label }: InsertedLabelProps) => (
  <>{isDefinedAndNotEmpty(label) && <p>{label}</p>}</>
);

export const OrderableList = ({ onChange, items, insertLabels }: Props): JSX.Element => {
  const updateOrder = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      onChange?.(arrayMove(items, sourceIndex, targetIndex));
    },
    [items, onChange]
  );

  return (
    <div className="grid gap-2">
      {items.map((item, index) => (
        <Fragment key={index}>
          <InsertedLabel label={insertLabels?.[index]?.name} />

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
            hover:bg-dark hover:text-light hover:shadow-lg hover:shadow-shade"
            draggable>
            <div className="grid grid-rows-[.8em_.8em] place-items-center">
              {index > 0 && (
                <Ico
                  icon="arrow_drop_up"
                  className="row-start-1 cursor-pointer"
                  onClick={() => {
                    updateOrder(index, index - 1);
                  }}
                />
              )}
              {index < items.length - 1 && (
                <Ico
                  icon="arrow_drop_down"
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
