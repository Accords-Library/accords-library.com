import { useRouter } from "next/router";
import Link from "next/link";

type NavOptionProps = {
  url: string;
  icon?: string;
  title: string;
  subtitle?: string;
  border?: boolean;
  reduced?: boolean;
};

export default function NavOption(props: NavOptionProps): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath.startsWith(props.url);
  const divActive = "bg-mid shadow-inner-sm shadow-dark";
  const border =
    "outline outline-mid outline-2 outline-offset-[-2px] hover:outline-[transparent]";
  const divCommon = `gap-x-5 w-full rounded-2xl cursor-pointer p-4 hover:bg-mid hover:shadow-inner-sm hover:shadow-dark hover:active:shadow-inner hover:active:shadow-dark transition-all ${
    props.border ? border : ""
  } ${isActive ? divActive : ""}`;

  if (props.icon) {
    if (props.reduced) {
      return (
        <Link href={props.url} passHref>
          <div className={`grid ${divCommon}`}>
            <span className="place-self-center material-icons mt-[.1em]">{props.icon}</span>
          </div>
        </Link>
      );
    } else {
      return (
        <Link href={props.url} passHref>
          <div className={`grid grid-cols-[auto_1fr] text-left ${divCommon}`}>
            <span className="material-icons mt-[.1em]">{props.icon}</span>
            <h3 className="text-2xl">{props.title}</h3>
            {props.subtitle && <p className="col-start-2">{props.subtitle}</p>}
          </div>
        </Link>
      );
    }
  } else {
    return (
      <Link href={props.url} passHref>
        <div className={`grid text-center ${divCommon}`}>
          <h3 className="text-2xl">{props.title}</h3>
          {props.subtitle && <p>{props.subtitle}</p>}
        </div>
      </Link>
    );
  }
}
