export const getChronologyItems = async () => {
    const res = await fetch(
        process.env.GRAPHQL + '?access_token=' + process.env.ACCESS_TOKEN + `&query={
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
  
    return (await res.json()).data.chronology_items
}