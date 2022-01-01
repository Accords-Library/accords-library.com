import Link from "next/link";
import ContentPanel from "components/Panels/ContentPanel";
import { applyCustomAppProps } from "./_app";

applyCustomAppProps(FourOhFour, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function FourOhFour(): JSX.Element {
  return (
    <ContentPanel>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </ContentPanel>
  );
}
