import SubPanel from "components/Panels/SubPanel";
import NavOption from "components/PanelComponents/NavOption";
import { applyCustomAppProps } from "pages/_app";
import PanelHeader from "components/PanelComponents/PanelHeader";

applyCustomAppProps(Chronology, {
  useSubPanel: true,
  useContentPanel: false,
});

export default function Chronology(): JSX.Element {
  return (
    <>
      <SubPanel>
        <PanelHeader
          icon="watch_later"
          title="Chronology"
          description="Follow all events in chronological order. Here we can write more about this section of the website, whatever we like in fact."
        />

        <NavOption
          url="/chronology/timelines"
          title="Timelines"
          subtitle="Diagram of how the games connect to each other"
          border={true}
        />

        <NavOption
          url="/chronology/overview"
          title="Chronology Overview"
          subtitle="List of all the events from the main timeline"
          border={true}
        />

        <NavOption
          url="/chronology/walkthrough"
          title="Chronology Walkthrough"
          subtitle="Chronological exploration of the lore and stories"
          border={true}
        />
      </SubPanel>
    </>
  );
}
