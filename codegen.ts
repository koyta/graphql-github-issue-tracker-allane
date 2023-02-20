/** @type {import('@graphql-codegen/cli').CodegenConfig} */
export default {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          "User-Agent": "JS GraphQL",
          // TODO: Replace in .env.local with your own token
          Authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`,
        },
      },
    },
  ],
  documents: ["./src/**/*.gql"],
  overwrite: true,
  avoidOptionals: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        disableDescriptions: true,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
    "./src/generated/fragment-matcher.ts": {
      plugins: ["fragment-matcher"],
      config: {
        useExplicitTyping: true,
        federation: false,
      },
    },
    "./src/generated/helpers.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
  },
  ignoreNoDocuments: true,
};
