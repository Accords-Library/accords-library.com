import { useRouter } from "next/router";
import styles from "styles/Panels/NavOption.module.css";
import Link from "next/link";

type NavOptionProps = {
  url: string;
  icon?: string;
  title: string | null | undefined;
  subtitle?: string;
  border?: boolean;
};

export default function NavOption(pageProps: NavOptionProps): JSX.Element {
  const router = useRouter();
  let classNames = [styles.menuOption];
  if (router.asPath.startsWith(pageProps.url)) classNames.push(styles.active);
  if (pageProps.icon) classNames.push(styles.icon);
  if (pageProps.border === true) classNames.push(styles.border);
  return (
    <Link href={pageProps.url} passHref>
      <div className={classNames.join(" ")}>
        {pageProps.icon && <img src={pageProps.icon} alt="" />}
        <h3>{pageProps.title}</h3>
        {pageProps.subtitle && <p>{pageProps.subtitle}</p>}
      </div>
    </Link>
  );
}
