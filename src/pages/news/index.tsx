import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";

interface NewsProps extends AppStaticProps {}

export default function News(props: NewsProps): JSX.Element {
  const { langui } = props;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="feed"
        title={langui.news}
        description={langui.news_description}
      />
    </SubPanel>
  );

  return <AppLayout navTitle={langui.news} subPanel={subPanel} {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: NewsProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
