import { ToolTip } from "components/ToolTip";
import { Immutable } from "helpers/types";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

interface Props {
  url: string;
  icon?: string;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  border?: boolean;
  reduced?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function NavOption(props: Immutable<Props>): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath.startsWith(props.url);
  const divActive = "bg-mid shadow-inner-sm shadow-shade";

  const border =
    "outline outline-mid outline-2 outline-offset-[-2px] hover:outline-[transparent]";

  const divCommon = `gap-x-5 w-full rounded-2xl cursor-pointer p-4 hover:bg-mid
  hover:shadow-inner-sm hover:shadow-shade hover:active:shadow-inner
  hover:active:shadow-shade transition-all ${props.border ? border : ""} ${
    isActive ? divActive : ""
  }`;

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
        className={`relative grid auto-cols-fr grid-flow-col grid-cols-[auto] justify-center ${
          props.icon ? "text-left" : "text-center"
        } ${divCommon}`}
      >
        {props.icon && (
          <span className="material-icons mt-[.1em]">{props.icon}</span>
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
