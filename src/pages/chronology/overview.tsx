import type { NextPage } from "next";
import { GetStaticProps } from "next";
import ContentPanel from "components/Panels/ContentPanel";
import SubPanel from "components/Panels/SubPanel";
import ReturnButton from "components/Panels/ReturnButton";
import NavOption from "components/Panels/NavOption";
import { getChronologyEras, getChronologyItems } from "queries/queries";

const ChronologyOverview: NextPage = (props) => {

  return (
    <>

      <SubPanel>
        <ReturnButton url="/chronology" title="Chronology" />
        <hr />
        
        {props.chronologyEras.map((era: any) => (
          <NavOption
            key={era.id}
            url={"#" + era.slug}
            title={era.translations[0].title}
            subtitle={era.starting_year + " → " + era.ending_year}
            border={true}
          />
        ))}
      </SubPanel>
    

      <ContentPanel>
        {props.chronologyItems.map((item: any) => (
          <div key={item.id}>
            {item.year} - {" "}
            {item.translations[0].title}
          </div>
        ))}
      </ContentPanel>
    </>
  );
};
export default ChronologyOverview;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      chronologyItems: await getChronologyItems(context.locale),
      chronologyEras: await getChronologyEras(context.locale),
    },
  };
};
