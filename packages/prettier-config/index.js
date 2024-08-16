/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} SortImportsConfig */

/**
 * @type {PrettierConfig | SortImportsConfig}
 */
const config = {
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  singleQuote: true,
  plugins: [
    'prettier-plugin-packagejson',
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: ['^@minikani/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
