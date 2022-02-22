import { useRouter } from "next/router";
import Link from "next/link";
import { MouseEventHandler } from "react";

type NavOptionProps = {
  url: string;
  icon?: string;
  title: string;
  subtitle?: string;
  tooltipId?: string;
  border?: boolean;
  reduced?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export default function NavOption(props: NavOptionProps): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath.startsWith(props.url);
  const divActive = "bg-mid dark:bg-dark-mid shadow-inner-sm shadow-shade dark:shadow-dark-shade";
  const border =
    "outline outline-mid dark:outline-dark-mid outline-2 outline-offset-[-2px] hover:outline-[transparent]";
  const divCommon = `gap-x-5 w-full rounded-2xl cursor-pointer p-4 hover:bg-mid dark:hover:bg-dark-mid hover:shadow-inner-sm hover:shadow-shade dark:hover:shadow-dark-shade hover:active:shadow-inner hover:active:shadow-shade dark:hover:active:shadow-dark-shade transition-all ${
    props.border ? border : ""
  } ${isActive ? divActive : ""}`;

  return (
    <Link href={props.url} passHref>
      <div
        onClick={props.onClick}
        data-html
        data-multiline
        data-tip={`
          <div class="px-4 py-3">
          <h3 class="text-2xl">${props.title}</h3>
          ${
            props.subtitle
              ? `<p class="max-w-[10rem]">${props.subtitle}</p>`
              : ""
          }
          </div>
        `}
        data-for={props.tooltipId}
        className={`grid grid-flow-col grid-cols-[auto] auto-cols-fr justify-center ${
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
    </Link>
  );
}
