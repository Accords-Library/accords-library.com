import AppLayout from "components/AppLayout";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface FiveHundredProps extends AppStaticProps {}

export default function FiveHundred(props: FiveHundredProps): JSX.Element {
  const { langui } = props;
  const contentPanel = (
    <ContentPanel>
      <h1>500 - Internal Server Error</h1>
      <ReturnButton
        href="/"
        title="Home"
        langui={langui}
        displayOn={ReturnButtonType.both}
      />
    </ContentPanel>
  );
  return <AppLayout navTitle="500" contentPanel={contentPanel} {...props} />;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: FiveHundredProps }> {
  const props: FiveHundredProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
