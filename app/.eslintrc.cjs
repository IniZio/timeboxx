module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
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
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
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
    // "@typescript-eslint/no-unused-vars": [
    //   "error", // or "error"
    //   {
    //     "argsIgnorePattern": "^_",
    //     "varsIgnorePattern": "^_",
    //     "caughtErrorsIgnorePattern": "^_"
    //   }
    // ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],

    "react/prop-types": "off",
  },
};
