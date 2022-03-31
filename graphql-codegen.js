const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

module.exports = {
  overwrite: true,
  schema: {
    [process.env.URL_GRAPHQL]: {
      headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
    },
  },
  documents: ["src/graphql/operations/*.graphql", "src/graphql/fragments/*.graphql"],
  generates: {
    "src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};
