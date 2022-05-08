import AppLayout from "components/AppLayout";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";

interface Props extends AppStaticProps {}

export default function Gallery(props: Props): JSX.Element {
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
