# Accords-library.com

## Technologies

#### [Back](https://github.com/Accords-Library/strapi.accords-library.com)
- CMS: Stapi
  - GraphQL endpoint
  - Multilanguage support
  - Markdown format for the rich text fields

#### [Front](https://github.com/Accords-Library/accords-library.com) (this repository)
- Language: TypeScript
- Queries: [GraphQL](https://graphql.org/)
  - [GraphQL Code Generator](https://www.graphql-code-generator.com/) to automatically generated types for the operations variables and responses
  - The operations are stored in a graphql file and wrap as an actual TypeScript function
- Styling: [Tailwind CSS](https://tailwindcss.com/)
  - Markdown automatic formatting using [Tailwind/Typography](https://tailwindcss.com/docs/typography-plugin)
  - Beside the theme declaration no CSS outside of Tailwind CSS
  - Manually added support for scrollbar styling
- Framework: [Next.js](https://nextjs.org/) (React)
  - Multilanguage support
