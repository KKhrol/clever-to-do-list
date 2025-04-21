export default {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  singleAttributePerLine: true,
  jsxBracketSameLine: false,

  importOrder: [
    '^@modules/(.*)$',
    '^types/(.*)$',
    '^@api/(.*)$',
    '^@components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
