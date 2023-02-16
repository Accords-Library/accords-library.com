import { useHotkeys } from "react-hotkeys-hook";
import { Ico } from "components/Ico";
import { PageSelector } from "components/Inputs/PageSelector";
import { atoms } from "contexts/atoms";
import { isUndefined } from "helpers/asserts";
import { useAtomGetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { useScrollTopOnChange } from "hooks/useScrollTopOnChange";
import { Ids } from "types/ids";

interface Props {
  page: number;
  onPageChange: (newPage: number) => void;
  totalNumberOfPages: number | null | undefined;
  children: React.ReactNode;
}

export const Paginator = ({
  page,
  onPageChange,
  totalNumberOfPages,
  children,
}: Props): JSX.Element => {
  useScrollTopOnChange(Ids.ContentPanel, [page]);
  useHotkeys("left", () => onPageChange(page - 1), { enabled: page > 1 }, [page]);
  useHotkeys("right", () => onPageChange(page + 1), { enabled: page < (totalNumberOfPages ?? 0) }, [
    page,
  ]);

  if (totalNumberOfPages === 0) return <DefaultRenderWhenEmpty />;
  if (isUndefined(totalNumberOfPages) || totalNumberOfPages < 2) return <>{children}</>;

  return (
    <>
      <PageSelector
        page={page}
        onChange={onPageChange}
        pagesCount={totalNumberOfPages}
        className="mb-12"
      />
      {children}
      <PageSelector
        page={page}
        onChange={onPageChange}
        pagesCount={totalNumberOfPages}
        className="mt-12"
      />
    </>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

const DefaultRenderWhenEmpty = () => {
  const is3ColumnsLayout = useAtomGetter(atoms.containerQueries.is3ColumnsLayout);
  const { format } = useFormat();

  return (
    <div className="grid h-full place-content-center">
      <div
        className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40">
        {is3ColumnsLayout && <Ico icon="chevron_left" className="!text-[300%]" />}
        <p className="max-w-xs text-2xl">{format("no_results_message")}</p>
        {!is3ColumnsLayout && <Ico icon="chevron_right" className="!text-[300%]" />}
      </div>
    </div>
  );
};
