import Link from "next/link";
import ContentPanel from "components/Panels/ContentPanel";

export default function FourOhFour() {
  return (
    <ContentPanel>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </ContentPanel>
  );
}
