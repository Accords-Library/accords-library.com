import { GetStaticProps } from "next";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/Panels/ReturnButton";
import NavOption from "components/Panels/NavOption";
import {
  getChronologyItems,
  getChronologyEras,
  ChronologyItem,
  ChronologyEra,
} from "queries/chronology/overview";

type Props = {
  chronologyItems: ChronologyItem[];
  chronologyEras: ChronologyEra[];
};

export default function ChronologyOverview(props: Props): JSX.Element {
  return (
    <>
      <SubPanel>
        <ReturnButton url="/chronology" title="Chronology" />
        <hr />

        {console.log(props.chronologyEras)}

        {props.chronologyEras.map((era: ChronologyEra) => (
          <NavOption
            key={era.id}
            url={"#" + era.attributes.slug}
            title={era.attributes.title[0].title ? era.attributes.title[0].title : ''}
            subtitle={era.attributes.starting_year + " → " + era.attributes.ending_year}
            border={true}
          />
        ))}
      </SubPanel>


    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      /*chronologyItems: await getChronologyItems(context.locale),*/
      chronologyEras: await getChronologyEras(context.locale),
    },
  };
};
