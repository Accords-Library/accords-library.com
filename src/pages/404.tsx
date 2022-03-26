import AppLayout from "components/AppLayout";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import ContentPanel from "components/Panels/ContentPanel";
import { GetStaticProps } from "next";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface FourOhFourProps extends AppStaticProps {}

export default function FourOhFour(props: FourOhFourProps): JSX.Element {
  const { langui } = props;
  const contentPanel = (
    <ContentPanel>
      <h1>404 - {langui.page_not_found}</h1>
      <ReturnButton
        href="/"
        title="Home"
        langui={langui}
        displayOn={ReturnButtonType.Both}
      />
    </ContentPanel>
  );
  return <AppLayout navTitle="404" contentPanel={contentPanel} {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: FourOhFourProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
