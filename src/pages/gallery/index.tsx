import { AppLayout } from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";

interface Props extends AppStaticProps {}

export default function Gallery(props: Immutable<Props>): JSX.Element {
  const { langui } = props;
  const contentPanel = (
    <iframe
      className="w-full h-screen"
      src="https://gallery.accords-library.com/posts"
    ></iframe>
  );

  return (
    <AppLayout
      navTitle={langui.gallery}
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
