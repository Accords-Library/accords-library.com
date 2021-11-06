import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import ContentPanel from 'components/Panels/ContentPanel'
import SubPanel from 'components/Panels/SubPanel'

import { getChronologyItems } from 'queries/queries'

export const getStaticProps: GetStaticProps = async (context) => {
  return await getChronologyItems()
}

const ChronologyOverview: NextPage = ({ chronologyItems }) => {
  const router = useRouter()

  return (
    <>
      <SubPanel>Hello</SubPanel>

      <ContentPanel>
        {chronologyItems.map((item: any) => (
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
