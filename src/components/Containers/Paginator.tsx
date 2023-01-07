import { Ico } from "components/Ico";
import { PageSelector } from "components/Inputs/PageSelector";
import { atoms } from "contexts/atoms";
import { isUndefined } from "helpers/asserts";
import { useAtomGetter } from "helpers/atoms";
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
  const langui = useAtomGetter(atoms.localData.langui);
  return (
    <div className="grid h-full place-content-center">
      <div
        className="grid grid-flow-col place-items-center gap-9 rounded-2xl border-2 border-dotted
        border-dark p-8 text-dark opacity-40">
        {is3ColumnsLayout && <Ico icon="chevron_left" className="!text-[300%]" />}
        <p className="max-w-xs text-2xl">{langui.no_results_message}</p>
        {!is3ColumnsLayout && <Ico icon="chevron_right" className="!text-[300%]" />}
      </div>
    </div>
  );
};
