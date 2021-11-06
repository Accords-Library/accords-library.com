export const getChronologyItems = async () => {
    const res = await fetch(
        process.env.NEXT_PUBLIC_GRAPHQL + `?query={
        
        chronology_items {
            id,
            year,
            month,
            day,
            translations {
            languages_code {
                code
            }
            title
            }
        }

    }`)
  
  const data = (await res.json()).data.chronology_items
  return {
    props: {
      chronologyItems: data,
    },
  }
}