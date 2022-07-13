module.exports = {
  projects: {
    app: {
      schema: process.env.URL_GRAPHQL,
      documents: [
        "src/graphql/operations/*.graphql",
        "src/graphql/fragments/*.graphql",
      ],
      extensions: {
        endpoints: {
          default: {
            url: process.env.URL_GRAPHQL,
            headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
          },
        },
      },
    },
  },
};
