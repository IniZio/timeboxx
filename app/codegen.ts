import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../public_schema.graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/apis/graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
        // fragmentMasking: { unmaskFunctionName: "getFragmentData" },
        persistedDocuments: true,
      },
      config: {
        useTypeImports: true,
        avoidOptionals: {
          field: true,
          input: false,
          object: true,
          defaultValue: true,
        },
      },
    },
    "./src/apis/graphql/generated/introspection.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
  },
};

export default config;
