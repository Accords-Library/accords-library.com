import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import ContentPanel from 'components/Panels/ContentPanel'
import SubPanel from 'components/Panels/SubPanel'
import ReturnButton from 'components/Panels/ReturnButton'
import NavOption from 'components/Panels/NavOption'
import { getChronologyItems } from 'queries/queries'

const ChronologyOverview: NextPage = ( props ) => {
  const router = useRouter()

  return (
    <>
      <SubPanel>
        <ReturnButton url="/chronology" title="Chronology"/>
        <hr/>
        <NavOption 
          url="#test" 
          title="Prior to the Cataclysm" 
          subtitle="0&ensp;→&ensp;856"
          border={true}
        />
      </SubPanel>

      <ContentPanel>
        {props.chronologyItems.map((item: any) => (
          <div key={item.id}>{item.year} -{' '}
          {
            item.translations.map((translation: any) => (
              <>
                {translation.languages_code.code === router.locale ? translation.title : ""}
              </>
            ))}
          </div>
        ))}

      </ContentPanel>

      


    </>
  )
}
export default ChronologyOverview

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      chronologyItems: await getChronologyItems(),
    },
  }
}
