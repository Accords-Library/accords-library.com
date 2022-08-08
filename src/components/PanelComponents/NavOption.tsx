import { useRouter } from "next/router";
import { MouseEventHandler, useMemo } from "react";
import { Ico, Icon } from "components/Ico";
import { ToolTip } from "components/ToolTip";
import { cJoin, cIf } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";
import { Link } from "components/Inputs/Link";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  url: string;
  icon?: Icon;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  border?: boolean;
  reduced?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const NavOption = ({
  url,
  icon,
  title,
  subtitle,
  border = false,
  reduced = false,
  onClick,
}: Props): JSX.Element => {
  const router = useRouter();
  const isActive = useMemo(
    () => router.asPath.startsWith(url),
    [url, router.asPath]
  );

  return (
    <ToolTip
      content={
        <div>
          <h3 className="text-2xl">{title}</h3>
          {isDefinedAndNotEmpty(subtitle) && (
            <p className="col-start-2">{subtitle}</p>
          )}
        </div>
      }
      placement="right"
      className="text-left"
      disabled={!reduced}
    >
      <Link
        href={url}
        onClick={onClick}
        className={cJoin(
          `relative grid w-full cursor-pointer auto-cols-fr grid-flow-col grid-cols-[auto]
          justify-center gap-x-5 rounded-2xl p-4 transition-all hover:bg-mid hover:shadow-inner-sm
          hover:shadow-shade hover:active:shadow-inner hover:active:shadow-shade`,
          cIf(icon, "text-left", "text-center"),
          cIf(
            border,
            "outline outline-2 outline-offset-[-2px] outline-mid hover:outline-[transparent]"
          ),
          cIf(isActive, "bg-mid shadow-inner-sm shadow-shade")
        )}
      >
        {icon && <Ico icon={icon} className="mt-[-.1em] !text-2xl" />}

        {!reduced && (
          <div>
            <h3 className="text-2xl">{title}</h3>
            {isDefinedAndNotEmpty(subtitle) && (
              <p className="col-start-2">{subtitle}</p>
            )}
          </div>
        )}
      </Link>
    </ToolTip>
  );
};
