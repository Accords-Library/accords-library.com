import { useRouter } from "next/router";
import Link from "next/link";

type NavOptionProps = {
  url: string;
  icon?: string;
  title: string;
  subtitle?: string;
  border?: boolean;
};

export default function NavOption(props: NavOptionProps): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath.startsWith(props.url);
  const divActive = "bg-mid"
  const border = "border-2 border-mid";
  const divCommon = `gap-x-4 w-full rounded-2xl cursor-pointer p-4 hover:bg-mid transition-colors ${props.border ? border: ""} ${isActive ? divActive : ""}`;

  if (props.icon) {
    return (
      <Link href={props.url} passHref>
        <div className={`grid grid-cols-[auto_1fr] text-left ${divCommon}`}>
          <img className="w-5" src={props.icon} alt="" />
          <h3 className="text-2xl">{props.title}</h3>
          {props.subtitle && <p className="col-start-2">{props.subtitle}</p>}
        </div>
      </Link>
    );
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
