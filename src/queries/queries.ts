export async function getChronologyItems(languages_code: String | undefined) {
  return (
    await queryCMS(
        `
        {
            chronology_items {
                id
                year
                month
                day
                translations(filter: { languages_code: { code: { _eq: "` + languages_code + `" } } }) {
                    title
                }
            }
        }
        `
    )
  ).chronology_items;
}

export async function getChronologyEras(languages_code: String | undefined) {
  return (
    await queryCMS(
        `
        {
            chronology_eras(sort: "starting_year") {
                id
                starting_year
                ending_year
                translations(filter: { languages_code: { code: { _eq: "` + languages_code + `" } } }) {
                    title
                }
            }
        }
        `
    )
  ).chronology_eras;
}

export const queryCMS = async (query: String) => {
  const res = await fetch(
    process.env.GRAPHQL +
      "?access_token=" +
      process.env.ACCESS_TOKEN +
      "&query=" +
      query
  );
  return (await res.json()).data;
};
