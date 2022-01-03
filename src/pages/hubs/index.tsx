import SubPanel from "components/Panels/SubPanel";
import { applyCustomAppProps } from "pages/_app";
import PanelHeader from "components/PanelComponents/PanelHeader";

applyCustomAppProps(Hubs, {
  useSubPanel: true,
  useContentPanel: false,
});

export default function Hubs(): JSX.Element {
  return (
    <>
      <SubPanel>
        <PanelHeader
          icon="workspaces"
          title="Hubs"
          description="Explore all content of a specific game/series. Here we can write more about this section of the website, whatever we like in fact."
        />
      </SubPanel>
    </>
  );
}
