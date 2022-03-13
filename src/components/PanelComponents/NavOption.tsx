import { useRouter } from "next/router";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import ToolTip from "components/ToolTip";

type NavOptionProps = {
  url: string;
  icon?: string;
  title: string;
  subtitle?: string;
  border?: boolean;
  reduced?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function NavOption(props: NavOptionProps): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath.startsWith(props.url);
  const divActive = "bg-mid shadow-inner-sm shadow-shade";
  const border =
    "outline outline-mid outline-2 outline-offset-[-2px] hover:outline-[transparent]";
  const divCommon = `gap-x-5 w-full rounded-2xl cursor-pointer p-4 hover:bg-mid hover:shadow-inner-sm hover:shadow-shade hover:active:shadow-inner hover:active:shadow-shade transition-all ${
    props.border ? border : ""
  } ${isActive ? divActive : ""}`;

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={props.url} passHref>
      <div
        onClick={props.onClick}
        onMouseEnter={() => props.reduced && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative grid grid-flow-col grid-cols-[auto] auto-cols-fr justify-center ${
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

        <ToolTip hovered={hovered} direction="right" offset="3.5rem">
          <h3 className="text-2xl">{props.title}</h3>
          {props.subtitle && <p className="col-start-2">{props.subtitle}</p>}
        </ToolTip>
      </div>
    </Link>
  );
}
