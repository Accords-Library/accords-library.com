import SubPanel from "components/Panels/SubPanel";
import PanelHeader from "components/PanelComponents/PanelHeader";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import { getWebsiteInterface } from "graphql/operations";
import AppLayout from "components/AppLayout";

type MerchProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Merch(props: MerchProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;
  const subPanel = (
    <SubPanel>
      <PanelHeader
        icon="store"
        title={langui.main_merch}
        description="Reiciendis id reiciendis at ullam. Corrupti voluptatibus quo magnam enim voluptas eaque. Quia id consequatur fuga magni. Voluptate eaque pariatur porro voluptate rerum. Harum velit in laborum eligendi. Nihil eius dolor et omnis."
      />
    </SubPanel>
  );

  return <AppLayout title="Merch" langui={langui} subPanel={subPanel} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: MerchProps = {
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  }
  return { props: {} };
};
