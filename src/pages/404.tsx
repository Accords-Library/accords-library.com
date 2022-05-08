import AppLayout from "components/AppLayout";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";

interface Props extends AppStaticProps {}

export default function FourOhFour(props: Immutable<Props>): JSX.Element {
  const { langui } = props;
  const contentPanel = (
    <ContentPanel>
      <h1>404 - {langui.page_not_found}</h1>
      <ReturnButton
        href="/"
        title="Home"
        langui={langui}
        displayOn={ReturnButtonType.both}
      />
    </ContentPanel>
  );
  return <AppLayout navTitle="404" contentPanel={contentPanel} {...props} />;
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
