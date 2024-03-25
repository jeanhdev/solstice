/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/
/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  // pluginSearchDirs: false,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    // "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./apps/nebula/tailwind.config.cjs",
  importOrder: [
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "@cosmos/(.*)$",
    "",
    "^@nebula/lib/(.*)$",
    "^@nebula/api/(.*)$",
    "^@nebula/context/(.*)$",
    "^@nebula/ui/(.*)$",
    "^@nebula/schema/(.*)$",
    "^@nebula/types/(.*)$",
    "^@nebula/.*$",
    "",
    "^@pulsar/.*$",
    "",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};

module.exports = config;
