import { Ico, Icon } from "components/Ico";
import { ToolTip } from "components/ToolTip";
import { cJoin, cIf } from "helpers/className";
import { Immutable } from "helpers/types";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface Props {
  url: string;
  icon?: Icon;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  border?: boolean;
  reduced?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function NavOption(props: Immutable<Props>): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath.startsWith(props.url);

  return (
    <ToolTip
      content={
        <div>
          <h3 className="text-2xl">{props.title}</h3>
          {props.subtitle && <p className="col-start-2">{props.subtitle}</p>}
        </div>
      }
      placement="right"
      className="text-left"
      disabled={!props.reduced}
    >
      <div
        onClick={(event) => {
          if (props.onClick) props.onClick(event);
          if (props.url) {
            if (props.url.startsWith("#")) {
              router.replace(props.url);
            } else {
              router.push(props.url);
            }
          }
        }}
        className={cJoin(
          `relative grid w-full cursor-pointer auto-cols-fr grid-flow-col grid-cols-[auto]
          justify-center gap-x-5 rounded-2xl p-4 transition-all hover:bg-mid hover:shadow-inner-sm
          hover:shadow-shade hover:active:shadow-inner hover:active:shadow-shade`,
          cIf(props.icon, "text-left", "text-center"),
          cIf(
            props.border,
            "outline outline-2 outline-offset-[-2px] outline-mid hover:outline-[transparent]"
          ),
          cIf(isActive, "bg-mid shadow-inner-sm shadow-shade")
        )}
      >
        {props.icon && (
          <Ico icon={props.icon} className="mt-[-.1em] !text-2xl" />
        )}

        {!props.reduced && (
          <div>
            <h3 className="text-2xl">{props.title}</h3>
            {props.subtitle && <p className="col-start-2">{props.subtitle}</p>}
          </div>
        )}
      </div>
    </ToolTip>
  );
}
