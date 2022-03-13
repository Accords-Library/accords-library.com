# Accords-library.com

[![Node.js CI](https://github.com/Accords-Library/accords-library.com/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Accords-Library/accords-library.com/actions/workflows/node.js.yml)
[![GitHub](https://img.shields.io/github/license/Accords-Library/accords-library.com?style=flat-square)](https://github.com/Accords-Library/accords-library.com/blob/main/LICENSE)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/Accords-Library/accords-library.com?style=flat-square)

## Technologies

#### [Back](https://github.com/Accords-Library/strapi.accords-library.com)

- CMS: Stapi
  - GraphQL endpoint
  - Multilanguage support
  - Markdown format for the rich text fields

#### [Image Processor](https://github.com/Accords-Library/img.accords-library.com)
- Convert the images from the CMS to 4 formats
  - Small: 512x512, quality 60, .webp
  - Medium: 1024x1024, quality 75, .webp
  - Large: 2048x2048, quality 80, .webp
  - Og: 512x512, quality 60, .jpg

#### [Front](https://github.com/Accords-Library/accords-library.com) (this repository)

- Language: [TypeScript](https://www.typescriptlang.org/)
- Queries: [GraphQL](https://graphql.org/)
  - [GraphQL Code Generator](https://www.graphql-code-generator.com/) to automatically generated types for the operations variables and responses
  - The operations are stored in a graphql file and then retrieved and wrap as an actual TypeScript function
- Markdown: [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx)
  - Support for Arbitrary React Components and Component Props!
- Styling: [Tailwind CSS](https://tailwindcss.com/)
  - Good typographic defaults using [Tailwind/Typography](https://tailwindcss.com/docs/typography-plugin)
  - Beside the theme declaration no CSS outside of Tailwind CSS
  - Manually added support for scrollbar styling
  - Support for [Material Icons](https://fonts.google.com/icons)
  - Support for light and dark mode with a manual switch and system's selected theme by default
  - Support for creating any arbitrary theming mode by swapping CSS variables
- Framework: [Next.js](https://nextjs.org/) (React)
  - Multilanguage support
- State Management: [React Context](https://reactjs.org/docs/context.html)
  - Persistent app state using LocalStorage
- Support for many screen sizes and resolutions
- SSG (Static Site Generation):
  - The website is built before running in production
  - Performances are great, and possibility to deploy the app using a CDN
- OpenGraph and Metadata
  - Good defaults for the metadate and OpenGraph properties
  - Each page can provide the thumbnail, title, description to be used
- Data quality testing
  - Data from the CMS is subject to a battery of tests (about 20 warning types and 40 error types) at build time
  - Each warning/error comes with a front-end link to the incriminating element, as well as a link to the CMS to fix it.
  - Check for completeness, conformity, and integrity

## Installation

```bash
git clone https://github.com/Accords-Library/accords-library.com.git
cd accords-library.com
npm install
```

Create a env file:

```bash
nano .env.local
```

Enter the followind information:

```txt
URL_GRAPHQL=https://url-to.strapi-accords-library.com/graphql
ACCESS_TOKEN=genatedcode-by-strapi-api
NEXT_PUBLIC_URL_CMS=https://url-to.strapi-accords-library.com/
NEXT_PUBLIC_URL_IMG=https://url-to.img-accords-library.com/
NEXT_PUBLIC_URL_SELF=https://url-to-front-accords-library.com
```

Run in dev mode:

```bash
./run_accords_dev.sh
```

OR build and run in production mode

```bash
./run_accords_build.sh
./run_accords_prod.sh
```
