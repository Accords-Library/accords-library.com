import type { NextPage } from "next";
import SubPanel from "components/Panels/SubPanel";
import NavOption from "components/Panels/NavOption";

const Chronology: NextPage = () => {
  return (
    <>
      <SubPanel>
        <h2>Chronology</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate
          facilisis blandit. Aliquam blandit neque sem, ac pulvinar leo
          ultricies sit amet.
        </p>
        <hr />

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
};
export default Chronology;
