module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "@unocss",
  ],
  plugins: ["import", "simple-import-sort", "unused-imports"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: ".",
      },
    },
  },
  rules: {
    // Vite auto-injects React
    "react/react-in-jsx-scope": "off",
    // For unocss attributify
    "react/no-unknown-property": "off",

    "import/no-unresolved": ["error", { ignore: ["virtual:.*$", "unocss/vite"] }],

    // Sort imports
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^@?\\w"],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ["^"],
          // Relative imports.
          // Anything that starts with a dot.
          ["^\\."],
        ],
      },
    ],

    // Remove unused imports
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],

    // Raises error even when props type is declared, disabling for now
    "react/prop-types": "off",

    "@unocss/order": "error",
    "@unocss/order-attributify": "error",
  },
};
